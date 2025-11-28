'use client';

import { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

interface HeaderProps {
  brandName: string;
  logoPath: string;
}

export default function Header({ brandName, logoPath }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Shop', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="w-full bg-white border-b border-black/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image src={logoPath} alt={brandName} width={40} height={40} />
          <span className="font-black text-2xl tracking-tight text-[#2B2A28]">
            {brandName}
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-10">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-lg font-medium text-[#2B2A28] hover:text-[#B25933] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="hidden md:flex items-center gap-6">
          <button className="relative" title="View shopping cart">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-[#B25933] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          title="Open menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-black/10 px-4 py-4 space-y-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block text-lg font-medium text-[#2B2A28] hover:text-[#B25933] transition-colors"
            >
              {item.label}
            </a>
          ))}

          <div className="flex items-center gap-4 mt-4">
            <ShoppingCart size={24} />
            <span className="text-[#2B2A28] font-medium">Cart (0)</span>
          </div>
        </div>
      )}
    </header>
  );
}
