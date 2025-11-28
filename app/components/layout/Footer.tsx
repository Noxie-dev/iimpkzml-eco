// app/components/layout/Footer.tsx

interface FooterProps {
  brandName: string;
}

const Footer: React.FC<FooterProps> = ({ brandName }) => {
  return (
    <footer className="bg-[#2B2A28] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-[#3A3937] pb-8 mb-8">
          <div className="col-span-2">
            <h3 className="text-3xl font-black tracking-tighter text-[#DCA77B] mb-4">{brandName}</h3>
            <p className="text-[#9A938D] text-lg">Style. Statement. Simple.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[#DCA77B] uppercase tracking-wider text-sm">Shop</h4>
            <ul className="space-y-3 text-[#9A938D]">
              <li><a href="#" className="hover:text-[#B25933] transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-[#B25933] transition-colors">Concepts</a></li>
              <li><a href="#" className="hover:text-[#B25933] transition-colors">New Arrivals</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[#DCA77B] uppercase tracking-wider text-sm">Support</h4>
            <ul className="space-y-3 text-[#9A938D]">
              <li><a href="#" className="hover:text-[#B25933] transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-[#B25933] transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-[#B25933] transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold mb-4 text-[#DCA77B] uppercase tracking-wider text-sm">Stay Updated</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-lg bg-[#3A3937] text-white placeholder-[#9A938D] focus:outline-none focus:ring-2 focus:ring-[#B25933]"
              />
              <button className="bg-[#B25933] hover:bg-[#9C4828] px-4 py-2 rounded-r-lg transition-colors font-semibold">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="text-center text-[#9A938D] text-sm">
          © 2024 {brandName} Apparel. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
