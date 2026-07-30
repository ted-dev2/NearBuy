import { createServerSupabaseClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/formatPrice";
import { fulfillOrder } from "@/app/actions/orders";
import { Order } from "@/types/database";

type OrderWithVenue = Order & { venues: { name: string } | null };

export default async function AdminOrdersPage() {
  const supabase = createServerSupabaseClient();

  // Fetch orders with venue names
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*, venues(name)")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-8 text-red-600 bg-red-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Error loading orders</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  const typedOrders = (orders || []) as unknown as OrderWithVenue[];

  const toFulfill = typedOrders.filter((o) => o.status === "pending" || o.status === "paid");
  const completed = typedOrders.filter((o) => o.status === "fulfilled");

  return (
    <div className="min-h-screen bg-stone-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-zinc-900 tracking-tight">Merchant Dashboard</h1>
          <p className="text-zinc-600 font-medium mt-2">Manage incoming orders and fulfillment.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* To Fulfill Column */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-zinc-800 flex items-center gap-3">
                <span className="flex h-3 w-3 rounded-full bg-accent shadow-[0_0_8px_rgba(192,108,85,0.6)]" />
                To Fulfill
              </h2>
              <span className="bg-stone-100 text-zinc-700 px-3 py-1 rounded-full text-xs font-black">
                {toFulfill.length}
              </span>
            </div>
            
            <div className="space-y-6">
              {toFulfill.map((order) => (
                <OrderCard key={order.id} order={order} showAction />
              ))}
              {toFulfill.length === 0 && (
                <div className="bg-white border border-dashed border-zinc-200 rounded-3xl p-12 text-center">
                  <p className="text-zinc-400 font-medium italic">No pending orders. {"You're all caught up!"}</p>
                </div>
              )}
            </div>
          </section>

          {/* Completed Column */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-zinc-800 flex items-center gap-3">
                <span className="flex h-3 w-3 rounded-full bg-zinc-300" />
                Completed
              </h2>
              <span className="bg-stone-100 text-zinc-700 px-3 py-1 rounded-full text-xs font-black">
                {completed.length}
              </span>
            </div>
            
            <div className="space-y-6">
              {completed.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
              {completed.length === 0 && (
                <div className="bg-white border border-dashed border-zinc-200 rounded-3xl p-12 text-center">
                  <p className="text-zinc-400 font-medium italic">No completed orders yet.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function OrderCard({ order, showAction = false }: { order: OrderWithVenue; showAction?: boolean }) {
  const isPickup = order.fulfillment_type === "pickup";

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-zinc-100 overflow-hidden transition-all hover:shadow-md">
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">
              {order.venues?.name || "Unknown Venue"}
            </p>
            <h3 className="font-bold text-zinc-900 text-lg break-all">{order.customer_email}</h3>
            <p className="text-[10px] text-zinc-400 font-mono mt-1 uppercase">ID: {order.id.slice(0, 8)}</p>
          </div>
          <div className="text-right">
            <p className="font-black text-2xl text-zinc-900">{formatPrice(order.total_amount)}</p>
            <div className="mt-2 flex flex-wrap justify-end gap-2">
              <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                isPickup 
                  ? 'bg-stone-100 text-accent' 
                  : 'bg-stone-100 text-zinc-600'
              }`}>
                {order.fulfillment_type}
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-stone-50 text-zinc-500">
                {order.status}
              </span>
            </div>
          </div>
        </div>

        {!isPickup && order.shipping_address && (
          <div className="bg-stone-50/50 rounded-2xl p-4 text-sm text-zinc-600 mb-6 border border-zinc-100/50">
            <div className="flex items-center gap-2 font-black text-accent uppercase tracking-widest text-[10px] mb-2">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Shipping Address
            </div>
            <div className="font-medium opacity-90 space-y-0.5">
              <p>{order.shipping_address.line1}</p>
              {order.shipping_address.line2 && <p>{order.shipping_address.line2}</p>}
              <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}</p>
              <p className="text-[10px] font-black opacity-40 uppercase tracking-tighter mt-1">{order.shipping_address.country}</p>
            </div>
          </div>
        )}

        {isPickup && (
          <div className="bg-stone-50/50 rounded-2xl p-4 text-sm text-zinc-600 mb-6 border border-zinc-100/50 flex items-center gap-3">
             <div className="bg-stone-100 p-2 rounded-xl">
               <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
               </svg>
             </div>
             <p className="font-bold text-zinc-900">In-Store Pickup</p>
          </div>
        )}

        {showAction && (
          <form action={async () => {
            "use server";
            await fulfillOrder(order.id);
          }}>
            <button
              type="submit"
              className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-black hover:bg-zinc-800 active:scale-[0.98] transition-all shadow-lg shadow-zinc-900/10"
            >
              Mark as Fulfilled
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
