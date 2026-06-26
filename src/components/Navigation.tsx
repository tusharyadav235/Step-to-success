"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Link from "next/link";
import { List, X, GraduationCap } from "@phosphor-icons/react";
import clsx from "clsx";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 80);
  });

  const links = ["Home", "About", "Gallery", "Transport", "Facilities", "Contact"];

  return (
    <>
      <motion.nav
        className={clsx(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isScrolled ? "bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm py-4" : "bg-transparent py-6 md:py-8"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className={clsx(
              "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300",
              isScrolled ? "bg-primary text-white" : "bg-white text-primary"
            )}>
              <GraduationCap size={24} weight="fill" />
            </div>
            <div className={clsx(
              "font-display font-bold text-xl md:text-2xl tracking-tight transition-colors duration-300",
              isScrolled ? "text-primary" : "text-white"
            )}>
              Step To <span className="text-accent">Success</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-[14px] font-medium tracking-wide">
            {links.map((link) => (
              <Link 
                key={link} 
                href={link === "Home" ? "/" : `#${link.toLowerCase()}`} 
                className={clsx(
                  "relative group py-2 transition-colors duration-300",
                  isScrolled ? "text-primary/80 hover:text-primary" : "text-white/90 hover:text-white"
                )}
              >
                <span>{link}</span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <motion.button 
              className={clsx(
                "px-6 py-3 rounded-full font-bold text-sm transition-all shadow-md",
                isScrolled ? "bg-accent text-white hover:bg-accent/90" : "bg-white text-primary hover:bg-white/90"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Admission Open
            </motion.button>
          </div>

          <button 
            className={clsx(
              "lg:hidden transition-colors duration-300",
              isScrolled ? "text-primary" : "text-white"
            )}
            onClick={() => setIsOpen(true)}
          >
            <List size={32} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-primary/95 backdrop-blur-2xl flex flex-col items-center justify-center">
          <button className="absolute top-6 right-6 p-4 text-white" onClick={() => setIsOpen(false)}>
            <X size={32} />
          </button>
          <div className="flex flex-col gap-6 text-2xl font-display font-bold tracking-wider text-center text-white">
            {links.map((link, i) => (
              <motion.div
                key={link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 100, damping: 20 }}
              >
                <Link
                  href={link === "Home" ? "/" : `#${link.toLowerCase()}`}
                  className="hover:text-accent transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link}
                </Link>
              </motion.div>
            ))}
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 100, damping: 20 }}
              className="mt-6 px-8 py-4 bg-accent text-white rounded-full text-lg font-bold"
            >
              Admission Open
            </motion.button>
          </div>
        </div>
      )}
    </>
  );
}
