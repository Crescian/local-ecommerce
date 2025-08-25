"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const mobileMenu = document.getElementById('mobile-menu');
      const hamburgerButton = document.querySelector('[data-hamburger]');
      
      if (mobileMenu && hamburgerButton && !hamburgerButton.contains(event.target as Node) && !mobileMenu.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleNavLinkClick = () => {
      setIsMobileMenuOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    
    const mobileNavLinks = document.querySelectorAll('#mobile-menu a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', handleNavLinkClick);
    });

    return () => {
      document.removeEventListener('click', handleClickOutside);
      mobileNavLinks.forEach(link => {
        link.removeEventListener('click', handleNavLinkClick);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Ocean Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-400/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-indigo-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Dynamic Navigation Header */}
      <header className="relative z-50 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-3">
            {/* Left Side - Logo/Branding */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">L</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-white">LocalMart</span>
                <p className="text-xs text-cyan-300 -mt-1">Local Community</p>
              </div>
            </div>

            {/* Center - Dynamic Island (Hidden on Mobile) */}
            <div className="hidden lg:block bg-slate-800/60 backdrop-blur-md border border-slate-600/50 rounded-full px-8 py-3 shadow-2xl">
              <div className="flex items-center space-x-8">
                <Link 
                  href="/"
                  className="text-cyan-400 font-semibold text-sm px-4 py-2 bg-cyan-500/20 rounded-full border border-cyan-400/30"
                >
                  Home
                </Link>
                <a href="#how-it-works" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm px-4 py-2">
                  How It Works
                </a>
                <a href="#categories" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm px-4 py-2">
                  Categories
                </a>
                <a href="#about" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm px-4 py-2">
                  About
                </a>
              </div>
            </div>

            {/* Right Side - Auth Buttons (Hidden on Mobile) */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link 
                href="/login"
                className="text-slate-300 hover:text-cyan-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/signup"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="lg:hidden">
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                data-hamburger
                className="text-slate-300 hover:text-cyan-400 p-2 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div id="mobile-menu" className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} mt-4 bg-slate-800/90 backdrop-blur-md border border-slate-600/50 rounded-2xl p-6 shadow-2xl`}>
            <div className="space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-3">
                <Link 
                  href="/"
                  className="block text-cyan-400 font-semibold text-base px-4 py-3 bg-cyan-500/20 rounded-xl border border-cyan-400/30"
                >
                  Home
                </Link>
                <a href="#how-it-works" className="block text-slate-300 hover:text-cyan-400 transition-colors text-base px-4 py-3 rounded-xl hover:bg-slate-700/50">
                  How It Works
                </a>
                <a href="#categories" className="block text-slate-300 hover:text-cyan-400 transition-colors text-base px-4 py-3 rounded-xl hover:bg-slate-700/50">
                  Categories
                </a>
                <a href="#about" className="block text-slate-300 hover:text-cyan-400 transition-colors text-base px-4 py-3 rounded-xl hover:bg-slate-700/50">
                  About
                </a>
              </div>
              
              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-slate-600/50 space-y-3">
                <Link 
                  href="/login"
                  className="block text-slate-300 hover:text-cyan-400 px-4 py-3 rounded-xl text-base font-medium transition-colors hover:bg-slate-700/50 text-center"
                >
                  Login
                </Link>
                <Link 
                  href="/signup"
                  className="block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-3 rounded-xl text-base font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg text-center"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Dynamic Lighting Effects */}
        <div className="absolute inset-0">
          {/* Lightning Effect */}
          <div className="absolute top-20 left-1/4 w-1 h-32 bg-gradient-to-b from-cyan-300 via-white to-transparent opacity-60 animate-pulse"></div>
          <div className="absolute top-32 left-1/3 w-1 h-24 bg-gradient-to-b from-blue-300 via-white to-transparent opacity-50 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-16 right-1/3 w-1 h-28 bg-gradient-to-b from-indigo-300 via-white to-transparent opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
          
          {/* Diagonal Light Rays */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 left-1/4 w-0.5 h-96 bg-gradient-to-br from-cyan-400/40 via-white/60 to-transparent transform rotate-12 animate-pulse"></div>
            <div className="absolute top-0 right-1/4 w-0.5 h-80 bg-gradient-to-br from-blue-400/40 via-white/50 to-transparent transform -rotate-12 animate-pulse" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute top-20 left-1/2 w-0.5 h-72 bg-gradient-to-br from-indigo-400/40 via-white/70 to-transparent transform rotate-6 animate-pulse" style={{animationDelay: '3s'}}></div>
          </div>
          
          {/* Floating Light Particles */}
          <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-cyan-300 rounded-full animate-bounce opacity-80"></div>
          <div className="absolute top-1/3 right-1/5 w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce opacity-60" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-1/2 left-1/5 w-1 h-1 bg-indigo-300 rounded-full animate-bounce opacity-70" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-2/3 right-1/4 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce opacity-50" style={{animationDelay: '1.5s'}}></div>
          
          {/* Horizontal Light Beams */}
          <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent animate-pulse"></div>
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-300/20 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-3/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-300/25 to-transparent animate-pulse" style={{animationDelay: '3s'}}></div>
          
          {/* Corner Light Flares */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 via-transparent to-transparent"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-400/20 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-indigo-400/15 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-36 h-36 bg-gradient-to-tl from-cyan-400/15 via-transparent to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center space-y-8">
            <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight">
              Your Local
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Community Market
              </span>
              Online
            </h1>
            <p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mx-auto">
              Connect with your neighborhood vendors, order fresh produce, and support local businesses. 
              From sari-sari stores to palengke favorites - all delivered to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/signup"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-5 rounded-2xl text-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-2xl hover:shadow-cyan-500/25 transform hover:-translate-y-1"
              >
                Start Shopping Now
              </Link>
              <Link 
                href="#how-it-works"
                className="border-2 border-slate-400 text-slate-300 px-10 py-5 rounded-2xl text-xl font-semibold hover:border-cyan-400 hover:text-cyan-400 transition-all duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose LocalMart?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Supporting local businesses while enjoying the convenience of online shopping
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-600/40 border border-slate-600/50 backdrop-blur-sm shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Support Local</h3>
              <p className="text-slate-300 text-lg">Help your neighborhood vendors grow their business</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-600/40 border border-slate-600/50 backdrop-blur-sm shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Fast Delivery</h3>
              <p className="text-slate-300 text-lg">Same-day delivery from trusted local vendors</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-600/40 border border-slate-600/50 backdrop-blur-sm shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Fresh Products</h3>
              <p className="text-slate-300 text-lg">Quality goods from your trusted community vendors</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-800/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Simple steps from browsing to delivery
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Customer Flow */}
            <div className="bg-slate-700/60 p-6 rounded-2xl shadow-lg border border-slate-600/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Customer Orders</h3>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>{`• Browse categories`}</li>
                <li>{`• Add items to cart`}</li>
                <li>{`• Choose payment method`}</li>
                <li>{`• Get delivery confirmation`}</li>
              </ul>
            </div>

            {/* Vendor Flow */}
            <div className="bg-slate-700/60 p-6 rounded-2xl shadow-lg border border-slate-600/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Vendor Prepares</h3>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>{`• Receive order notification`}</li>
                <li>{`• Check stock availability`}</li>
                <li>{`• Prepare items`}</li>
                <li>{`• Confirm order ready`}</li>
              </ul>
            </div>

            {/* Delivery Flow */}
            <div className="bg-slate-700/60 p-6 rounded-2xl shadow-lg border border-slate-600/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Delivery</h3>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>{`• Pick up from vendors`}</li>
                <li>{`• Consolidate orders`}</li>
                <li>{`• Deliver to customer`}</li>
                <li>{`• Handle payment collection`}</li>
              </ul>
            </div>

            {/* System Flow */}
            <div className="bg-slate-700/60 p-6 rounded-2xl shadow-lg border border-slate-600/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-lg">4</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">System Management</h3>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>{`• Order management`}</li>
                <li>{`• Payment tracking`}</li>
                <li>{`• Commission handling`}</li>
                <li>{`• Delivery dispatching`}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section id="categories" className="py-20 bg-slate-900/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Everything you need from your local community
            </p>
          </div>

          <div className="relative">
            {/* Carousel Container */}
            <div className="flex overflow-hidden">
              <div className="flex animate-scroll">
                {[
                  { name: "Sari-Sari Store", icon: "🏪", color: "from-orange-400 to-red-500" },
                  { name: "Fresh Meat", icon: "🥩", color: "from-red-400 to-pink-500" },
                  { name: "Fish & Seafood", icon: "🐟", color: "from-blue-400 to-cyan-500" },
                  { name: "Vegetables", icon: "🥬", color: "from-green-400 to-emerald-500" },
                  { name: "Fruits", icon: "🍎", color: "from-yellow-400 to-orange-500" },
                  { name: "Dairy & Eggs", icon: "🥛", color: "from-purple-400 to-pink-500" },
                  { name: "Bread & Pastries", icon: "🥖", color: "from-amber-400 to-yellow-500" },
                  { name: "Household Items", icon: "🏠", color: "from-gray-400 to-slate-500" },
                  // Duplicate items for seamless loop
                  { name: "Sari-Sari Store", icon: "🏪", color: "from-orange-400 to-red-500" },
                  { name: "Fresh Meat", icon: "🥩", color: "from-red-400 to-pink-500" },
                  { name: "Fish & Seafood", icon: "🐟", color: "from-blue-400 to-cyan-500" },
                  { name: "Vegetables", icon: "🥬", color: "from-green-400 to-emerald-500" },
                  { name: "Fruits", icon: "🍎", color: "from-yellow-400 to-orange-500" },
                  { name: "Dairy & Eggs", icon: "🥛", color: "from-purple-400 to-pink-500" },
                  { name: "Bread & Pastries", icon: "🥖", color: "from-amber-400 to-yellow-500" },
                  { name: "Household Items", icon: "🏠", color: "from-gray-400 to-slate-500" }
                ].map((category, index) => (
                  <div key={index} className="flex-shrink-0 w-48 mx-2">
                    <div className={`bg-gradient-to-br ${category.color} p-6 rounded-2xl text-center text-white shadow-lg`}>
                      <div className="text-4xl mb-3">{category.icon}</div>
                      <h3 className="font-semibold text-sm">{category.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-800/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              About LocalMart
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Empowering local communities through digital commerce
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Our Mission
              </h3>
              <p className="text-slate-300 leading-relaxed">
                LocalMart is dedicated to bridging the gap between traditional local markets and modern e-commerce. 
                We believe that every neighborhood vendor deserves a digital presence and every customer deserves 
                access to fresh, local products delivered to their doorstep.
              </p>
              <p className="text-slate-300 leading-relaxed">
                {`By connecting customers with trusted local vendors, we're not just facilitating transactions – 
                we're building stronger, more connected communities where local businesses can thrive in the digital age.`}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 rounded-2xl bg-slate-700/40 border border-slate-600/30">
                <div className="text-4xl mb-3">🏪</div>
                <h4 className="text-lg font-semibold text-white mb-2">Local Vendors</h4>
                <p className="text-sm text-slate-300">Supporting neighborhood businesses</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-slate-700/40 border border-slate-600/30">
                <div className="text-4xl mb-3">🚚</div>
                <h4 className="text-lg font-semibold text-white mb-2">Fast Delivery</h4>
                <p className="text-sm text-slate-300">Same-day local delivery</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-slate-700/40 border border-slate-600/30">
                <div className="text-4xl mb-3">💳</div>
                <h4 className="text-lg font-semibold text-white mb-2">Secure Payments</h4>
                <p className="text-sm text-slate-300">Multiple payment options</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-slate-700/40 border border-slate-600/30">
                <div className="text-4xl mb-3">🤝</div>
                <h4 className="text-lg font-semibold text-white mb-2">Community</h4>
                <p className="text-sm text-slate-300">Building stronger neighborhoods</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-900 relative">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Shop Local?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of customers supporting their local community vendors
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Create Account
            </Link>
            <Link 
              href="/login"
              className="border-2 border-slate-400 text-slate-300 px-8 py-4 rounded-xl text-lg font-semibold hover:border-cyan-400 hover:text-cyan-400 transition-all duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                <span className="text-xl font-bold">LocalMart</span>
              </div>
              <p className="text-slate-400">
                Connecting communities through local commerce
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Customers</h3>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/signup" className="hover:text-cyan-400 transition-colors">Create Account</Link></li>
                <li><Link href="/login" className="hover:text-cyan-400 transition-colors">Sign In</Link></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Browse Products</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Track Orders</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Vendors</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Register Store</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Upload Products</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Manage Orders</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">View Analytics</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 LocalMart. All rights reserved. Supporting local communities.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
