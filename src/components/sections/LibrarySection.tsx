"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Books, Database, Desktop, Users } from "@phosphor-icons/react/dist/ssr";
import CircularGallery from "../ui/CircularGallery";

const stats = [
  { label: "Physical Books", value: "50,000+", icon: Books },
  { label: "Digital Archives", value: "100,000+", icon: Database },
  { label: "Study Stations", value: "250+", icon: Desktop },
  { label: "Daily Visitors", value: "1,200+", icon: Users },
];

export function LibrarySection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section className="py-24 md:py-32 px-6 bg-background relative z-10">
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          
          {/* Left: Interactive Books Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="w-full lg:w-1/2 relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-[#0F172A]"
          >
            <CircularGallery
              items={[
                { image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=800&auto=format&fit=crop", text: "Classic Literature" },
                { image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=800&auto=format&fit=crop", text: "Ancient History" },
                { image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop", text: "Modern Science" },
                { image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop", text: "Philosophy" },
                { image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop", text: "Arts & Culture" },
                { image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop", text: "World Geography" }
              ]}
              bend={1}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollEase={0.05}
              font="bold 30px Playfair Display"
              fontUrl="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
            />
          </motion.div>

          {/* Right: Elegant Typography and Stats */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            
            <div className="mb-10">
              <span className="text-accent font-mono font-medium text-xs tracking-widest uppercase mb-4 block">
                The Grand Library
              </span>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
                className="text-4xl md:text-5xl font-display font-bold text-primary tracking-tight mb-6 leading-tight"
              >
                A sanctuary for curious minds.
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
                className="text-primary/70 text-lg leading-relaxed font-sans"
              >
                Spanning over 15,000 square feet, our heritage library seamlessly blends ancient wisdom with cutting-edge digital archives.
              </motion.p>
            </div>

            {/* Clean Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.3 }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={i} 
                    className="bg-muted p-6 rounded-2xl border border-primary/5 hover:border-accent/30 hover:bg-muted/80 transition-colors duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4">
                      <Icon size={20} weight="fill" />
                    </div>
                    <div className="text-2xl md:text-3xl font-display font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-primary/60 font-mono text-xs uppercase tracking-wider">{stat.label}</div>
                  </div>
                );
              })}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
