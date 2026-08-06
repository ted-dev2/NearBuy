"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === "/admin" && pathname === "/admin") return true;
    if (href !== "/admin" && pathname?.startsWith(href)) return true;
    return false;
  };

  const linkClass = (href: string) => {
    return isLinkActive(href)
      ? "text-accent font-bold"
      : "text-zinc-500 hover:text-zinc-900 transition-colors font-medium";
  };

  // Don't show the nav on the login page
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-stone-50">{children}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 selection:bg-accent selection:text-white">
      {/* Admin Top Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white font-black text-sm shadow-sm transition-transform group-hover:scale-105">
                N
              </div>
              <span className="font-black text-lg tracking-tight text-zinc-950">
                Partner Portal
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/admin" className={linkClass("/admin")}>
                Dashboard
              </Link>
              <Link href="/admin/orders" className={linkClass("/admin/orders")}>
                Orders
              </Link>
              <Link href="/admin/qr" className={linkClass("/admin/qr")}>
                QR Codes
              </Link>
              <Link href="/admin/settings" className={linkClass("/admin/settings")}>
                Settings
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin/login"
              className="text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      <footer className="border-t border-zinc-200 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-400 text-xs font-medium">
            © 2026 NearBuy Partner Portal. Sleek B2B SaaS Interface.
          </p>
          <div className="flex gap-6">
            <Link href="/" className="text-zinc-400 hover:text-zinc-600 text-xs font-medium transition-colors">
              Back to NearBuy.com
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
