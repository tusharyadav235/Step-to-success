"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import DomeGallery from "../ui/DomeGallery";

const images = [
  {
    src: "https://images.pexels.com/photos/5212348/pexels-photo-5212348.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "Interactive Learning"
  },
  {
    src: "https://images.pexels.com/photos/8613303/pexels-photo-8613303.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "Playing Sports"
  },
  {
    src: "https://images.pexels.com/photos/8612920/pexels-photo-8612920.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "Dancing & Performing"
  },
  {
    src: "https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "Science Experiments"
  },
  {
    src: "https://images.pexels.com/photos/8612918/pexels-photo-8612918.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "Creative Arts"
  },
  {
    src: "https://images.pexels.com/photos/2881226/pexels-photo-2881226.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "Campus Friendships"
  },
  {
    src: "https://images.pexels.com/photos/8613313/pexels-photo-8613313.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "Joyful Recess"
  }
];

export function CampusGallery() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [galleryImages, setGalleryImages] = useState(images);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';
    fetch(`${apiUrl}/api/gallery`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const formattedImages = data.map((item: any) => ({
            src: item.imageUrl,
            alt: item.altText || "Gallery Image"
          }));
          setGalleryImages(formattedImages);
        }
      })
      .catch(err => console.error("Failed to fetch gallery images:", err));
  }, []);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-background relative z-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 mb-12" ref={containerRef}>
        <div className="text-center">
          <span className="text-accent font-mono font-medium text-xs tracking-widest uppercase mb-4 block">
            Campus Life
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-primary font-display"
          >
            Gallery
          </motion.h2>
        </div>
      </div>

      <div className="w-full h-[600px] md:h-[800px] relative">
        <DomeGallery 
          images={galleryImages}
          fit={0.8}
          minRadius={600}
          maxVerticalRotationDeg={0}
          segments={34}
          dragDampening={2}
          grayscale={false}
          overlayBlurColor="#FAF8F5"
        />
      </div>
    </section>
  );
}
