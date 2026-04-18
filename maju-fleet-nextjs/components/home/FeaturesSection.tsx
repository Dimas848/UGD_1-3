"use client";

import { motion } from "framer-motion";
import { Ship, Package, Anchor } from "lucide-react";
import { FadeUp } from "@/components/FadeUp";

const features = [
  {
    icon: Ship,
    accent: "#E5B5FF",
    border: "rgba(176,38,255,0.25)",
    title: "Global Freight Forwarding",
    desc: "Seamless port-to-port transportation of heavy cargo across major international trade routes.",
  },
  {
    icon: Package,
    accent: "#BDF4FF",
    border: "rgba(189,244,255,0.25)",
    title: "Bulk Cargo Handling",
    desc: "Specialized fleet equipped to safely manage, secure, and transport massive industrial cargo loads.",
  },
  {
    icon: Anchor,
    accent: "#E5B5FF",
    border: "rgba(176,38,255,0.25)",
    title: "Robust Vessel Operations",
    desc: "Modern fleet maintained to the highest physical standards, ensuring consistent and reliable delivery schedules.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-bg-mid">
      <div className="max-w-7xl mx-auto">
        <FadeUp className="text-center mb-14">
          <h2 className="font-grotesk font-bold text-[clamp(32px,4vw,48px)] tracking-[-2px] text-text-primary">
            Global Cargo <span className="text-grad-purple">Operation</span>
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <FadeUp key={i} delay={i * 0.12} className="h-full">
              <motion.div
                whileHover={{ y: -6, boxShadow: `0 0 30px ${f.border}` }}
                className="p-8 rounded-lg bg-bg-card2 h-full transition-shadow duration-300"
                style={{ borderBottom: `2px solid ${f.border}` }}
              >
                <f.icon size={20} style={{ color: f.accent }} className="mb-5" />
                <h3 className="font-grotesk font-bold text-[18px] text-text-primary mb-3">
                  {f.title}
                </h3>
                <p className="font-inter text-[13px] leading-[22px] text-text-muted">
                  {f.desc}
                </p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}