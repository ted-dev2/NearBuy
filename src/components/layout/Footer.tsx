import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 py-12 text-center text-sm font-bold text-gray-400 uppercase tracking-widest">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="normal-case text-gray-500 font-medium">
          © 2026 NearBuy Platform. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link href="/admin/orders" className="hover:text-premium-dark transition-colors">
            Dashboard
          </Link>
          <Link href="/admin/qr" className="hover:text-premium-dark transition-colors">
            QR Generator
          </Link>
        </div>
      </div>
    </footer>
  );
}
