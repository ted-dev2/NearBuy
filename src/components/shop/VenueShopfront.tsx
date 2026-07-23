"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useCart } from "./CartContext";
import { CartSidebar } from "./CartSidebar";
import { ProductCard } from "@/components/shop/ProductCard";
import type { Product, Venue } from "@/types/database";

type VenueShopfrontProps = {
  venue: Venue;
  products: Product[];
};

export function VenueShopfront({ venue, products }: VenueShopfrontProps) {
  const { addToCart, cartItems, setIsCartOpen, isCartOpen } = useCart();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div
      className="min-h-dvh bg-zinc-50 text-zinc-900 flex flex-col relative"
      style={
        {
          "--venue-brand": venue.brand_color_hex,
          "--venue-brand-soft": `${venue.brand_color_hex}1a`,
        } as CSSProperties
      }
    >
      <div className="mx-auto w-full max-w-lg pb-24 flex-1">
        <header className="relative">
          <div className="relative aspect-[5/2] w-full overflow-hidden bg-zinc-200">
            {venue.header_image_url ? (
              <Image
                src={venue.header_image_url}
                alt=""
                fill
                priority
                sizes="(max-width: 512px) 100vw, 512px"
                className="object-cover"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          </div>

          <div className="relative -mt-10 px-4">
            <div className="flex items-end gap-3">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-md">
                {venue.logo_url ? (
                  <Image
                    src={venue.logo_url}
                    alt={`${venue.name} logo`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-[var(--venue-brand-soft)] text-lg font-bold text-[var(--venue-brand)]">
                    {venue.name.charAt(0)}
                  </div>
                )}
              </div>

              <div className="pb-1">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  NearBuy Shop
                </p>
                <h1 className="text-2xl font-bold leading-tight text-zinc-900">
                  {venue.name}
                </h1>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-8 px-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-[var(--venue-brand)]" />
              <div>
                <h2 className="text-lg font-semibold text-zinc-900">Merchandise</h2>
                <p className="text-sm text-zinc-500">
                  Tap an item to add to your cart
                </p>
              </div>
            </div>

            {totalItems > 0 && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-zinc-200 bg-white shadow-3xs text-zinc-700 hover:bg-zinc-50 transition"
              >
                <span>View Cart</span>
                <span className="inline-flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[var(--venue-brand)] px-1 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              </button>
            )}
          </div>

          {products.length > 0 ? (
            <ul className="grid grid-cols-2 gap-3">
              {products.map((product) => (
                <li key={product.id}>
                  <ProductCard
                    product={product}
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image_url: product.image_url,
                      })
                    }
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-4 py-10 text-center">
              <p className="text-sm font-medium text-zinc-700">
                No products available right now.
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Check back soon for new merch.
              </p>
            </div>
          )}
        </section>

        <footer className="mt-10 px-4">
          <div className="rounded-2xl bg-[var(--venue-brand-soft)] px-4 py-3 text-center">
            <p className="text-xs font-medium text-zinc-600">
              Scan. Browse. Buy — pick up at the counter or have it shipped.
            </p>
          </div>
        </footer>
      </div>

      {/* Floating Action Button (FAB) for Shopping Cart on Mobile */}
      {totalItems > 0 && !isCartOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xs px-4 animate-bounce-short">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full flex items-center justify-between gap-3 rounded-full py-3.5 px-6 font-bold text-white shadow-xl hover:brightness-95 active:brightness-90 transition transform duration-200 active:scale-98"
            style={{ backgroundColor: "var(--venue-brand)" }}
          >
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <svg
                  className="h-5.5 w-5.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="absolute -top-1.5 -right-2 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-zinc-950 shadow-xs">
                  {totalItems}
                </span>
              </div>
              <span className="text-sm tracking-wide">View Your Cart</span>
            </div>
            <svg
              className="h-4 w-4 text-white/80"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      )}

      {/* Cart Drawer Component */}
      <CartSidebar venue={venue} />
    </div>
  );
}
