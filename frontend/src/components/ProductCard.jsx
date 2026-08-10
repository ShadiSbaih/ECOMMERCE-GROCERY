import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { currency, addToCart } = useContext(AppContext);
  return (
    <div className="group w-full border-t border-[#dfe5d8] pt-4 pb-7 transition-colors hover:border-secondary">
      <p className="text-xs uppercase tracking-widest text-[#7b8d80]">{product.weight}</p>
      <Link to={`/product/${product._id}`} className="cursor-pointer">
        <img
          src={`http://localhost:4000/uploads/${product.images[0]}`}
          alt={product.name}
          className="w-full h-52 object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <button
        onClick={() => addToCart(product)}
        className="flex items-center justify-center gap-2 mb-4 w-full py-2.5 bg-secondary text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ShoppingCart size={16} /> Add to basket
      </button>
      <div>
        <p className="text-primary text-xs uppercase tracking-widest font-semibold">
          {product.category?.name || product.category}
        </p>
        <h2 className="text-2xl font-semibold text-[#193b2a] mt-1">{product.name}</h2>
      </div>
      <div className="flex items-center gap-3 mt-2">
        <p className="text-base font-normal line-through text-gray-400">
          {currency}
          {product.price}
        </p>
        <p className="text-base font-semibold text-secondary">
          {currency}
          {product.offerPrice}
        </p>
      </div>
    </div>
  );
};
export default ProductCard;
