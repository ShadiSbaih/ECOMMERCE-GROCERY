import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { motion } from "motion/react";
import { assets } from "../assets/assets.js";

const Hero = () => {
  const { navigate } = useContext(AppContext);

  const slides = [
    {
      title: "The Green Grocer — Pure & Fresh",
      img: assets.hero_img1,
      btn1: "EXPLORE STORE",
      btn2: "OUR FARM STORY",
    },
    {
      title: "Fresh Organic Fruits & Veggies Delivered Daily",
      img: assets.hero_img2,
      btn1: "ORDER NOW",
      btn2: "FREE EXPRESS DELIVERY",
    },
    {
      title: "Sustainable Quality & 100% Organic Certified",
      img: assets.hero_img3,
      btn1: "START SHOPPING",
      btn2: "WEEKLY DEALS",
    },
  ];

  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop={true}
      className="w-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="bg-[#e7efe2] min-h-[570px] md:h-[620px] bg-cover bg-center flex flex-col md:flex-row items-center justify-between px-7 md:px-14 lg:px-20 py-12 gap-6 overflow-hidden"
            style={{ backgroundImage: `url(${assets.leef_layer_bg})` }}
          >
            <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl">
              <p className="text-xs uppercase tracking-[0.28em] text-secondary mb-5">From nearby fields to your table</p>
              <h1 className="text-5xl md:text-7xl font-semibold text-[#193b2a] leading-[1.05] capitalize">
                {slide.title}
              </h1>

              <div className="flex gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/shop")}
                  className="px-6 md:px-8 py-3.5 cursor-pointer bg-primary text-white hover:bg-secondary font-semibold text-sm rounded-full transition-all duration-300"
                >
                  {slide.btn1}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/about")}
                  className="px-6 md:px-8 py-3.5 cursor-pointer border border-secondary text-secondary hover:bg-secondary hover:text-white font-semibold text-sm rounded-full transition-all duration-300"
                >
                  {slide.btn2}
                </motion.button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-6 md:mt-0 flex items-center justify-center"
            >
              <img
                src={slide.img}
                alt={slide.title}
                className="h-[280px] sm:h-[380px] md:h-[480px] w-auto max-w-full object-contain rounded-2xl drop-shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
              />
            </motion.div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default Hero;
