import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { VenueShopfront } from "@/components/shop/VenueShopfront";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Venue, Product } from "@/types/database";

type ShopPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ShopPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createServerSupabaseClient();

  const { data: venue } = await supabase
    .from("venues")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!venue) {
    return { title: "Shop not found | NearBuy" };
  }

  const v = venue as Venue;

  return {
    title: `${v.name} | NearBuy`,
    description: `Browse merchandise from ${v.name}.`,
  };
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { slug } = await params;
  const supabase = createServerSupabaseClient();

  // Fetch venue first to get its ID
  const { data: venue, error: venueError } = await supabase
    .from("venues")
    .select("*")
    .eq("slug", slug)
    .single();

  if (venueError || !venue) {
    notFound();
  }

  const v = venue as Venue;

  // Fetch products for this venue
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .eq("venue_id", v.id)
    .eq("is_available", true);

  if (productsError) {
    console.error("Error fetching products:", productsError);
  }

  return <VenueShopfront venue={v} products={(products as Product[]) || []} />;
}
