import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-emerald-500 selection:text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-600/20">
              N
            </div>
            <span className="font-black text-2xl tracking-tight text-gray-950">NearBuy</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-600">
            <Link href="#features" className="hover:text-emerald-600 transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-emerald-600 transition-colors">How it Works</Link>
            <Link href="/admin/orders" className="hover:text-emerald-600 transition-colors">Merchant Dashboard</Link>
            <Link href="/admin/qr" className="hover:text-emerald-600 transition-colors">QR Generator</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link 
              href="/shop/emerald-roastery" 
              className="bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98] px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-600/10"
            >
              View Demo
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-b from-emerald-50/30 via-white to-white">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-black uppercase tracking-wider mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Now Live for Local Merchants
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-950 tracking-tight max-w-4xl mx-auto leading-[1.1] mb-8">
            Launch a seamless QR storefront for local pickup and shipping in minutes.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
            The scan-to-buy platform that turns physical visits into frictionless sales. Let customers purchase merchandise from their phones without any app downloads or registration.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/shop/emerald-roastery" 
              className="w-full sm:w-auto bg-gray-950 text-white hover:bg-gray-900 active:scale-[0.98] px-8 py-4 rounded-2xl text-base font-black transition-all shadow-xl shadow-gray-950/10 flex items-center justify-center gap-2"
            >
              View Live Demo
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            
            <Link 
              href="/admin/orders" 
              className="w-full sm:w-auto bg-white border-2 border-gray-100 text-gray-800 hover:bg-gray-50 active:scale-[0.98] px-8 py-4 rounded-2xl text-base font-black transition-all flex items-center justify-center gap-2"
            >
              Merchant Portal
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 border-t border-gray-50 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight mb-4">How it Works</h2>
            <p className="text-gray-500 font-medium max-w-xl mx-auto text-lg">A simple, checkout flow designed for busy environments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative flex flex-col items-start">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8 font-black text-xl">
                1
              </div>
              <h3 className="text-xl font-black text-gray-950 mb-3">Scan QR or click link</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Customers scan a dynamic QR code printed on their table or tap a social link. It takes them instantly to your custom branded shopfront.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative flex flex-col items-start">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8 font-black text-xl">
                2
              </div>
              <h3 className="text-xl font-black text-gray-950 mb-3">Pay instantly</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Frictionless guest checkout with Stripe. No account creation, no password setup. It takes under 30 seconds to purchase.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative flex flex-col items-start">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8 font-black text-xl">
                3
              </div>
              <h3 className="text-xl font-black text-gray-950 mb-3">Pickup locally or ship direct</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
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
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-black uppercase tracking-wider mb-6">
                Built for Local Merchants
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight leading-tight mb-6">
                Everything you need to sell merchandise physical-to-digital.
              </h2>
              <p className="text-gray-500 font-medium text-lg leading-relaxed mb-8">
                Your regulars love your brand. Give them a modern way to buy shirts, mugs, and coffee beans directly from their seats, without putting pressure on your staff.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-950">Dynamic Branded Themes</h4>
                    <p className="text-sm text-gray-500 mt-1">Your logo, header, and specific brand colors load automatically per venue.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-950">Secure Merchant Dashboard</h4>
                    <p className="text-sm text-gray-500 mt-1">Easily track incoming orders and click to fulfill them as they are collected or shipped.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-950">Printable QR Code Generator</h4>
                    <p className="text-sm text-gray-500 mt-1">Instantly generate high-resolution QR codes to place on tables, menus, or checkout counters.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-[2.5rem] p-8 md:p-12 border border-gray-100">
              <h3 className="text-xl font-black text-gray-950 mb-6">Explore the Platform</h3>
              <div className="space-y-4">
                <Link 
                  href="/shop/emerald-roastery" 
                  className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-sm transition-all group"
                >
                  <div>
                    <h4 className="font-bold text-gray-950 group-hover:text-emerald-600 transition-colors">Emerald Roastery Shopfront</h4>
                    <p className="text-xs text-gray-500 mt-1">Browse products, test the guest checkout flow.</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                </Link>

                <Link 
                  href="/admin/orders" 
                  className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-sm transition-all group"
                >
                  <div>
                    <h4 className="font-bold text-gray-950 group-hover:text-emerald-600 transition-colors">Merchant Dashboard</h4>
                    <p className="text-xs text-gray-500 mt-1">View incoming orders, manage fulfillment.</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                </Link>

                <Link 
                  href="/admin/qr" 
                  className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-sm transition-all group"
                >
                  <div>
                    <h4 className="font-bold text-gray-950 group-hover:text-emerald-600 transition-colors">Printable QR Codes</h4>
                    <p className="text-xs text-gray-500 mt-1">Generate and download QR codes for physical tables.</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50 py-12 text-center text-sm font-bold text-gray-400 uppercase tracking-widest">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 NearBuy Platform. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/admin/orders" className="hover:text-gray-600">Dashboard</Link>
            <Link href="/admin/qr" className="hover:text-gray-600">QR Generator</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
