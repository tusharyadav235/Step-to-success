"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Quotes } from "@phosphor-icons/react/dist/ssr";

export function PrincipalMessage() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section id="about" className="py-24 md:py-40 px-6 bg-background relative overflow-hidden z-10">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto" ref={containerRef}>
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left: Principal Photo */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="w-full lg:w-5/12 relative"
          >
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:ml-0 rounded-t-[100px] rounded-b-3xl overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.1)] border-8 border-white">
              <Image 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                alt="Dr. Sarah Mitchell, Principal"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
            {/* Decorative block */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
              className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent rounded-full flex items-center justify-center shadow-xl border-4 border-[#FAFAFA]"
            >
              <Quotes size={48} weight="fill" className="text-white" />
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
            className="w-full lg:w-7/12"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 mb-6">
              <span className="text-accent font-mono font-medium text-xs tracking-[0.2em] uppercase">
                Message From Principal
              </span>
            </div>

            <h3 className="text-4xl md:text-5xl font-display font-bold text-primary mb-8 tracking-tight">
              Empowering the visionaries of tomorrow.
            </h3>

            <div className="space-y-6 text-primary/70 text-lg leading-relaxed font-sans mb-10">
              <p>
                At Step To Success, we believe that education extends far beyond the confines of a classroom. Our mission is to cultivate not just academic excellence, but to forge character, instill discipline, and inspire a lifelong love for innovation.
              </p>
              <p>
                In a rapidly evolving world, we prepare our students to be agile thinkers, compassionate leaders, and resilient problem solvers. We provide a holistic environment where every child's unique potential is recognized, nurtured, and celebrated.
              </p>
              <p>
                Together with our dedicated faculty and engaged parents, we are not just running a school; we are building a legacy of excellence and shaping the future, one student at a time.
              </p>
            </div>

            <div className="pt-8 border-t border-primary/10 flex items-center justify-between">
              <div>
                <h4 className="text-xl font-bold text-primary font-display">Dr. Sarah Mitchell</h4>
                <p className="text-accent text-sm font-medium tracking-wide uppercase mt-1">Principal, Step To Success</p>
              </div>
              <div className="opacity-40 select-none">
                {/* Signature-style font representation */}
                <span className="font-display italic text-4xl text-primary">S. Mitchell</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
