"use client";

import { motion } from "framer-motion";

const facilities = [
  { 
    id: 1, 
    title: "Smart Classrooms", 
    image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800", 
    colSpan: "md:col-span-2", 
    rowSpan: "md:row-span-2" 
  },
  { 
    id: 2, 
    title: "Science Laboratory", 
    image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800", 
    colSpan: "md:col-span-1", 
    rowSpan: "md:row-span-1" 
  },
  { 
    id: 3, 
    title: "Computer Lab", 
    image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800", 
    colSpan: "md:col-span-1", 
    rowSpan: "md:row-span-1" 
  },
  { 
    id: 4, 
    title: "Grand Library", 
    image: "https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=800", 
    colSpan: "md:col-span-2", 
    rowSpan: "md:row-span-1" 
  },
  { 
    id: 5, 
    title: "Sports Complex", 
    image: "https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&w=800", 
    colSpan: "md:col-span-1", 
    rowSpan: "md:row-span-1" 
  },
  { 
    id: 6, 
    title: "Safe Transport", 
    image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800", 
    colSpan: "md:col-span-1", 
    rowSpan: "md:row-span-1" 
  },
  { 
    id: 7, 
    title: "CCTV Security", 
    image: "https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=800", 
    colSpan: "md:col-span-1", 
    rowSpan: "md:row-span-1" 
  },
  { 
    id: 8, 
    title: "Activity Rooms", 
    image: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800", 
    colSpan: "md:col-span-1", 
    rowSpan: "md:row-span-1" 
  },
];

export function Facilities() {
  return (
    <section id="facilities" className="py-24 md:py-40 px-6 bg-background relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="overflow-hidden mb-4 inline-block">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="text-xs md:text-sm tracking-[0.2em] uppercase text-accent font-mono inline-block font-bold drop-shadow-sm"
            >
              Infrastructure
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h3 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-primary font-display"
            >
              World-Class Facilities
            </motion.h3>
          </div>
        </div>

        {/* Dynamic Image Bento Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6" 
          style={{ gridAutoRows: '280px' }}
        >
          {facilities.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 80, damping: 20, delay: (index % 4) * 0.1 }}
                className={`relative group overflow-hidden rounded-3xl shadow-lg ${item.colSpan} ${item.rowSpan} cursor-pointer min-h-[280px]`}
              >
                {/* Background Image */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Premium Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:bg-primary/0 transition-colors duration-500" />

                {/* Content - Just the name, elegant and simple */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <h4 className="text-2xl md:text-3xl font-bold font-display text-white mb-2 drop-shadow-md transform group-hover:-translate-y-2 transition-transform duration-500">
                    {item.title}
                  </h4>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
