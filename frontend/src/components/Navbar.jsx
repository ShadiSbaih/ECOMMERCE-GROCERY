import { useContext, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { Heart, ShoppingBag, Menu, X, Search, ArrowRight } from "lucide-react";
import { AppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";

const Navbar = () => {
  const { navigate, user, setUser, cart, favorite, axios, productsData, currency } =
    useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path
      ? "text-secondary border-b-2 border-primary font-bold"
      : "hover:text-primary transition-colors";
  };

  // Close search on page navigation
  useEffect(() => {
    setIsSearchOpen(false);
    setSearchQuery("");
  }, [location.pathname]);

  // Handle click outside and Escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Auto focus input when search is opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setOpen(false);
    }
  };

  const filteredSearchProducts = searchQuery.trim()
    ? (productsData || [])
        .filter((item) => {
          const categoryName = item.category?.name || item.category || "";
          return (
            item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            categoryName.toLowerCase().includes(searchQuery.toLowerCase())
          );
        })
        .slice(0, 5)
    : [];

  const getProductImage = (img) => {
    if (!img) return "";
    if (
      img.startsWith("http") ||
      img.startsWith("data:") ||
      img.startsWith("/src") ||
      img.startsWith("blob:")
    ) {
      return img;
    }
    return `http://localhost:4000/uploads/${img}`;
  };

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/auth/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(false);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-4 border-b border-[#dfe5d8] bg-[#fbfaf5] relative transition-all z-50">
      {/* Left Section: Logo & Larger Navigation Links */}
      <div className="flex items-center gap-10 lg:gap-16">
        <Link to="/" className="flex items-center shrink-0">
          <img src={assets.logo} alt="The Green Grocer Logo" className="h-10 md:h-12 lg:h-13 w-auto object-contain transition-all duration-300" />
        </Link>

        {/* Larger Navigation links right next to logo on the left */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10 text-base md:text-lg text-[#2c4033] font-semibold">
          <Link to={"/"} className={isActive("/")}>
            Home
          </Link>
          <Link to={"/shop"} className={isActive("/shop")}>
            Shop
          </Link>
          <Link to={"/about"} className={isActive("/about")}>
            About
          </Link>
          <Link to={"/contact"} className={isActive("/contact")}>
            Contact
          </Link>
        </div>
      </div>

      {/* Right Section: Action Icons & Search & Login Button */}
      <div className="hidden md:flex items-center gap-7 text-[#2c4033]">
        {/* Search Bar Container */}
        <div ref={searchRef} className="relative flex items-center">
          {isSearchOpen ? (
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center bg-white border border-[#dfe5d8] rounded-full px-4.5 py-2.5 shadow-md transition-all duration-300 w-80 md:w-96 lg:w-[420px]"
            >
              <Search size={22} className="text-[#55705d] shrink-0 mr-2.5" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search fresh produce..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-base text-[#193b2a] placeholder:text-gray-400 font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer mr-1"
                >
                  <X size={20} />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-gray-400 hover:text-red-500 p-1 cursor-pointer"
                aria-label="Close Search"
              >
                <X size={22} />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="text-secondary hover:text-primary transition cursor-pointer p-1"
            >
              <Search size={22} />
            </button>
          )}

          {/* Live Search Results Dropdown */}
          {isSearchOpen && searchQuery.trim().length > 0 && (
            <div className="absolute top-full right-0 mt-3 w-full min-w-[340px] md:min-w-[420px] bg-white border border-[#dfe5d8] shadow-2xl rounded-2xl p-4 z-50 overflow-hidden">
              <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                <p className="text-xs uppercase tracking-wider text-[#7b8d80] font-semibold">
                  Products ({filteredSearchProducts.length})
                </p>
                <span className="text-[11px] text-gray-400">Press Enter for all</span>
              </div>

              {filteredSearchProducts.length > 0 ? (
                <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                  {filteredSearchProducts.map((prod) => (
                    <div
                      key={prod._id}
                      onClick={() => {
                        navigate(`/product/${prod._id}`);
                        setIsSearchOpen(false);
                      }}
                      className="flex items-center gap-3 py-2.5 px-2 hover:bg-[#fbfaf5] rounded-xl cursor-pointer transition-colors group"
                    >
                      <img
                        src={getProductImage(prod.images?.[0])}
                        alt={prod.name}
                        className="w-12 h-12 object-contain mix-blend-multiply shrink-0 rounded-md bg-gray-50 p-1 group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-primary font-medium truncate">
                          {prod.category?.name || prod.category}
                        </p>
                        <h4 className="text-sm font-semibold text-[#193b2a] truncate group-hover:text-secondary transition-colors">
                          {prod.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-secondary">
                            {currency}{prod.offerPrice}
                          </span>
                          {prod.price > prod.offerPrice && (
                            <span className="text-xs line-through text-gray-400">
                              {currency}{prod.price}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full text-left py-2.5 px-3 mt-2 text-xs font-semibold text-secondary hover:text-primary flex items-center justify-between bg-[#fbfaf5] hover:bg-[#f4f1e8] rounded-lg transition-colors cursor-pointer"
                  >
                    <span>View all results for "{searchQuery}"</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                <div className="py-6 text-center text-sm text-gray-500">
                  No items found matching "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer hover:text-primary transition p-1"
        >
          <ShoppingBag className="w-6 h-6" />
          <button className="absolute -top-1.5 -right-2 text-[11px] font-bold text-white bg-primary w-[20px] h-[20px] rounded-full flex items-center justify-center shadow-xs">
            {cart ? cart.length : 0}
          </button>
        </div>

        <div
          onClick={() => navigate("/wishlist")}
          className="relative cursor-pointer hover:text-primary transition p-1"
        >
          <Heart className="w-6 h-6" />
          <button className="absolute -top-1.5 -right-2 text-[11px] font-bold text-white bg-primary w-[20px] h-[20px] rounded-full flex items-center justify-center shadow-xs">
            {favorite ? favorite.length : 0}
          </button>
        </div>

        {user ? (
          <div className="relative group">
            <img
              src={assets.profile_pic}
              alt=""
              className="w-10 h-10 rounded-full cursor-pointer ring-2 ring-[#dfe5d8]"
            />
            <div className="absolute right-0 mt-2 w-44 bg-secondary shadow-lg rounded-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition duration-300 z-50">
              <ul className="text-white">
                <p
                  onClick={() => navigate("/my-orders")}
                  className="cursor-pointer hover:bg-primary py-2.5 px-4 rounded-t-lg font-medium text-sm"
                >
                  My Orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer hover:bg-primary py-2.5 px-4 rounded-b-lg font-medium text-sm"
                >
                  Logout
                </p>
              </ul>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer px-7 py-2.5 bg-secondary hover:bg-primary transition text-white text-base md:text-lg font-bold rounded-full shadow-sm hover:shadow-md"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="md:hidden text-secondary p-1"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Drawer */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-full left-0 w-full bg-[#fbfaf5] border-b border-[#dfe5d8] shadow-lg py-6 flex-col items-start gap-5 px-8 text-base md:hidden z-50`}
      >
        {/* Mobile Search Input */}
        <form onSubmit={handleSearchSubmit} className="w-full flex items-center bg-white border border-[#dfe5d8] rounded-full px-5 py-3 shadow-xs mb-2">
          <Search size={22} className="text-[#55705d] mr-2.5 shrink-0" />
          <input
            type="text"
            placeholder="Search fresh produce..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none text-base text-[#193b2a] placeholder:text-gray-400 font-medium"
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery("")} className="text-gray-400 p-1">
              <X size={20} />
            </button>
          )}
          <button type="submit" className="text-secondary font-bold text-sm ml-2 shrink-0">
            Search
          </button>
        </form>

        <Link onClick={() => setOpen(false)} to={"/"} className={isActive("/")}>
          Home
        </Link>
        <Link
          onClick={() => setOpen(false)}
          to={"/shop"}
          className={isActive("/shop")}
        >
          Shop
        </Link>
        <Link
          onClick={() => setOpen(false)}
          to={"/about"}
          className={isActive("/about")}
        >
          About
        </Link>
        <Link
          onClick={() => setOpen(false)}
          to={"/contact"}
          className={isActive("/contact")}
        >
          Contact
        </Link>
        <button
          onClick={() => {
            setOpen(false);
            navigate("/admin");
          }}
          className="text-secondary font-medium underline underline-offset-4 cursor-pointer"
        >
          Admin Dashboard
        </button>
        {user ? (
          <div className="relative group">
            <img
              src={assets.profile_pic}
              alt=""
              className="w-10 h-10 rounded-full cursor-pointer"
            />
            <div className="absolute right-0 mt-2 w-44 bg-secondary shadow-lg rounded-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition duration-300 z-50">
              <ul className="text-white">
                <p
                  onClick={() => navigate("/my-orders")}
                  className="cursor-pointer hover:bg-primary py-2.5 px-4"
                >
                  My Orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer hover:bg-primary py-2.5 px-4"
                >
                  Logout
                </p>
              </ul>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              setOpen(false);
              navigate("/login");
            }}
            className="cursor-pointer px-8 py-2.5 bg-primary hover:bg-secondary transition text-white font-bold rounded-full text-base"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

