import { useContext } from "react";
import { AppContext } from "../context/AppContext";
const Blogs = () => {
  const { blogsData } = useContext(AppContext);
  return (
    <section className="py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#55705d]">From our table</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-secondary">Notes for better eating</h2>
        </div>
        <span className="hidden md:block text-sm text-[#7b8d80] max-w-xs text-right">Small ideas for cooking, growing, and making the most of what is in season.</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {blogsData.map((item, i) => (
          <article key={i} className="group">
            <div className="overflow-hidden bg-[#e7efe2]">
              <img src={item.image} alt={item.title} className="w-full aspect-[1.45] object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="flex items-center gap-4 mt-5">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold">{item.date}</p>
              <div className="w-12 border-b border-primary"></div>
            </div>
            <h3 className="text-2xl font-semibold text-[#193b2a] mt-3 leading-tight">{item.title}</h3>
            <p className="text-sm font-normal text-[#55705d] mt-2 leading-relaxed">{item.desc}</p>
            <button className="text-secondary font-semibold text-sm border-b border-primary pb-1 cursor-pointer mt-5 hover:text-primary transition-colors">
              Read the note →
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};
export default Blogs;
