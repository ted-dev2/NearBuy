import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-100 bg-stone-50 py-12 text-center text-sm font-bold text-zinc-400 uppercase tracking-widest">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="normal-case text-zinc-500 font-medium">
          © 2026 NearBuy Platform. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link href="/admin" className="hover:text-accent transition-colors">
            Dashboard
          </Link>
          <Link href="/admin/qr" className="hover:text-accent transition-colors">
            QR Generator
          </Link>
        </div>
      </div>
    </footer>
  );
}
