"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, LogOut, Bell, Hash, Users, MapPin, Package, RefreshCw, Briefcase, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminRegisterPage() {
  const router = useRouter();
  
  // State untuk Dropdown Registrasi
  const [regType, setRegType] = useState<"fleet" | "crew">("fleet");
  
  const [trackingCode, setTrackingCode] = useState("");
  const [crewCode, setCrewCode] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("Loading...");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${year}-${month}-${day} ${hours}:${minutes}`);
    };
    updateClock();
    const timerId = setInterval(updateClock, 1000);
    return () => clearInterval(timerId);
  }, []);

  const handleLogout = () => router.push("/");
  
  // Generate MJ - XXX untuk Fleet
  const generateTracking = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    setTrackingCode(`MJ - ${randomNum}`);
  };

  // Generate CRW - XXX untuk Crew
  const generateCrewCode = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setCrewCode(`CRW - ${randomNum}`);
  };

  return (
    // DIUBAH: pb-20 menjadi pb-10 untuk mengurangi space paling bawah
    <div className="absolute top-0 left-0 w-full min-h-screen bg-[#0a0a0c] z-50 text-white font-inter selection:bg-[#B026FF] selection:text-white pb-6 flex flex-col">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 h-[70px] flex items-center justify-between px-6 md:px-10 bg-[#0a0a0c]">
        <div className="flex items-center gap-3 w-1/3">
          <Image src="/logo.png" alt="Logo" width={45} height={45} className="-mr-1 opacity-90" />
          <span className="font-grotesk font-bold text-2xl tracking-[3px] uppercase text-[#E5B5FF] drop-shadow-[0_0_10px_rgba(176,38,255,0.4)]">Maju Fleet</span>
        </div>
        
        <div className="hidden lg:flex items-center justify-center gap-10 w-2/3 mt-2">
          <Link href="/Dashboard-Admin/fleet" className="font-grotesk text-[13px] uppercase tracking-[2px] pb-2 transition-all text-white/50 hover:text-[#E5B5FF] border-b-2 border-transparent hover:border-[#B026FF]">FLEET</Link>
          <Link href="/Dashboard-Admin/map" className="font-grotesk text-[13px] uppercase tracking-[2px] pb-2 transition-all text-white/50 hover:text-[#E5B5FF] border-b-2 border-transparent hover:border-[#B026FF]">MAP</Link>
          <Link href="/Dashboard-Admin/analytics" className="font-grotesk text-[13px] uppercase tracking-[2px] pb-2 transition-all text-white/50 hover:text-[#E5B5FF] border-b-2 border-transparent hover:border-[#B026FF]">ANALYTICS</Link>
          <Link href="/Dashboard-Admin/register" className="font-grotesk text-[13px] uppercase tracking-[2px] pb-2 transition-all font-bold text-[#E5B5FF] border-b-2 border-[#B026FF]">REGISTER</Link>
          <Link href="/Dashboard-Admin" className="font-grotesk text-[13px] uppercase tracking-[2px] pb-2 transition-all text-white/50 hover:text-[#E5B5FF] border-b-2 border-transparent hover:border-[#B026FF]">LOGS</Link>
        </div>

        <div className="flex items-center justify-end gap-6 w-1/3">
          <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
            <Bell size={20} className="text-white/60" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FF3B30] rounded-full border-[2px] border-[#0a0a0c]"></div>
          </div>
          <div suppressHydrationWarning className="border border-[#B026FF]/50 bg-transparent rounded-full px-5 py-2 font-mono text-[11px] text-[#E5B5FF] tracking-widest shadow-[0_0_10px_rgba(176,38,255,0.1)]">{currentTime}</div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#B026FF] to-[#00E3FD] p-[2px] cursor-pointer hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full bg-[#0a0a0c] flex items-center justify-center overflow-hidden"><User size={18} className="text-white/60"/></div>
          </div>
          <button onClick={() => setShowLogoutModal(true)} className="w-10 h-10 rounded-full border border-white/10 bg-[#121317] flex items-center justify-center text-white/50 hover:text-[#FF3B30] hover:border-[#FF3B30]/50 hover:bg-[#FF3B30]/10 transition-all"><LogOut size={16} /></button>
        </div>
      </nav>

      <div className="w-full h-px bg-white/5 mb-8"></div>

      {/* DIUBAH: max-w-[1200px] jadi max-w-[900px], gap-10 jadi gap-8, mt-12 jadi mt-6, pb-24 jadi pb-10 untuk memadatkan kanan kiri dan atas bawah */}
      <main className="w-full px-6 md:px-10 relative z-10 flex flex-col gap-8 max-w-[900px] mx-auto pb-10 mt-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-transparent pb-4">
          
          {/* TITLE DROPDOWN UNTUK MEMILIH TIPE REGISTRASI */}
          <div className="relative mb-10 inline-block">
            <select
              value={regType}
              onChange={(e) => setRegType(e.target.value as "fleet" | "crew")}
              className="font-grotesk font-bold text-[36px] md:text-[42px] tracking-[2px] uppercase text-white bg-transparent border-b-4 border-[#B026FF] pb-2 outline-none cursor-pointer appearance-none pr-12 transition-colors hover:text-[#E5B5FF]"
            >
              <option value="fleet" className="bg-[#121317] text-[18px]">FLEET REGISTRATION</option>
              <option value="crew" className="bg-[#121317] text-[18px]">CREW REGISTRATION</option>
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#B026FF]">
              <ChevronDown size={32} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {regType === "fleet" ? (
              /* ======================= FLEET REGISTRATION FORM ======================= */
              <motion.div 
                key="fleet-form"
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: 20 }} 
                transition={{ duration: 0.3 }}
              >
                {/* TRACKING NUMBER */}
                {/* DIUBAH: mb-14 jadi mb-10, mb-8 jadi mb-6 */}
                <div className="mb-10">
                  <h2 className="flex items-center gap-4 font-grotesk font-bold text-[#E5B5FF] uppercase tracking-[3px] mb-6 text-lg">
                    <Hash size={20} /> TRACKING NUMBER
                  </h2>
                  <div className="flex gap-6 items-end">
                    <div className="flex-1">
                      <label className="text-[12px] font-bold text-white/40 tracking-[3px] uppercase mb-3 block font-mono">TRACKING CODE</label>
                      <input type="text" readOnly value={trackingCode} placeholder="MJ - XXXX" className="w-full bg-transparent border-b border-white/20 pb-3 text-[18px] text-white placeholder:text-white/30 focus:border-[#B026FF] outline-none transition-colors" />
                    </div>
                    <button onClick={generateTracking} className="px-6 py-3 border border-white/10 rounded text-white/60 text-[12px] font-bold tracking-[2px] uppercase hover:text-white hover:border-white/50 transition-colors flex items-center gap-2">
                      <RefreshCw size={16} /> GENERATE NEW
                    </button>
                  </div>
                </div>

                {/* CREW INFORMATION */}
                <div className="mb-10">
                  <h2 className="flex items-center gap-4 font-grotesk font-bold text-[#E5B5FF] uppercase tracking-[3px] mb-6 text-lg">
                    <Users size={20} /> CREW INFORMATION
                  </h2>
                  <div className="w-full sm:w-[60%] pr-0">
                    <label className="text-[12px] font-bold text-white/40 tracking-[3px] uppercase mb-3 block font-mono">ASSIGNED CAPTAIN</label>
                    <input type="text" placeholder="Enter captain's name..." className="w-full bg-transparent border-b border-white/20 pb-3 text-[18px] text-white placeholder:text-white/30 focus:border-[#B026FF] outline-none transition-colors" />
                  </div>
                </div>

                {/* SENDER INFORMATION */}
                <div className="mb-10">
                  <h2 className="flex items-center gap-4 font-grotesk font-bold text-[#E5B5FF] uppercase tracking-[3px] mb-6 text-lg">
                    <MapPin size={20} /> SENDER INFORMATION
                  </h2>
                  {/* DIUBAH: gap-x-12 gap-y-10 diperkecil jadi gap-x-8 gap-y-8 */}
                  <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                    <div>
                      <label className="text-[12px] font-bold text-white/40 tracking-[3px] uppercase mb-3 block font-mono">NAME</label>
                      <input type="text" placeholder="Enter name..." className="w-full bg-transparent border-b border-white/20 pb-3 text-[18px] text-white placeholder:text-white/30 focus:border-[#B026FF] outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="text-[12px] font-bold text-white/40 tracking-[3px] uppercase mb-3 block font-mono">CONTACT</label>
                      <input type="text" placeholder="Phone number..." className="w-full bg-transparent border-b border-white/20 pb-3 text-[18px] text-white placeholder:text-white/30 focus:border-[#B026FF] outline-none transition-colors" />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[12px] font-bold text-white/40 tracking-[3px] uppercase mb-3 block font-mono">ORIGIN ADDRESS</label>
                      <input type="text" placeholder="Full address..." className="w-full bg-transparent border-b border-white/20 pb-3 text-[18px] text-white placeholder:text-white/30 focus:border-[#B026FF] outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="text-[12px] font-bold text-white/40 tracking-[3px] uppercase mb-3 block font-mono">COUNTRY</label>
                      <input type="text" placeholder="Country Origin..." className="w-full bg-transparent border-b border-white/20 pb-3 text-[18px] text-white placeholder:text-white/30 focus:border-[#B026FF] outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="text-[12px] font-bold text-white/40 tracking-[3px] uppercase mb-3 block font-mono">PROVINCE / CITY</label>
                      <input type="text" placeholder="Province / City Origin..." className="w-full bg-transparent border-b border-white/20 pb-3 text-[18px] text-white placeholder:text-white/30 focus:border-[#B026FF] outline-none transition-colors" />
                    </div>
                  </div>
                </div>

                {/* RECIPIENT INFORMATION */}
                <div className="mb-10">
                  <h2 className="flex items-center gap-4 font-grotesk font-bold text-[#E5B5FF] uppercase tracking-[3px] mb-6 text-lg">
                    <MapPin size={20} /> RECIPIENT INFORMATION
                  </h2>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                    <div>
                      <label className="text-[12px] font-bold text-white/40 tracking-[3px] uppercase mb-3 block font-mono">NAME</label>
                      <input type="text" placeholder="Enter name..." className="w-full bg-transparent border-b border-white/20 pb-3 text-[18px] text-white placeholder:text-white/30 focus:border-[#B026FF] outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="text-[12px] font-bold text-white/40 tracking-[3px] uppercase mb-3 block font-mono">CONTACT</label>
                      <input type="text" placeholder="Phone number..." className="w-full bg-transparent border-b border-white/20 pb-3 text-[18px] text-white placeholder:text-white/30 focus:border-[#B026FF] outline-none transition-colors" />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[12px] font-bold text-white/40 tracking-[3px] uppercase mb-3 block font-mono">DESTINATION ADDRESS</label>
                      <input type="text" placeholder="Full address..." className="w-full bg-transparent border-b border-white/20 pb-3 text-[18px] text-white placeholder:text-white/30 focus:border-[#B026FF] outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="text-[12px] font-bold text-white/40 tracking-[3px] uppercase mb-3 block font-mono">COUNTRY</label>
                      <input type="text" placeholder="Country Destination..." className="w-full bg-transparent border-b border-white/20 pb-3 text-[18px] text-white placeholder:text-white/30 focus:border-[#B026FF] outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="text-[12px] font-bold text-white/40 tracking-[3px] uppercase mb-3 block font-mono">PROVINCE / CITY</label>
                      <input type="text" placeholder="Province / City Destination..." className="w-full bg-transparent border-b border-white/20 pb-3 text-[18px] text-white placeholder:text-white/30 focus:border-[#B026FF] outline-none transition-colors" />
                    </div>
                  </div>
                </div>

                {/* CARGO DETAILS */}
                <div className="mb-10">
                  <h2 className="flex items-center gap-4 font-grotesk font-bold text-[#E5B5FF] uppercase tracking-[3px] mb-6 text-lg">
                    <Package size={20} /> CARGO DETAILS
                  </h2>
                  <div className="grid grid-cols-3 gap-x-8 gap-y-8">
                    <div className="col-span-3">
                      <label className="text-[12px] font-bold text-white/40 tracking-[3px] uppercase mb-3 block font-mono">ITEM DESCRIPTION</label>
                      <input type="text" placeholder="Cargo type..." className="w-full bg-transparent border-b border-white/20 pb-3 text-[18px] text-white placeholder:text-white/30 focus:border-[#B026FF] outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="text-[12px] font-bold text-white/40 tracking-[3px] uppercase mb-3 block font-mono">WEIGHT (KG)</label>
                      <input type="text" placeholder="0.00" className="w-full bg-transparent border-b border-white/20 pb-3 text-[18px] text-white placeholder:text-white/30 focus:border-[#B026FF] outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="text-[12px] font-bold text-white/40 tracking-[3px] uppercase mb-3 block font-mono">DIMENSIONS (CBM)</label>
                      <input type="text" placeholder="0.00" className="w-full bg-transparent border-b border-white/20 pb-3 text-[18px] text-white placeholder:text-white/30 focus:border-[#B026FF] outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="text-[12px] font-bold text-white/40 tracking-[3px] uppercase mb-3 block font-mono">CATEGORY</label>
                      <div className="relative mt-1">
                        <select className="w-full bg-[#1a1b22] border-none rounded py-3 px-5 text-[16px] text-white/60 appearance-none outline-none focus:ring-1 focus:ring-[#B026FF] transition-all cursor-pointer">
                          <option value="" disabled selected hidden>Select category...</option>
                          <option value="electronics" className="bg-[#121317]">Electronics</option>
                          <option value="clothing" className="bg-[#121317]">Clothing</option>
                          <option value="food" className="bg-[#121317]">Food & Beverage</option>
                          <option value="heavy" className="bg-[#121317]">Heavy Machinery</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                          <ChevronDown size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="w-full py-4 mt-4 rounded-md font-grotesk font-bold text-[16px] text-white tracking-[3px] uppercase bg-gradient-to-r from-[#B026FF] to-[#a2d2ff] hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(176,38,255,0.2)]">
                  CREATE DELIVERY
                </button>
              </motion.div>
            ) : (

              /* ======================= CREW REGISTRATION FORM ======================= */
              <motion.div 
                key="crew-form"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }} 
                transition={{ duration: 0.3 }}
              >
                {/* CREW ID */}
                <div className="mb-10">
                  <h2 className="flex items-center gap-4 font-grotesk font-bold text-[#E5B5FF] uppercase tracking-[3px] mb-6 text-lg">
                    <Hash size={20} /> CREW IDENTIFICATION
                  </h2>
                  <div className="flex gap-6 items-end">
                    <div className="flex-1">
                      <label className="text-[12px] font-bold text-white/40 tracking-[3px] uppercase mb-3 block font-mono">CREW ID</label>
                      <input type="text" readOnly value={crewCode} placeholder="CRW - XXXX" className="w-full bg-transparent border-b border-white/20 pb-3 text-[18px] text-white placeholder:text-white/30 focus:border-[#B026FF] outline-none transition-colors" />
                    </div>
                    <button onClick={generateCrewCode} className="px-6 py-3 border border-white/10 rounded text-white/60 text-[12px] font-bold tracking-[2px] uppercase hover:text-white hover:border-white/50 transition-colors flex items-center gap-2">
                      <RefreshCw size={16} /> GENERATE ID
                    </button>
                  </div>
                </div>

                {/* PERSONAL DETAILS */}
                <div className="mb-10">
                  <h2 className="flex items-center gap-4 font-grotesk font-bold text-[#E5B5FF] uppercase tracking-[3px] mb-6 text-lg">
                    <User size={20} /> PERSONAL DETAILS
                  </h2>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                    <div className="col-span-2">
                      <label className="text-[12px] font-bold text-white/40 tracking-[3px] uppercase mb-3 block font-mono">FULL NAME</label>
                      <input type="text" placeholder="Enter full name..." className="w-full bg-transparent border-b border-white/20 pb-3 text-[18px] text-white placeholder:text-white/30 focus:border-[#B026FF] outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="text-[12px] font-bold text-white/40 tracking-[3px] uppercase mb-3 block font-mono">GENDER</label>
                      <div className="relative mt-1">
                        <select className="w-full bg-[#1a1b22] border-none rounded py-3 px-5 text-[16px] text-white/60 appearance-none outline-none focus:ring-1 focus:ring-[#B026FF] transition-all cursor-pointer">
                          <option value="" disabled selected hidden>Select gender...</option>
                          <option value="male" className="bg-[#121317]">Male</option>
                          <option value="female" className="bg-[#121317]">Female</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                          <ChevronDown size={20} />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-[12px] font-bold text-white/40 tracking-[3px] uppercase mb-3 block font-mono">AGE</label>
                      <input type="number" placeholder="Enter age..." className="w-full bg-transparent border-b border-white/20 pb-3 text-[18px] text-white placeholder:text-white/30 focus:border-[#B026FF] outline-none transition-colors" />
                    </div>
                  </div>
                </div>

                {/* PROFESSIONAL DETAILS */}
                <div className="mb-10">
                  <h2 className="flex items-center gap-4 font-grotesk font-bold text-[#E5B5FF] uppercase tracking-[3px] mb-6 text-lg">
                    <Briefcase size={20} /> PROFESSIONAL DETAILS
                  </h2>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                    <div>
                      <label className="text-[12px] font-bold text-white/40 tracking-[3px] uppercase mb-3 block font-mono">SPECIALIST</label>
                      <div className="relative mt-1">
                        <select className="w-full bg-[#1a1b22] border-none rounded py-3 px-5 text-[16px] text-white/60 appearance-none outline-none focus:ring-1 focus:ring-[#B026FF] transition-all cursor-pointer">
                          <option value="" disabled selected hidden>Select role...</option>
                          <option value="captain" className="bg-[#121317]">Captain</option>
                          <option value="navigator" className="bg-[#121317]">Navigator</option>
                          <option value="chief_engineer" className="bg-[#121317]">Chief Engineer</option>
                          <option value="deck_officer" className="bg-[#121317]">Deck Officer</option>
                          <option value="communications" className="bg-[#121317]">Communications Officer</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                          <ChevronDown size={20} />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-[12px] font-bold text-white/40 tracking-[3px] uppercase mb-3 block font-mono">ORIGIN CITY / COUNTRY</label>
                      <input type="text" placeholder="City, Country..." className="w-full bg-transparent border-b border-white/20 pb-3 text-[18px] text-white placeholder:text-white/30 focus:border-[#B026FF] outline-none transition-colors" />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[12px] font-bold text-white/40 tracking-[3px] uppercase mb-3 block font-mono">CONTACT NUMBER</label>
                      <input type="text" placeholder="Phone number..." className="w-full bg-transparent border-b border-white/20 pb-3 text-[18px] text-white placeholder:text-white/30 focus:border-[#B026FF] outline-none transition-colors" />
                    </div>
                  </div>
                </div>

                <button className="w-full py-4 mt-4 rounded-md font-grotesk font-bold text-[16px] text-white tracking-[3px] uppercase bg-gradient-to-r from-[#B026FF] to-[#a2d2ff] hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(176,38,255,0.2)]">
                  REGISTER CREW
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </main>

      {/* LOGOUT MODAL */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowLogoutModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-[#0a0a0c] border border-[#B026FF]/30 rounded-xl p-8 max-w-sm w-full shadow-[0_0_50px_rgba(176,38,255,0.15)] z-10 text-center">
              <h2 className="text-white font-grotesk font-bold text-xl tracking-[2px] uppercase mb-3">System Logout</h2>
              <p className="text-white/60 font-mono text-[11px] tracking-widest mb-8 leading-relaxed">Are you sure you want to terminate the current session and return to the main portal?</p>
              <div className="flex gap-4">
                <button onClick={() => setShowLogoutModal(false)} className="flex-1 py-3 border border-white/10 rounded-md text-white/60 hover:text-white hover:bg-white/5 font-grotesk text-[12px] uppercase tracking-[1px] transition-colors">Cancel</button>
                <button onClick={handleLogout} className="flex-1 py-3 bg-[#FF3B30]/10 border border-[#FF3B30]/50 text-[#FF3B30] rounded-md hover:bg-[#FF3B30] hover:text-white font-grotesk text-[12px] font-bold uppercase tracking-[1px] transition-colors">Confirm Exit</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}