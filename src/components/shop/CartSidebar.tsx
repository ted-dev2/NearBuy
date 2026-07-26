"use client";

import React, { useState } from "react";
import { useCart } from "./CartContext";
import { formatPrice } from "@/lib/formatPrice";
import { createCheckoutSession } from "@/app/actions/stripe";
import type { Venue } from "@/types/database";

type CartSidebarProps = {
  venue: Venue;
};

export function CartSidebar({ venue }: CartSidebarProps) {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    fulfillmentType,
    setFulfillmentType,
    shippingAddress,
    setShippingAddress,
    email,
    setEmail,
  } = useCart();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isCartOpen) return null;

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (cartItems.length === 0) {
      setErrorMsg("Your cart is empty.");
      return;
    }

    if (!email) {
      setErrorMsg("Please enter an email address for guest checkout.");
      return;
    }

    // Basic email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (fulfillmentType === "ship") {
      if (!shippingAddress.line1.trim()) {
        setErrorMsg("Please enter a street address.");
        return;
      }
      if (!shippingAddress.city.trim()) {
        setErrorMsg("Please enter a city.");
        return;
      }
      if (!shippingAddress.state.trim()) {
        setErrorMsg("Please enter a state.");
        return;
      }
      if (!shippingAddress.postal_code.trim()) {
        setErrorMsg("Please enter a ZIP/Postal code.");
        return;
      }
    }

    setLoading(true);

    try {
      const origin = window.location.origin;
      const res = await createCheckoutSession({
        venueId: venue.id,
        venueSlug: venue.slug,
        cartItems,
        fulfillmentType,
        email,
        shippingAddress: fulfillmentType === "ship" ? shippingAddress : undefined,
        origin,
      });

      if (res.error) {
        setErrorMsg(res.error);
        setLoading(false);
      } else if (res.url) {
        // Redirect to Stripe Checkout page
        window.location.href = res.url;
      } else {
        setErrorMsg("Stripe checkout could not be initialized.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleShippingChange = (field: keyof typeof shippingAddress, value: string) => {
    setShippingAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar Panel */}
      <div className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-4">
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-zinc-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className="text-lg font-bold text-zinc-950">Your Cart</h2>
            <span className="inline-flex h-5 items-center justify-center rounded-full bg-zinc-100 px-2.5 text-xs font-semibold text-zinc-600">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="rounded-full p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
            aria-label="Close cart"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {errorMsg && (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600 border border-red-100 flex items-start gap-2.5">
              <svg
                className="h-5 w-5 shrink-0 text-red-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{errorMsg}</span>
            </div>
          )}

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full bg-zinc-50 p-4">
                <svg
                  className="h-10 w-10 text-zinc-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-semibold text-zinc-900">Your cart is empty</h3>
              <p className="mt-1 text-sm text-zinc-500">
                Browse the merchandise collection to find items you love!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90"
                style={{ backgroundColor: "var(--venue-brand)" }}
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Items</h3>
                <ul className="divide-y divide-zinc-100">
                  {cartItems.map((item) => (
                    <li key={item.productId} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                      {/* Image */}
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-zinc-100 border border-zinc-100">
                        {item.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[10px] text-zinc-400">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="space-y-0.5">
                          <h4 className="line-clamp-1 text-sm font-medium text-zinc-900">{item.title}</h4>
                          <p className="text-sm font-semibold text-zinc-800">{formatPrice(item.price)}</p>
                        </div>

                        {/* Quantity and Delete */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center rounded-lg border border-zinc-200 bg-white shadow-2xs">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="flex h-7 w-7 items-center justify-center text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"
                            >
                              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                              </svg>
                            </button>
                            <span className="w-8 text-center text-xs font-medium text-zinc-800">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="flex h-7 w-7 items-center justify-center text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"
                            >
                              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                              </svg>
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.productId)}
                            className="text-xs font-medium text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleCheckout} className="space-y-5 pt-2 border-t border-zinc-100">
                {/* Email Address Section */}
                <div className="space-y-1.5">
                  <label htmlFor="checkout-email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="checkout-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-[var(--venue-brand)] focus:ring-1 focus:ring-[var(--venue-brand)] outline-hidden transition shadow-3xs"
                  />
                  <p className="text-[10px] text-zinc-500">
                    We will send your order receipt and pickup details to this address.
                  </p>
                </div>

                {/* Fulfillment Type Toggle */}
                <div className="space-y-1.5">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Fulfillment Type
                  </span>
                  <div className="grid grid-cols-2 gap-2 rounded-xl bg-zinc-100 p-1">
                    <button
                      type="button"
                      onClick={() => setFulfillmentType("pickup")}
                      className={`rounded-lg py-2 text-center text-xs font-semibold transition ${
                        fulfillmentType === "pickup"
                          ? "bg-white text-zinc-900 shadow-sm"
                          : "text-zinc-600 hover:text-zinc-900"
                      }`}
                    >
                      In-Store Pickup
                    </button>
                    <button
                      type="button"
                      onClick={() => setFulfillmentType("ship")}
                      className={`rounded-lg py-2 text-center text-xs font-semibold transition ${
                        fulfillmentType === "ship"
                          ? "bg-white text-zinc-900 shadow-sm"
                          : "text-zinc-600 hover:text-zinc-900"
                      }`}
                    >
                      Ship to Me
                    </button>
                  </div>
                </div>

                {/* Shipping Address Fields */}
                {fulfillmentType === "ship" && (
                  <div className="space-y-3 rounded-2xl border border-zinc-100 bg-zinc-50/50 p-3.5 shadow-3xs transition-all duration-300">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Shipping Address
                    </h4>

                    <div className="space-y-3">
                      <div>
                        <label htmlFor="shipping-line1" className="sr-only">
                          Street Address
                        </label>
                        <input
                          type="text"
                          id="shipping-line1"
                          placeholder="Street Address"
                          required={fulfillmentType === "ship"}
                          value={shippingAddress.line1}
                          onChange={(e) => handleShippingChange("line1", e.target.value)}
                          className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-[var(--venue-brand)] focus:ring-1 focus:ring-[var(--venue-brand)] outline-hidden transition"
                        />
                      </div>

                      <div>
                        <label htmlFor="shipping-line2" className="sr-only">
                          Apartment, suite, etc. (optional)
                        </label>
                        <input
                          type="text"
                          id="shipping-line2"
                          placeholder="Apartment, suite, etc. (optional)"
                          value={shippingAddress.line2 || ""}
                          onChange={(e) => handleShippingChange("line2", e.target.value)}
                          className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-[var(--venue-brand)] focus:ring-1 focus:ring-[var(--venue-brand)] outline-hidden transition"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label htmlFor="shipping-city" className="sr-only">
                            City
                          </label>
                          <input
                            type="text"
                            id="shipping-city"
                            placeholder="City"
                            required={fulfillmentType === "ship"}
                            value={shippingAddress.city}
                            onChange={(e) => handleShippingChange("city", e.target.value)}
                            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-[var(--venue-brand)] focus:ring-1 focus:ring-[var(--venue-brand)] outline-hidden transition"
                          />
                        </div>
                        <div>
                          <label htmlFor="shipping-state" className="sr-only">
                            State
                          </label>
                          <input
                            type="text"
                            id="shipping-state"
                            placeholder="State"
                            required={fulfillmentType === "ship"}
                            value={shippingAddress.state}
                            onChange={(e) => handleShippingChange("state", e.target.value)}
                            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-[var(--venue-brand)] focus:ring-1 focus:ring-[var(--venue-brand)] outline-hidden transition"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label htmlFor="shipping-zip" className="sr-only">
                            ZIP / Postal Code
                          </label>
                          <input
                            type="text"
                            id="shipping-zip"
                            placeholder="ZIP / Postal Code"
                            required={fulfillmentType === "ship"}
                            value={shippingAddress.postal_code}
                            onChange={(e) => handleShippingChange("postal_code", e.target.value)}
                            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-[var(--venue-brand)] focus:ring-1 focus:ring-[var(--venue-brand)] outline-hidden transition"
                          />
                        </div>
                        <div>
                          <label htmlFor="shipping-country" className="sr-only">
                            Country
                          </label>
                          <select
                            id="shipping-country"
                            required={fulfillmentType === "ship"}
                            value={shippingAddress.country}
                            onChange={(e) => handleShippingChange("country", e.target.value)}
                            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-[var(--venue-brand)] focus:ring-1 focus:ring-[var(--venue-brand)] outline-hidden transition"
                          >
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="GB">United Kingdom</option>
                            <option value="AU">Australia</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Summary section */}
                <div className="rounded-2xl border border-zinc-100 bg-zinc-50/30 p-3.5 space-y-2">
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>Fulfillment</span>
                    <span className="font-medium text-zinc-700">
                      {fulfillmentType === "pickup" ? "In-Store Pickup (Free)" : "Shipping (Calculated at next step)"}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline pt-1 border-t border-zinc-100">
                    <span className="text-sm font-semibold text-zinc-900">Total</span>
                    <span className="text-xl font-bold text-[var(--venue-brand)]">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                </div>

                {/* Checkout button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white shadow-md hover:brightness-95 active:brightness-90 disabled:opacity-50 disabled:pointer-events-none transition"
                  style={{ backgroundColor: "var(--venue-brand)" }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Preparing Checkout...
                    </>
                  ) : (
                    <>
                      <span>Checkout as Guest</span>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
