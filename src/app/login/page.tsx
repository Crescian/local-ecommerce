"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // Login successful, token is in httpOnly cookie
        router.push("/dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch {
      setError("Network error");
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

      {/* Login Form Container */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-slate-800/60 backdrop-blur-md border border-slate-600/50 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-slate-300">Sign in to your LocalMart account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl mb-6 text-center">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 transition-all duration-200"
                placeholder="Enter your email"
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
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 transition-all duration-200"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-slate-600/50">
            <p className="text-slate-300">
              {`Don't have an account?`}{" "}
              <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
