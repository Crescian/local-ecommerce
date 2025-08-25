"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  name: string | null;
  description: string | null;
  unit: string | null;
  price: string | null;
  image_url: string | null;
  is_available: boolean | null;
};

type VendorWithProducts = {
  id: number;
  stall_name: string | null;
  description: string | null;
  type: string | null;
  image_url: string | null;
  Products: Product[];
};

export default function VendorPage() {
  const params = useParams();
  const router = useRouter();

  const vendorId = Number(params?.id);

  const [vendor, setVendor] = useState<VendorWithProducts | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!Number.isFinite(vendorId)) return;
    setLoading(true);
    fetch(`/api/vendors/${vendorId}`)
      .then((res) => res.json())
      .then((data) => setVendor(data))
      .finally(() => setLoading(false));
  }, [vendorId]);

  const filteredProducts = useMemo(() => {
    if (!vendor) return [] as Product[];
    const term = search.trim().toLowerCase();
    if (!term) return vendor.Products;
    return vendor.Products.filter((p) => {
      const name = (p.name || "").toLowerCase();
      const desc = (p.description || "").toLowerCase();
      const unit = (p.unit || "").toLowerCase();
      return name.includes(term) || desc.includes(term) || unit.includes(term);
    });
  }, [vendor, search]);

  if (!Number.isFinite(vendorId)) {
    return <div className="p-6 text-slate-200">Invalid vendor.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <header className="sticky top-0 z-40 bg-slate-900/70 backdrop-blur-md border-b border-slate-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="px-3 py-2 rounded-lg border border-slate-600/60 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40"
            >
              ← Back
            </button>
            <Link href="/shop" className="text-slate-300 hover:text-cyan-300">All Stalls</Link>
            <div className="flex-1" />
            {/* Search stays above */}
            <div className="w-full max-w-md">
              <div className="relative">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-800/70 border border-slate-600/60 rounded-xl pl-11 pr-4 py-2.5 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-400/50"
                  placeholder="Search products..."
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative">
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-slate-300">Loading stall...</div>
            ) : !vendor ? (
              <div className="text-slate-300">Stall not found.</div>
            ) : (
              <>
                {/* Stall banner */}
                <div className="bg-slate-900/60 border border-slate-700/60 rounded-2xl overflow-hidden shadow-xl">
                  <div className="relative h-56">
                    <Image
                      src={vendor.image_url || "/placeholder.png"}
                      alt={vendor.stall_name || "Stall"}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div>
                        <h1 className="text-white text-2xl font-semibold">{vendor.stall_name}</h1>
                        <p className="text-cyan-300 text-sm">{vendor.type}</p>
                      </div>
                      <span className="px-2 py-1 text-[10px] rounded-full border border-cyan-400/40 text-cyan-300 bg-cyan-500/10">Open</span>
                    </div>
                  </div>
                  {vendor.description && (
                    <div className="p-4 text-slate-300 text-sm">{vendor.description}</div>
                  )}
                </div>

                {/* Products */}
                <div className="mt-8">
                  {filteredProducts.length === 0 ? (
                    <div className="text-slate-300">No products match your search.</div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProducts.map((p) => (
                        <div key={p.id} className="bg-slate-900/60 border border-slate-700/60 rounded-2xl overflow-hidden">
                          <div className="relative h-44">
                            <Image
                              src={p.image_url || "/placeholder.png"}
                              alt={p.name || "Product"}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-white font-semibold">{p.name}</h3>
                            {p.unit && <p className="text-slate-400 text-xs mt-0.5">{p.unit}</p>}
                            {p.description && (
                              <p className="text-slate-300 text-sm mt-2 line-clamp-2">{p.description}</p>
                            )}
                            <div className="mt-3 flex items-center justify-between">
                              <span className="text-cyan-300 font-semibold">₱{p.price}</span>
                              <button className="px-3 py-2 rounded-lg text-sm font-medium border border-slate-600/60 text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300 transition-colors">
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}


