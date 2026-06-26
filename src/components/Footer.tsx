import Link from "next/link";
import { GraduationCap, MapPin, Phone, EnvelopeSimple, FacebookLogo, InstagramLogo, TwitterLogo, YoutubeLogo } from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  const links = ["Home", "About", "Gallery", "Facilities", "Contact"];

  return (
    <footer className="bg-primary text-white pt-20 pb-10 border-t-4 border-accent">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-3 group w-fit">
            <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <GraduationCap size={28} weight="fill" />
            </div>
            <div className="font-display font-bold text-2xl tracking-tight text-white">
              Step To <span className="text-accent">Success</span>
            </div>
          </Link>
          <p className="text-white/70 leading-relaxed font-sans pr-4">
            Inspiring young minds through quality education, innovation, and excellence. Building the future leaders of tomorrow.
          </p>
          <div className="flex items-center gap-4 text-white/80 mt-2">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300"><FacebookLogo size={20} weight="fill" /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300"><InstagramLogo size={20} weight="fill" /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300"><TwitterLogo size={20} weight="fill" /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300"><YoutubeLogo size={20} weight="fill" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-bold text-xl mb-6 relative inline-block">
            Quick Links
            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-accent rounded-full" />
          </h4>
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link}>
                <Link 
                  href={link === "Home" ? "/" : `#${link.toLowerCase()}`}
                  className="text-white/70 hover:text-accent transition-colors duration-300 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="lg:col-span-2">
          <h4 className="font-display font-bold text-xl mb-6 relative inline-block">
            Contact Information
            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-accent rounded-full" />
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 shrink-0 rounded-full bg-white/5 flex items-center justify-center text-accent border border-white/10">
                <MapPin size={20} weight="fill" />
              </div>
              <div>
                <h5 className="font-bold text-white mb-1">Campus Address</h5>
                <p className="text-white/70 text-sm leading-relaxed">
                  Sector 62, Educational Hub,<br />
                  Modern City, 110062
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 shrink-0 rounded-full bg-white/5 flex items-center justify-center text-accent border border-white/10">
                <Phone size={20} weight="fill" />
              </div>
              <div>
                <h5 className="font-bold text-white mb-1">Phone</h5>
                <p className="text-white/70 text-sm">
                  +91 98765 43210<br />
                  +91 11 2345 6789
                </p>
              </div>
            </div>

            <div className="flex gap-4 sm:col-span-2">
              <div className="w-10 h-10 shrink-0 rounded-full bg-white/5 flex items-center justify-center text-accent border border-white/10">
                <EnvelopeSimple size={20} weight="fill" />
              </div>
              <div>
                <h5 className="font-bold text-white mb-1">Email Us</h5>
                <p className="text-white/70 text-sm">
                  admissions@steptosuccess.edu<br />
                  info@steptosuccess.edu
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
        <p>© {new Date().getFullYear()} Step To Success. All Rights Reserved.</p>
        
        {/* Startup Credit */}
        <p className="text-xs text-white/40 mt-2 md:mt-0">
          Created by{" "}
          <a 
            href="https://dreamify.info" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/70 hover:text-accent transition-colors font-medium"
          >
            Dreamify
          </a>
        </p>

        <div className="flex items-center gap-6">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
