import React from "react";
import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          <Link href="/" className="flex items-center gap-2 mb-8 group">
            <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-zinc-900/10 transition-transform group-hover:scale-105">
              N
            </div>
            <span className="font-black text-2xl tracking-tight text-zinc-950">
              NearBuy
            </span>
          </Link>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight mb-2">
            Merchant Login
          </h1>
          <p className="text-zinc-500 font-medium">
            Access your Partner Portal
          </p>
        </div>

        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-zinc-100">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-black uppercase tracking-wider text-zinc-400 mb-2 ml-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-stone-50 border border-zinc-100 rounded-2xl px-5 py-4 text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                placeholder="name@venue.com"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2 ml-1">
                <label
                  htmlFor="password"
                  className="block text-xs font-black uppercase tracking-wider text-zinc-400"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-accent transition-colors"
                >
                  Forgot?
                </button>
              </div>
              <input
                type="password"
                id="password"
                className="w-full bg-stone-50 border border-zinc-100 rounded-2xl px-5 py-4 text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <Link
              href="/admin"
              className="w-full flex items-center justify-center bg-zinc-900 text-white hover:bg-zinc-800 active:scale-[0.98] py-4 rounded-2xl text-base font-black transition-all shadow-xl shadow-zinc-900/10"
            >
              Sign In to Portal
            </Link>
          </form>

          <div className="mt-10 pt-8 border-t border-zinc-50 text-center">
            <p className="text-sm text-zinc-500 font-medium">
              Don't have an account?{" "}
              <Link href="/" className="text-accent font-bold hover:underline">
                Get Started
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-12 text-center text-xs text-zinc-400 font-medium uppercase tracking-widest">
          Sleek B2B SaaS Interface • NearBuy Platform
        </p>
      </div>
    </div>
  );
}
