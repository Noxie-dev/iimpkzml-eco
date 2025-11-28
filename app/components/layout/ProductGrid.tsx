// app/components/layout/ProductGrid.tsx
'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  concept: string;
  image: string;
}

interface ProductGridProps {
  products: Product[];
  displayedProducts: Product[];
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  cartCount: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  displayedProducts,
  currentPage,
  totalPages,
  handlePageChange,
  setCartCount,
  cartCount
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#F3EFE9]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
        <h2 className="text-4xl font-black text-[#2B2A28] mb-4 md:mb-0">Shop The Collection</h2>
        <div className="text-sm text-[#9A938D] font-medium">
          Showing {displayedProducts.length} of {products.length} items
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
        {displayedProducts.map((product) => {
          return (
            <div
              key={product.id}
              className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl cursor-pointer"
            >
              <div className="relative w-full h-[240px] sm:h-[260px] bg-[#F3EFE9] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute top-3 left-3 bg-[#2B2A28] text-white text-xs px-3 py-1 rounded-full font-medium shadow-md">
                  {product.concept}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCartCount(cartCount + 1);
                  }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#B25933] text-white px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 font-bold tracking-wide hover:bg-[#9C4828] transform group-hover:translate-y-0 translate-y-2"
                >
                  Add to Cart
                </button>
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="font-semibold text-lg text-[#2B2A28] mb-0.5 truncate">{product.name}</h3>
                <p className="text-[#B25933] text-xl font-extrabold">R {product.price}</p>
              </div>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="mt-16 flex justify-center items-center space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-3 rounded-full bg-white border border-[#E3C6A9] text-[#3A3937] hover:bg-[#E3C6A9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Previous page"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-full font-semibold transition-all ${
                  currentPage === page ? 'bg-[#B25933] text-white shadow-lg' : 'bg-white text-[#3A3937] hover:bg-[#F3EFE9]'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-3 rounded-full bg-white border border-[#E3C6A9] text-[#3A3937] hover:bg-[#E3C6A9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Next page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
