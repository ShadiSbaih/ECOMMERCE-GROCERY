import { useContext } from "react";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";

const AllProducts = () => {
  const { productsData, currency, axios, fetchProducts } =
    useContext(AppContext);
  const deleteProduct = async (id) => {
    try {
      const { data } = await axios.delete(`/api/product/delete/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchProducts();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  return (
    <div className="space-y-8">
      <header className="flex items-end justify-between border-b border-[#d8e0d4] pb-6">
        <div>
          <h2 className="mt-1 text-3xl font-semibold tracking-[-0.03em] text-[#193b2a]">
            Products
          </h2>
        </div>
        <span className="text-sm text-[#55705d]">
          {productsData.length} total
        </span>
      </header>
      <section className="overflow-x-auto">
        <div className="min-w-[1000px] border-t border-[#b8c7b9]">
          <div className="grid grid-cols-[0.8fr_1.6fr_1fr_0.7fr_0.8fr_1fr_0.35fr] gap-4 border-b border-[#b8c7b9] px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#7b8d80]">
            <span>Image</span>
            <span>Name</span>
            <span>Category</span>
            <span>Price</span>
            <span>Offer</span>
            <span>Weight</span>
            <span> </span>
          </div>
          <div className="divide-y divide-[#d8e0d4]">
            {productsData.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-[0.8fr_1.6fr_1fr_0.7fr_0.8fr_1fr_0.35fr] items-center gap-4 px-4 py-4 text-sm"
              >
                <div className="flex h-16 w-16 items-center justify-center bg-[#eef3e9] p-2">
                  <img
                    src={`http://localhost:4000/uploads/${item.images[0]}`}
                    alt={item.name}
                    className="h-full w-full object-contain mix-blend-multiply"
                  />
                </div>
                <p className="font-medium text-[#193b2a]">{item.name}</p>
                <p className="text-[#55705d]">
                  {item.category?.name || item.category}
                </p>
                <p className="text-[#55705d]">
                  {currency}
                  {Number(item.price).toFixed(2)}
                </p>
                <p className="font-semibold text-secondary">
                  {currency}
                  {Number(item.offerPrice).toFixed(2)}
                </p>
                <p className="text-[#55705d]">{item.weight}</p>
                <button
                  type="button"
                  onClick={() => deleteProduct(item._id)}
                  className="justify-self-end text-[#a14d42] hover:text-primary"
                  aria-label={`Delete ${item.name}`}
                >
                  <CircleX size={19} strokeWidth={1.6} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default AllProducts;
