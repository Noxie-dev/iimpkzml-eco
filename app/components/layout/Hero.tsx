'use client';

import React from 'react';
import Image from 'next/image';

const Hero = () => {
  const rows = 15;
  const repeatsPerRow = 20;

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: '70vh', minHeight: '450px' }}
    >
      <Image
        src="/images/hero-img.png"
        alt="Hero Background"
        fill
        className="object-cover z-0"
      />

      {/* Foreground content */}
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
