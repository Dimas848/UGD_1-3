"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User, Bell, Filter, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLogsPage() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("Loading...");
  const [logFilter, setLogFilter] = useState("ALL");

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

  const handleLogout = () => {
    router.push("/");
  };

  const systemLogsData = [
    { timestamp: "14:32:01.004", vessel: "EVER BLUE", message: "Routing updated. ETA recalculated to 2026-04-18 09:00." },
    { timestamp: "14:31:45.922", vessel: "EVER BULK", message: "Docking procedure complete. Status updated to ARRIVED." },
    { timestamp: "14:30:12.110", vessel: "EVER GLOW", message: "Alert: Critical Engine Failure - Code ENG-SYS-09." },
    { timestamp: "14:28:55.881", vessel: "EVER PIONEER", message: "Warning: Weather Delay - Cyclone Alpha detected." },
    { timestamp: "14:28:55.881", vessel: "EVER PIONEER", message: "System notification dispatched to Crew Leader RIZZ." },
    { timestamp: "14:25:33.412", vessel: "EVER SHINE", message: "Entered Sector-07. Navigational systems nominal." },
    { timestamp: "14:20:18.005", vessel: "OCEAN KING", message: "Cargo offloading started at Terminal B." },
    { timestamp: "14:15:09.664", vessel: "SEAWAY VOYAGER", message: "Maintaining current heading. Speed 18.5 knots." },
    { timestamp: "14:12:44.200", vessel: "STAR FREIGHT", message: "Pre-departure checklist pending clearance." },
    { timestamp: "14:08:21.111", vessel: "PACIFIC WIND", message: "Warning: Minor deviation from planned route." },
    { timestamp: "14:01:55.903", vessel: "GALAXY RIDER", message: "Routine telemetry ping received. Signal strength 98%." },
  ];

  return (
    <div className="absolute top-0 left-0 w-full min-h-screen bg-[#0a0a0c] z-50 text-white font-inter selection:bg-[#B026FF] selection:text-white pb-20 overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 h-[70px] flex items-center justify-between px-6 md:px-10 bg-[#0a0a0c]">
        <div className="flex items-center gap-3 w-1/3">
          <Image src="/logo.png" alt="Logo" width={45} height={45} className="-mr-1 opacity-90" />
          <span className="font-grotesk font-bold text-2xl tracking-[3px] uppercase text-[#E5B5FF] drop-shadow-[0_0_10px_rgba(176,38,255,0.4)]">
            Maju Fleet
          </span>
        </div>
        
        <div className="hidden lg:flex items-center justify-center gap-10 w-2/3 mt-2">
          <Link href="/Dashboard-Admin/fleet" className="font-grotesk text-[13px] uppercase tracking-[2px] pb-2 transition-all text-white/50 hover:text-[#E5B5FF] border-b-2 border-transparent hover:border-[#B026FF]">FLEET</Link>
          <Link href="/Dashboard-Admin/map" className="font-grotesk text-[13px] uppercase tracking-[2px] pb-2 transition-all text-white/50 hover:text-[#E5B5FF] border-b-2 border-transparent hover:border-[#B026FF]">MAP</Link>
          <Link href="/Dashboard-Admin/analytics" className="font-grotesk text-[13px] uppercase tracking-[2px] pb-2 transition-all text-white/50 hover:text-[#E5B5FF] border-b-2 border-transparent hover:border-[#B026FF]">ANALYTICS</Link>
          <Link href="/Dashboard-Admin/register" className="font-grotesk text-[13px] uppercase tracking-[2px] pb-2 transition-all text-white/50 hover:text-[#E5B5FF] border-b-2 border-transparent hover:border-[#B026FF]">REGISTER</Link>
          <Link href="/Dashboard-Admin" className="font-grotesk text-[13px] uppercase tracking-[2px] pb-2 transition-all font-bold text-[#E5B5FF] border-b-2 border-[#B026FF]">LOGS</Link>
        </div>

        <div className="flex items-center justify-end gap-6 w-1/3">
          <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
            <Bell size={20} className="text-white/60" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FF3B30] rounded-full border-[2px] border-[#0a0a0c]"></div>
          </div>
          <div suppressHydrationWarning className="border border-[#B026FF]/50 bg-transparent rounded-full px-5 py-2 font-mono text-[11px] text-[#E5B5FF] tracking-widest shadow-[0_0_10px_rgba(176,38,255,0.1)]">
            {currentTime}
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#B026FF] to-[#00E3FD] p-[2px] cursor-pointer hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full bg-[#0a0a0c] flex items-center justify-center overflow-hidden">
               <User size={18} className="text-white/60"/>
            </div>
          </div>
          <button onClick={() => setShowLogoutModal(true)} className="w-10 h-10 rounded-full border border-white/10 bg-[#121317] flex items-center justify-center text-white/50 hover:text-[#FF3B30] hover:border-[#FF3B30]/50 hover:bg-[#FF3B30]/10 transition-all">
            <LogOut size={16} />
          </button>
        </div>
      </nav>

      <div className="w-full h-px bg-white/5 mb-8"></div>

      <main className="w-full flex h-[calc(100vh-100px)] overflow-hidden">
        {/* Left Pane: Logs List */}
        <div className="flex-1 px-6 md:px-10 overflow-y-auto custom-scrollbar relative z-10 pb-20 pt-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="flex items-center gap-8 mb-12">
              <h1 className="font-grotesk font-bold text-[40px] tracking-[2px] uppercase text-white">DELIVERY</h1>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2 text-[#00E3FD] font-mono text-[10px] tracking-[2px] uppercase font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#00E3FD] animate-pulse"></span> LIVE STREAM
                </span>
                <span className="bg-[#1a1b22] border border-white/5 px-4 py-1.5 rounded text-[10px] font-mono text-white/50 uppercase tracking-[2px]">
                  MAP: SECTOR-07
                </span>
              </div>
            </div>

            <div className="w-full max-w-[1000px]">
              <div className="flex border-b border-transparent pb-4 mb-4 text-[10px] font-mono text-white/40 uppercase tracking-[2px]">
                <div className="w-[25%] pr-4">TIMESTAMP<br/>(ZULU)</div>
                <div className="w-[30%] pr-4">SOURCE / VESSEL ID</div>
                <div className="flex-1">EVENT MESSAGE</div>
              </div>
              <div className="flex flex-col gap-8">
                {systemLogsData.map((log, i) => (
                  <div key={i} className="flex items-start border-b border-transparent group hover:bg-white/5 -mx-4 px-4 py-2 rounded transition-colors">
                    <div className="w-[25%] pr-4 text-[13px] font-mono text-white/50">{log.timestamp}</div>
                    <div className="w-[30%] pr-4 text-[13px] font-grotesk font-bold text-white tracking-[1px] uppercase">{log.vessel}</div>
                    <div className="flex-1 text-[13px] font-mono text-white/70">{log.message}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Pane: Sidebar */}
        <div className="w-[320px] bg-[#0d0d11] border-l border-white/5 h-full p-8 flex flex-col relative z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
          <div className="mb-12">
            <h3 className="text-[11px] font-bold tracking-[3px] text-white/40 uppercase mb-4 block font-mono flex items-center justify-between">
              FILTER BY
              <Filter size={12} className="text-white/20" />
            </h3>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <button onClick={() => setLogFilter("ALL")} className={`py-2.5 rounded-[4px] text-[10px] font-bold tracking-[2px] uppercase font-mono transition-colors ${logFilter === "ALL" ? "bg-[#E5B5FF] text-black shadow-[0_0_15px_rgba(229,181,255,0.3)]" : "bg-[#1a1b22] border border-white/5 text-white/50 hover:text-white"}`}>ALL</button>
              <button onClick={() => setLogFilter("INFO")} className={`py-2.5 rounded-[4px] text-[10px] font-bold tracking-[2px] uppercase font-mono transition-colors ${logFilter === "INFO" ? "bg-[#E5B5FF] text-black shadow-[0_0_15px_rgba(229,181,255,0.3)]" : "bg-[#1a1b22] border border-white/5 text-white/50 hover:text-white"}`}>INFO</button>
              <button onClick={() => setLogFilter("WARN")} className={`py-2.5 rounded-[4px] text-[10px] font-bold tracking-[2px] uppercase font-mono transition-colors ${logFilter === "WARN" ? "bg-[#E5B5FF] text-black shadow-[0_0_15px_rgba(229,181,255,0.3)]" : "bg-[#1a1b22] border border-white/5 text-white/50 hover:text-white"}`}>WARN</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setLogFilter("CRITICAL")} className={`py-2.5 rounded-[4px] text-[10px] font-bold tracking-[2px] uppercase font-mono transition-colors ${logFilter === "CRITICAL" ? "bg-[#E5B5FF] text-black shadow-[0_0_15px_rgba(229,181,255,0.3)]" : "bg-[#1a1b22] border border-white/5 text-white/50 hover:text-white"}`}>CRITICAL</button>
            </div>
          </div>
          <div>
            <h3 className="text-[11px] font-bold tracking-[3px] text-white/40 uppercase mb-4 block font-mono">DATE RANGE</h3>
            <div className="bg-[#050505] border border-white/10 rounded px-4 py-3 flex justify-between items-center cursor-pointer hover:border-white/30 transition-colors">
              <span className="text-[12px] font-mono text-white/70">Last 24 Hours</span>
            </div>
          </div>
          <button className="absolute bottom-8 right-8 w-14 h-14 bg-[#E5B5FF] rounded-lg flex items-center justify-center text-black shadow-[0_0_20px_rgba(229,181,255,0.4)] hover:scale-105 transition-transform group">
            <RefreshCw size={20} className="text-black group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>
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

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(176, 38, 255, 0.5); }
      `}</style>
    </div>
  );
}