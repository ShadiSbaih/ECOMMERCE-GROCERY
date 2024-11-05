import { useContext } from "react";
import { CircleX, Minus, Plus, ArrowRight } from "lucide-react";
import { AppContext } from "../context/AppContext";

const Cart = () => {
  const { cart, currency, navigate, removeFromCart, addToCart, getCartTotal } = useContext(AppContext);
  const total = getCartTotal();

  return (
    <main className="max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-24 min-h-[520px]">
      <header className="border-b border-[#dfe5d8] pb-8">
        <div className="flex items-end justify-between gap-4 mt-4"><h1 className="text-5xl md:text-6xl font-semibold text-secondary leading-none">Your basket</h1><p className="text-sm text-[#7b8d80]">{cart.length} {cart.length === 1 ? "item" : "items"}</p></div>
      </header>

      {cart.length === 0 ? (
        <div className="py-24 text-center border-b border-[#dfe5d8]"><h2 className="text-3xl font-semibold text-[#193b2a]">Your basket is empty.</h2><p className="mt-3 text-[#55705d] font-normal">Take a look around and bring home something fresh.</p><button onClick={() => navigate("/shop")} className="mt-7 text-secondary font-semibold border-b border-primary pb-1 cursor-pointer">Continue shopping →</button></div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_280px] gap-12 lg:gap-20 items-start">
          <section>
            <div className="hidden md:grid grid-cols-[1fr_120px_140px_40px] gap-5 py-4 text-xs uppercase tracking-widest text-[#7b8d80] border-b border-[#dfe5d8]"><span>Product</span><span>Price</span><span>Quantity</span><span></span></div>
            {cart.map((item) => (
              <article key={item._id} className="grid grid-cols-1 md:grid-cols-[1fr_120px_140px_40px] gap-4 md:gap-5 items-center py-6 border-b border-[#dfe5d8]">
                <div className="flex items-center gap-5 min-w-0"><img src={`http://localhost:4000/uploads/${item.images[0]}`} alt={item.name} className="w-24 h-24 object-contain mix-blend-multiply shrink-0" /><div><p className="text-xs uppercase tracking-widest text-primary">{item.category?.name || item.category}</p><h2 className="text-xl font-semibold text-[#193b2a]">{item.name}</h2><p className="text-sm text-[#7b8d80] mt-1">{item.weight}</p></div></div>
                <p className="text-lg text-secondary">{currency}{item.offerPrice}</p>
                <div className="flex items-center gap-3"><button onClick={() => removeFromCart(item._id)} aria-label={`Decrease ${item.name}`} className="w-7 h-7 border border-[#b8c7b9] text-secondary flex items-center justify-center cursor-pointer"><Minus size={14} /></button><span className="w-5 text-center">{item.quantity}</span><button onClick={() => addToCart(item)} aria-label={`Increase ${item.name}`} className="w-7 h-7 border border-[#b8c7b9] text-secondary flex items-center justify-center cursor-pointer"><Plus size={14} /></button></div>
                <button onClick={() => removeFromCart(item._id)} aria-label={`Remove ${item.name}`} className="text-[#7b8d80] hover:text-red-600 cursor-pointer"><CircleX size={19} /></button>
              </article>
            ))}
          </section>

          <aside className="lg:sticky lg:top-8 pt-7 lg:border-t lg:border-[#dfe5d8]"><p className="text-xs uppercase tracking-[0.22em] text-[#55705d]">Order total</p><div className="flex items-baseline justify-between mt-5"><span className="text-lg text-[#193b2a]">Subtotal</span><span className="text-2xl font-semibold text-secondary">{currency}{total.toFixed(2)}</span></div><p className="mt-3 text-sm text-[#7b8d80] font-normal">Delivery and taxes are calculated at checkout.</p><button onClick={() => navigate("/checkout")} className="mt-8 w-full flex items-center justify-center gap-3 bg-secondary text-white py-3 cursor-pointer hover:bg-primary transition-colors">Continue to checkout <ArrowRight size={17} /></button></aside>
        </div>
      )}
    </main>
  );
};

export default Cart;
