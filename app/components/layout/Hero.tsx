'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  cta: string;
}

interface HeroProps {
  slides: Slide[];
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
}

const Hero: React.FC<HeroProps> = ({
  slides,
  currentSlide,
  setCurrentSlide
}) => {
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length, setCurrentSlide]);

  return (
    <section
      className="relative overflow-hidden bg-[#2B2A28]"
      style={{ height: '70vh', minHeight: '400px' }}
    >
      {/* Typography Grid Background */}
      <div
        className="
          absolute inset-0 
          pointer-events-none 
          z-0
          bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),
             linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)]
          bg-[size:35px_35px]
        "
      />

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between h-full py-16 gap-8 px-4 sm:px-6 lg:px-8">
            
            {/* Left Content */}
            <div className="flex-1 text-white z-10 space-y-4 text-center md:text-left">
              <p className="text-xl md:text-2xl font-light text-[#DCA77B] uppercase tracking-widest">
                New Collection Drop
              </p>

              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
                {slide.title}
              </h1>

              <p className="text-lg md:text-xl text-white/80 max-w-md mx-auto md:mx-0">
                {slide.subtitle}
              </p>

              <button className="mt-6 bg-[#B25933] hover:bg-[#9C4828] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                {slide.cta}
              </button>
            </div>

            {/* Right Image */}
            <div className="flex-1 flex justify-center items-center h-full md:h-5/6 w-full max-w-sm md:max-w-none relative">
              <div className="relative w-full h-[350px] md:h-[480px]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}  // Improve LCP
                  sizes="(max-width: 768px) 80vw, 40vw"
                  className="object-contain rounded-3xl shadow-2xl ring-4 ring-white/10"
                />
              </div>
            </div>

          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      <button
        onClick={() =>
          setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)
        }
        className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm"
        title="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
        className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm"
        title="Next slide"
      >
        <ChevronRight size={24} />
      </button>
    </section>
  );
};

export default Hero;
