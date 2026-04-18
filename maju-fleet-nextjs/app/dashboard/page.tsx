"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Package, MapPin, Weight, Ruler, 
  Calendar, ShieldCheck, Box, Send, LogOut, UserCircle,
  Ship, Navigation, Clock, CheckCircle2, FileText, Activity, Anchor, Search, XCircle, RefreshCw, CreditCard, AlertCircle
} from "lucide-react";

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("book"); 

  const [trackingNumber, setTrackingNumber] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [showTrackResult, setShowTrackResult] = useState(false);

  const [showInvoiceDetail, setShowInvoiceDetail] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    setSuccess(true);
    
    setTimeout(() => {
      setSuccess(false);
      (e.target as HTMLFormElement).reset();
      setActiveTab("history");
    }, 3000);
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber) return;
    setIsTracking(true);
    setShowTrackResult(false);
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsTracking(false);
    setShowTrackResult(true);
  };

  const resetTracking = () => {
    setTrackingNumber("");
    setShowTrackResult(false);
  };

  const invoices = [
    {
      id: "INV-2026-0401", ref: "MJF-8821-X9", date: "18 Apr 2026", amount: "Rp 12.500.000", status: "Pending",
      items: [
        { desc: "Freight Charges (Ever Blue)", price: "Rp 10.000.000" },
        { desc: "Logistics Insurance", price: "Rp 1.500.000" },
        { desc: "Fuel Surcharge", price: "Rp 1.000.000" }
      ]
    },
    {
      id: "INV-2026-0315", ref: "MJF-5542-L1", date: "15 Mar 2026", amount: "Rp 8.200.000", status: "Paid",
      items: [
        { desc: "Standard Freight Forwarding", price: "Rp 7.000.000" },
        { desc: "Handling Fee", price: "Rp 1.200.000" }
      ]
    }
  ];

  const inputClass = "w-full bg-[#121317] border border-white/10 rounded px-10 py-3 text-white font-inter text-[13px] placeholder-white/30 focus:outline-none focus:border-[#B026FF] transition-colors";
  const labelClass = "text-white/80 font-grotesk text-[10px] uppercase tracking-[2px] mb-2 block";
  const iconClass = "absolute left-3 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-80";

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex flex-col relative">
      
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5 h-[72px] flex items-center justify-between px-6 md:px-10">
        
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={45} height={45} className="-mr-1" />
          <span className="text-white font-grotesk font-bold text-[20px] tracking-[2px] uppercase mt-1 hidden sm:block">
            Maju Fleet
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 mt-1">
          <button 
            onClick={() => setActiveTab("book")}
            className={`font-grotesk text-[13px] uppercase tracking-[1px] pb-1 border-b-2 transition-all duration-200 ${
              activeTab === "book" ? "text-[#E5B5FF] border-[#B026FF]" : "text-white/50 border-transparent hover:text-white"
            }`}
          >
            Book Shipment
          </button>
          <button 
            onClick={() => setActiveTab("shipments")}
            className={`font-grotesk text-[13px] uppercase tracking-[1px] pb-1 border-b-2 transition-all duration-200 ${
              activeTab === "shipments" ? "text-[#E5B5FF] border-[#B026FF]" : "text-white/50 border-transparent hover:text-white"
            }`}
          >
            My Shipments
          </button>
          <button 
            onClick={() => setActiveTab("history")}
            className={`font-grotesk text-[13px] uppercase tracking-[1px] pb-1 border-b-2 transition-all duration-200 ${
              activeTab === "history" ? "text-[#E5B5FF] border-[#B026FF]" : "text-white/50 border-transparent hover:text-white"
            }`}
          >
            Billing & History
          </button>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden sm:flex items-center gap-2 text-right">
            <div>
              <p className="text-white font-grotesk font-bold text-[11px] uppercase tracking-wide">Client Portal</p>
              <p className="text-white/40 font-inter text-[10px]">CRG-8992</p>
            </div>
            <UserCircle size={28} className="text-[#B026FF] ml-1" />
          </div>
          <div className="w-[1px] h-8 bg-white/10 hidden sm:block"></div>
          <Link href="/" className="text-white/40 hover:text-red-400 transition-colors flex items-center gap-2 font-inter text-[12px] uppercase tracking-[1px]">
            <LogOut size={16} /> <span className="hidden sm:block">Exit</span>
          </Link>
        </div>
      </nav>

      <main className="flex-1 pt-32 pb-20 px-6 md:px-10 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B026FF]/5 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#BDF4FF]/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-[1000px] mx-auto relative z-10">
          
          <AnimatePresence mode="wait">
            
            {/* ========================================= */}
            {/* TAB 1: BOOK SHIPMENT */}
            {/* ========================================= */}
            {activeTab === "book" && (
              <motion.div 
                key="book"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
              >
                <div className="mb-10 border-b border-white/5 pb-6">
                  <h1 className="text-white font-grotesk font-bold text-3xl md:text-4xl tracking-[-1px] uppercase mb-2">
                    BOOK NEW <span className="text-[#B026FF]">SHIPMENT</span>
                  </h1>
                  <p className="text-white/50 font-inter text-[14px]">
                    Fill in your cargo details below to get scheduling and logistics fleet allocation.
                  </p>
                </div>

                <form onSubmit={handleBooking} className="bg-[#121317]/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-10 shadow-2xl">
                  
                  {/* Section 1 */}
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

                  {/* Section 2 */}
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

                  {/* Section 3 */}
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
                      {/* ==== UPDATE: INPUT WEIGHT DENGAN DROPDOWN TONS/KG ==== */}
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
                      {/* ========================================================= */}
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
            )}

            {/* ========================================= */}
            {/* TAB 2: MY SHIPMENTS (TRACK & TRACE) */}
            {/* ========================================= */}
            {activeTab === "shipments" && (
              <motion.div 
                key="shipments"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}
              >
                <div className="mb-10 border-b border-white/5 pb-6">
                  <h1 className="text-white font-grotesk font-bold text-3xl md:text-4xl tracking-[-1px] uppercase mb-2">
                    TRACK & <span className="text-[#B026FF]">TRACE</span>
                  </h1>
                  <p className="text-white/50 font-inter text-[14px]">
                    Enter your Tracking ID to view real-time telemetry and shipment status.
                  </p>
                </div>

                <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4 mb-10 max-w-2xl">
                  <div className="relative flex-1">
                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-80" />
                    <input 
                      type="text" 
                      required 
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                      placeholder="Enter Tracking ID (e.g. MJF-8821-X9)" 
                      className="w-full bg-[#121317]/80 backdrop-blur-sm border border-[#B026FF]/30 rounded px-12 py-4 text-white font-mono text-[14px] placeholder-white/30 focus:outline-none focus:border-[#B026FF] focus:shadow-[0_0_15px_rgba(176,38,255,0.2)] transition-all uppercase" 
                      disabled={isTracking || showTrackResult}
                    />
                    {showTrackResult && (
                      <button type="button" onClick={resetTracking} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-red-400 transition-colors">
                        <XCircle size={20} />
                      </button>
                    )}
                  </div>
                  <button 
                    type="submit" 
                    disabled={isTracking || showTrackResult || !trackingNumber}
                    className="px-8 py-4 rounded bg-[#B026FF] hover:bg-[#9a1ce6] text-white font-grotesk font-bold text-[14px] uppercase tracking-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] flex justify-center items-center"
                    style={{ background: isTracking ? "#7a1aaa" : "linear-gradient(90deg, #B026FF, #4E0078)" }}
                  >
                    {isTracking ? <RefreshCw size={20} className="animate-spin" /> : "TRACK"}
                  </button>
                </form>

                <AnimatePresence>
                  {showTrackResult && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-[#121317]/80 backdrop-blur-sm border border-[#B026FF]/40 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(176,38,255,0.15)] mb-8">
                        
                        <div className="bg-[#1a1b20] px-6 py-4 border-b border-white/5 flex flex-wrap justify-between items-center gap-4">
                          <div className="flex items-center gap-4">
                            <div className="bg-[#B026FF]/20 p-2 rounded text-[#E5B5FF]">
                              <Ship size={20} />
                            </div>
                            <div>
                              <p className="text-white/50 font-grotesk text-[10px] uppercase tracking-[2px] mb-1">Result For</p>
                              <p className="text-[#BDF4FF] font-mono font-bold text-[16px] tracking-widest">{trackingNumber}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center gap-2 bg-[#121317] border border-[#B026FF]/30 px-3 py-1.5 rounded text-[#B026FF] font-mono text-[10px] tracking-wide">
                              <Activity size={12} className="animate-pulse" /> LIVE SYNC
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] font-inter text-[11px] font-bold uppercase tracking-wider">
                              <Navigation size={12} /> In Transit
                            </div>
                          </div>
                        </div>

                        <div className="p-6 md:p-8">
                          
                          <div className="mb-10 relative mt-2">
                            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 -translate-y-1/2 z-0"></div>
                            <div className="absolute top-1/2 left-0 w-[65%] h-[2px] bg-[#B026FF] -translate-y-1/2 z-0 shadow-[0_0_10px_#B026FF]"></div>
                            
                            <div className="flex justify-between relative z-10">
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-[#B026FF] flex items-center justify-center text-white mb-2 shadow-[0_0_15px_rgba(176,38,255,0.4)]">
                                  <CheckCircle2 size={16} />
                                </div>
                                <p className="text-white font-grotesk text-[11px] uppercase tracking-wide">Booked</p>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-[#B026FF] flex items-center justify-center text-white mb-2 shadow-[0_0_15px_rgba(176,38,255,0.4)]">
                                  <Anchor size={16} />
                                </div>
                                <p className="text-white font-grotesk text-[11px] uppercase tracking-wide">Proceed</p>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-[#1a1b20] border-2 border-[#B026FF] flex items-center justify-center text-[#B026FF] mb-2 shadow-[0_0_15px_rgba(176,38,255,0.4)]">
                                  <Ship size={14} className="animate-pulse" />
                                </div>
                                <p className="text-[#E5B5FF] font-grotesk font-bold text-[11px] uppercase tracking-wide">Sailing (65%)</p>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-[#1a1b20] border-2 border-white/20 flex items-center justify-center text-white/30 mb-2">
                                  <Anchor size={14} />
                                </div>
                                <p className="text-white/40 font-grotesk text-[11px] uppercase tracking-wide">Arrived</p>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-[#1a1b20] border-2 border-white/20 flex items-center justify-center text-white/30 mb-2">
                                  <Package size={14} />
                                </div>
                                <p className="text-white/40 font-grotesk text-[11px] uppercase tracking-wide">Delivered</p>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            
                            <div className="space-y-6">
                              <h4 className="text-white font-grotesk text-[13px] uppercase tracking-[2px] border-b border-white/10 pb-2">Route & Schedule</h4>
                              
                              <div className="flex items-start gap-4">
                                <div className="mt-1 text-[#B026FF]"><MapPin size={18} /></div>
                                <div>
                                  <p className="text-white/50 font-inter text-[11px] uppercase tracking-wider mb-1">Origin Port</p>
                                  <p className="text-white font-bold font-inter text-[14px]">Tanjung Priok, Jakarta (ID)</p>
                                  <p className="text-white/40 font-mono text-[12px] flex items-center gap-1 mt-1"><Clock size={12}/> ATD: 12 Apr 2026, 08:00 WIB</p>
                                </div>
                              </div>

                              <div className="w-[1px] h-6 bg-white/10 ml-[9px] -my-2"></div>

                              <div className="flex items-start gap-4">
                                <div className="mt-1 text-[#BDF4FF]"><MapPin size={18} /></div>
                                <div>
                                  <p className="text-white/50 font-inter text-[11px] uppercase tracking-wider mb-1">Destination Port</p>
                                  <p className="text-white font-bold font-inter text-[14px]">Port of Rotterdam (NL)</p>
                                  <p className="text-[#BDF4FF]/70 font-mono text-[12px] flex items-center gap-1 mt-1"><Clock size={12}/> ETA: 04 May 2026, 14:30 CET</p>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-6">
                              <h4 className="text-white font-grotesk text-[13px] uppercase tracking-[2px] border-b border-white/10 pb-2">Vessel Telemetry & Cargo</h4>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#1a1b20] p-3 rounded border border-white/5">
                                  <p className="text-white/40 font-grotesk text-[9px] uppercase tracking-wider mb-1 flex items-center gap-1"><Ship size={10}/> Vessel Name</p>
                                  <p className="text-white font-mono text-[12px]">EVER BLUE</p>
                                </div>
                                <div className="bg-[#1a1b20] p-3 rounded border border-white/5">
                                  <p className="text-white/40 font-grotesk text-[9px] uppercase tracking-wider mb-1 flex items-center gap-1"><Box size={10}/> Package Type</p>
                                  <p className="text-white font-mono text-[12px]">MAJU STANDARD</p>
                                </div>
                                <div className="bg-[#1a1b20] p-3 rounded border border-white/5">
                                  <p className="text-white/40 font-grotesk text-[9px] uppercase tracking-wider mb-1 flex items-center gap-1"><Package size={10}/> Cargo Description</p>
                                  <p className="text-white font-mono text-[12px]">Lithium Batteries, 14.5T</p>
                                </div>
                                <div className="bg-[#1a1b20] p-3 rounded border border-white/5">
                                  <p className="text-white/40 font-grotesk text-[9px] uppercase tracking-wider mb-1 flex items-center gap-1"><ShieldCheck size={10}/> Cargo Type</p>
                                  <p className="text-white font-mono text-[12px]">Hazardous / Chemicals</p>
                                </div>
                              </div>
                            </div>

                          </div>

                          <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-4 justify-end">
                            <button className="px-6 py-2.5 rounded bg-[#1a1b20] hover:bg-white/5 border border-white/10 text-white font-inter text-[12px] uppercase tracking-wider transition-colors flex items-center gap-2">
                              <FileText size={14} /> View Bill of Lading
                            </button>
                          </div>

                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <h3 className="text-white font-grotesk text-[16px] uppercase tracking-[2px] mt-12 mb-6">Completed Shipments History</h3>
                <div className="bg-[#121317]/80 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#1a1b20] text-white/50 font-grotesk text-[10px] uppercase tracking-[2px] border-b border-white/5">
                          <th className="p-4 font-normal">Tracking ID</th>
                          <th className="p-4 font-normal">Date Delivered</th>
                          <th className="p-4 font-normal">Route</th>
                          <th className="p-4 font-normal">Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-white font-inter text-[13px]">
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer" onClick={() => {setTrackingNumber("MJF-5542-L1"); setShowTrackResult(false);}}>
                          <td className="p-4 font-mono text-[#BDF4FF]">MJF-5542-L1</td>
                          <td className="p-4 text-white/70">10 Jan 2026</td>
                          <td className="p-4">Singapore → Tokyo</td>
                          <td className="p-4"><span className="text-[#10B981] flex items-center gap-1 text-[11px] uppercase tracking-wider"><CheckCircle2 size={12}/> Complete</span></td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors cursor-pointer" onClick={() => {setTrackingNumber("MJF-3391-B7"); setShowTrackResult(false);}}>
                          <td className="p-4 font-mono text-[#BDF4FF]">MJF-3391-B7</td>
                          <td className="p-4 text-white/70">05 Nov 2025</td>
                          <td className="p-4">Jakarta → Sydney</td>
                          <td className="p-4"><span className="text-[#10B981] flex items-center gap-1 text-[11px] uppercase tracking-wider"><CheckCircle2 size={12}/> Complete</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </motion.div>
            )}

            {/* ========================================= */}
            {/* TAB 3: BILLING & HISTORY */}
            {/* ========================================= */}
            {activeTab === "history" && (
              <motion.div 
                key="history" 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}
              >
                <div className="mb-10 border-b border-white/5 pb-6">
                  <h1 className="text-white font-grotesk font-bold text-3xl md:text-4xl tracking-[-1px] uppercase mb-2">BILLING & <span className="text-[#B026FF]">HISTORY</span></h1>
                  <p className="text-white/50 font-inter text-[14px]">Manage your pending invoices and view transaction logs for all deployments.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="bg-[#121317] border border-[#B026FF]/20 rounded-xl p-6">
                    <p className="text-white/40 font-grotesk text-[10px] uppercase tracking-[2px] mb-2">Total Unpaid Amount</p>
                    <p className="text-[#E5B5FF] font-inter font-bold text-2xl">Rp 12.500.000</p>
                  </div>
                  <div className="bg-[#121317] border border-white/5 rounded-xl p-6">
                    <p className="text-white/40 font-grotesk text-[10px] uppercase tracking-[2px] mb-2">Pending Invoices</p>
                    <p className="text-white font-inter font-bold text-2xl">1 <span className="text-[14px] text-white/30 font-normal">deployment</span></p>
                  </div>
                  <div className="bg-[#121317] border border-white/5 rounded-xl p-6">
                    <p className="text-white/40 font-grotesk text-[10px] uppercase tracking-[2px] mb-2">Total Completed</p>
                    <p className="text-white font-inter font-bold text-2xl">Rp 8.200.000</p>
                  </div>
                </div>

                <h3 className="text-white font-grotesk text-[16px] uppercase tracking-[2px] mb-6 flex items-center gap-2"><CreditCard size={18} className="text-[#B026FF]" /> Pending Invoices</h3>
                <div className="bg-[#121317]/80 backdrop-blur-sm border border-[#B026FF]/20 rounded-xl overflow-hidden mb-12">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#1a1b20] text-white/50 font-grotesk text-[10px] uppercase tracking-[2px] border-b border-white/5">
                          <th className="p-4">Invoice ID</th>
                          <th className="p-4">Shipment Ref</th>
                          <th className="p-4">Date Issued</th>
                          <th className="p-4">Total Amount</th>
                          <th className="p-4">Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-white font-inter text-[13px]">
                        {invoices.filter(i => i.status === "Pending").map(invoice => (
                          <tr key={invoice.id} className="border-b border-white/5 hover:bg-[#B026FF]/5 transition-colors">
                            <td className="p-4 font-mono text-[#E5B5FF]">{invoice.id}</td>
                            <td className="p-4 text-white/70">{invoice.ref}</td>
                            <td className="p-4 text-white/70">{invoice.date}</td>
                            <td className="p-4 font-bold">{invoice.amount}</td>
                            <td className="p-4">
                              <button onClick={() => {setSelectedInvoice(invoice); setShowInvoiceDetail(true);}} className="bg-[#B026FF] hover:bg-[#9a1ce6] text-white px-4 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider transition-all">Confirm Payment</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <h3 className="text-white font-grotesk text-[16px] uppercase tracking-[2px] mb-6">Payment History</h3>
                <div className="bg-[#121317]/80 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden shadow-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#1a1b20] text-white/50 font-grotesk text-[10px] uppercase tracking-[2px] border-b border-white/5">
                          <th className="p-4">Invoice ID</th>
                          <th className="p-4">Shipment Ref</th>
                          <th className="p-4">Date Paid</th>
                          <th className="p-4">Amount</th>
                          <th className="p-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-white font-inter text-[13px]">
                        {invoices.filter(i => i.status === "Paid").map(invoice => (
                          <tr key={invoice.id} className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer" onClick={() => {setSelectedInvoice(invoice); setShowInvoiceDetail(true);}}>
                            <td className="p-4 font-mono text-white/40">{invoice.id}</td>
                            <td className="p-4 text-white/70">{invoice.ref}</td>
                            <td className="p-4 text-white/70">{invoice.date}</td>
                            <td className="p-4">{invoice.amount}</td>
                            <td className="p-4"><span className="text-[#10B981] flex items-center gap-1 text-[11px] uppercase tracking-wider font-bold"><CheckCircle2 size={12}/> Success</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* ========================================= */}
      {/* POP-UP MODAL INVOICE DETAIL */}
      {/* ========================================= */}
      <AnimatePresence>
        {showInvoiceDetail && selectedInvoice && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowInvoiceDetail(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-[500px] bg-[#0d0d11] border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_rgba(176,38,255,0.1)] z-10 my-auto overflow-hidden">
              <button onClick={() => setShowInvoiceDetail(false)} className="absolute top-4 right-4 text-white/40 hover:text-white"><XCircle size={24} /></button>
              <div className="absolute top-0 left-0 w-full h-[4px] bg-[#B026FF]/20" />
              
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-white font-grotesk font-bold text-2xl uppercase tracking-wider mb-1">Invoice Detail</h2>
                  <p className="text-white/40 font-mono text-[12px]">{selectedInvoice.id}</p>
                </div>
                <div className={`px-3 py-1 rounded border text-[10px] font-bold uppercase tracking-widest ${selectedInvoice.status === "Pending" ? "border-orange-500/50 text-orange-500 bg-orange-500/5" : "border-[#10B981]/50 text-[#10B981] bg-[#10B981]/5"}`}>
                  {selectedInvoice.status}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[11px] uppercase tracking-wider border-b border-white/5 pb-2">
                  <span className="text-white/40">Shipment Ref</span>
                  <span className="text-white font-mono">{selectedInvoice.ref}</span>
                </div>
                <div className="bg-[#121317] rounded-lg p-4 space-y-3">
                  {selectedInvoice.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-[12px]">
                      <span className="text-white/60">{item.desc}</span>
                      <span className="text-white font-mono">{item.price}</span>
                    </div>
                  ))}
                  <div className="pt-3 mt-1 border-t border-white/10 flex justify-between items-end">
                    <span className="text-white/40 font-grotesk text-[10px] uppercase">Grand Total</span>
                    <span className="text-[#B026FF] font-inter font-bold text-xl">{selectedInvoice.amount}</span>
                  </div>
                </div>
              </div>

              {selectedInvoice.status === "Pending" ? (
                <div className="space-y-4">
                  <div className="bg-orange-500/5 border border-orange-500/20 p-4 rounded-lg flex gap-3">
                    <AlertCircle size={20} className="text-orange-500 shrink-0" />
                    <p className="text-[11px] text-orange-500/80 leading-relaxed uppercase tracking-wider">
                      Lakukan pembayaran ke rekening Maju Fleet untuk memproses pengiriman kargo Anda ke tahap berikutnya.
                    </p>
                  </div>
                  <button onClick={() => {alert("Redirecting to secure gateway..."); setShowInvoiceDetail(false);}} className="w-full bg-[#B026FF] py-4 rounded-lg text-white font-grotesk font-bold text-[14px] uppercase tracking-[3px] shadow-[0_0_20px_rgba(176,38,255,0.3)] hover:bg-[#9a1ce6] transition-all">
                    Proceed to Pay
                  </button>
                </div>
              ) : (
                <button onClick={() => setShowInvoiceDetail(false)} className="w-full border border-white/10 py-4 rounded-lg text-white/50 font-grotesk font-bold text-[14px] uppercase tracking-[3px] hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                  <FileText size={16} /> Download PDF Receipt
                </button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}