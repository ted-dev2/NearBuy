import Link from "next/link";

import { mockVenues } from "@/lib/mockData";

export default function Home() {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-lg bg-zinc-50 px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
          NearBuy
        </p>
        <h1 className="mt-1 text-2xl font-bold text-zinc-900">Venue directory</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Temporary dev index — pick a venue to preview its shopfront.
        </p>
      </div>

      <ul className="space-y-3">
        {mockVenues.map((venue) => (
          <li key={venue.id}>
            <Link
              href={`/shop/${venue.slug}`}
              className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-colors hover:border-zinc-300 hover:bg-zinc-50"
            >
              <span
                className="h-10 w-10 shrink-0 rounded-xl"
                style={{ backgroundColor: venue.brand_color_hex }}
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold text-zinc-900">
                  {venue.name}
                </span>
                <span className="block truncate text-sm text-zinc-500">
                  /shop/{venue.slug}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
