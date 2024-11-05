import { useContext, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const { productsData } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFromUrl = searchParams.get("search") || "";
  const [input, setInput] = useState(searchFromUrl);
  const [activeCategory, setActiveCategory] = useState("All produce");

  useEffect(() => {
    const q = searchParams.get("search");
    if (q !== null) {
      setInput(q);
    }
  }, [searchParams]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setInput(val);
    if (val.trim()) {
      setSearchParams({ search: val });
    } else {
      setSearchParams({});
    }
  };

  const categories = useMemo(() => {
    const names = productsData
      .map((product) => product.category?.name || product.category)
      .filter(Boolean);
    return ["All produce", ...new Set(names)];
  }, [productsData]);

  const filteredProducts = useMemo(() => {
    const query = input.toLowerCase().trim();
    return productsData.filter((product) => {
      const category = product.category?.name || product.category;
      const matchesCategory = activeCategory === "All produce" || category === activeCategory;
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        (typeof category === "string" && category.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, input, productsData]);

  return (
    <main className="py-12 md:py-16 px-4 md:px-8 lg:px-16">
      <header className="border-b border-[#dfe5d8] pb-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mt-4">
          <div>
            <h1 className="text-5xl md:text-6xl font-semibold text-secondary leading-none">Take your pick.</h1>
            <p className="mt-4 text-[#55705d] max-w-md font-normal">Everyday staples, picked with care and delivered without the supermarket maze.</p>
          </div>
          <div className="flex items-center border-b border-secondary w-full lg:w-[360px] pb-2">
            <Search size={18} className="text-secondary mr-3" />
            <input
              type="search"
              value={input}
              onChange={handleSearchChange}
              className="w-full bg-transparent outline-none text-sm placeholder:text-[#8b9a8d]"
              placeholder="Search the shelf"
              aria-label="Search products"
            />
          </div>
        </div>
      </header>

      <div className="mt-8 mb-5 lg:hidden">
        <div className="flex items-center gap-3 text-sm text-[#55705d] mb-3">
          <SlidersHorizontal size={16} /> Browse by category
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 px-4 py-2 text-xs border cursor-pointer transition-colors ${activeCategory === category ? "bg-secondary text-white border-secondary" : "border-[#dfe5d8] text-[#55705d]"}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 mt-6">
        <aside className="hidden lg:block border-r border-[#dfe5d8] pr-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[#55705d] mb-5">Browse</p>
          <nav className="flex flex-col items-start gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-left text-sm cursor-pointer transition-colors ${activeCategory === category ? "text-primary font-semibold" : "text-[#55705d] hover:text-secondary"}`}
              >
                {category}
              </button>
            ))}
          </nav>
        </aside>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-[#193b2a]">{activeCategory}</h2>
            <p className="text-xs uppercase tracking-widest text-[#7b8d80]">{filteredProducts.length} items</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="py-20 border-t border-[#dfe5d8] text-center">
              <h3 className="text-3xl font-semibold text-secondary">Nothing on this shelf yet.</h3>
              <p className="mt-2 text-sm text-[#55705d]">Try another search or browse all produce.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Shop;
