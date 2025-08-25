"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type Vendor = {
    id: number;
    stall_name: string;
    type: string;
    description: string;
    image_url: string;
  };
export default function ShopPage() {
  const router = useRouter();
  type User = {
    name: string;
    email: string;
  };
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [vendors, setVendors] = useState<Vendor[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");

  // Dropdown state
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const notifCloseTimer = useRef<number | null>(null);
  const userCloseTimer = useRef<number | null>(null);

  const openNotif = () => {
    if (notifCloseTimer.current) window.clearTimeout(notifCloseTimer.current);
    setIsNotifOpen(true);
  };
  const scheduleCloseNotif = () => {
    if (notifCloseTimer.current) window.clearTimeout(notifCloseTimer.current);
    notifCloseTimer.current = window.setTimeout(() => setIsNotifOpen(false), 150);
  };
  const openUserMenu = () => {
    if (userCloseTimer.current) window.clearTimeout(userCloseTimer.current);
    setIsUserMenuOpen(true);
  };
  const scheduleCloseUser = () => {
    if (userCloseTimer.current) window.clearTimeout(userCloseTimer.current);
    userCloseTimer.current = window.setTimeout(() => setIsUserMenuOpen(false), 150);
  };

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then(async (res) => {
        if (!res.ok) {
          router.push("/login");
          return;
        }
        const data = await res.json();
        setUser(data);
      })
      .finally(() => setLoading(false));
  }, [router]);
  
  // Fetch Vendors
  useEffect(() => {
    fetch("/api/vendors")
      .then((res) => res.json())
      .then((data) => setVendors(data))
      .catch(() => {
        console.error("Failed to load vendors");
      });
  }, []);

  const vendorTypes = useMemo(() => {
    const types = Array.from(new Set(vendors.map(v => v.type).filter(Boolean)));
    return ["All", ...types];
  }, [vendors]);

  const filteredVendors = useMemo(() => {
    return vendors.filter((v) => {
      const matchesType = selectedType === "All" || v.type === selectedType;
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch = term.length === 0 ||
        v.stall_name.toLowerCase().includes(term) ||
        (v.description || "").toLowerCase().includes(term) ||
        (v.type || "").toLowerCase().includes(term);
      return matchesType && matchesSearch;
    });
  }, [vendors, selectedType, searchTerm]);
    
  if (loading) return <p className="text-center mt-10 text-slate-300">Loading...</p>;
  if (!user) return null;

  const userInitials = (user?.name || "User").split(" ").map(n => n[0]).slice(0,2).join("").toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Ocean Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-400/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-indigo-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        {/* Diagonal Light Rays */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-1/4 w-0.5 h-96 bg-gradient-to-br from-cyan-400/30 via-white/40 to-transparent rotate-12"></div>
          <div className="absolute top-0 right-1/4 w-0.5 h-80 bg-gradient-to-br from-blue-400/30 via-white/40 to-transparent -rotate-12"></div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/70 backdrop-blur-md border-b border-slate-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">L</span>
              </div>
              <span className="text-white font-semibold">LocalMart</span>
            </Link>

            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-800/70 border border-slate-600/60 rounded-xl pl-11 pr-4 py-2.5 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-400/50"
                  placeholder="Search stalls, types, or items..."
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Notifications */}
            <div
              className="relative"
              onMouseEnter={openNotif}
              onMouseLeave={scheduleCloseNotif}
            >
              <button
                aria-haspopup="menu"
                aria-expanded={isNotifOpen}
                onClick={() => setIsNotifOpen((v) => !v)}
                className="relative p-2 rounded-lg hover:bg-slate-800/70 border border-slate-700/60 text-slate-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-rose-500 text-white text-[10px]">3</span>
              </button>
              {/* Notification Dropdown */}
              <div className={`${isNotifOpen ? 'block' : 'hidden'} absolute right-0 mt-2 w-80 bg-slate-900/95 border border-slate-700/60 rounded-xl shadow-xl z-50`}
                onMouseEnter={openNotif}
                onMouseLeave={scheduleCloseNotif}
                role="menu"
              >
                <div className="px-4 py-3 border-b border-slate-700/60">
                  <span className="text-slate-200 text-sm font-semibold">Notifications</span>
                </div>
                <ul className="max-h-80 overflow-auto">
                  <li className="px-4 py-3 hover:bg-slate-800/70 cursor-pointer">
                    <p className="text-slate-200 text-sm">Order #A123 is out for delivery</p>
                    <p className="text-slate-400 text-xs mt-1">2 mins ago</p>
                  </li>
                  <li className="px-4 py-3 hover:bg-slate-800/70 cursor-pointer">
                    <p className="text-slate-200 text-sm">New promo from Fresh Meat Vendors</p>
                    <p className="text-slate-400 text-xs mt-1">1 hour ago</p>
                  </li>
                  <li className="px-4 py-3 hover:bg-slate-800/70 cursor-pointer">
                    <p className="text-slate-200 text-sm">Your wallet was updated</p>
                    <p className="text-slate-400 text-xs mt-1">Yesterday</p>
                  </li>
                </ul>
                <div className="px-4 py-2 border-t border-slate-700/60 text-right">
                  <button className="text-cyan-300 text-xs hover:text-cyan-200">View all</button>
                </div>
              </div>
            </div>

            {/* User Menu */}
            <div
              className="relative"
              onMouseEnter={openUserMenu}
              onMouseLeave={scheduleCloseUser}
            >
              <button
                aria-haspopup="menu"
                aria-expanded={isUserMenuOpen}
                onClick={() => setIsUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-800/70 border border-slate-700/60"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center text-xs font-bold">
                  {userInitials}
                </div>
                <span className="hidden sm:block text-slate-200 text-sm font-medium truncate max-w-[140px]">{user?.name}</span>
              </button>
              {/* User Dropdown */}
              <div className={`${isUserMenuOpen ? 'block' : 'hidden'} absolute right-0 mt-2 w-48 bg-slate-900/95 border border-slate-700/60 rounded-xl shadow-xl z-50`}
                onMouseEnter={openUserMenu}
                onMouseLeave={scheduleCloseUser}
                role="menu"
              >
                <div className="px-4 py-3 border-b border-slate-700/60">
                  <p className="text-slate-200 text-sm font-semibold truncate">{user?.name}</p>
                  <p className="text-slate-400 text-xs truncate">{user?.email}</p>
                </div>
                <ul className="py-1">
                  <li>
                    <Link href="#" className="block px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800/70">My Account</Link>
                  </li>
                  <li>
                    <Link href="#" className="block px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800/70">My Orders</Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        router.push("/login");
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-rose-300 hover:bg-slate-800/70"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {vendorTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-1.5 rounded-full border text-sm transition-all ${
                  selectedType === type
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                    : 'bg-slate-800/60 text-slate-300 border-slate-600/60 hover:border-cyan-400/30 hover:text-cyan-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Intro */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Shop local vendors</h1>
              <p className="text-slate-300 mt-2">Discover stalls from your palengke and sari-sari stores.</p>
            </div>

            {/* Vendor Grid */}
            {filteredVendors.length === 0 ? (
              <div className="text-center py-20 text-slate-300">No stalls match your search.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVendors.map((vendor) => (
                  <div key={vendor.id} className="group bg-slate-900/60 border border-slate-700/60 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                    <div className="relative h-48">
                      <Image
                        className="object-cover object-center"
                        src={vendor.image_url ?? "/placeholder.png"}
                        alt={vendor.stall_name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-semibold text-lg leading-tight">{vendor.stall_name}</h3>
                          <p className="text-cyan-300 text-xs mt-0.5">{vendor.type}</p>
                        </div>
                        <span className="px-2 py-1 text-[10px] rounded-full border border-cyan-400/40 text-cyan-300 bg-cyan-500/10">Open</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-slate-300 text-sm line-clamp-3 min-h-[3.75rem]">{vendor.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <button
                          onClick={() => router.push(`/shop/vendors/${vendor.id}`)}
                          className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 transition-colors"
                        >
                          View Stall
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/80 border-t border-slate-700/60 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-bold">L</span>
                </div>
                <span className="text-slate-200 font-semibold">LocalMart</span>
              </div>
              <p className="text-slate-400 text-sm">Shop local, support community. Fresh goods from your trusted neighborhood vendors.</p>
            </div>

            <div>
              <h4 className="text-slate-200 font-semibold mb-3">For Customers</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="#" className="hover:text-cyan-300">Browse Stalls</Link></li>
                <li><Link href="#" className="hover:text-cyan-300">Track Orders</Link></li>
                <li><Link href="#" className="hover:text-cyan-300">Payment Methods</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-slate-200 font-semibold mb-3">For Vendors</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="#" className="hover:text-cyan-300">Become a Vendor</Link></li>
                <li><Link href="#" className="hover:text-cyan-300">Manage Products</Link></li>
                <li><Link href="#" className="hover:text-cyan-300">Payouts</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-slate-200 font-semibold mb-3">Contact</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>Barangay Market Center</li>
                <li>Email: support@localmart.app</li>
                <li>Phone: +63 900 000 0000</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-700/60 flex items-center justify-between text-slate-400 text-xs">
            <span>© 2024 LocalMart. All rights reserved.</span>
            <div className="space-x-4">
              <Link href="#" className="hover:text-cyan-300">Privacy</Link>
              <Link href="#" className="hover:text-cyan-300">Terms</Link>
              <Link href="#" className="hover:text-cyan-300">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
