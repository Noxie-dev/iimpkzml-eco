'use client';

import React from 'react';

const Hero = () => {
  return (
    <section
      className="relative overflow-hidden bg-[#2B2A28] flex items-center justify-center"
      style={{ height: '70vh', minHeight: '450px' }}
    >
      {/* Typography Grid Background */}
      <div
        className="
          absolute inset-0 
          pointer-events-none 
          z-0
          bg-[linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),
             linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)]
          bg-[size:35px_35px]
        "
      />

      {/* ---------------------------
          CAROUSEL COMMENTED OUT
      --------------------------- */}

      {/*
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="relative z-10 max-w-6xl w-full mx-auto px-6 flex flex-col md:flex-row items-center justify-center md:justify-between gap-10 md:gap-16">
            <div className="flex-1 text-white text-center md:text-left space-y-4">
              <p className="text-lg md:text-xl font-light text-[#DCA77B] uppercase tracking-widest">
                New Collection Drop
              </p>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
                {slide.title}
              </h1>

              <p className="text-base md:text-lg text-white/80 max-w-md mx-auto md:mx-0">
                {slide.subtitle}
              </p>

              <button className="mt-4 bg-[#B25933] hover:bg-[#9C4828] text-white px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                {slide.cta}
              </button>
            </div>

            <div className="flex-1 flex justify-center items-center">
              <div className="relative w-[70%] sm:w-[55%] md:w-[45%] lg:w-[38%] xl:w-[32%] aspect-[3/4]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 70vw, 30vw"
                  className="object-cover rounded-3xl shadow-2xl ring-4 ring-white/10"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      */}

      {/* ---------------------------
          REPLACEMENT STATIC CONTENT
      --------------------------- */}

      <div className="relative z-10 text-center px-6">
        <p className="text-lg md:text-xl font-light text-[#DCA77B] uppercase tracking-widest mb-4">
          New Collection Drop
        </p>

        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">
          STYLE THAT SPEAKS
        </h1>

        <p className="text-white text-lg md:text-xl mt-4 max-w-2xl mx-auto">
          Premium looks crafted with personality and confidence.  
        </p>

        <button className="mt-8 bg-[#B25933] hover:bg-[#9C4828] text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
