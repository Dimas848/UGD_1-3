"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Lock, ShieldCheck, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    alert("Authorization granted. Redirecting to command center...");
  };

  return (
    <main className="min-h-screen bg-[#0a0a0c] flex items-center justify-center relative px-6 overflow-hidden">
      
      {/* TOMBOL KEMBALI KE HOME */}
      <div className="absolute top-8 left-8 z-20">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-white/50 hover:text-[#BDF4FF] transition-colors font-grotesk text-[12px] uppercase tracking-[1.5px]"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>

      {/* ELEMEN HUD POJOKAN */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-[#B026FF]/40 opacity-50 hidden md:block pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-20 h-20 border-b border-l border-[#B026FF]/40 opacity-50 hidden md:block pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-20 h-20 border-t border-r border-[#B026FF]/40 opacity-50 hidden md:block pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-[#B026FF]/40 opacity-50 hidden md:block pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[400px] z-10"
      >
        {/* BAGIAN LOGO & JUDUL DIPERBESAR DAN DIMEPETKAN */}
        <div className="flex flex-col items-center mb-10">
          <Image
            src="/logo.png"
            alt="Maju Fleet Logo"
            width={180} // Ukuran diperbesar
            height={180}
            className="mb-0 opacity-100 drop-shadow-[0_0_15px_rgba(176,38,255,0.3)] -mr-4" // Margin bawah dihapus, gambar ditarik
          />
          <h1 className="text-white font-grotesk font-bold text-3xl tracking-[4px] uppercase mt-[-10px]"> {/* mt-minus untuk menarik teks ke atas mendekati logo */}
            Maju Fleet
          </h1>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div>
            <label className="text-white/80 font-grotesk text-[10px] uppercase tracking-[2px] mb-3 block">
              Username
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-80">
                <User size={18} />
              </div>
              <input
                type="text"
                required
                placeholder="Enter Crew ID..."
                className="w-full bg-[#0d0d11] border border-[#B026FF]/30 rounded-md px-12 py-4 text-white font-inter text-[14px] placeholder-white/30 focus:outline-none focus:border-[#B026FF] transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label className="text-white/80 font-grotesk text-[10px] uppercase tracking-[2px] mb-3 block">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-80">
                <Lock size={18} />
              </div>
              <input
                type="password"
                required
                placeholder="Enter security key..."
                className="w-full bg-[#0d0d11] border border-[#B026FF]/30 rounded-md px-12 py-4 text-white font-inter text-[14px] placeholder-white/30 focus:outline-none focus:border-[#B026FF] transition-all duration-300"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-4 rounded-md border border-[#B026FF]/50 bg-[#0d0d11] hover:bg-[#B026FF]/10 hover:border-[#B026FF] hover:shadow-[0_0_20px_rgba(176,38,255,0.2)] text-white font-grotesk font-bold text-[13px] uppercase tracking-[3px] transition-all duration-300"
          >
            {loading ? "Authenticating..." : "System Login"}
          </button>
        </form>

        <div className="mt-10 flex items-center justify-center gap-2 text-[#B026FF]/60">
          <ShieldCheck size={14} />
          <span className="font-mono text-[10px] uppercase tracking-[1.5px]">
            Secure Connection
          </span>
        </div>
      </motion.div>
    </main>
  );
}