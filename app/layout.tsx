'use client';

import './globals.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-white text-[#2B2A28]">
        <Header brandName="IIMPKZML" logoPath="/images/logo.png" />
        {children}
        <Footer brandName="IIMPKZML" />
      </body>
    </html>
  );
}
