"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, LogOut, UserCircle, CheckCircle2, FileText, XCircle, AlertCircle } from "lucide-react";

export default function BillingHistoryPage() {
  const [showInvoiceDetail, setShowInvoiceDetail] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

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

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex flex-col relative overflow-x-hidden">
      
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5 h-[72px] flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2 lg:gap-3 shrink-0">
          <Image src="/logo.png" alt="Logo" width={45} height={45} className="-mr-1" />
          <span className="hidden sm:block text-white font-grotesk font-bold text-[16px] lg:text-[20px] tracking-[2px] uppercase mt-1">Maju Fleet</span>
        </div>

        <div className="hidden md:flex flex-1 items-center justify-center gap-4 lg:gap-8 px-4 mt-1 overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link href="/dashboard/bookship" className="font-grotesk text-[11px] lg:text-[13px] uppercase tracking-[1px] pb-2 border-b-2 transition-all duration-300 text-white/60 border-transparent hover:text-[#E5B5FF] hover:border-[#B026FF] hover:[text-shadow:-1px_0_0_rgba(255,0,0,0.6),1px_0_0_rgba(0,255,255,0.6)]">
            Book Shipment
          </Link>
          <Link href="/dashboard/myshipments" className="font-grotesk text-[11px] lg:text-[13px] uppercase tracking-[1px] pb-2 border-b-2 transition-all duration-300 text-white/60 border-transparent hover:text-[#E5B5FF] hover:border-[#B026FF] hover:[text-shadow:-1px_0_0_rgba(255,0,0,0.6),1px_0_0_rgba(0,255,255,0.6)]">
            My Shipments
          </Link>
          <Link href="/dashboard/billing" className="font-grotesk text-[11px] lg:text-[13px] uppercase tracking-[1px] pb-2 border-b-2 transition-all duration-300 text-[#E5B5FF] border-[#B026FF] font-bold [text-shadow:-1px_0_0_rgba(255,0,0,0.6),1px_0_0_rgba(0,255,255,0.6)]">
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}>
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
        </div>
      </main>

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
                      Make payment to the Maju Fleet account to process your cargo delivery to the next stage..
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