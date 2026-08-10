import { assets } from "../assets/assets";

const Brands = () => {
  const brands = [
    assets.brand_1,
    assets.brand_2,
    assets.brand_3,
    assets.brand_4,
    assets.brand_5,
  ];

  return (
    <section className="py-10 border-y border-[#dfe5d8] bg-[#fcfbf7]/50">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <p className="shrink-0 text-xs uppercase tracking-[0.25em] font-semibold text-[#55705d]">
          Trusted by growers
        </p>
        <div className="hidden lg:block h-px flex-1 bg-[#dfe5d8]"></div>
        
        {/* All 5 icons forced in the SAME SINGLE ROW */}
        <div className="w-full lg:w-auto flex flex-nowrap items-center justify-between sm:justify-center gap-3 sm:gap-8 md:gap-12 overflow-x-auto py-1">
          {brands.map((brand, index) => (
            <div key={index} className="flex-shrink-0 group">
              <img
                src={brand}
                alt={`Partner ${index + 1}`}
                className="h-10 sm:h-12 md:h-14 w-auto object-contain opacity-65 grayscale group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
