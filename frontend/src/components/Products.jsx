import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "./ProductCard";

const Products = () => {
  const { productsData } = useContext(AppContext);
  return (
    <section className="py-10 md:py-14 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#55705d]">
          Just Picked
        </span>
        <div className="w-12 border-b-2 border-primary"></div>
      </div>
      <h2 className="mt-2 text-[#193b2a] font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">
        The week’s best produce
      </h2>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-stretch justify-center gap-6">
        {productsData.slice(0, 5).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};
export default Products;
