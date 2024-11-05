import { assets } from "../assets/assets";
import Brands from "../components/Brands";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const About = () => {
  const { navigate } = useContext(AppContext);

  return (
    <main className="max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-24">
      <section className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-24 items-end border-b border-[#dfe5d8] pb-16">
        <div>
          <h1 className="mt-6 text-5xl md:text-7xl font-semibold leading-[1.02] text-secondary">
            Good food begins close to home.
          </h1>
        </div>
        <p className="text-lg leading-relaxed text-[#55705d] font-normal pb-1">
          We work with small growers and bring their best produce to the people who live nearby. The idea is simple: fewer miles, better food, and a more honest connection between the farm and the kitchen.
        </p>
      </section>

      <section className="grid lg:grid-cols-[1.4fr_0.6fr] gap-10 lg:gap-24 py-16 border-b border-[#dfe5d8]">
        <figure>
          <img
            src={assets.about_hero}
            alt="Fresh pomegranates and berries arranged on a table"
            className="w-full aspect-[1.55] object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-widest text-[#7b8d80]">
            Selected and packed with care
          </figcaption>
        </figure>
        <div className="self-center">
          <p className="text-xs uppercase tracking-[0.24em] text-primary">What we believe</p>
          <div className="mt-6 space-y-7 text-[#55705d] font-normal leading-relaxed">
            <p>Seasonal is not a limitation. It is a better way to eat: food with more flavor, less waste, and a reason to look forward to what comes next.</p>
            <p>We keep our range focused, our sourcing transparent, and our service personal. Every order should feel like it came from someone who cares what reaches your table.</p>
          </div>
          <button
            onClick={() => navigate("/shop")}
            className="mt-8 text-secondary text-sm font-semibold border-b border-primary pb-1 cursor-pointer hover:text-primary transition-colors"
          >
            Shop the current harvest →
          </button>
        </div>
      </section>

      <section className="grid sm:grid-cols-3 gap-8 py-14 border-b border-[#dfe5d8]">
        <div>
          <p className="text-4xl font-semibold text-secondary">01</p>
          <p className="mt-3 text-sm text-[#55705d] leading-relaxed">We know where our produce comes from.</p>
        </div>
        <div>
          <p className="text-4xl font-semibold text-secondary">02</p>
          <p className="mt-3 text-sm text-[#55705d] leading-relaxed">We choose what is good now, not what is loudest.</p>
        </div>
        <div>
          <p className="text-4xl font-semibold text-secondary">03</p>
          <p className="mt-3 text-sm text-[#55705d] leading-relaxed">We make the everyday shop feel a little more human.</p>
        </div>
      </section>

      <Brands />
    </main>
  );
};

export default About;
