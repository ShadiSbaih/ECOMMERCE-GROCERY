import { assets } from "../assets/assets";
const NewsLetter = () => {
  return (
    <section className="border-y border-[#d9e2d5] bg-[#eef3e9]">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1fr_1fr] md:gap-0 md:py-16">
        <div className="flex flex-col items-center gap-6 border-b border-[#b8cbb8] py-8 sm:flex-row sm:items-end sm:justify-between md:min-h-64 md:border-b-0 md:border-r md:py-0 md:pr-10 lg:pr-14">
          <img
            src={assets.organic_fruits}
            alt="A selection of fresh seasonal fruit"
            className="w-56 object-contain drop-shadow-xl transition-all duration-500 hover:scale-105 hover:drop-shadow-2xl md:w-72 lg:w-80"
          />
          <div className="mb-2 flex flex-col items-center text-center sm:items-start sm:text-left md:mb-4 lg:mb-8">
            <span className="mb-3 hidden h-1 w-8 rounded-full bg-[#8fa492] sm:block"></span>
            <p className="max-w-[140px] text-sm font-medium leading-relaxed text-[#55705d] lg:text-base">
              Picked with the season, shared with the table.
            </p>
          </div>
        </div>

        <div className="max-w-xl md:pl-10 lg:pl-14">
          <h2 className="mt-4 max-w-lg text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#193b2a] md:text-5xl lg:text-[3.4rem]">
            A little note from the farm.
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-[#55705d] lg:text-lg lg:leading-8">
            Seasonal produce, simple recipes, and the occasional good idea for using what is already in your kitchen.
          </p>

          <form className="mt-8 flex max-w-lg flex-col gap-4 sm:flex-row sm:items-end lg:mt-10">
            <label className="flex-1 text-xs font-medium text-[#55705d] lg:text-sm">
              Your email address
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-2 h-12 w-full border-0 border-b border-[#8fa492] bg-transparent px-0 text-base text-[#193b2a] outline-none placeholder:text-[#8fa492] transition-colors focus:border-[#193b2a]"
                required
              />
            </label>
            <button
              type="submit"
              className="h-12 shrink-0 border-b-2 border-primary bg-secondary px-8 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#193b2a] hover:shadow-md active:translate-y-px"
            >
              Keep me posted
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default NewsLetter;
