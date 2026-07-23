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
      const lineItem: any = {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
          },
          unit_amount: item.price, // Already in cents (e.g. 1899)
        },
        quantity: item.quantity,
      };

      if (item.imageUrl) {
        lineItem.price_data.product_data.images = [item.imageUrl];
      }

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

    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: email,
      success_url: `${origin}/shop/${venueSlug}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop/${venueSlug}`,
      metadata: metadata,
    });

    if (!session.url) {
      throw new Error("Stripe failed to return a checkout URL.");
    }

    // Insert order into Supabase
    const supabase = createServerSupabaseClient();
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Use any cast to bypass strict table name checking if inference is failing
    const { error: orderError } = await (supabase.from("orders") as any).insert({
      venue_id: venueId,
      customer_email: email,
      total_amount: totalAmount,
      fulfillment_type: fulfillmentType,
      status: "pending",
      shipping_address: shippingAddress || null,
    });

    if (orderError) {
      console.error("Supabase Order Insertion Error:", orderError);
    }

    return { url: session.url };
  } catch (error: any) {
    console.error("Stripe Session Creation Error:", error);
    return { error: error.message || "An unexpected error occurred." };
  }
}
