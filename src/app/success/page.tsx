import { createServerSupabaseClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/formatPrice";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string }>;
}) {
  const params = await searchParams;
  const orderId = params.order_id;

  if (!orderId) {
    notFound();
  }

  const supabase = createServerSupabaseClient();

  // Fetch order with venue details
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: order, error: orderError } = await (supabase.from("orders") as any)
    .select("*, venues(*)")
    .eq("id", orderId)
    .single();

  if (orderError || !order) {
    console.error("Error fetching order:", orderError);
    notFound();
  }

  const venue = order.venues;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 overflow-hidden">
        {/* Header with Brand Color */}
        <div 
          className="h-40 flex items-center justify-center relative"
          style={{ backgroundColor: venue.brand_color_hex || "#10b981" }}
        >
          <div className="absolute inset-0 bg-black/5" />
          {venue.logo_url ? (
            <div className="relative z-10 p-1 bg-white rounded-2xl shadow-xl transform translate-y-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={venue.logo_url} 
                alt={venue.name} 
                className="w-24 h-24 rounded-xl object-contain bg-white"
              />
            </div>
          ) : (
            <div className="relative z-10 w-24 h-24 rounded-2xl border-4 border-white shadow-xl bg-white flex items-center justify-center text-3xl font-bold text-gray-800 transform translate-y-4">
              {venue.name[0]}
            </div>
          )}
        </div>

        <div className="p-8 pt-16 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Success!</h1>
          <p className="text-gray-500 mb-8 font-medium">Order #{order.id.slice(0, 8)}</p>

          <div className="bg-gray-50 rounded-3xl p-6 mb-8 text-left space-y-4 border border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Paid</span>
              <span className="text-xl font-black text-gray-900">{formatPrice(order.total_amount)}</span>
            </div>
            <div className="flex justify-between items-center border-t border-gray-200/60 pt-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Status</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-700 uppercase tracking-tight">
                {order.status}
              </span>
            </div>
          </div>

          {/* Fulfillment Section */}
          <div className="mb-10">
            {order.fulfillment_type === "pickup" ? (
              <div className="bg-emerald-50 border-2 border-emerald-100 rounded-3xl p-6 transform hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-3 text-emerald-800 font-black mb-3 justify-center text-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Pickup Ready
                </div>
                <p className="text-sm text-emerald-700 font-medium leading-relaxed">
                  Show this digital receipt to the venue staff at the counter to collect your items.
                </p>
              </div>
            ) : (
              <div className="bg-indigo-50 border-2 border-indigo-100 rounded-3xl p-6 text-left border-dashed">
                <div className="flex items-center gap-3 text-indigo-800 font-black mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Shipping To
                </div>
                <div className="text-sm text-indigo-900 space-y-1 font-medium">
                  <p className="font-black text-indigo-950 mb-1">{order.customer_email}</p>
                  <p>{order.shipping_address.line1}</p>
                  {order.shipping_address.line2 && <p>{order.shipping_address.line2}</p>}
                  <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}</p>
                  <p className="uppercase tracking-widest text-[10px] font-black text-indigo-400 pt-1">{order.shipping_address.country}</p>
                </div>
              </div>
            )}
          </div>

          <Link 
            href={`/shop/${venue.slug}`}
            className="group relative block w-full py-5 px-6 rounded-2xl font-black text-white transition-all hover:brightness-110 active:scale-[0.98] shadow-lg overflow-hidden"
            style={{ backgroundColor: venue.brand_color_hex || "#10b981" }}
          >
            <span className="relative z-10">Back to {venue.name}</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          
          <p className="mt-6 text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">
            Powered by NearBuy
          </p>
        </div>
      </div>
    </div>
  );
}
