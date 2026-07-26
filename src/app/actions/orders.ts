"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function fulfillOrder(orderId: string) {
  const supabase = createServerSupabaseClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from("orders") as any)
    .update({ status: "fulfilled" })
    .eq("id", orderId);

  if (error) {
    console.error("Error fulfilling order:", error);
    return { error: "Failed to fulfill order" };
  }

  revalidatePath("/admin/orders");
  return { success: true };
}
