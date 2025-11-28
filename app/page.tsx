'use client';

import { useState, useEffect } from 'react';
import Hero from './components/layout/Hero';
import ConceptSection from './components/layout/ConceptSection';
import ProductGrid from './components/layout/ProductGrid';
import { randomPLImage } from './lib/randomImage';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  cta: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  concept: string;
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [clientSlides, setClientSlides] = useState<Slide[] | null>(null);
  const [clientProducts, setClientProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    const slides = [
      { image: randomPLImage(), title: 'Vibrant Block Drop', subtitle: 'The newest design mixing color and typography.', cta: 'Shop The Block' },
      { image: randomPLImage(), title: 'Camo Concept', subtitle: 'Streetwear utility meets architectural lines.', cta: 'Explore Camo' },
      { image: randomPLImage(), title: 'Limited Edition', subtitle: 'Exclusive pieces for the new season.', cta: 'Shop now' }
    ];
    setClientSlides(slides);

    const products = Array.from({ length: 24 }, (_, i) => {
      const isCamo = i % 2 === 0;
      const conceptName = isCamo ? 'Camo Concept' : 'Vibrant Block';

      return {
        id: i + 1,
        name: `IIMPKZML ${conceptName} Sweatshirt ${Math.floor(i / 2) + 1}`,
        price: 599 + i * 50,
        image: randomPLImage(),
        concept: conceptName
      };
    });
    setClientProducts(products);
  }, []);

  if (!clientSlides || !clientProducts) {
    return null; // Or a loading spinner
  }

  const productsPerPage = 12;
  const totalPages = Math.ceil(clientProducts.length / productsPerPage);
  const displayedProducts = clientProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <>
      <Hero slides={clientSlides} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
      <ConceptSection />
      <ProductGrid
        products={clientProducts}
        displayedProducts={displayedProducts}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={setCurrentPage}
        cartCount={cartCount}
        setCartCount={setCartCount}
      />
    </>
  );
}
