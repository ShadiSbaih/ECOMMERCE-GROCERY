import { useContext } from "react";
import { CircleX, ShoppingBasket } from "lucide-react";
import { AppContext } from "../context/AppContext";

const WishList = () => {
  const { favorite, currency, removeFromFavorite, addToCart, navigate } = useContext(AppContext);

  return (
    <main className="max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-24 min-h-[520px]">
      <header className="flex items-end justify-between border-b border-[#dfe5d8] pb-8">
        <div>
          <h1 className="mt-4 text-5xl md:text-6xl font-semibold text-secondary leading-none">Your wishlist</h1>
        </div>
        <p className="text-sm text-[#7b8d80]">{favorite.length} {favorite.length === 1 ? "item" : "items"}</p>
      </header>

      {favorite.length === 0 ? (
        <div className="py-24 text-center border-b border-[#dfe5d8]">
          <h2 className="text-3xl font-semibold text-[#193b2a]">Nothing saved yet.</h2>
          <p className="mt-3 text-[#55705d] font-normal">Keep your next good meal close by saving something from the shop.</p>
          <button onClick={() => navigate("/shop")} className="mt-7 text-secondary font-semibold border-b border-primary pb-1 cursor-pointer">Browse the shop →</button>
        </div>
      ) : (
        <section>
          <div className="hidden md:grid grid-cols-[1fr_160px_160px] gap-6 py-4 text-xs uppercase tracking-widest text-[#7b8d80] border-b border-[#dfe5d8]"> <span>Product</span><span>Price</span><span>Actions</span></div>
          {favorite.map((item) => (
            <article key={item._id} className="grid grid-cols-1 md:grid-cols-[1fr_160px_160px] gap-4 md:gap-6 items-center py-6 border-b border-[#dfe5d8]">
              <div className="flex items-center gap-5 min-w-0">
                <img src={`http://localhost:4000/uploads/${item.images[0]}`} alt={item.name} className="w-24 h-24 object-contain mix-blend-multiply shrink-0" />
                <div><p className="text-xs uppercase tracking-widest text-primary">{item.category?.name || item.category}</p><h2 className="text-xl font-semibold text-[#193b2a]">{item.name}</h2><p className="text-sm text-[#7b8d80] mt-1">{item.weight}</p></div>
              </div>
              <p className="text-lg text-secondary">{currency}{item.offerPrice}</p>
              <div className="flex items-center gap-5 text-sm">
                <button onClick={() => addToCart(item)} className="flex items-center gap-2 text-secondary font-semibold cursor-pointer hover:text-primary"><ShoppingBasket size={17} /> Add to basket</button>
                <button onClick={() => removeFromFavorite(item._id)} aria-label={`Remove ${item.name}`} className="text-[#7b8d80] hover:text-red-600 cursor-pointer"><CircleX size={19} /></button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default WishList;
