import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import VisionMissionSection from "@/components/home/VisionMissionSection";
import MetricsSection from "@/components/home/MetricsSection";
import ServicesSection from "@/components/home/ServiceSection"; 

import AboutHero from "@/components/about/AboutHero";
import AboutVisionMission from "@/components/about/AboutVisionMission";
import AboutMetrics from "@/components/about/AboutMetrics";
import DeepTechGrid from "@/components/about/DeepTechGrid";

import ContactForm from "@/components/contact/ContactForm";
import ContactPersons from "@/components/contact/ContactPersons";
import { FadeUp } from "@/components/FadeUp";

export default function HomePage() {
  return (
    <div className="bg-[#0a0a0c]">
      
      {/* SECTION: HOME */}
      <section id="home">
        <HeroSection />
        <FeaturesSection />
        <VisionMissionSection />
        <MetricsSection />
      </section>

      {/* SECTION: ABOUT US */}
      <section id="about">
        <AboutHero />
        <AboutVisionMission />
        <AboutMetrics />
        <DeepTechGrid />
      </section>

      {/* SECTION: OUR SERVICES */}
      <section id="services">
         {/* Render komponen Services di sini */}
         <ServicesSection />
      </section>

      {/* SECTION: CONTACT US */}
      <section id="contact" className="relative py-24 px-6 overflow-hidden">
        <div className="fixed right-[-128px] top-[240px] w-[500px] h-[500px] rounded-xl pointer-events-none z-0" style={{ background: "#B026FF", opacity: 0.15, filter: "blur(90px)" }} />
        <div className="fixed left-[-128px] bottom-[-120px] w-[420px] h-[420px] rounded-xl pointer-events-none z-0" style={{ background: "rgba(0,227,253,0.12)", filter: "blur(75px)" }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <FadeUp className="text-center mb-20">
            <h1 className="font-grotesk font-bold tracking-[-3.6px] text-white mb-5" style={{ fontSize: "clamp(44px, 6vw, 72px)" }}>
              CONTACT <span className="text-grad-purple">US</span> 
            </h1>
            <p className="font-inter font-light text-[18px] tracking-[0.5px] max-w-[480px] mx-auto" style={{ color: "rgba(210,193,215,0.6)" }}>
              Reach out to our command center for enterprise inquiries.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ContactForm />
            <ContactPersons />
          </div>
        </div>
      </section>

    </div>
  );
}