import { assets } from "../assets/assets";
import { useContext } from "react";
import { ArrowRight } from "lucide-react";
import { AppContext } from "../context/AppContext";

const CallToAction = () => {
  const { navigate } = useContext(AppContext);

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:py-16">
      <div className="border-y border-[#d8e0d4] lg:grid lg:grid-cols-2">
        <article className="relative grid min-h-[260px] grid-cols-[1fr_0.9fr] items-center gap-4 overflow-hidden border-b border-[#d8e0d4] py-8 pr-5 sm:pr-10 lg:border-b-0 lg:border-r">
          <div className="relative z-10">
            <p className="text-xs font-semibold text-primary">01 · Fruit</p>
            <h2 className="mt-4 max-w-xs text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#193b2a] sm:text-3xl">Sweet things for the week ahead.</h2>
            <button type="button" onClick={() => navigate("/shop?category=Fruits")} className="mt-6 inline-flex items-center gap-2 border-b border-primary pb-1 text-sm font-semibold text-secondary hover:text-primary">
              Browse fruit <ArrowRight size={15} />
            </button>
          </div>
          <div className="flex h-full min-h-48 items-end justify-center bg-[#f7efe3] px-2">
            <img src={assets.organic_fruits} alt="Fresh seasonal fruit" className="w-full max-w-[260px] object-contain" />
          </div>
        </article>

        <article className="relative grid min-h-[260px] grid-cols-[1fr_0.9fr] items-center gap-4 overflow-hidden py-8 pl-0 sm:pl-10">
          <div className="relative z-10">
            <p className="text-xs font-semibold text-primary">02 · Vegetables</p>
            <h2 className="mt-4 max-w-xs text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#193b2a] sm:text-3xl">Greens for tonight’s dinner.</h2>
            <button type="button" onClick={() => navigate("/shop?category=Vegetables")} className="mt-6 inline-flex items-center gap-2 border-b border-primary pb-1 text-sm font-semibold text-secondary hover:text-primary">
              Browse vegetables <ArrowRight size={15} />
            </button>
          </div>
          <div className="flex h-full min-h-48 items-end justify-center bg-[#e8f0e4] px-2">
            <img src={assets.organic_vegetables} alt="Fresh seasonal vegetables" className="w-full max-w-[260px] object-contain" />
          </div>
        </article>
      </div>
    </section>
  );
};

export default CallToAction;
