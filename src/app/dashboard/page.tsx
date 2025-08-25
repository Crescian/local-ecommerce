"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
type Vendor = {
    id: number;
    stall_name: string;
    type: string;
    description: string;
    image_url: string;
  };
export default function DashboardPage() {
  const router = useRouter();
  type User = {
    name: string;
    email: string;
  };
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [vendors, setVendors] = useState<Vendor[]>([]);

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
    
    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
            <a className="mr-5 hover:text-white cursor-pointer">Shop</a>
            <a className="mr-5 hover:text-white cursor-pointer">My Orders</a>
            <a className="mr-5 hover:text-white cursor-pointer">Wallet</a>
            <a className="hover:text-white cursor-pointer">Contact / Support</a>
          </nav>
          <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-white lg:items-center lg:justify-center mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl xl:block lg:hidden">Local E-Commerce</span>
          </a>
          <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/login");
              }}
              className="inline-flex items-center bg-red-600 border-0 py-1 px-3 focus:outline-none hover:bg-red-500 rounded text-base mt-4 md:mt-0 text-white"
            >
              Logout
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      
      {/* Main Content */}
      <main>
        <section className="text-gray-400 bg-gray-900 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col">
              <div className="h-1 bg-gray-800 rounded overflow-hidden">
                <div className="w-24 h-full bg-indigo-500"></div>
              </div>
              <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
                <div className="sm:w-2/5 text-white font-medium title-font text-2xl mb-2 sm:mb-0">
                  <h1>Welcome, {user?.name}</h1>
                </div>
                <p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">
                  Welcome sa aming online sari-sari store — ang inyong kapitbahay na tindahan sa dig  ital mundo. 
                  Dito, makakabili ka ng mga pang-araw-araw na kailangan: mula sa bigas, kape, de-lata, chichirya, hanggang sa load at softdrinks.
                </p>
              </div>
            </div>

            {/* Vendor Cards */}
            <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
              {vendors.map((vendor) => (
                <div key={vendor.id} className="p-4 md:w-1/3 sm:mb-0 mb-6">
                  <div className="rounded-lg h-64 overflow-hidden">
                  <Image className="object-cover object-center h-full w-full"
                    src={vendor.image_url ?? "/placeholder.png"} 
                    alt={vendor.stall_name} 
                    width={300} 
                    height={200} 
                  />
                  </div>
                  <h2 className="text-xl font-medium title-font text-white mt-5">
                    {vendor.stall_name}
                  </h2>
                  <p className="text-indigo-300 text-sm">{vendor.type}</p>
                  <p className="text-base leading-relaxed mt-2">
                    {vendor.description}
                  </p>
                  <a className="text-indigo-400 inline-flex items-center mt-3 cursor-pointer">
                    Learn More
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
            <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <span className="ml-3 text-xl">Tailblocks</span>
            </a>
            <p className="mt-2 text-sm text-gray-500">Air plant banjo lyft occupy retro adaptogen indego</p>
            </div>
            <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">CATEGORIES</h2>
                <nav className="list-none mb-10">
                <li>
                    <a className="text-gray-400 hover:text-white">First Link</a>
                </li>
                <li>
                    <a className="text-gray-400 hover:text-white">Second Link</a>
                </li>
                <li>
                    <a className="text-gray-400 hover:text-white">Third Link</a>
                </li>
                <li>
                    <a className="text-gray-400 hover:text-white">Fourth Link</a>
                </li>
                </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">CATEGORIES</h2>
                <nav className="list-none mb-10">
                <li>
                    <a className="text-gray-400 hover:text-white">First Link</a>
                </li>
                <li>
                    <a className="text-gray-400 hover:text-white">Second Link</a>
                </li>
                <li>
                    <a className="text-gray-400 hover:text-white">Third Link</a>
                </li>
                <li>
                    <a className="text-gray-400 hover:text-white">Fourth Link</a>
                </li>
                </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">CATEGORIES</h2>
                <nav className="list-none mb-10">
                <li>
                    <a className="text-gray-400 hover:text-white">First Link</a>
                </li>
                <li>
                    <a className="text-gray-400 hover:text-white">Second Link</a>
                </li>
                <li>
                    <a className="text-gray-400 hover:text-white">Third Link</a>
                </li>
                <li>
                    <a className="text-gray-400 hover:text-white">Fourth Link</a>
                </li>
                </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">CATEGORIES</h2>
                <nav className="list-none mb-10">
                <li>
                    <a className="text-gray-400 hover:text-white">First Link</a>
                </li>
                <li>
                    <a className="text-gray-400 hover:text-white">Second Link</a>
                </li>
                <li>
                    <a className="text-gray-400 hover:text-white">Third Link</a>
                </li>
                <li>
                    <a className="text-gray-400 hover:text-white">Fourth Link</a>
                </li>
                </nav>
            </div>
            </div>
        </div>
        <div className="bg-gray-800 bg-opacity-75">
            <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-400 text-sm text-center sm:text-left">© 2020 Tailblocks —
                <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" className="text-gray-500 ml-1" target="_blank">@knyttneve</a>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                <a className="text-gray-400">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
                </a>
                <a className="ml-3 text-gray-400">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
                </a>
                <a className="ml-3 text-gray-400">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
                </a>
                <a className="ml-3 text-gray-400">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                    <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                    <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
                </a>
            </span>
            </div>
        </div>
        </footer>
    </div>

    
  );
}
