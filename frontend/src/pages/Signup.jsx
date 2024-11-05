import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext.jsx";
import { assets } from "../assets/assets.js";
import { Eye, EyeOff, Lock, Mail, UserRound } from "lucide-react";

const Signup = () => {
  const { navigate, axios } = useContext(AppContext);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/signup", formData);
      if (data.success) { toast.success(data.message); navigate("/login"); }
      else toast.error(data.message);
    } catch (error) { toast.error(error.message); }
  };

  return (
    <main className="flex min-h-[calc(100vh-80px)] bg-[#f2f4ed]">
      <div className="grid min-h-[calc(100vh-80px)] w-full overflow-hidden bg-[#fbfaf5] lg:grid-cols-[0.92fr_1.08fr]">
        <aside className="relative flex min-h-[390px] flex-col justify-between overflow-hidden bg-[#1d4b35] p-7 text-white sm:p-10 lg:min-h-full">
          <div className="relative z-10 mx-auto mt-8 flex max-w-md flex-col items-center text-center sm:mt-16 lg:mt-24 lg:max-w-lg">
     
            <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight drop-shadow-lg sm:text-5xl lg:text-[3.5rem]">
              Make room <br />at <span className="bg-gradient-to-r from-[#d7e4cc] via-[#e8f0e3] to-[#f6a51b] bg-clip-text text-transparent">the table.</span>
            </h1>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-[#d7e4cc]" />
          <img src={assets.organic_fruits} alt="Fresh seasonal fruit" className="absolute bottom-10 left-1/2 z-[1] w-[82%] max-w-[430px] -translate-x-1/2 object-contain drop-shadow-[0_18px_14px_rgba(15,54,35,0.18)]" />
          <p className="relative z-10 mt-10 text-center text-xs font-medium tracking-wide text-[#b9d2bd]">Seasonal produce, delivered simply.</p>
        </aside>

        <section className="flex items-center p-7 sm:p-10 md:p-14">
          <div className="w-full max-w-xl">
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.035em] text-[#193b2a] sm:text-5xl">Create your account</h2>
            <form onSubmit={submitHandler} className="mt-9 space-y-5">
              <label className="block text-sm text-[#55705d]">Full name
                <span className="relative mt-2 flex items-center"><UserRound size={17} className="absolute left-4 text-[#77907d]" /><input type="text" name="name" onChange={handleChange} value={formData.name} placeholder="Your name" required className="h-14 w-full border border-[#cbd8c9] bg-[#f7f8f2] pl-11 pr-3 text-sm text-[#193b2a] outline-none placeholder:text-[#9aaa9d] focus:border-secondary" /></span>
              </label>
              <label className="block text-sm text-[#55705d]">Email address
                <span className="relative mt-2 flex items-center"><Mail size={17} className="absolute left-4 text-[#77907d]" /><input type="email" name="email" onChange={handleChange} value={formData.email} placeholder="you@example.com" required className="h-14 w-full border border-[#cbd8c9] bg-[#f7f8f2] pl-11 pr-3 text-sm text-[#193b2a] outline-none placeholder:text-[#9aaa9d] focus:border-secondary" /></span>
              </label>
              <label className="block text-sm text-[#55705d]">Password
                <span className="relative mt-2 flex items-center"><Lock size={17} className="absolute left-4 text-[#77907d]" /><input type={showPassword ? "text" : "password"} name="password" onChange={handleChange} value={formData.password} placeholder="Choose a password" required className="h-14 w-full border border-[#cbd8c9] bg-[#f7f8f2] pl-11 pr-10 text-sm text-[#193b2a] outline-none placeholder:text-[#9aaa9d] focus:border-secondary" /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-4 text-[#55705d]" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span>
              </label>
              <button type="submit" className="mt-2 h-14 w-full bg-secondary text-sm font-semibold text-white transition-colors hover:bg-[#193b2a]">Create account</button>
            </form>

            <p className="mt-8 border-t border-[#d8e0d4] pt-6 text-sm text-[#55705d]">Already have an account? <Link to="/login" className="font-semibold text-secondary underline decoration-primary underline-offset-4">Sign in →</Link></p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Signup;
