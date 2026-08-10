import { ArrowRight, Package, Plus, ShoppingCart, Users } from "lucide-react";
import { Link } from "react-router-dom";

const totals = [
  { label: "Products", value: "2,847", detail: "in catalogue", icon: Package },
  { label: "Customers", value: "18,432", detail: "registered", icon: Users },
  { label: "Orders", value: "9,251", detail: "all time", icon: ShoppingCart },
  { label: "Revenue", value: "$432,890", detail: "all time" },
];

const Dashboard = () => (
  <div className="space-y-12">
    <header className="flex flex-col gap-4 border-b border-[#d5dfd2] pb-7 sm:flex-row sm:items-end sm:justify-between">
      <div>
     
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#193b2a] sm:text-4xl">
          The Green Grocer
        </h2>
      </div>
   
    </header>

    <section aria-label="Store totals" className="border-y border-[#d5dfd2]">
      <div className="grid sm:grid-cols-2 xl:grid-cols-4">
        {totals.map(({ label, value, detail, icon: Icon }, index) => (
          <div
            key={label}
            className={`flex items-center justify-between gap-5 py-5 sm:px-5 xl:px-6 ${index > 0 ? "border-t border-[#d5dfd2] sm:border-l sm:border-t-0" : ""}`}
          >
            <div>
              <p className="text-sm text-[#687b6c]">{label}</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#193b2a]">
                {value}
              </p>
              <p className="mt-1 text-xs text-[#8a998c]">{detail}</p>
            </div>
            {Icon && <Icon size={18} strokeWidth={1.6} className="text-[#78917c]" />}
          </div>
        ))}
      </div>
    </section>

    <section className="grid gap-12 lg:grid-cols-[1fr_20rem]">
      <div>
        <div className="flex items-end justify-between border-b border-[#d5dfd2] pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#78917c]">
              Catalogue
            </p>
            <h3 className="mt-2 text-xl font-semibold text-[#193b2a]">
              Keep the shop moving
            </h3>
          </div>
          <Link to="/admin/products" className="hidden items-center gap-2 text-sm font-medium text-secondary hover:text-primary sm:flex">
            View products <ArrowRight size={16} />
          </Link>
        </div>
        <div className="divide-y divide-[#d5dfd2]">
          <Link to="/admin/add-product" className="group flex items-center justify-between py-5">
            <span>
              <span className="block text-sm font-medium text-[#193b2a]">Add a product</span>
              <span className="mt-1 block text-sm text-[#687b6c]">List something fresh for customers.</span>
            </span>
            <Plus size={18} className="text-[#78917c] transition-colors group-hover:text-primary" />
          </Link>
          <Link to="/admin/add-category" className="group flex items-center justify-between py-5">
            <span>
              <span className="block text-sm font-medium text-[#193b2a]">Add a category</span>
              <span className="mt-1 block text-sm text-[#687b6c]">Keep the catalogue easy to browse.</span>
            </span>
            <Plus size={18} className="text-[#78917c] transition-colors group-hover:text-primary" />
          </Link>
        </div>
      </div>

      <aside className="border-l border-[#d5dfd2] pl-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#78917c]">Orders</p>
        <h3 className="mt-2 text-xl font-semibold text-[#193b2a]">Fulfilment</h3>
        <p className="mt-4 text-sm leading-6 text-[#687b6c]">
          Review incoming orders and keep delivery status up to date.
        </p>
        <Link to="/admin/orders" className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary">
          Open orders <ArrowRight size={16} />
        </Link>
      </aside>
    </section>
  </div>
);

export default Dashboard;
