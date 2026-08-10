import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Package } from "lucide-react";
import { AppContext } from "../context/AppContext";

const statusColor = {
  Pending: "bg-[#c88212]",
  Processing: "bg-[#6d8d68]",
  Shipped: "bg-[#557a91]",
  Delivered: "bg-[#3f730a]",
  Cancelled: "bg-[#a14d42]",
};

const MyOrder = () => {
  const { currency, axios, user, navigate } = useContext(AppContext);
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    if (!user) return;
    axios.get("/api/order/my-orders").then(({ data }) => {
      if (data.success) setMyOrders(data.orders);
    }).catch((error) => console.log(error.message));
  }, [user]);

  return (
    <main className="mx-auto min-h-[calc(100vh-80px)] max-w-6xl px-5 pb-24 pt-14 sm:px-8 md:pt-20">
      <header className="flex flex-col justify-between gap-6 border-b border-[#d8e0d4] pb-9 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm text-[#55705d]">Your account</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.035em] text-[#193b2a]">Orders</h1>
        </div>
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-secondary underline decoration-primary underline-offset-4 hover:text-primary">Shop fresh produce <ArrowRight size={16} /></Link>
      </header>

      {myOrders.length === 0 ? (
        <section className="flex min-h-[420px] flex-col items-center justify-center text-center">
          <Package size={42} strokeWidth={1.2} className="text-[#8fa492]" />
          <h2 className="mt-6 text-2xl font-semibold text-[#193b2a]">No orders yet</h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[#55705d]">Your next basket of seasonal produce will appear here.</p>
          <button type="button" onClick={() => navigate("/shop")} className="mt-7 border-b border-primary pb-1 text-sm font-semibold text-secondary hover:text-primary">Start shopping <ArrowRight className="ml-1 inline" size={15} /></button>
        </section>
      ) : (
        <section className="mt-8" aria-label="Order history">
          <div className="hidden grid-cols-[1.2fr_1fr_1fr_1fr_1fr] border-b border-[#b8c7b9] pb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#7b8d80] md:grid">
            <span>Order</span><span>Total</span><span>Payment</span><span>Status</span><span>Date</span>
          </div>
          <ul>
            {myOrders.map((order) => (
              <li key={order._id} className="grid gap-4 border-b border-[#d8e0d4] py-6 md:grid-cols-[1.2fr_1fr_1fr_1fr_1fr] md:items-center">
                <div><p className="text-xs uppercase tracking-[0.14em] text-[#7b8d80] md:hidden">Order</p><p className="mt-1 font-mono text-sm text-[#193b2a]">#{order._id.slice(-6).toUpperCase()}</p></div>
                <div><p className="text-xs uppercase tracking-[0.14em] text-[#7b8d80] md:hidden">Total</p><p className="mt-1 font-semibold text-[#193b2a]">{currency}{order.totalAmount}</p></div>
                <div><p className="text-xs uppercase tracking-[0.14em] text-[#7b8d80] md:hidden">Payment</p><p className="mt-1 text-sm capitalize text-[#55705d]">{order.paymentMethod}</p></div>
                <div><p className="text-xs uppercase tracking-[0.14em] text-[#7b8d80] md:hidden">Status</p><p className="mt-1 flex items-center gap-2 text-sm text-[#193b2a]"><span className={`h-2 w-2 rounded-full ${statusColor[order.status] || "bg-[#8fa492]"}`} />{order.status}</p></div>
                <div><p className="text-xs uppercase tracking-[0.14em] text-[#7b8d80] md:hidden">Date</p><p className="mt-1 text-sm text-[#55705d]">{new Date(order.createdAt).toLocaleDateString()}</p></div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
};

export default MyOrder;
