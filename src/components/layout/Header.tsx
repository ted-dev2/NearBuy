"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname?.startsWith(href)) return true;
    return false;
  };

  const linkClass = (href: string) => {
    return isLinkActive(href)
      ? "text-accent font-bold transition-colors"
      : "text-zinc-600 font-bold hover:text-accent transition-colors";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="h-[2px] bg-accent w-full" />
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-zinc-900/10 transition-transform group-hover:scale-105">
            N
          </div>
          <span className="font-black text-2xl tracking-tight text-zinc-950">NearBuy</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/#features" className={linkClass("/#features")}>
            Features
          </Link>
          <Link href="/#how-it-works" className={linkClass("/#how-it-works")}>
            How it Works
          </Link>
          <Link href="/admin" className={linkClass("/admin")}>
            Merchant Dashboard
          </Link>
          <Link href="/admin/qr" className={linkClass("/admin/qr")}>
            QR Generator
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/shop/north-london-taproom"
            className="bg-zinc-900 text-white hover:bg-zinc-800 active:scale-[0.98] px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-zinc-900/10"
          >
            View Demo
          </Link>
        </div>
      </div>
    </header>
  );
}
