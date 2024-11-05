import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { categories } from "../assets/assets.js";
import { ArrowRight } from "lucide-react";

const Category = () => {
  const { categoriesData, navigate } = useContext(AppContext);

  // Use database categories or fallback to local static categories if empty
  const displayCategories = categoriesData && categoriesData.length > 0 ? categoriesData : categories;

  const cardGradients = [
    "from-[#f4f8f3] to-[#e5efe3]",
    "from-[#fdf6f0] to-[#f9e8d9]",
    "from-[#f2f7fb] to-[#e1edf7]",
    "from-[#fcf4f8] to-[#f7e3ef]",
    "from-[#fbf7ee] to-[#f6ebd4]",
    "from-[#f3f9f7] to-[#e1f2ec]",
    "from-[#f7f5fb] to-[#eae4f7]",
    "from-[#f6f8f2] to-[#e8efe0]",
  ];

  return (
    <section className="py-10 md:py-14 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#55705d]">
              Browse The Pantry
            </span>
            <div className="w-12 border-b-2 border-primary"></div>
          </div>
          <h2 className="mt-2 text-[#193b2a] font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">
            Good things, grouped simply
          </h2>
        </div>

        <button
          onClick={() => navigate("/shop")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-primary transition group cursor-pointer self-start md:self-auto"
        >
          View All Categories
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Category Swiper Slider */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
        spaceBetween={16}
        breakpoints={{
          0: { slidesPerView: 2.2, spaceBetween: 12 },
          480: { slidesPerView: 3.2, spaceBetween: 16 },
          768: { slidesPerView: 4.5, spaceBetween: 20 },
          1024: { slidesPerView: 6, spaceBetween: 24 },
          1280: { slidesPerView: 7, spaceBetween: 24 },
        }}
        className="w-full py-3"
      >
        {displayCategories.map((category, i) => {
          const bgGradient = cardGradients[i % cardGradients.length];
          const imageSrc = category.image
            ? category.image.startsWith("http") || category.image.startsWith("/") || category.image.startsWith("data:")
              ? category.image
              : `http://localhost:4000/uploads/${category.image}`
            : categories[i % categories.length]?.image;

          return (
            <SwiperSlide key={category._id || i}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => navigate(`/shop?category=${encodeURIComponent(category.name)}`)}
                className={`group relative flex flex-col items-center justify-between p-5 rounded-3xl bg-gradient-to-b ${bgGradient} border border-[#e1e9dc] hover:border-primary/40 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 h-[210px]`}
              >
                {/* Image Container */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white/90 rounded-full p-2 shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md">
                  <img
                    src={imageSrc}
                    alt={category.name}
                    className="w-full h-full object-contain drop-shadow-sm"
                    onError={(e) => {
                      // Fallback to static category image if upload server URL fails
                      e.target.onerror = null;
                      e.target.src = categories[i % categories.length]?.image || "";
                    }}
                  />
                </div>

                {/* Text Label */}
                <div className="text-center w-full mt-2">
                  <h3 className="text-sm sm:text-base font-semibold text-[#193b2a] group-hover:text-primary transition-colors line-clamp-1">
                    {category.name}
                  </h3>
                  <span className="text-[11px] text-[#55705d] opacity-80 font-medium">
                    Explore
                  </span>
                </div>
              </motion.div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Category;
