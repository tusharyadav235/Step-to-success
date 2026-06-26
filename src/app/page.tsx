import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { CampusGallery } from "@/components/sections/CampusGallery";
import { LibrarySection } from "@/components/sections/LibrarySection";
import { TransportNetwork } from "@/components/sections/TransportNetwork";
import { PrincipalMessage } from "@/components/sections/PrincipalMessage";
import { StarStudents } from "@/components/sections/StarStudents";
import { Facilities } from "@/components/sections/Facilities";
import { ContactUs } from "@/components/sections/ContactUs";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full flex flex-col">
      <Navigation />
      <Hero />
      <CampusGallery />
      <LibrarySection />
      <TransportNetwork />
      <PrincipalMessage />
      <StarStudents />
      <Facilities />
      <ContactUs />
      <Footer />
    </main>
  );
}
