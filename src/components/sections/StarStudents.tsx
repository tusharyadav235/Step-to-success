"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Trophy, Star } from "@phosphor-icons/react/dist/ssr";

const students = [
  {
    id: 1,
    name: "Arjun Verma",
    class: "Class XII - Science",
    achievement: "National Science Olympiad Winner",
    rank: "Rank 1",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    name: "Priya Sharma",
    class: "Class XII - Commerce",
    achievement: "CBSE Board Topper (State Level)",
    rank: "99.4%",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    name: "Rohan Desai",
    class: "Class X",
    achievement: "International Debate Champion",
    rank: "Gold Medal",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
  },
];

export function StarStudents() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [starStudents, setStarStudents] = useState<any[]>(students);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';
    fetch(`${apiUrl}/api/students`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const formattedStudents = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            class: item.description || "Student",
            achievement: item.achievementTitle,
            rank: "Featured",
            image: item.imageUrl || "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600"
          }));
          setStarStudents(formattedStudents);
        }
      })
      .catch(err => console.error("Failed to fetch students:", err));
  }, []);

  return (
    <section className="py-24 md:py-40 px-6 bg-primary text-white relative z-10">
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="max-w-2xl">
            <div className="overflow-hidden mb-4">
              <motion.h2 
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="text-xs md:text-sm tracking-[0.2em] uppercase text-accent font-mono font-bold"
              >
                Excellence Personified
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h3 
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter font-display"
              >
                Our Star Students
              </motion.h3>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 text-white/70"
          >
            <Trophy size={32} className="text-accent" weight="duotone" />
            <span className="font-mono text-sm uppercase tracking-widest">Hall of Fame</span>
          </motion.div>
        </div>

        {/* Students Grid/Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {starStudents.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: index * 0.15 }}
              className="group relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(245,158,11,0.15)] hover:border-accent/30 overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Circular Photo */}
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 group-hover:border-accent transition-colors duration-500 mb-6 relative shadow-xl">
                  <Image 
                    src={student.image}
                    alt={student.name}
                    fill
                    unoptimized={student.image.includes('localhost')}
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  {/* Decorative Star Badge */}
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-accent rounded-full flex items-center justify-center border-4 border-primary">
                    <Star size={16} weight="fill" className="text-white" />
                  </div>
                </div>

                {/* Details */}
                <h4 className="text-2xl font-bold font-display mb-1 text-white group-hover:text-accent transition-colors">
                  {student.name}
                </h4>
                <p className="text-white/50 text-sm font-mono tracking-widest uppercase mb-6">
                  {student.class}
                </p>

                <div className="w-full pt-6 border-t border-white/10">
                  <p className="text-white/90 font-medium mb-2">{student.achievement}</p>
                  <p className="text-accent font-bold text-lg font-display">{student.rank}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
