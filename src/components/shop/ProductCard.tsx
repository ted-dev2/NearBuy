import Image from "next/image";

import { formatPrice } from "@/lib/formatPrice";
import type { Product } from "@/types/database";

type ProductCardProps = {
  product: Product;
  onClick?: () => void;
};

export function ProductCard({ product, onClick }: ProductCardProps) {
  const CardContent = (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md hover:-translate-y-1 hover:shadow-md h-full flex flex-col">
      <div className="relative aspect-square w-full bg-zinc-100 shrink-0">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, 240px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-400">
            No image
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between p-4 space-y-1.5">
        <div className="space-y-1">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-zinc-950">
            {product.title}
          </h3>
          {product.description ? (
            <p className="line-clamp-2 text-xs leading-relaxed text-zinc-600">
              {product.description}
            </p>
          ) : null}
        </div>
        <p className="pt-1 text-base font-extrabold text-[var(--venue-brand)]">
          {formatPrice(product.price)}
        </p>
      </div>
    </article>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="group w-full text-left h-full block focus:outline-hidden focus:ring-2 focus:ring-[var(--venue-brand)] focus:ring-offset-2 rounded-2xl transition"
      >
        {CardContent}
      </button>
    );
  }

  return CardContent;
}
