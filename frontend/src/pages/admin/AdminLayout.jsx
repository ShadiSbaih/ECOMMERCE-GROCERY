import { useContext, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Grid3X3,
  LayoutDashboard,
  Menu,
  Package,
  Plus,
  ShoppingCart,
  X,
  LogOut,
} from "lucide-react";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets.js";

const AdminLayout = () => {
  const { setAdmin, navigate, axios } = useContext(AppContext);
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuItems = [
    { path: "/admin", name: "Dashboard", icon: LayoutDashboard, exact: true },
    { path: "/admin/add-category", name: "Add Category", icon: Plus },
    { path: "/admin/add-product", name: "Add Product", icon: Package },
    { path: "/admin/categories", name: "All Categories", icon: Grid3X3 },
    { path: "/admin/products", name: "All Products", icon: Grid3X3 },
    { path: "/admin/orders", name: "Orders", icon: ShoppingCart },
  ];
  const activeItem = menuItems.find((item) =>
    item.exact
      ? location.pathname === item.path
      : location.pathname === item.path,
  );

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/admin/logout");
      if (data.success) {
        toast.success(data.message);
        setAdmin(false);
        navigate("/");
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex h-screen bg-[#f3f5ef] text-[#193b2a]">
      <button
        type="button"
        onClick={() => setSidebarOpen((value) => !value)}
        className="fixed left-4 top-4 z-50 border border-[#d5dfd2] bg-[#fbfaf5] p-2 text-secondary lg:hidden"
        aria-label="Toggle admin navigation"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-[#193b2a]/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-[#d5dfd2] bg-[#fbfaf5] transition-transform lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="border-b border-[#d5dfd2] px-6 py-5">
          <img
            src={assets.logo}
            alt="The Green Grocer"
            className="h-12 w-auto"
          />
       
        </div>
        <nav className="flex-1 space-y-1 px-3 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activeItem?.path === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 border-l-2 px-3 py-3 text-sm font-medium transition-colors ${active ? "border-primary bg-[#eef3e9] text-secondary" : "border-transparent text-[#55705d] hover:border-[#b8c7b9] hover:bg-[#f3f5ef] hover:text-[#193b2a]"}`}
              >
                <Icon size={18} strokeWidth={1.8} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-[#d5dfd2] p-5">
        
          <button
            type="button"
            onClick={logout}
            className="mt-4 inline-flex items-center gap-2 text-sm text-[#a14d42] hover:text-primary"
          >
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-[#d5dfd2] bg-[#fbfaf5] px-6 pl-16 lg:px-10">
          <div>
          
            <h1 className="mt-1 text-lg font-semibold text-[#193b2a]">
              {activeItem?.name || "Admin"}
            </h1>
          </div>
          <span className="hidden text-sm text-[#55705d] sm:block">
            Good work starts with a clear shelf.
          </span>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto px-6 py-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
