// app/components/layout/ConceptSection.tsx
'use client'; // optional now, but safe if interactivity is added later

import { ChevronRight } from 'lucide-react';

const ConceptSection: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#9A938D] mb-2">
          Our Philosophy
        </p>
        <h2 className="4xl md:text-5xl font-extrabold text-[#2B2A28] mb-4">
          The Convergence of Art & Apparel
        </h2>
        <p className="text-xl max-w-3xl mx-auto text-[#3A3937]">
          We transform concepts from modernist art and global typography into limited-edition streetwear. Every piece tells a story, blurring the line between wearable fashion and collectible design artifact.
        </p>
        <div className="mt-10">
          <button className="text-[#B25933] font-semibold text-lg hover:text-[#9C4828] transition-colors flex items-center mx-auto space-x-2 group">
            <span>Read The Full Story</span>
            <ChevronRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConceptSection;
