"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
        const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Signup successful! You can now login.");
      } else {
        setMessage("❌ " + data.error);
      }
    } catch {
      setMessage("⚠️ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden flex items-center justify-center">
      {/* Lightning Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-400/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-indigo-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Lightning Effects */}
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
      </div>

      {/* Navigation Header */}
      <header className="absolute top-0 left-0 right-0 z-50 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo/Branding */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="text-xl font-bold text-white">LocalMart</span>
            </Link>
            
            {/* Back to Home */}
            <Link 
              href="/"
              className="text-slate-300 hover:text-cyan-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-600/50 hover:border-cyan-400/50"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Signup Form Container */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-slate-800/60 backdrop-blur-md border border-slate-600/50 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Join LocalMart</h1>
            <p className="text-slate-300">Create your account and start shopping local</p>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`px-4 py-3 rounded-xl mb-6 text-center text-sm ${
              message.includes("✅") 
                ? "bg-green-500/20 border border-green-500/30 text-green-300" 
                : message.includes("❌") 
                ? "bg-red-500/20 border border-red-500/30 text-red-300"
                : "bg-yellow-500/20 border border-yellow-500/30 text-yellow-300"
            }`}>
              {message}
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 transition-all duration-200"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 transition-all duration-200"
                placeholder="Create a strong password"
                required
              />
              <p className="text-xs text-slate-400 mt-2">
                Password should be at least 8 characters long
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Create Account
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-slate-600/50">
            <p className="text-slate-300">
              Already have an account?{" "}
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                Sign in here
              </Link>
            </p>
          </div>

          {/* Benefits */}
          <div className="mt-8 pt-6 border-t border-slate-600/50">
            <h3 className="text-sm font-medium text-slate-300 mb-3 text-center">Why join LocalMart?</h3>
            <div className="grid grid-cols-1 gap-2 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>Shop from local vendors</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>Fast same-day delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>Support your community</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
