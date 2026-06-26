"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "@phosphor-icons/react/dist/ssr";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 20 }
    },
  };

  return (
    <section className="relative w-full h-[100svh] min-h-[700px] flex items-center justify-center overflow-hidden bg-primary">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source src="/students.mp4" type="video/mp4" />
        </video>
        {/* Soft Gradient Overlay for readability while showing video */}
        <div className="absolute inset-0 bg-primary/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent z-10" />
      </div>

      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 text-center pt-24">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center w-full"
        >
          
          {/* Subtle Badge */}
          <motion.div 
            variants={itemVariants}
            className="px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-8 inline-flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-white/90 font-sans text-xs tracking-widest uppercase font-medium">World Class Education</span>
          </motion.div>

          {/* Elegant Centered Heading */}
          <div className="overflow-hidden mb-6">
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tight leading-tight"
            >
              Step To <span className="text-accent italic font-light pr-2">Success</span>
            </motion.h1>
          </div>

          <motion.p 
            variants={itemVariants}
            className="text-white/80 text-lg md:text-xl font-sans max-w-2xl leading-relaxed mb-12"
          >
            A premier educational institution dedicated to academic excellence, innovative learning, and the holistic development of every child.
          </motion.p>

          {/* Clean CTA Block */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-2xl md:rounded-full shadow-2xl"
          >
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-accent text-primary px-8 py-4 rounded-xl md:rounded-full font-bold text-sm tracking-wide transition-all duration-300 hover:bg-white hover:text-primary">
              Discover Our Campus
              <ArrowRight size={18} weight="bold" />
            </button>
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-transparent text-white px-8 py-4 rounded-xl md:rounded-full font-medium text-sm tracking-wide transition-all duration-300 hover:bg-white/10">
              <Play size={18} weight="fill" className="text-accent" />
              Watch Video
            </button>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
