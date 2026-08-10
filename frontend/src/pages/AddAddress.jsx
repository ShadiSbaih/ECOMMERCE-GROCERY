import { useContext, useState } from "react";
import { ArrowLeft, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";

const AddAddress = () => {
  const { navigate, axios, loading, setLoading } = useContext(AppContext);
  const [formData, setFormData] = useState({ name: "", email: "", city: "", country: "", zipCode: "", state: "" });
  const handleChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/address/add", formData);
      if (data.success) { toast.success(data.message); navigate("/checkout"); }
      else toast.error(data.message);
    } catch (error) { toast.error(error.response?.data?.message || error.message); }
    finally { setLoading(false); }
  };

  const inputClass = "mt-2 h-12 w-full border border-[#cbd8c9] bg-[#f7f8f2] px-3 text-sm text-[#193b2a] outline-none placeholder:text-[#9aaa9d] focus:border-secondary";

  return (
    <main className="mx-auto min-h-[calc(100vh-80px)] max-w-6xl px-5 pb-24 pt-10 sm:px-8 md:pt-16">
      <Link to="/checkout" className="inline-flex items-center gap-2 text-sm text-[#55705d] hover:text-secondary"><ArrowLeft size={16} /> Back to checkout</Link>
      <div className="mt-8 grid gap-12 border-t border-[#d8e0d4] pt-8 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24 lg:pt-12">
        <header>
          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.035em] text-[#193b2a]">Where should we deliver?</h1>
          <p className="mt-4 max-w-xs text-sm leading-6 text-[#55705d]">Add an address for your next basket. You can use it again at checkout.</p>
        </header>

        <form onSubmit={submitHandler} className="bg-[#eef3e9] p-6 sm:p-9 md:p-11">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="text-sm text-[#55705d] sm:col-span-2">Full name<input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" className={inputClass} /></label>
            <label className="text-sm text-[#55705d] sm:col-span-2">Email address<input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" className={inputClass} /></label>
            <label className="text-sm text-[#55705d]">City<input type="text" name="city" value={formData.city} onChange={handleChange} required placeholder="Ramallah" className={inputClass} /></label>
            <label className="text-sm text-[#55705d]">State / region<input type="text" name="state" value={formData.state} onChange={handleChange} required placeholder="Your region" className={inputClass} /></label>
            <label className="text-sm text-[#55705d]">Country<input type="text" name="country" value={formData.country} onChange={handleChange} required placeholder="Palestine" className={inputClass} /></label>
            <label className="text-sm text-[#55705d]">Postal code<input type="text" inputMode="numeric" name="zipCode" value={formData.zipCode} onChange={handleChange} required placeholder="00000" className={inputClass} /></label>
          </div>
          <button type="submit" disabled={loading} className="mt-8 h-12 w-full bg-secondary text-sm font-semibold text-white transition-colors hover:bg-[#193b2a] disabled:cursor-wait disabled:opacity-60">{loading ? "Saving address…" : "Save address"}</button>
        </form>
      </div>
    </main>
  );
};

export default AddAddress;
