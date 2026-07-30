import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
