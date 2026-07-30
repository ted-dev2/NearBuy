"use client";

import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { Venue } from "@/types/database";

export default function AdminQRPage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    async function fetchVenues() {
      const { data, error } = await supabase
        .from("venues")
        .select("*")
        .order("name");
      
      if (!error && data) {
        setVenues(data);
      }
      setLoading(false);
    }
    fetchVenues();
  }, [supabase]);

  const downloadQR = (slug: string) => {
    const canvas = document.getElementById(`qr-${slug}`) as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `qr-${slug}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg animate-pulse">Loading venues...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-zinc-900">Admin: QR Code Generator</h1>
            <p className="text-zinc-600 mt-2">Generate and download QR codes for physical table placement.</p>
          </div>
        </div>

        {venues.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border-2 border-dashed border-zinc-200">
            <p className="text-zinc-500 text-lg">No venues found in the database.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {venues.map((venue) => (
              <div 
                key={venue.id} 
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-zinc-100 overflow-hidden flex flex-col items-center p-8"
              >
                <div className="w-full text-center mb-6">
                  <h2 className="text-2xl font-bold text-zinc-800 truncate px-2">{venue.name}</h2>
                  <p className="text-sm text-accent font-medium">/{venue.slug}</p>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-zinc-100 shadow-inner mb-8 bg-gradient-to-br from-white to-stone-50">
                  <QRCodeCanvas
                    id={`qr-${venue.slug}`}
                    value={`https://near-buy-azure.vercel.app/shop/${venue.slug}`}
                    size={240}
                    level={"H"}
                    includeMargin={true}
                  />
                </div>

                <button
                  onClick={() => downloadQR(venue.slug)}
                  className="w-full bg-zinc-900 text-white py-3 px-6 rounded-xl font-semibold hover:bg-zinc-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download PNG
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
