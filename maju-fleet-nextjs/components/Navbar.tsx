"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, User, Lock, Eye, EyeOff, RefreshCw, ShieldAlert, ArrowLeft, Mail, Phone, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<"none" | "login" | "register" | "admin">("none");
  const [loading, setLoading] = useState(false);

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirm, setShowRegConfirm] = useState(false);
  
  const [regPassword, setRegPassword] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const getPasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length > 0) strength += 25;
    if (pwd.length >= 8) strength += 25;
    if (/[0-9]/.test(pwd)) strength += 25;
    if (/[^A-Za-z0-9]/.test(pwd)) strength += 25;
    return strength;
  };

  const strength = getPasswordStrength(regPassword);
  let strengthColor = "bg-gray-600";
  if (strength === 25) strengthColor = "bg-red-500";
  else if (strength === 50) strengthColor = "bg-orange-500";
  else if (strength === 75) strengthColor = "bg-yellow-400";
  else if (strength === 100) strengthColor = "bg-green-500";

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    
    const currentModal = activeModal;
    setActiveModal("none");

    if (currentModal === "login" || currentModal === "register") {
      router.push("/dashboard");
    }
  };

  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) return null;

  return (
    <>
      <nav className="nav-glass fixed top-0 left-0 right-0 z-50 border-b border-white/5">
        <div className="w-full px-5 h-[68px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-0 group">
            <Image 
              src="/logo.png" 
              alt="Maju Fleet Logo" 
              width={100} 
              height={100} 
              className="transition-transform group-hover:scale-105 -mr-4" 
            />
            <span className="text-grad-logo font-grotesk font-bold text-[26px] tracking-[-1.2px] uppercase">
              MAJU Fleet
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`font-grotesk text-[13px] uppercase tracking-[-0.35px] pb-1 border-b-2 transition-all duration-200 ${
                  pathname === l.href
                    ? "text-[#E5B5FF] border-[#B026FF]"
                    : "text-white/70 border-transparent hover:text-[#BDF4FF]"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <button
                id="login-trigger-btn"
                onClick={() => setActiveModal("login")}
                className="px-6 py-2 rounded border border-[#B026FF] text-[#E5B5FF] font-grotesk text-[13px] uppercase tracking-[-0.35px] transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.002)",
                  boxShadow: "0 0 10px rgba(176,38,255,0.2), inset 0 0 10px 1px rgba(176,38,255,0.15)",
                }}
              >
                Login Dashboard
              </button>
            </motion.div>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white/70 p-1">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-white/5 bg-bg-dark px-6 py-4 flex flex-col gap-3 overflow-hidden"
            >
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-grotesk text-sm uppercase py-2 ${
                    pathname === l.href ? "text-[#E5B5FF]" : "text-white/60"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {activeModal !== "none" && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-10 overflow-y-auto">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal("none")}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            {activeModal === "login" && (
              <motion.div
                key="modal-login"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-[420px] bg-[#0a0a0c] border border-white/10 rounded-xl p-8 shadow-[0_0_50px_rgba(176,38,255,0.15)] z-10 my-auto"
              >
                <button onClick={() => setActiveModal("none")} className="absolute top-4 right-4 text-white/40 hover:text-[#B026FF] transition-colors">
                  <X size={20} />
                </button>
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#B026FF]/30 rounded-tl-xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#B026FF]/30 rounded-br-xl pointer-events-none" />

                <div className="flex flex-col items-center mb-8 mt-2">
                  <Image src="/logo.png" alt="Maju Fleet Logo" width={110} height={110} className="mb-0 opacity-100 drop-shadow-[0_0_15px_rgba(176,38,255,0.3)] -mr-3" />
                  <h2 className="text-white font-grotesk font-bold text-2xl tracking-[3px] uppercase mt-[-5px]">
                    Maju Fleet
                  </h2>
                </div>

                <form onSubmit={handleAction} className="flex flex-col gap-5">
                  <div>
                    <label className="text-white/80 font-grotesk text-[10px] uppercase tracking-[2px] mb-2 block">Username</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-80"><User size={16} /></div>
                      <input type="text" required placeholder="Enter Crew ID..." className="w-full bg-[#121317] border border-[#B026FF]/30 rounded pl-12 pr-4 py-3 text-white font-inter text-[13px] placeholder-white/30 focus:outline-none focus:border-[#B026FF] transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="text-white/80 font-grotesk text-[10px] uppercase tracking-[2px] mb-2 block">Password</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-80"><Lock size={16} /></div>
                      <input type={showLoginPassword ? "text" : "password"} required placeholder="Enter security key..." className="w-full bg-[#121317] border border-[#B026FF]/30 rounded pl-12 pr-12 py-3 text-white font-inter text-[13px] placeholder-white/30 focus:outline-none focus:border-[#B026FF] transition-colors" />
                      <button type="button" onClick={() => setShowLoginPassword(!showLoginPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                        {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <button type="submit" disabled={loading} className="w-full mt-3 py-3.5 rounded border border-[#B026FF]/50 bg-[#121317] hover:bg-[#B026FF]/10 hover:border-[#B026FF] text-white font-grotesk font-bold text-[13px] uppercase tracking-[2px] transition-all duration-300">
                    {loading ? "Authenticating..." : "System Login"}
                  </button>
                </form>

                <div className="mt-6 flex flex-col items-center gap-3 font-inter text-[12px]">
                  <p className="text-white/60">
                    Don't have an account? <button onClick={() => setActiveModal("register")} className="text-[#B026FF] font-semibold hover:text-[#BDF4FF] transition-colors">Register Now</button>
                  </p>
                  <button onClick={() => setActiveModal("admin")} className="text-white/40 hover:text-[#BDF4FF] transition-colors uppercase tracking-[1px] text-[10px] font-grotesk mt-1">
                    Login as Admin?
                  </button>
                </div>
              </motion.div>
            )}

            {activeModal === "register" && (
              <motion.div
                key="modal-register"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-[420px] bg-[#0a0a0c] border border-white/10 rounded-xl p-8 shadow-[0_0_50px_rgba(176,38,255,0.15)] z-10 my-auto"
              >
                <button onClick={() => setActiveModal("none")} className="absolute top-4 right-4 text-white/40 hover:text-[#B026FF] transition-colors">
                  <X size={20} />
                </button>
                <button onClick={() => setActiveModal("login")} className="absolute top-4 left-4 text-white/40 hover:text-[#B026FF] transition-colors">
                  <ArrowLeft size={20} />
                </button>
                
                <h2 className="text-white font-grotesk font-bold text-2xl tracking-[2px] uppercase mb-6 text-center">
                  Register Crew
                </h2>

                <form onSubmit={handleAction} className="flex flex-col gap-4">
                  <div>
                    <label className="text-white/80 font-grotesk text-[10px] uppercase tracking-[2px] mb-2 block flex justify-between">
                      <span>Username</span>
                      <span className="text-white/30 lowercase tracking-normal">max 8 characters</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-80"><User size={16} /></div>
                      <input type="text" maxLength={8} required placeholder="Choose ID..." className="w-full bg-[#121317] border border-[#B026FF]/30 rounded pl-12 pr-4 py-3 text-white font-inter text-[13px] placeholder-white/30 focus:outline-none focus:border-[#B026FF] transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="text-white/80 font-grotesk text-[10px] uppercase tracking-[2px] mb-2 block">Email</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-80"><Mail size={16} /></div>
                      <input type="email" required placeholder="Enter email..." className="w-full bg-[#121317] border border-[#B026FF]/30 rounded pl-12 pr-4 py-3 text-white font-inter text-[13px] placeholder-white/30 focus:outline-none focus:border-[#B026FF] transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="text-white/80 font-grotesk text-[10px] uppercase tracking-[2px] mb-2 block">Phone Number</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-80"><Phone size={16} /></div>
                      <input type="tel" required placeholder="08xxxxxxxxxx" className="w-full bg-[#121317] border border-[#B026FF]/30 rounded pl-12 pr-4 py-3 text-white font-inter text-[13px] placeholder-white/30 focus:outline-none focus:border-[#B026FF] transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="text-white/80 font-grotesk text-[10px] uppercase tracking-[2px] mb-2 block">Password</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-80"><Lock size={16} /></div>
                      <input type={showRegPassword ? "text" : "password"} value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required placeholder="Create password..." className="w-full bg-[#121317] border border-[#B026FF]/30 rounded pl-12 pr-12 py-3 text-white font-inter text-[13px] placeholder-white/30 focus:outline-none focus:border-[#B026FF] transition-colors" />
                      <button type="button" onClick={() => setShowRegPassword(!showRegPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                        {showRegPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex-1 h-1.5 bg-[#121317] rounded-full overflow-hidden mr-3">
                        <div className={`h-full ${strengthColor} transition-all duration-300`} style={{ width: `${strength}%` }}></div>
                      </div>
                      <span className="text-[10px] font-inter text-white/50">Strength: {strength}%</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-white/80 font-grotesk text-[10px] uppercase tracking-[2px] mb-2 block">Confirm Password</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-80"><Lock size={16} /></div>
                      <input type={showRegConfirm ? "text" : "password"} required placeholder="Repeat password..." className="w-full bg-[#121317] border border-[#B026FF]/30 rounded pl-12 pr-12 py-3 text-white font-inter text-[13px] placeholder-white/30 focus:outline-none focus:border-[#B026FF] transition-colors" />
                      <button type="button" onClick={() => setShowRegConfirm(!showRegConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                        {showRegConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="mt-2">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-white/80 font-grotesk text-[10px] uppercase tracking-[2px]">Captcha:</span>
                      <div className="bg-[#121317] border border-[#B026FF]/20 px-3 py-1.5 rounded font-mono text-white font-bold tracking-[2px] select-none">{captchaCode}</div>
                      <button type="button" onClick={generateCaptcha} className="text-white/40 hover:text-[#B026FF] transition-colors"><RefreshCw size={14} /></button>
                    </div>
                    <input type="text" required placeholder="Enter captcha code" className="w-full bg-[#121317] border border-[#B026FF]/30 rounded px-4 py-3 text-white font-inter text-[13px] placeholder-white/30 focus:outline-none focus:border-[#B026FF] transition-colors" />
                  </div>

                  <button type="submit" disabled={loading} className="w-full mt-3 py-3.5 rounded border border-[#B026FF]/50 bg-[#121317] hover:bg-[#B026FF]/10 hover:border-[#B026FF] text-white font-grotesk font-bold text-[13px] uppercase tracking-[2px] transition-all duration-300">
                    {loading ? "Processing..." : "Register"}
                  </button>
                </form>
              </motion.div>
            )}

            {activeModal === "admin" && (
              <motion.div
                key="modal-admin"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-[420px] bg-[#0a0a0c] border border-[#B026FF]/20 rounded-xl p-8 shadow-[0_0_50px_rgba(176,38,255,0.15)] z-10 my-auto"
              >
                <button onClick={() => setActiveModal("none")} className="absolute top-4 right-4 text-white/40 hover:text-[#B026FF] transition-colors">
                  <X size={20} />
                </button>
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#B026FF]/30 rounded-tl-xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#B026FF]/30 rounded-br-xl pointer-events-none" />

                <div className="flex flex-col items-center mb-8 mt-2">
                  <ShieldAlert size={48} className="mb-4 text-[#B026FF] drop-shadow-[0_0_15px_rgba(176,38,255,0.4)]" />
                  <h2 className="text-white font-grotesk font-bold text-xl tracking-[4px] uppercase text-center leading-tight">
                    Administrator <br/> Override
                  </h2>
                </div>

                <form onSubmit={handleAction} className="flex flex-col gap-5">
                  <div>
                    <label className="text-white/80 font-grotesk text-[10px] uppercase tracking-[2px] mb-2 block">Commander ID</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-80"><User size={16} /></div>
                      <input type="text" required placeholder="Authorized ID..." className="w-full bg-[#121317] border border-[#B026FF]/30 rounded pl-12 pr-4 py-3 text-white font-inter text-[13px] placeholder-white/30 focus:outline-none focus:border-[#B026FF] transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="text-white/80 font-grotesk text-[10px] uppercase tracking-[2px] mb-2 block">Master Key</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-80"><Lock size={16} /></div>
                      <input type={showAdminPassword ? "text" : "password"} required placeholder="Input clearance code..." className="w-full bg-[#121317] border border-[#B026FF]/30 rounded pl-12 pr-12 py-3 text-white font-inter text-[13px] placeholder-white/30 focus:outline-none focus:border-[#B026FF] transition-colors" />
                      <button type="button" onClick={() => setShowAdminPassword(!showAdminPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                        {showAdminPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <button type="submit" disabled={loading} className="w-full mt-3 py-3.5 rounded border border-[#B026FF]/50 bg-[#121317] hover:bg-[#B026FF]/10 hover:border-[#B026FF] text-white font-grotesk font-bold text-[13px] uppercase tracking-[2px] transition-all duration-300">
                    {loading ? "Verifying..." : "Initialize Override"}
                  </button>
                </form>

                <div className="mt-8 flex justify-center">
                  <button onClick={() => setActiveModal("login")} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[11px] font-inter uppercase tracking-[1px]">
                    <ArrowLeft size={14} /> Return to Crew Login
                  </button>
                </div>
              </motion.div>
            )}

          </div>
        )}
      </AnimatePresence>
    </>
  );
}