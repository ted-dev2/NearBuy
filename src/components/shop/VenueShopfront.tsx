"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useCart } from "./CartContext";
import { CartSidebar } from "./CartSidebar";
import { ProductCard } from "@/components/shop/ProductCard";
import type { Product, Venue } from "@/types/database";
import { formatPrice } from "@/lib/formatPrice";

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
                unoptimized
                sizes="(max-width: 512px) 100vw, 512px"
                className="object-cover"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          </div>

          <div className="relative -mt-12 px-6">
            <div className="flex items-end gap-4">
              <div className="relative h-22 w-22 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-lg">
                {venue.logo_url ? (
                  <Image
                    src={venue.logo_url}
                    alt={`${venue.name} logo`}
                    fill
                    unoptimized
                    sizes="88px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-[var(--venue-brand-soft)] text-xl font-bold text-[var(--venue-brand)]">
                    {venue.name.charAt(0)}
                  </div>
                )}
              </div>

              <div className="pb-1">
                <h1 className="text-2xl font-extrabold tracking-tight text-zinc-950 leading-tight">
                  {venue.name}
                </h1>
                {venue.location && (
                  <p className="text-xs font-medium text-zinc-500/70 mt-0.5">
                    {venue.location}
                  </p>
                )}
              </div>
            </div>
          </div>
        </header>

        <section className="mt-12 px-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="h-6 w-1 rounded-full bg-indigo-600" />
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-zinc-950">Merchandise</h2>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 pt-0.5">
                  Tap an item to add to cart
                </p>
              </div>
            </div>

            {totalItems > 0 && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full bg-white shadow-sm hover:shadow-md text-zinc-950 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>View Cart</span>
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1.5 text-[10px] font-extrabold text-white">
                  {totalItems}
                </span>
              </button>
            )}
          </div>

          {products.length > 0 ? (
            <ul className="grid grid-cols-2 gap-4">
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
            <div className="rounded-3xl bg-white shadow-sm px-6 py-12 text-center">
              <p className="text-base font-bold text-zinc-950">
                No products available right now.
              </p>
              <p className="mt-1.5 text-xs font-medium text-zinc-500">
                Check back soon for new merchandise.
              </p>
            </div>
          )}
        </section>

        <footer className="mt-16 px-6 pb-8 flex flex-col items-center gap-8 text-center">
          <div className="w-full rounded-2xl bg-[var(--venue-brand-soft)] px-5 py-4">
            <p className="text-xs font-semibold text-zinc-800 leading-relaxed">
              Scan. Browse. Buy — pick up at the counter or have it shipped.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-zinc-400 font-bold select-none pt-4">
            <span>Powered by</span>
            <span className="text-indigo-600 tracking-normal font-extrabold">NearBuy</span>
          </div>
        </footer>
      </div>

      {/* Sticky Mobile Checkout Bar */}
      {totalItems > 0 && !isCartOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-zinc-100 px-6 py-4 shadow-2xl md:hidden flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-wider">Total</span>
            <span className="text-base font-black text-zinc-950">
              {formatPrice(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0))}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="rounded-xl px-6 py-2.5 text-sm font-bold text-white shadow-md active:scale-98 transition-all"
            style={{ backgroundColor: "var(--venue-brand)" }}
          >
            Checkout
          </button>
        </div>
      )}

      {/* Floating Action Button (FAB) for Shopping Cart on Mobile (now on Desktop/Tablet only) */}
      {totalItems > 0 && !isCartOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xs px-4 animate-bounce-short hidden md:block">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full flex items-center justify-between gap-3 rounded-full py-3.5 px-6 font-bold text-white bg-indigo-600 shadow-xl hover:bg-indigo-700 active:scale-98 transition-all duration-200 shadow-indigo-600/20"
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
