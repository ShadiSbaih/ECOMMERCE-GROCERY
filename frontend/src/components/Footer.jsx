import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js";

const Footer = () => {
  return (
    <footer className="py-20 mt-16 bg-[#e7efe2] border-t border-[#d2dfcf]">
      <div className="flex flex-wrap justify-between items-start gap-12 px-6 md:px-12">
        <div className="flex flex-col items-start max-w-sm">
          <img src={assets.logo} alt="The Green Grocer Logo" className="h-14 w-auto object-contain mb-5" />
          <h3 className="text-[#55705d] max-w-lg text-left text-sm leading-relaxed">
            The Green Grocer is committed to delivering farm-fresh, 100% certified organic produce directly to your doorstep. Pure ingredients for a healthier lifestyle.
          </h3>
        </div>

        <div className="flex flex-col items-start gap-2 text-[#193b2a]">
          <h1 className="text-xl font-semibold mb-2">Explore</h1>
          <Link to={"/"}>Home</Link>
          <Link to={"/shop"}>Shop</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/contact"}>Contact</Link>
        </div>
        <div className="flex flex-col items-start gap-2 text-[#193b2a]">
          <h1 className="text-xl font-semibold mb-2">Help</h1>
          <Link to={""}>Payment</Link>
          <Link to={""}>Shipping</Link>
          <Link to={""}>Product returns</Link>
          <Link to={""}>CheckOut</Link>
        </div>
        <div className="flex flex-col items-start text-[#193b2a] gap-3">
          <h1 className="text-xl font-semibold">Get the app</h1>
          <div className="flex items-center gap-2">
            <img src={assets.app_store} alt="App Store" />
          </div>
          <div className="flex items-center gap-2">
            <img src={assets.play_store} alt="Play Store" />
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
