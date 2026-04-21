"use client";

import { useState } from "react";
import { User, Lock, ShieldAlert, X, ArrowLeft, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleOverride = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Dummy loading process
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    alert("Login Authorized. Accessing Command Center...");
  };

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center relative px-6 font-inter overflow-hidden selection:bg-[#B026FF] selection:text-white">
      
      {/* Background glow ungu halus */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         <div className="w-[500px] h-[500px] bg-[#B026FF]/5 rounded-full blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-[420px] bg-[#0a0a0c] border border-white/5 rounded-xl p-8 relative z-10 shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
        style={{ borderTop: "3px solid #B026FF" }}
      >
        {/* Tombol Silang Pojok Kanan Atas */}
        <button className="absolute top-5 right-5 text-white/30 hover:text-white transition-colors outline-none">
          <X size={20} strokeWidth={1.5} />
        </button>

        {/* Shield Icon Ungu */}
        <div className="flex justify-center mb-6 mt-4">
          <div className="text-[#B026FF]">
            <ShieldAlert size={48} strokeWidth={1.5} />
          </div>
        </div>

        {/* Judul ADMINISTRATOR OVERRIDE */}
        <h1 className="text-center text-white font-grotesk font-bold text-[20px] tracking-[4px] uppercase mb-10 leading-[1.4]">
          ADMINISTRATOR<br />OVERRIDE
        </h1>

        <form onSubmit={handleOverride} className="flex flex-col gap-6">
          
          {/* Input COMMANDER ID */}
          <div>
            <label className="text-white/80 font-grotesk font-bold text-[10px] uppercase tracking-[2px] mb-2 block">
              COMMANDER ID
            </label>
            <div className="relative flex items-center bg-[#0a0a0c] border border-[#B026FF]/30 rounded px-4 py-1 focus-within:border-[#B026FF] focus-within:shadow-[0_0_15px_rgba(176,38,255,0.2)] transition-all">
              <User size={16} className="text-[#B026FF] mr-4 opacity-90" />
              <input
                type="text"
                required
                placeholder="Authorized ID..."
                className="w-full bg-transparent py-3 text-white/70 font-inter text-[13px] placeholder-white/30 focus:outline-none"
              />
            </div>
          </div>

          {/* Input MASTER KEY */}
          <div>
            <label className="text-white/80 font-grotesk font-bold text-[10px] uppercase tracking-[2px] mb-2 block">
              MASTER KEY
            </label>
            <div className="relative flex items-center bg-[#0a0a0c] border border-[#B026FF]/30 rounded px-4 py-1 focus-within:border-[#B026FF] focus-within:shadow-[0_0_15px_rgba(176,38,255,0.2)] transition-all">
              <Lock size={16} className="text-[#B026FF] mr-4 opacity-90" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Input clearance code..."
                className="w-full bg-transparent py-3 text-white/70 font-inter text-[13px] placeholder-white/30 focus:outline-none"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="text-white/30 hover:text-white/60 ml-3 transition-colors outline-none"
              >
                <Eye size={16} />
              </button>
            </div>
          </div>

          {/* Tombol LOGIN (Sudah Diperbaiki) */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-4 rounded-[6px] border border-[#B026FF] bg-[#0a0a0c] hover:bg-[#B026FF]/10 text-white font-bold text-[14px] uppercase tracking-[3px] transition-all duration-300"
          >
            {loading ? "AUTHENTICATING..." : "LOGIN"}
          </button>
        </form>

        {/* Footer RETURN TO CREW LOGIN */}
        <div className="mt-8 flex justify-center">
          <button 
            type="button"
            onClick={() => router.push('/login-crew')} 
            className="flex items-center gap-3 text-white/30 hover:text-white/80 transition-colors font-grotesk font-bold text-[10px] uppercase tracking-[1.5px]"
          >
            <ArrowLeft size={14} /> RETURN TO CREW LOGIN
          </button>
        </div>

      </motion.div>
    </main>
  );
}