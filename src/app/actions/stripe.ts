"use server";

import { getStripeClient } from "@/lib/stripe";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { CartItem } from "@/types/cart";
import type { FulfillmentType, ShippingAddress } from "@/types/database";

type CreateSessionParams = {
  venueId: string;
  venueSlug: string;
  cartItems: CartItem[];
  fulfillmentType: FulfillmentType;
  email: string;
  shippingAddress?: ShippingAddress;
  origin: string;
};

export async function createCheckoutSession({
  venueId,
  venueSlug,
  cartItems,
  fulfillmentType,
  email,
  shippingAddress,
  origin,
}: CreateSessionParams) {
  try {
    if (!cartItems || cartItems.length === 0) {
      throw new Error("Your cart is empty.");
    }

    if (!email) {
      throw new Error("Email is required for guest checkout.");
    }

    if (fulfillmentType === "ship") {
      if (
        !shippingAddress ||
        !shippingAddress.line1 ||
        !shippingAddress.city ||
        !shippingAddress.state ||
        !shippingAddress.postal_code
      ) {
        throw new Error("Please complete the shipping address.");
      }
    }

    const stripe = getStripeClient();

    // Map cart items to Stripe line items
    const lineItems = cartItems.map((item) => {
      const lineItem = {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: item.imageUrl ? [item.imageUrl] : undefined,
          },
          unit_amount: item.price, // Already in cents (e.g. 1899)
        },
        quantity: item.quantity,
      };

      return lineItem;
    });

    // Prepare metadata
    const metadata: Record<string, string> = {
      venueId,
      venueSlug,
      customerEmail: email,
      fulfillmentType,
    };

    if (fulfillmentType === "ship" && shippingAddress) {
      metadata.shippingAddress = JSON.stringify(shippingAddress);
    }

    // Include simplified cart items in metadata for order creation later
    metadata.items = JSON.stringify(
      cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        title: item.title,
      }))
    );

    // Insert order into Supabase first to get an ID
    const supabase = createServerSupabaseClient();
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Use any cast to bypass strict table name checking if inference is failing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: orderData, error: orderError } = await (supabase.from("orders") as any)
      .insert({
        venue_id: venueId,
        customer_email: email,
        total_amount: totalAmount,
        fulfillment_type: fulfillmentType,
        status: "pending" as const,
        shipping_address: shippingAddress || null,
      })
      .select()
      .single();

    if (orderError) {
      console.error("Supabase Order Insertion Error:", orderError);
      throw new Error("Failed to create order. Please try again.");
    }

    const orderId = orderData.id;

    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: email,
      success_url: `${origin}/success?order_id=${orderId}`,
      cancel_url: `${origin}/shop/${venueSlug}`,
      metadata: {
        ...metadata,
        orderId,
      },
    });

    if (!session.url) {
      throw new Error("Stripe failed to return a checkout URL.");
    }

    return { url: session.url };
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred.";
    console.error("Stripe Session Creation Error:", error);
    return { error: message };
  }
}
