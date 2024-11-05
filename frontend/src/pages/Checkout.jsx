import { useContext, useEffect, useState } from "react";
import { ArrowLeft, Check, MapPin, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext.jsx";

const Checkout = () => {
  const { cart, navigate, currency, getCartTotal, axios } = useContext(AppContext);
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    axios.get("/api/address/get").then(({ data }) => {
      if (data.success) {
        setAddress(data.addresses);
        setSelectedAddress(data.addresses[0]?._id || "");
      }
    }).catch((error) => console.log(error.message));
  }, []);

  const placeOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address.");
      return;
    }
    setPlacingOrder(true);
    try {
      const { data } = await axios.post("/api/order/place", { items: cart, address: selectedAddress, totalAmount: getCartTotal(), paymentMethod });
      if (data.success) { toast.success(data.message); navigate("/my-orders"); }
      else toast.error(data.message);
    } catch (error) { toast.error(error.response?.data?.message || error.message); }
    finally { setPlacingOrder(false); }
  };

  return (
    <main className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-8 md:pt-16">
      <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-[#55705d] hover:text-secondary"><ArrowLeft size={16} /> Back to basket</Link>
      <header className="mt-8 border-b border-[#d8e0d4] pb-8">
        <p className="text-sm text-[#55705d]">Almost there</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.035em] text-[#193b2a]">Checkout</h1>
      </header>

      <div className="grid gap-12 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <section aria-labelledby="basket-heading">
          <div className="flex items-baseline justify-between border-b border-[#b8c7b9] pb-3">
            <h2 id="basket-heading" className="text-xl font-semibold text-[#193b2a]">Your basket</h2>
            <span className="text-sm text-[#55705d]">{cart.length} {cart.length === 1 ? "item" : "items"}</span>
          </div>
          <ul className="divide-y divide-[#d8e0d4]">
            {cart.map((item) => (
              <li key={item._id} className="flex items-center justify-between gap-4 py-5">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center bg-[#f3f5ef] p-2"><img src={`http://localhost:4000/uploads/${item.images[0]}`} alt={item.name} className="h-full w-full object-contain mix-blend-multiply" /></div>
                  <div><p className="font-medium text-[#193b2a]">{item.name}</p><p className="mt-1 text-sm text-[#55705d]">Qty {item.quantity || 1}</p></div>
                </div>
                <p className="shrink-0 text-sm font-semibold text-[#193b2a]">{currency}{(item.offerPrice * (item.quantity || 1)).toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-[#b8c7b9] pt-5 text-lg font-semibold text-[#193b2a]"><span>Total</span><span>{currency}{Number(getCartTotal()).toFixed(2)}</span></div>
        </section>

        <section aria-labelledby="delivery-heading" className="bg-[#eef3e9] p-6 sm:p-8">
          <h2 id="delivery-heading" className="text-xl font-semibold text-[#193b2a]">Delivery details</h2>

          <label className="mt-8 block text-sm text-[#55705d]">Delivery address
            <span className="relative mt-2 flex items-center"><MapPin size={17} className="absolute left-3 text-[#77907d]" /><select className="h-12 w-full appearance-none border border-[#b9c9b8] bg-[#fbfaf5] pl-10 pr-3 text-sm text-[#193b2a] outline-none focus:border-secondary" value={selectedAddress} onChange={(event) => setSelectedAddress(event.target.value)}><option value="">Choose an address</option>{address.map((item) => <option className="text-[#193b2a]" key={item._id} value={item._id}>{item.name} · {item.city} · {item.country}</option>)}</select></span>
          </label>
          <button type="button" onClick={() => navigate("/add-address")} className="mt-3 text-sm font-semibold text-secondary underline decoration-primary underline-offset-4">+ Add a new address</button>

          <label className="mt-8 block text-sm text-[#55705d]">Payment method
            <select className="mt-2 h-12 w-full border border-[#b9c9b8] bg-[#fbfaf5] px-3 text-sm uppercase text-[#193b2a] outline-none focus:border-secondary" value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}><option value="cod">Cash on delivery</option><option value="online">Online payment</option></select>
          </label>

          <div className="mt-8 flex gap-3 border-t border-[#c7d6c6] pt-5 text-xs leading-5 text-[#55705d]"><ShieldCheck size={18} className="shrink-0 text-secondary" /> Your details are used only to deliver this order.</div>
          <button type="button" onClick={placeOrder} disabled={placingOrder || cart.length === 0} className="mt-7 flex h-13 w-full items-center justify-center gap-2 bg-secondary py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#193b2a] disabled:cursor-not-allowed disabled:opacity-50"><Check size={17} />{placingOrder ? "Placing order…" : paymentMethod === "cod" ? "Place order" : "Pay now"}</button>
        </section>
      </div>
    </main>
  );
};

export default Checkout;
