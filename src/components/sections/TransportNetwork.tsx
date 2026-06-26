"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Clock, MapPin, TreeEvergreen } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";

const routes = [
  { id: 1, location: "City Center", time: "07:00 AM", type: "start", desc: "Main Boarding Point" },
  { id: 2, location: "North Hub", time: "07:30 AM", type: "transit", desc: "Express Pickup" },
  { id: 3, location: "West End Plaza", time: "08:00 AM", type: "transit", desc: "Residential Zone" },
  { id: 4, location: "Campus Main Gate", time: "08:30 AM", type: "end", desc: "Final Arrival" },
];

function RouteCard({ route, index, progress }: { route: any; index: number; progress: MotionValue<number> }) {
  const isEven = index % 2 === 0;
  
  // The bus stops are roughly at these progress points:
  const stopPoints = [0, 0.33, 0.66, 1];
  const stopPos = stopPoints[index];

  // Card activates when bus is close to it
  const scale = useTransform(progress, [stopPos - 0.1, stopPos, stopPos + 0.1], [0.95, 1.05, 1]);
  const opacity = useTransform(progress, [stopPos - 0.15, stopPos - 0.05], [0.5, 1]);
  const borderColor = useTransform(
    progress, 
    [stopPos - 0.1, stopPos], 
    ["rgba(15, 23, 42, 0.05)", "rgba(56,189,248,1)"] // accent color on active
  );
  const glowOpacity = useTransform(progress, [stopPos - 0.1, stopPos], [0, 1]);

  return (
    <div 
      className={clsx(
        "relative flex items-center gap-8 md:gap-0 group",
        isEven ? "md:flex-row-reverse" : "md:flex-row"
      )}
    >
      {/* Dynamic Glowing Stop Indicator */}
      <div className="absolute left-[33px] md:left-1/2 -translate-x-1/2 w-6 h-6 z-20 flex items-center justify-center">
        <motion.div 
          className="w-5 h-5 rounded-full bg-white border-[4px] relative z-10 shadow-md"
          style={{ borderColor }}
        />
        <motion.div 
          className="absolute inset-0 bg-accent rounded-full filter blur-md"
          style={{ opacity: glowOpacity }}
        />
      </div>

      {/* Empty space for desktop alignment */}
      <div className="hidden md:block md:w-1/2" />

      {/* Content Card */}
      <div className={clsx(
        "w-full md:w-1/2 pl-24 md:pl-0 relative z-30",
        isEven ? "md:pr-24 md:text-right" : "md:pl-24 md:text-left"
      )}>
        <motion.div 
          style={{ scale, opacity, borderColor, borderWidth: '2px' }}
          className="bg-white/95 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.08)] relative overflow-hidden group-hover:-translate-y-2 transition-transform duration-500"
        >
          {/* Card Ambient Glow */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 mix-blend-multiply"
            style={{ opacity: glowOpacity }}
          />

          <div className={clsx(
            "flex items-center gap-3 text-accent mb-4 font-mono text-sm font-bold tracking-wider",
            isEven ? "md:justify-end" : "md:justify-start"
          )}>
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
              <Clock size={16} weight="bold" />
            </div>
            {route.time}
          </div>
          
          <h4 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
            {route.location}
          </h4>
          
          <div className={clsx(
            "flex items-center gap-2 mt-4 text-primary/60",
            isEven ? "md:justify-end" : "md:justify-start"
          )}>
            <MapPin size={18} />
            <p className="text-sm font-sans uppercase tracking-widest font-bold">
              {route.desc}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function TransportNetwork() {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  // Makes the bus "wait" at each stop (0%, 33%, 66%, 100%)
  const busPosition = useTransform(
    scrollYProgress,
    [0, 0.2, 0.33, 0.53, 0.66, 0.86, 1],
    ["0%", "33%", "33%", "66%", "66%", "100%", "100%"]
  );

  return (
    <section id="transport" className="py-24 md:py-40 px-6 bg-[#F8FAFC] relative z-10 border-t border-primary/5 overflow-hidden">
      
      {/* White & Greenery Environment Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img 
          src="https://images.pexels.com/photos/1083628/pexels-photo-1083628.jpeg?auto=compress&cs=tinysrgb&w=2000" 
          alt="Forest Canopy" 
          className="w-full h-full object-cover opacity-10 contrast-125 saturate-150"
        />
        {/* Soft white fade to make text legible and keep the aesthetic bright */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] via-transparent to-[#F8FAFC]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10" ref={containerRef}>
        
        {/* Header */}
        <div className="text-center mb-32 relative">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/10 text-accent font-mono text-xs tracking-[0.2em] uppercase mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Live Fleet Tracking
          </span>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-primary tracking-tight">
            Intelligent Transport.
          </h2>
          <p className="text-primary/60 mt-6 max-w-2xl mx-auto font-sans text-lg md:text-xl leading-relaxed">
            Experience our state-of-the-art GPS monitored fleet, engineered to provide the safest, most precise daily commute through beautiful, clean routes.
          </p>
        </div>

        {/* Real Road Environment */}
        <div className="relative max-w-4xl mx-auto" ref={timelineRef}>
          
          {/* Decorative Trees alongside the road */}
          <div className="absolute -left-12 md:left-24 top-[10%] text-green-600/20 drop-shadow-sm"><TreeEvergreen size={120} weight="fill" /></div>
          <div className="absolute -right-12 md:right-32 top-[25%] text-green-700/20 drop-shadow-sm"><TreeEvergreen size={160} weight="fill" /></div>
          <div className="absolute -left-8 md:left-12 top-[50%] text-green-800/15 drop-shadow-sm"><TreeEvergreen size={100} weight="fill" /></div>
          <div className="absolute -right-10 md:right-16 top-[75%] text-green-600/20 drop-shadow-sm"><TreeEvergreen size={140} weight="fill" /></div>
          <div className="absolute left-0 md:left-48 top-[90%] text-green-700/15 drop-shadow-sm"><TreeEvergreen size={90} weight="fill" /></div>

          {/* The Actual Asphalt "Road" Track */}
          <div className="absolute left-[17px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-8 md:w-16 bg-[#334155] rounded-full border-x-4 border-[#64748B] shadow-[inset_0_0_20px_rgba(0,0,0,0.4),0_10px_30px_rgba(0,0,0,0.1)] overflow-hidden">
            {/* Yellow Dashed lines running down the center */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[4px] opacity-80"
                 style={{ backgroundImage: 'linear-gradient(to bottom, #FBBF24 50%, transparent 50%)', backgroundSize: '100% 40px' }} 
            />
            {/* Glowing trail left behind the bus */}
            <motion.div 
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-transparent via-accent/30 to-accent/60 opacity-50 origin-top"
              style={{ height: busPosition }}
            />
          </div>

          {/* High-End 3D Bus PNG */}
          <motion.div
            className="absolute left-[33px] md:left-1/2 -translate-x-1/2 w-20 md:w-28 h-20 md:h-28 z-40 transition-transform duration-300"
            style={{ top: busPosition, y: "-50%" }}
          >
            <div className="relative w-full h-full">
              {/* Subtle Shadow underneath bus */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-8 bg-black/40 rounded-full blur-[8px]" />
              <img 
                src="https://cdn-icons-png.flaticon.com/512/3448/3448339.png" 
                alt="School Bus Tracking" 
                className="w-full h-full object-contain transform hover:scale-110 transition-transform cursor-pointer relative z-10"
              />
            </div>
          </motion.div>

          {/* Dynamic Stops */}
          <div className="space-y-32 md:space-y-48 flex flex-col justify-between relative py-4 z-30">
            {routes.map((route, i) => (
              <RouteCard key={route.id} route={route} index={i} progress={scrollYProgress} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
