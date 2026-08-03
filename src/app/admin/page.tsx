import { createServerSupabaseClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/formatPrice";
import { Order } from "@/types/database";

type OrderWithVenue = Order & { venues: { name: string } | null };

export default async function AdminDashboardPage() {
  const supabase = createServerSupabaseClient();

  // Fetch orders with venue names
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*, venues(name)")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-8 text-stone-900 bg-stone-100 min-h-screen">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
          <h1 className="text-2xl font-black mb-4 text-accent">Error loading orders</h1>
          <p className="text-stone-600 font-medium">{error.message}</p>
        </div>
      </div>
    );
  }

  const typedOrders = (orders || []) as unknown as OrderWithVenue[];

  // Calculate premium metrics
  const totalItemsSold = typedOrders.reduce((sum, o) => sum + (o.total_items || 1), 0);
  const grossSales = typedOrders.reduce((sum, o) => sum + o.total_amount, 0);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-11

  const earningsThisMonth = typedOrders.reduce((sum, o) => {
    const orderDate = new Date(o.created_at);
    if (orderDate.getFullYear() === currentYear && orderDate.getMonth() === currentMonth) {
      // Fallback to 15% if venue_commission is not set or 0
      const commission = o.venue_commission || Math.round(o.total_amount * 0.15);
      return sum + commission;
    }
    return sum;
  }, 0);

  return (
    <div className="min-h-screen bg-stone-100/60 p-4 md:p-8 selection:bg-accent selection:text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-6 border-b border-stone-200">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">Partner Portal</span>
            <h1 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight mt-1">Merchant Overview</h1>
            <p className="text-stone-600 font-medium mt-2">Print-on-Demand sales performance and earnings.</p>
          </div>
          <div className="bg-stone-200/50 text-stone-700 px-4 py-2 rounded-2xl text-xs font-black border border-stone-200">
            POD ACTIVE
          </div>
        </div>

        {/* Premium Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Total Items Sold */}
          <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm relative overflow-hidden group hover:border-accent/40 transition-all">
            <div className="absolute top-0 left-0 w-2 h-full bg-accent opacity-20 group-hover:opacity-100 transition-opacity" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Total Items Sold</span>
            <p className="text-5xl font-black text-stone-900 mt-4 tracking-tight">
              {totalItemsSold.toLocaleString()}
            </p>
            <p className="text-xs text-stone-500 font-medium mt-2">Units shipped directly via POD</p>
          </div>

          {/* Card 2: Gross Sales */}
          <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm relative overflow-hidden group hover:border-accent/40 transition-all">
            <div className="absolute top-0 left-0 w-2 h-full bg-accent opacity-20 group-hover:opacity-100 transition-opacity" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Gross Sales</span>
            <p className="text-5xl font-black text-stone-900 mt-4 tracking-tight">
              {formatPrice(grossSales)}
            </p>
            <p className="text-xs text-stone-500 font-medium mt-2">Total platform revenue generated</p>
          </div>

          {/* Card 3: Your Earnings This Month */}
          <div className="bg-stone-900 text-white rounded-3xl p-8 border border-stone-850 shadow-md relative overflow-hidden group hover:shadow-lg transition-all">
            <div className="absolute top-0 left-0 w-2 h-full bg-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Your Earnings This Month</span>
            <p className="text-5xl font-black text-white mt-4 tracking-tight text-accent">
              {formatPrice(earningsThisMonth)}
            </p>
            <p className="text-xs text-stone-400 font-medium mt-2">Based on your dynamic venue commission</p>
          </div>
        </div>

        {/* Sales Read-Only Table */}
        <div className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-stone-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-black text-stone-900 tracking-tight">Recent Sales</h2>
              <p className="text-sm text-stone-500 font-medium mt-1">Read-only log of all partner sales transactions.</p>
            </div>
            <span className="bg-stone-100 text-stone-800 px-3 py-1 rounded-full text-xs font-black border border-stone-200">
              {typedOrders.length} {typedOrders.length === 1 ? 'sale' : 'sales'}
            </span>
          </div>

          {typedOrders.length === 0 ? (
            <div className="border border-dashed border-stone-200 rounded-3xl p-16 text-center bg-stone-50/50">
              <p className="text-stone-400 font-bold italic">No sales recorded yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-6 md:mx-0">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6">Venue</th>
                    <th className="py-4 px-6">Customer Name</th>
                    <th className="py-4 px-6 text-right">Total Amount</th>
                    <th className="py-4 px-6 text-right text-accent">Commission Earned</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-sm font-medium text-stone-800">
                  {typedOrders.map((order) => {
                    const commission = order.venue_commission || Math.round(order.total_amount * 0.15);
                    const formattedDate = new Date(order.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    });

                    return (
                      <tr key={order.id} className="hover:bg-stone-50/60 transition-colors">
                        <td className="py-4 px-6 text-stone-500 font-mono text-xs">{formattedDate}</td>
                        <td className="py-4 px-6 font-bold text-stone-900">
                          {order.venues?.name || "Unknown Venue"}
                        </td>
                        <td className="py-4 px-6 truncate max-w-[200px]" title={order.customer_email}>
                          {order.customer_email}
                        </td>
                        <td className="py-4 px-6 text-right font-bold text-stone-900">
                          {formatPrice(order.total_amount)}
                        </td>
                        <td className="py-4 px-6 text-right font-black text-accent">
                          {formatPrice(commission)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
