"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Package, MapPin, Weight, Ruler, Calendar, ShieldCheck, Box, Send, LogOut, UserCircle } from "lucide-react";

export default function BookShipmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    setSuccess(true);
    
    setTimeout(() => {
      setSuccess(false);
      (e.target as HTMLFormElement).reset();
      router.push("/dashboard/billing"); // Pindah ke folder billing setelah sukses
    }, 3000);
  };

  const inputClass = "w-full bg-[#121317] border border-white/10 rounded px-10 py-3 text-white font-inter text-[13px] placeholder-white/30 focus:outline-none focus:border-[#B026FF] transition-colors";
  const labelClass = "text-white/80 font-grotesk text-[10px] uppercase tracking-[2px] mb-2 block";
  const iconClass = "absolute left-3 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-80";

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex flex-col relative overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5 h-[72px] flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2 lg:gap-3 shrink-0">
          <Image src="/logo.png" alt="Logo" width={45} height={45} className="-mr-1" />
          <span className="hidden sm:block text-white font-grotesk font-bold text-[16px] lg:text-[20px] tracking-[2px] uppercase mt-1">
            Maju Fleet
          </span>
        </div>

        {/* LINK NAVIGASI PENGGANTI TAB */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-4 lg:gap-8 px-4 mt-1 overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link href="/dashboard/bookship" className="font-grotesk text-[11px] lg:text-[13px] uppercase tracking-[1px] pb-2 border-b-2 transition-all duration-300 text-[#E5B5FF] border-[#B026FF] font-bold [text-shadow:-1px_0_0_rgba(255,0,0,0.6),1px_0_0_rgba(0,255,255,0.6)]">
            Book Shipment
          </Link>
          <Link href="/dashboard/myshipments" className="font-grotesk text-[11px] lg:text-[13px] uppercase tracking-[1px] pb-2 border-b-2 transition-all duration-300 text-white/60 border-transparent hover:text-[#E5B5FF] hover:border-[#B026FF] hover:[text-shadow:-1px_0_0_rgba(255,0,0,0.6),1px_0_0_rgba(0,255,255,0.6)]">
            My Shipments
          </Link>
          <Link href="/dashboard/billing" className="font-grotesk text-[11px] lg:text-[13px] uppercase tracking-[1px] pb-2 border-b-2 transition-all duration-300 text-white/60 border-transparent hover:text-[#E5B5FF] hover:border-[#B026FF] hover:[text-shadow:-1px_0_0_rgba(255,0,0,0.6),1px_0_0_rgba(0,255,255,0.6)]">
            Billing & History
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:gap-5 shrink-0">
          <div className="hidden sm:flex items-center gap-2 text-right">
            <div>
              <p className="text-white font-grotesk font-bold text-[10px] lg:text-[11px] uppercase tracking-wide">Client Portal</p>
              <p className="text-white/40 font-inter text-[9px] lg:text-[10px]">CRG-8992</p>
            </div>
            <UserCircle size={28} className="text-[#B026FF] ml-1" />
          </div>
          <div className="w-[1px] h-8 bg-white/10 hidden sm:block"></div>
          <Link href="/" className="text-white/40 hover:text-red-400 transition-colors flex items-center gap-2 font-inter text-[10px] lg:text-[12px] uppercase tracking-[1px]">
            <LogOut size={16} /> <span className="hidden sm:block">Exit</span>
          </Link>
        </div>
      </nav>

      <main className="flex-1 pt-32 pb-20 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B026FF]/5 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#BDF4FF]/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-[1000px] mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <div className="mb-10 border-b border-white/5 pb-6">
              <h1 className="text-white font-grotesk font-bold text-3xl md:text-4xl tracking-[-1px] uppercase mb-2">
                BOOK NEW <span className="text-[#B026FF]">SHIPMENT</span>
              </h1>
              <p className="text-white/50 font-inter text-[14px]">
                Fill in your cargo details below to get scheduling and logistics fleet allocation.
              </p>
            </div>

            <form onSubmit={handleBooking} className="bg-[#121317]/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-10 shadow-2xl">
              
              <div className="mb-10">
                <h3 className="text-white flex items-center gap-2 font-grotesk text-[14px] uppercase tracking-[2px] mb-6 pb-2 border-b border-white/10">
                  <Box size={16} className="text-[#B026FF]" /> 1. Service Selection
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Freight Service Plan</label>
                    <div className="relative">
                      <ShieldCheck size={16} className={iconClass} />
                      <select required className={`${inputClass} pl-10 appearance-none`}>
                        <option value="" disabled selected>Select service plan...</option>
                        <option value="economy">Maju Economy (Cost-Optimized)</option>
                        <option value="standard">Maju Standard (Standard Container)</option>
                        <option value="heavy">Maju Heavy (Industrial Cargo)</option>
                        <option value="express">Maju Express (Time-Critical)</option>
                        <option value="vip">Maju VIP (Dedicated Care)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Preferred Shipping Date</label>
                    <div className="relative">
                      <Calendar size={16} className={iconClass} />
                      <input type="date" required className={`${inputClass} pl-10`} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-white flex items-center gap-2 font-grotesk text-[14px] uppercase tracking-[2px] mb-6 pb-2 border-b border-white/10">
                  <MapPin size={16} className="text-[#B026FF]" /> 2. Shipping Route
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Origin (Pickup Location/Port)</label>
                    <div className="relative">
                      <MapPin size={16} className={iconClass} />
                      <input type="text" required placeholder="e.g. Jakarta, Indonesia" className={`${inputClass} pl-10`} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Destination (Drop-off Location/Port)</label>
                    <div className="relative">
                      <MapPin size={16} className={`${iconClass} text-[#BDF4FF]`} />
                      <input type="text" required placeholder="e.g. Singapore Port" className={`${inputClass} pl-10`} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-white flex items-center gap-2 font-grotesk text-[14px] uppercase tracking-[2px] mb-6 pb-2 border-b border-white/10">
                  <Package size={16} className="text-[#B026FF]" /> 3. Cargo Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className={labelClass}>Cargo Description</label>
                    <div className="relative">
                      <Package size={16} className={iconClass} />
                      <input type="text" required placeholder="What are you shipping?" className={`${inputClass} pl-10`} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Cargo Type</label>
                    <select required className={`${inputClass} px-4 appearance-none`}>
                      <option value="" disabled selected>Select cargo category...</option>
                      <option value="general">General Goods (Dry)</option>
                      <option value="hazardous">Hazardous / Chemicals</option>
                      <option value="perishable">Perishable (Needs Cold Storage)</option>
                      <option value="fragile">Fragile / Electronics</option>
                      <option value="oversized">Oversized Machinery</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="md:col-span-1">
                    <label className={labelClass}>Total Weight</label>
                    <div className="relative">
                      <Weight size={16} className={iconClass} />
                      <input type="number" min="0.1" step="0.1" required placeholder="0.0" className={`${inputClass} pl-10 pr-20`} />
                      <div className="absolute right-1 top-1 bottom-1 flex items-center">
                        <select className="h-full bg-[#1a1b20] border-l border-white/10 rounded-r px-3 text-white/80 font-inter text-[11px] uppercase tracking-wider focus:outline-none cursor-pointer">
                          <option value="tons">Tons</option>
                          <option value="kg">KG</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-3 grid grid-cols-3 gap-4">
                    <div>
                      <label className={labelClass}>Length (m)</label>
                      <div className="relative">
                        <Ruler size={16} className={iconClass} />
                        <input type="number" min="0.1" step="0.1" required placeholder="L" className={`${inputClass} pl-10`} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Width (m)</label>
                      <div className="relative">
                        <Ruler size={16} className={iconClass} />
                        <input type="number" min="0.1" step="0.1" required placeholder="W" className={`${inputClass} pl-10`} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Height (m)</label>
                      <div className="relative">
                        <Ruler size={16} className={iconClass} />
                        <input type="number" min="0.1" step="0.1" required placeholder="H" className={`${inputClass} pl-10`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <button
                  type="submit"
                  disabled={loading || success}
                  className="w-full md:w-auto px-10 py-4 rounded bg-[#B026FF] hover:bg-[#9a1ce6] text-white font-grotesk font-bold text-[14px] uppercase tracking-[2px] transition-all duration-300 flex items-center justify-center gap-3 ml-auto"
                  style={{
                    boxShadow: success ? "0 0 20px rgba(16,185,129,0.3)" : "0 0 20px rgba(176,38,255,0.3)",
                    background: success ? "#10B981" : loading ? "#7a1aaa" : "linear-gradient(90deg, #B026FF, #4E0078)",
                  }}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">Processing Booking...</span>
                  ) : success ? (
                    <span className="flex items-center gap-2">Booking Confirmed!</span>
                  ) : (
                    <span className="flex items-center gap-2">Submit Request <Send size={16} /></span>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}