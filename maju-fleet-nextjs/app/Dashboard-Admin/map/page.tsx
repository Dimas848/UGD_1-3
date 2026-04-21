"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Settings, ChevronDown, User, Ship, LogOut, ZoomIn, ZoomOut, Filter, AlertTriangle, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminMapPage() {
  const router = useRouter();
  const [selectedVessel, setSelectedVessel] = useState<string | null>("EVER BLUE");
  const [mapSubTab, setMapSubTab] = useState<"ALL" | "ALERTS">("ALL");
  const [mapScale, setMapScale] = useState(1);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapStatusFilter, setMapStatusFilter] = useState("ALL");
  const [isSidebarFilterOpen, setIsSidebarFilterOpen] = useState(false);
  const [isControlModalOpen, setIsControlModalOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editCrew, setEditCrew] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [isEditStatusDropdownOpen, setIsEditStatusDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("Loading...");

  const [vesselsData, setVesselsData] = useState([
    { id: "EVER BLUE", package: "MAJU STANDARD", crew: "CHRIS", status: "EN ROUTE", statusColor: "text-[#00E3FD]", dotColor: "bg-[#00E3FD]", top: "67%", left: "57%", origin: "Singapore (SGP)", dest: "Tokyo (JPN)", eta: "2026-04-18 09:00", speed: "18.5 knots" },
    { id: "EVER BULK", package: "MAJU HEAVY", crew: "DIMZZ", status: "ARRIVED", statusColor: "text-[#00E3FD]", dotColor: "bg-[#00E3FD]", top: "37%", left: "15%", origin: "Jakarta (IDN)", dest: "Sydney (AUS)", eta: "2026-04-10 10:20", speed: "0 knots (Docked)" },
    { id: "EVER GLOW", package: "MAJU EXPRESS", crew: "JUWW", status: "NOT DEPARTED YET", statusColor: "text-[#FF3B30]", dotColor: "bg-[#FF3B30]", reason: "Critical Engine Failure - Code ENG-SYS-09", top: "42%", left: "64%", origin: "Shanghai (CHN)", dest: "Busan (KOR)", eta: "TBD", speed: "0 knots" },
    { id: "EVER PIONEER", package: "MAJU VIP", crew: "RIZZ", status: "DELAYED", statusColor: "text-[#FF3B30]", dotColor: "bg-[#FF3B30]", reason: "Weather Delay: Cyclone Alpha", top: "47%", left: "37%", origin: "Rotterdam (NLD)", dest: "New York (USA)", eta: "2026-04-20 14:00", speed: "0 knots (Anchored)" },
  ]);

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
  const zoomIn = () => setMapScale(prev => Math.min(prev + 0.5, 3));
  const zoomOut = () => setMapScale(prev => Math.max(prev - 0.5, 1)); 

  const activeVesselDetails = vesselsData.find(v => v.id === selectedVessel);

  const displayedVessels = vesselsData.filter(v => {
    const passesTab = mapSubTab === "ALL" ? true : (v.status === "DELAYED" || v.status === "NOT DEPARTED YET");
    const passesStatus = mapStatusFilter === "ALL" ? true : v.status === mapStatusFilter;
    return passesTab && passesStatus;
  });

  const openControlModal = () => {
    if (activeVesselDetails) {
      setEditName(activeVesselDetails.id);
      setEditCrew(activeVesselDetails.crew);
      setEditStatus(activeVesselDetails.status);
      setIsControlModalOpen(true);
    }
  };

  const saveManualControl = () => {
    setVesselsData(prev => prev.map(v => {
      if (v.id === selectedVessel) {
        let newStatusColor = v.statusColor;
        let newDotColor = v.dotColor;
        let newReason = v.reason;

        if (editStatus === "EN ROUTE" || editStatus === "ARRIVED") {
          newStatusColor = "text-[#00E3FD]";
          newDotColor = "bg-[#00E3FD]";
          newReason = undefined; 
        } else if (editStatus === "DELAYED" || editStatus === "NOT DEPARTED YET") {
          newStatusColor = "text-[#FF3B30]";
          newDotColor = "bg-[#FF3B30]";
          if (!newReason) newReason = "Manual Override Logged";
        }
        return { ...v, id: editName, crew: editCrew, status: editStatus, statusColor: newStatusColor, dotColor: newDotColor, reason: newReason };
      }
      return v;
    }));
    setSelectedVessel(editName);
    setIsControlModalOpen(false);
  };

  return (
    <div className="absolute top-0 left-0 w-full min-h-screen bg-[#0a0a0c] z-50 text-white font-inter selection:bg-[#B026FF] selection:text-white pb-6 flex flex-col">
      {/* NAVBAR */}
     <nav className="sticky top-0 z-50 h-[70px] flex items-center justify-between px-6 md:px-10 bg-[#0a0a0c]">
        <div className="flex items-center gap-3 w-1/3">
          <Image src="/logo.png" alt="Logo" width={45} height={45} className="-mr-1 opacity-90" />
          <span className="font-grotesk font-bold text-2xl tracking-[3px] uppercase text-[#E5B5FF] drop-shadow-[0_0_10px_rgba(176,38,255,0.4)]">Maju Fleet</span>
        </div>
        
        <div className="hidden lg:flex items-center justify-center gap-10 w-2/3 mt-2">
          <Link href="/Dashboard-Admin/fleet" className="font-grotesk text-[13px] uppercase tracking-[2px] pb-2 transition-all text-white/50 hover:text-[#E5B5FF] border-b-2 border-transparent hover:border-[#B026FF]">FLEET</Link>
          <Link href="/Dashboard-Admin/map" className="font-grotesk text-[13px] uppercase tracking-[2px] pb-2 transition-all font-bold text-[#E5B5FF] border-b-2 border-[#B026FF]">MAP</Link>
          <Link href="/Dashboard-Admin/analytics" className="font-grotesk text-[13px] uppercase tracking-[2px] pb-2 transition-all text-white/50 hover:text-[#E5B5FF] border-b-2 border-transparent hover:border-[#B026FF]">ANALYTICS</Link>
          <Link href="/Dashboard-Admin/register" className="font-grotesk text-[13px] uppercase tracking-[2px] pb-2 transition-all text-white/50 hover:text-[#E5B5FF] border-b-2 border-transparent hover:border-[#B026FF]">REGISTER</Link>
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

      <main className="w-full px-6 md:px-10 relative z-10 flex flex-col gap-8 max-w-[1800px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex gap-8 h-[750px]">
            <div className="flex-1 bg-[#0d0d11] rounded-[32px] overflow-hidden relative border border-white/5 flex flex-col shadow-lg" ref={mapContainerRef}>
              <div className="absolute top-8 left-8 z-20 pointer-events-none">
                <p className="flex items-center gap-2 text-[#00FF00] font-mono text-[9px] uppercase tracking-widest mb-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF00] animate-pulse"></span> LIVE STREAMING
                </p>

              </div>

              <div className="absolute bottom-8 right-8 z-20 flex flex-col gap-2">
                <button onClick={zoomIn} className="w-10 h-10 bg-black/60 border border-white/20 rounded flex items-center justify-center text-white hover:border-[#B026FF] hover:text-[#E5B5FF] transition-all backdrop-blur-md"><ZoomIn size={18} /></button>
                <button onClick={zoomOut} className="w-10 h-10 bg-black/60 border border-white/20 rounded flex items-center justify-center text-white hover:border-[#B026FF] hover:text-[#E5B5FF] transition-all backdrop-blur-md"><ZoomOut size={18} /></button>
              </div>

              <motion.div 
                drag dragConstraints={{ top: -500, left: -700, right: 0, bottom: 0 }} dragElastic={0.05}
                className="w-[180%] h-[180%] absolute top-0 left-0 cursor-grab active:cursor-grabbing origin-top-left"
                animate={{ scale: mapScale }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="w-full h-full relative" style={{ backgroundImage: "url('/Map.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
                  {vesselsData.map((vessel) => {
                    const isSelected = selectedVessel === vessel.id;
                    return (
                      <div 
                        key={vessel.id} onClick={(e) => { e.stopPropagation(); setSelectedVessel(vessel.id); }}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group" style={{ top: vessel.top, left: vessel.left }}
                      >
                        {isSelected && <div className="absolute inset-0 rounded-full animate-ping opacity-40 scale-[2.5]" style={{ backgroundColor: vessel.dotColor }}></div>}
                        <div className={`relative z-10 w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected ? "scale-150" : "hover:scale-125 hover:shadow-[0_0_15px_#B026FF]"}`} style={{ backgroundColor: vessel.dotColor, boxShadow: `0 0 15px ${vessel.dotColor}` }}></div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            <div className="w-[420px] bg-transparent flex flex-col h-full">
              <div className="flex justify-between items-center mb-6 mt-4 relative z-[60]">
                <h2 className="font-grotesk font-bold text-[20px] uppercase tracking-[1px] text-white">VESSEL MONITOR</h2>
                <div className="relative">
                  <Filter size={18} onClick={() => setIsSidebarFilterOpen(!isSidebarFilterOpen)} className={`cursor-pointer transition-colors ${mapStatusFilter !== "ALL" ? "text-[#B026FF]" : "text-white/60 hover:text-[#E5B5FF]"}`} />
                  <AnimatePresence>
                    {isSidebarFilterOpen && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute right-0 top-full mt-3 w-[180px] bg-[#121317] border border-white/10 rounded-lg shadow-2xl z-[100] overflow-hidden">
                        <div className="px-4 py-2.5 border-b border-white/5 text-[9px] font-mono text-white/40 uppercase tracking-widest bg-[#0a0a0c]">Filter by Status</div>
                        {["ALL", "EN ROUTE", "ARRIVED", "DELAYED", "NOT DEPARTED YET"].map(opt => (
                          <div key={opt} onClick={() => {setMapStatusFilter(opt); setIsSidebarFilterOpen(false);}} className={`px-4 py-3 text-[10px] font-mono cursor-pointer uppercase tracking-widest transition-colors ${mapStatusFilter === opt ? 'text-[#E5B5FF] bg-[#B026FF]/20 font-bold' : 'text-white/60 hover:text-[#E5B5FF] hover:bg-[#B026FF]/10'}`}>{opt}</div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4 relative z-40">
                <button onClick={() => setMapSubTab("ALL")} className={`px-4 py-1.5 rounded-[4px] text-[10px] font-mono tracking-widest font-bold transition-all ${mapSubTab === "ALL" ? "bg-[#B026FF] text-white shadow-[0_0_15px_rgba(176,38,255,0.4)]" : "bg-white/5 text-white/40 hover:text-white"}`}>ALL</button>
                <button onClick={() => setMapSubTab("ALERTS")} className={`px-4 py-1.5 rounded-[4px] text-[10px] font-mono tracking-widest font-bold transition-all ${mapSubTab === "ALERTS" ? "bg-[#B026FF] text-white shadow-[0_0_15px_rgba(176,38,255,0.4)]" : "bg-white/5 text-white/40 hover:text-white"}`}>ALERTS</button>
              </div>

              <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-2 custom-scrollbar relative z-30">
                <AnimatePresence mode="popLayout">
                  {displayedVessels.map((vessel, idx) => (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: idx * 0.05 }} key={vessel.id} onClick={() => setSelectedVessel(vessel.id)} className={`bg-transparent border rounded p-5 relative overflow-hidden group transition-all cursor-pointer ${vessel.id === selectedVessel ? 'border-[#B026FF] bg-[#1a1b22] shadow-[0_0_15px_rgba(176,38,255,0.1)]' : vessel.reason ? 'border-[#FF3B30]/30 hover:border-[#FF3B30]/50 hover:bg-[#1a1b22]' : 'border-white/10 hover:border-[#00E3FD]/50 hover:bg-[#1a1b22]'}`}>
                      {vessel.reason && <div className="absolute top-0 left-0 w-1 h-full bg-[#FF3B30]"></div>}
                      <div className="flex justify-between items-start mb-4">
                        <h3 className={`font-grotesk font-bold text-[15px] tracking-[1px] transition-colors ${vessel.id === selectedVessel ? 'text-[#E5B5FF]' : 'text-white group-hover:text-[#00E3FD]'}`}>{vessel.id}</h3>
                        <span className={`flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-widest uppercase border px-2 py-0.5 rounded-[3px] bg-black/40 ${vessel.reason ? 'border-[#FF3B30]/40 text-[#FF3B30]' : 'border-white/10 text-[#00E3FD]'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${vessel.dotColor}`}></span> {vessel.status}
                        </span>
                      </div>
                      {!vessel.reason ? (
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between text-[10px] font-mono"><span className="text-white/40 uppercase tracking-widest">PACKAGE TYPE</span><span className="text-white/70 uppercase tracking-widest text-right">{vessel.package}</span></div>
                          <div className="flex justify-between text-[10px] font-mono"><span className="text-white/40 uppercase tracking-widest">CREW</span><span className="text-white/70 uppercase tracking-widest text-right">{vessel.crew}</span></div>
                        </div>
                      ) : (
                        <div className="flex text-[10px] font-mono gap-4 mt-2 justify-between"><span className="text-white/40 uppercase tracking-widest">REASON</span><span className="text-[#FF3B30] tracking-widest text-right">{vessel.reason}</span></div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="mt-6 pt-4">
                <p className="font-mono text-[10px] text-white/40 tracking-widest uppercase mb-3">ACTION CONTROL</p>
                <button onClick={openControlModal} className="w-full flex justify-center items-center gap-3 bg-transparent border border-[#FF3B30]/50 text-[#FF3B30] hover:bg-[#FF3B30]/10 py-4 rounded font-grotesk font-bold text-[12px] tracking-[2px] uppercase transition-all shadow-[0_0_15px_rgba(255,59,48,0.15)]">
                  <AlertTriangle size={16} /> CONTROL MANUALLY
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* CONTROL MODAL */}
      <AnimatePresence>
        {isControlModalOpen && activeVesselDetails && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsControlModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-[#0a0a0c] border border-[#B026FF]/50 rounded-xl p-8 max-w-lg w-full shadow-[0_0_50px_rgba(176,38,255,0.15)] z-10">
              <h2 className="text-white font-grotesk font-bold text-xl tracking-[2px] uppercase mb-6 flex items-center gap-3"><Settings className="text-[#B026FF]" size={20} /> Manual Control Override</h2>
              <div className="flex flex-col gap-4 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono text-white/50 tracking-widest uppercase mb-1.5 block">Vessel Name</label>
                    <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full bg-[#121317] border border-white/20 rounded p-3 text-sm font-bold text-white focus:border-[#B026FF] outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-white/50 tracking-widest uppercase mb-1.5 block">Crew Leader</label>
                    <input type="text" value={editCrew} onChange={(e) => setEditCrew(e.target.value)} className="w-full bg-[#121317] border border-white/20 rounded p-3 text-sm font-bold text-white focus:border-[#B026FF] outline-none transition-colors" />
                  </div>
                </div>
                <div className="relative">
                  <label className="text-[10px] font-mono text-white/50 tracking-widest uppercase mb-1.5 block">Status Override</label>
                  <div onClick={() => setIsEditStatusDropdownOpen(!isEditStatusDropdownOpen)} className="w-full bg-[#121317] border border-white/20 rounded p-3 text-sm font-bold text-white cursor-pointer flex justify-between items-center hover:border-[#B026FF] transition-colors">{editStatus} <ChevronDown size={16} className="text-white/50" /></div>
                  <AnimatePresence>
                    {isEditStatusDropdownOpen && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="absolute top-full left-0 right-0 mt-1 bg-[#1a1b22] border border-white/20 rounded-md shadow-xl z-[150] overflow-hidden">
                        {["EN ROUTE", "ARRIVED", "DELAYED", "NOT DEPARTED YET"].map(s => (<div key={s} onClick={() => {setEditStatus(s); setIsEditStatusDropdownOpen(false);}} className="p-3 text-sm font-bold text-white hover:bg-[#B026FF]/20 cursor-pointer transition-colors">{s}</div>))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="w-full h-px bg-white/10 my-2"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-[10px] font-mono text-white/30 tracking-widest uppercase mb-1.5 block">Package Type</label><input type="text" value={activeVesselDetails.package} disabled className="w-full bg-white/5 border border-white/5 rounded p-2.5 text-xs font-mono text-white/30 cursor-not-allowed" /></div>
                  <div><label className="text-[10px] font-mono text-white/30 tracking-widest uppercase mb-1.5 block">Current Speed</label><input type="text" value={activeVesselDetails.speed} disabled className="w-full bg-white/5 border border-white/5 rounded p-2.5 text-xs font-mono text-white/30 cursor-not-allowed" /></div>
                  <div><label className="text-[10px] font-mono text-white/30 tracking-widest uppercase mb-1.5 block">Origin</label><input type="text" value={activeVesselDetails.origin} disabled className="w-full bg-white/5 border border-white/5 rounded p-2.5 text-xs font-mono text-white/30 cursor-not-allowed" /></div>
                  <div><label className="text-[10px] font-mono text-white/30 tracking-widest uppercase mb-1.5 block">Destination</label><input type="text" value={activeVesselDetails.dest} disabled className="w-full bg-white/5 border border-white/5 rounded p-2.5 text-xs font-mono text-white/30 cursor-not-allowed" /></div>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setIsControlModalOpen(false)} className="flex-1 py-3 border border-white/10 rounded-md text-white/60 hover:text-white hover:bg-white/5 font-grotesk text-[12px] uppercase tracking-[1px] transition-colors">Cancel</button>
                <button onClick={saveManualControl} className="flex-1 py-3 bg-[#B026FF]/20 border border-[#B026FF]/50 text-[#E5B5FF] rounded-md hover:bg-[#B026FF] hover:text-white font-grotesk text-[12px] font-bold uppercase tracking-[1px] transition-colors shadow-[0_0_15px_rgba(176,38,255,0.2)]">Apply Override</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
      <style jsx global>{`.custom-scrollbar::-webkit-scrollbar { width: 4px; } .custom-scrollbar::-webkit-scrollbar-track { background: transparent; } .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 4px; } .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(176, 38, 255, 0.5); }`}</style>
    </div>
  );
}