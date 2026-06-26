"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, EnvelopeSimple, Clock, ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function ContactUs() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [formData, setFormData] = useState({ fullName: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting...');
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';
    try {
      const res = await fetch(`${apiUrl}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('Sent successfully!');
        setFormData({ fullName: '', phone: '', email: '', message: '' });
      } else {
        setStatus('Failed to send.');
      }
    } catch (err) {
      setStatus('Failed to send.');
    }
  };

  return (
    <section id="contact" className="py-24 md:py-40 px-6 bg-[#F8FAFC] relative z-10">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#94A3B8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-6xl mx-auto relative" ref={containerRef}>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="bg-white rounded-[2.5rem] shadow-2xl shadow-primary/5 overflow-hidden flex flex-col lg:flex-row border border-primary/5"
        >
          
          {/* LEFT: Premium Info Panel */}
          <div className="lg:w-5/12 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-10 md:p-16 text-white relative overflow-hidden flex flex-col justify-between">
            {/* Glowing Accent Orbs */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent rounded-full mix-blend-screen filter blur-[80px] opacity-40" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/50 rounded-full mix-blend-screen filter blur-[80px] opacity-40" />
            
            {/* Abstract Map Watermark */}
            <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800")', backgroundSize: 'cover', backgroundPosition: 'center' }} />

            <div className="relative z-10 mb-16">
              <span className="text-accent font-mono font-medium text-xs tracking-[0.2em] uppercase mb-4 block">
                Get In Touch
              </span>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
                Let's shape the future together.
              </h3>
            </div>

            <div className="relative z-10 flex flex-col gap-8">
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 shrink-0">
                  <MapPin size={24} weight="fill" />
                </div>
                <div>
                  <h5 className="font-bold text-white/90 mb-1 font-display tracking-wide">Campus Location</h5>
                  <p className="text-white/60 text-sm leading-relaxed">Sector 62, Educational Hub<br />Modern City, 110062</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 shrink-0">
                  <Phone size={24} weight="fill" />
                </div>
                <div>
                  <h5 className="font-bold text-white/90 mb-1 font-display tracking-wide">Direct Lines</h5>
                  <p className="text-white/60 text-sm leading-relaxed">+91 98765 43210<br />+91 11 2345 6789</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 shrink-0">
                  <EnvelopeSimple size={24} weight="fill" />
                </div>
                <div>
                  <h5 className="font-bold text-white/90 mb-1 font-display tracking-wide">Email Desk</h5>
                  <p className="text-white/60 text-sm leading-relaxed">admissions@steptosuccess.edu</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 shrink-0">
                  <Clock size={24} weight="fill" />
                </div>
                <div>
                  <h5 className="font-bold text-white/90 mb-1 font-display tracking-wide">Office Hours</h5>
                  <p className="text-white/60 text-sm leading-relaxed">Mon - Fri: 8:00 AM - 4:00 PM<br />Sat: 8:00 AM - 12:30 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Minimalist Form */}
          <div className="lg:w-7/12 p-10 md:p-16 bg-white flex flex-col justify-center">
            <h4 className="text-3xl font-display font-bold text-primary mb-2">Send a Message</h4>
            <p className="text-primary/60 mb-10 text-sm">We'll get back to you within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Floating Label Input: Full Name */}
                <div className="relative group">
                  <input 
                    type="text" 
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="block w-full px-0 py-3 text-base text-primary bg-transparent border-0 border-b-2 border-primary/10 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer transition-colors"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="fullName" 
                    className="absolute text-base text-primary/50 duration-300 transform -translate-y-6 scale-75 top-3 z-0 origin-[0] peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pointer-events-none"
                  >
                    Full Name
                  </label>
                </div>

                {/* Floating Label Input: Phone */}
                <div className="relative group">
                  <input 
                    type="tel" 
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="block w-full px-0 py-3 text-base text-primary bg-transparent border-0 border-b-2 border-primary/10 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer transition-colors"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="phone" 
                    className="absolute text-base text-primary/50 duration-300 transform -translate-y-6 scale-75 top-3 z-0 origin-[0] peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pointer-events-none"
                  >
                    Phone Number
                  </label>
                </div>
              </div>

              {/* Floating Label Input: Email */}
              <div className="relative group">
                <input 
                  type="email" 
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="block w-full px-0 py-3 text-base text-primary bg-transparent border-0 border-b-2 border-primary/10 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer transition-colors"
                  placeholder=" "
                />
                <label 
                  htmlFor="email" 
                  className="absolute text-base text-primary/50 duration-300 transform -translate-y-6 scale-75 top-3 z-0 origin-[0] peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pointer-events-none"
                >
                  Email Address
                </label>
              </div>

              {/* Floating Label Input: Message */}
              <div className="relative group">
                <textarea 
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="block w-full px-0 py-3 text-base text-primary bg-transparent border-0 border-b-2 border-primary/10 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer transition-colors resize-none"
                  placeholder=" "
                />
                <label 
                  htmlFor="message" 
                  className="absolute text-base text-primary/50 duration-300 transform -translate-y-6 scale-75 top-3 z-0 origin-[0] peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pointer-events-none"
                >
                  Your Message
                </label>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button 
                  type="submit"
                  disabled={status === 'Submitting...'}
                  className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-accent text-white rounded-full font-bold tracking-wide hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 disabled:opacity-70"
                >
                  {status === 'Submitting...' ? 'Sending...' : 'Send Message'}
                  <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
                </button>
                {status && status !== 'Submitting...' && (
                  <span className={`text-sm font-medium ${status.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                    {status}
                  </span>
                )}
              </div>
            </form>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
