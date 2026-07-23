import type { Product, Venue } from "@/types/database";

const MOCK_TIMESTAMP = "2026-07-22T12:00:00.000Z";

export const mockVenue: Venue = {
  id: "venue-emerald-roastery",
  slug: "emerald-roastery",
  name: "Emerald Roastery",
  logo_url: "https://placehold.co/160x160/10b981/ffffff/png?text=ER",
  header_image_url: "https://placehold.co/1200x480/064e3b/ffffff/png?text=Emerald+Roastery",
  brand_color_hex: "#10b981",
  notification_email: "orders@emeraldroastery.example",
  created_at: MOCK_TIMESTAMP,
  updated_at: MOCK_TIMESTAMP,
};

export const mockProducts: Product[] = [
  {
    id: "product-house-blend",
    venue_id: mockVenue.id,
    title: "House Blend Coffee",
    description: "12oz bag of our signature medium roast.",
    price: 1899,
    image_url: "https://placehold.co/600x600/f0fdf4/10b981/png?text=Coffee",
    is_available: true,
    created_at: MOCK_TIMESTAMP,
    updated_at: MOCK_TIMESTAMP,
  },
  {
    id: "product-ceramic-mug",
    venue_id: mockVenue.id,
    title: "Ceramic Mug",
    description: "Hand-glazed mug with the roastery emblem.",
    price: 2200,
    image_url: "https://placehold.co/600x600/ecfdf5/10b981/png?text=Mug",
    is_available: true,
    created_at: MOCK_TIMESTAMP,
    updated_at: MOCK_TIMESTAMP,
  },
  {
    id: "product-tote-bag",
    venue_id: mockVenue.id,
    title: "Canvas Tote",
    description: "Reusable tote for beans, books, or market runs.",
    price: 1599,
    image_url: "https://placehold.co/600x600/d1fae5/10b981/png?text=Tote",
    is_available: true,
    created_at: MOCK_TIMESTAMP,
    updated_at: MOCK_TIMESTAMP,
  },
];

export const mockVenues: Venue[] = [mockVenue];

export function getVenueBySlug(slug: string): Venue | undefined {
  return mockVenues.find((venue) => venue.slug === slug);
}

export function getProductsByVenueSlug(slug: string): Product[] {
  const venue = getVenueBySlug(slug);
  if (!venue) {
    return [];
  }

  return mockProducts.filter(
    (product) => product.venue_id === venue.id && product.is_available,
  );
}
