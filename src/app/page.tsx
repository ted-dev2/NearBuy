import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 text-zinc-900 selection:bg-accent selection:text-white">
      {/* Header Component */}
      <Header />

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-b from-stone-100/50 via-stone-50 to-stone-50">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-zinc-900 border border-zinc-100 rounded-full text-xs font-black uppercase tracking-wider mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            Now Live for Local Merchants
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-zinc-900 tracking-tight max-w-4xl mx-auto leading-[1.1] mb-8">
            Launch a seamless QR storefront for local pickup and shipping in minutes.
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
            The scan-to-buy platform that turns physical visits into frictionless sales. Let customers purchase merchandise from their phones without any app downloads or registration.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/shop/north-london-taproom" 
              className="w-full sm:w-auto bg-zinc-900 text-white hover:bg-zinc-800 active:scale-[0.98] px-8 py-4 rounded-2xl text-base font-black transition-all shadow-xl shadow-zinc-900/10 flex items-center justify-center gap-2"
            >
              View Live Demo
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            
            <Link 
              href="/admin/orders" 
              className="w-full sm:w-auto bg-white border border-zinc-200 text-zinc-900 hover:bg-stone-50 active:scale-[0.98] px-8 py-4 rounded-2xl text-base font-black transition-all flex items-center justify-center gap-2"
            >
              Merchant Portal
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 border-t border-zinc-100 bg-stone-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight mb-4">How it Works</h2>
            <p className="text-zinc-500 font-medium max-w-xl mx-auto text-lg">A simple, checkout flow designed for busy environments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm relative flex flex-col items-start">
              <div className="w-14 h-14 rounded-2xl bg-stone-50 text-accent flex items-center justify-center mb-8 font-black text-xl">
                1
              </div>
              <h3 className="text-xl font-black text-zinc-900 mb-3">Scan QR or click link</h3>
              <p className="text-zinc-500 font-medium leading-relaxed">
                Customers scan a dynamic QR code printed on their table or tap a social link. It takes them instantly to your custom branded shopfront.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm relative flex flex-col items-start">
              <div className="w-14 h-14 rounded-2xl bg-stone-50 text-accent flex items-center justify-center mb-8 font-black text-xl">
                2
              </div>
              <h3 className="text-xl font-black text-zinc-900 mb-3">Pay instantly</h3>
              <p className="text-zinc-500 font-medium leading-relaxed">
                Frictionless guest checkout with Stripe. No account creation, no password setup. It takes under 30 seconds to purchase.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm relative flex flex-col items-start">
              <div className="w-14 h-14 rounded-2xl bg-stone-50 text-accent flex items-center justify-center mb-8 font-black text-xl">
                3
              </div>
              <h3 className="text-xl font-black text-zinc-900 mb-3">Pickup locally or ship direct</h3>
              <p className="text-zinc-500 font-medium leading-relaxed">
                Customers select {"\"Pickup\""} to receive a digital receipt they can show your staff, or {"\"Ship\""} to have items delivered directly to their door.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-zinc-900 rounded-full text-xs font-black uppercase tracking-wider mb-6">
                Built for Local Merchants
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight leading-tight mb-6">
                Everything you need to sell merchandise physical-to-digital.
              </h2>
              <p className="text-zinc-500 font-medium text-lg leading-relaxed mb-8">
                Your regulars love your brand. Give them a modern way to buy shirts, mugs, and coffee beans directly from their seats, without putting pressure on your staff.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-stone-100 text-accent flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900">Dynamic Branded Themes</h4>
                    <p className="text-sm text-zinc-500 mt-1">Your logo, header, and specific brand colors load automatically per venue.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-stone-100 text-accent flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900">Secure Merchant Dashboard</h4>
                    <p className="text-sm text-zinc-500 mt-1">Easily track incoming orders and click to fulfill them as they are collected or shipped.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-stone-100 text-accent flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900">Printable QR Code Generator</h4>
                    <p className="text-sm text-zinc-500 mt-1">Instantly generate high-resolution QR codes to place on tables, menus, or checkout counters.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-stone-50 rounded-[2.5rem] p-8 md:p-12 border border-zinc-100">
              <h3 className="text-xl font-black text-zinc-900 mb-6">Explore the Platform</h3>
              <div className="space-y-4">
                <Link 
                  href="/shop/north-london-taproom" 
                  className="flex items-center justify-between p-5 bg-white rounded-2xl border border-zinc-100 hover:border-accent/50 hover:shadow-sm transition-all group"
                >
                  <div>
                    <h4 className="font-bold text-zinc-900 group-hover:text-accent transition-colors">North London Taproom Shopfront</h4>
                    <p className="text-xs text-zinc-500 mt-1">Browse products, test the guest checkout flow.</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                </Link>

                <Link 
                  href="/admin/orders" 
                  className="flex items-center justify-between p-5 bg-white rounded-2xl border border-zinc-100 hover:border-accent/50 hover:shadow-sm transition-all group"
                >
                  <div>
                    <h4 className="font-bold text-zinc-900 group-hover:text-accent transition-colors">Merchant Dashboard</h4>
                    <p className="text-xs text-zinc-500 mt-1">View incoming orders, manage fulfillment.</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                </Link>

                <Link 
                  href="/admin/qr" 
                  className="flex items-center justify-between p-5 bg-white rounded-2xl border border-zinc-100 hover:border-accent/50 hover:shadow-sm transition-all group"
                >
                  <div>
                    <h4 className="font-bold text-zinc-900 group-hover:text-accent transition-colors">Printable QR Codes</h4>
                    <p className="text-xs text-zinc-500 mt-1">Generate and download QR codes for physical tables.</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
