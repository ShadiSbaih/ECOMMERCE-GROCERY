import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PackageCheck } from "lucide-react";
import { AppContext } from "../../context/AppContext";

const statusStyles = {
  Pending: "border-[#c8871a] bg-[#fff8e8] text-[#80530a]",
  Processing: "border-[#78966f] bg-[#f0f5ed] text-[#42613b]",
  Shipped: "border-[#7597aa] bg-[#edf4f7] text-[#3d6275]",
  Delivered: "border-[#4e8b18] bg-[#eff7e9] text-[#35610a]",
  Cancelled: "border-[#b76a5d] bg-[#fff0ed] text-[#8a3d33]",
};

const Orders = () => {
  const { currency, axios, admin } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/all");
      if (data.success) setOrders(data.orders);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (admin) fetchOrders();
  }, [admin]);

  const updateOrderStatus = async (id, status) => {
    try {
      const { data } = await axios.put(`/api/order/status/${id}`, { status });
      if (data.success) {
        toast.success(data.message);
        fetchOrders();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex items-end justify-between border-b border-[#d8e0d4] pb-6">
        <div>
          <h1 className="mt-1 text-3xl font-semibold tracking-[-0.03em] text-[#193b2a]">
            Orders
          </h1>
        </div>
        <span className="text-sm text-[#55705d]">{orders.length} total</span>
      </header>

      {orders.length === 0 ? (
        <div className="flex min-h-64 flex-col items-center justify-center border-y border-[#d8e0d4] text-center text-[#55705d]">
          <PackageCheck size={34} strokeWidth={1.4} />
          <p className="mt-4 text-sm">No orders to fulfil.</p>
        </div>
      ) : (
        <section className="overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-[1.1fr_1.2fr_1.8fr_0.7fr_0.8fr_1fr] gap-4 border-b border-[#b8c7b9] px-4 pb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#7b8d80]">
              <span>Customer</span>
              <span>Email</span>
              <span>Delivery</span>
              <span>Total</span>
              <span>Payment</span>
              <span>Status</span>
            </div>
            <div className="divide-y divide-[#d8e0d4]">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="grid grid-cols-[1.1fr_1.2fr_1.8fr_0.7fr_0.8fr_1fr] items-center gap-4 px-4 py-5 text-sm text-[#193b2a]"
                >
                  <div>
                    <p className="font-medium">
                      {order.user?.name || "Guest customer"}
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-[#7b8d80]">
                      #{order._id.slice(-6).toUpperCase()}
                    </p>
                  </div>
                  <p className="truncate text-[#55705d]">
                    {order.user?.email || "—"}
                  </p>
                  <p className="text-[#55705d]">
                    {order.address?.city}, {order.address?.state},{" "}
                    {order.address?.country}
                    <br />
                    <span className="text-xs">{order.address?.zipCode}</span>
                  </p>
                  <p className="font-semibold">
                    {currency}
                    {Number(order.totalAmount).toFixed(2)}
                  </p>
                  <p className="capitalize text-[#55705d]">
                    {order.paymentMethod}
                  </p>
                  <select
                    value={order.status}
                    onChange={(event) =>
                      updateOrderStatus(order._id, event.target.value)
                    }
                    className={`h-9 border px-2 text-xs font-medium outline-none focus:border-secondary ${statusStyles[order.status] || "border-[#b8c7b9] bg-white text-[#55705d]"}`}
                    aria-label={`Status for order ${order._id}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Orders;
