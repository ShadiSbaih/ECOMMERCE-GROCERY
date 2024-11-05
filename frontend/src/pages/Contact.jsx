import { useState } from "react";
import toast from "react-hot-toast";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Thanks for reaching out. We’ll be in touch soon.");
      setFormData({ name: "", email: "", message: "" });
      setLoading(false);
    }, 600);
  };

  return (
    <main className="mx-auto max-w-6xl px-5 pb-24 pt-14 sm:px-8 md:pt-20">
      <div className="border-y border-[#d8e0d4] py-8 md:flex md:items-end md:justify-between md:gap-12 md:py-10">
        <div>
          <p className="text-sm text-[#55705d]">The Green Grocer · Ramallah</p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.035em] text-[#193b2a] md:text-5xl">
            Need a hand with your basket?
          </h1>
        </div>
        <p className="mt-5 max-w-sm text-sm leading-6 text-[#55705d] md:mt-0">
          Ask us about an order, a delivery, or what is good this week. We are
          a small team and every message reaches a person.
        </p>
      </div>

      <div className="grid gap-12 pt-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <section aria-labelledby="contact-details">
          <h2 id="contact-details" className="text-xl font-semibold text-[#193b2a]">Contact details</h2>
          <p className="mt-2 text-sm text-[#55705d]">For quick questions, call or visit us.</p>

          <dl className="mt-8 border-t border-[#d8e0d4]">
            <div className="grid grid-cols-[28px_1fr] gap-3 border-b border-[#d8e0d4] py-5">
              <MapPin className="mt-0.5 h-5 w-5 text-primary" strokeWidth={1.7} />
              <div><dt className="text-sm font-medium text-[#193b2a]">Al-Ersan Street</dt><dd className="mt-1 text-sm text-[#55705d]">Commercial District, Ramallah</dd></div>
            </div>
            <div className="grid grid-cols-[28px_1fr] gap-3 border-b border-[#d8e0d4] py-5">
              <Mail className="mt-0.5 h-5 w-5 text-primary" strokeWidth={1.7} />
              <div><dt className="text-sm font-medium text-[#193b2a]">support@thegreengrocer.ps</dt><dd className="mt-1 text-sm text-[#55705d]">We usually reply within one day</dd></div>
            </div>
            <div className="grid grid-cols-[28px_1fr] gap-3 border-b border-[#d8e0d4] py-5">
              <Phone className="mt-0.5 h-5 w-5 text-primary" strokeWidth={1.7} />
              <div><dt className="text-sm font-medium text-[#193b2a]">+970 599 456 789</dt><dd className="mt-1 text-sm text-[#55705d]">Saturday–Thursday, 8:00 AM–9:00 PM</dd></div>
            </div>
          </dl>

          <p className="mt-7 flex items-start gap-3 border-l-2 border-primary pl-4 text-sm leading-6 text-[#55705d]">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.7} />
            <span><strong className="font-medium text-[#193b2a]">Friday:</strong> 2:00 PM–9:00 PM</span>
          </p>
        </section>

        <section aria-labelledby="message-heading" className="bg-[#eef3e9] px-6 py-7 sm:px-9 sm:py-9 md:px-12 md:py-11">
          <p className="text-sm text-[#55705d]">Send a message</p>
          <h2 id="message-heading" className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#193b2a] md:text-4xl">
            Tell us what you need.
          </h2>

          <form onSubmit={handleSubmit} className="mt-9 space-y-7">
            <div className="grid gap-7 sm:grid-cols-2">
              <label className="text-sm text-[#55705d]">Your name
                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" className="mt-2 w-full border border-[#b9c9b8] bg-[#fbfaf5] px-3 py-3 text-sm text-[#193b2a] outline-none placeholder:text-[#9aaa9d] focus:border-secondary" />
              </label>
              <label className="text-sm text-[#55705d]">Email address
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" className="mt-2 w-full border border-[#b9c9b8] bg-[#fbfaf5] px-3 py-3 text-sm text-[#193b2a] outline-none placeholder:text-[#9aaa9d] focus:border-secondary" />
              </label>
            </div>
            <label className="block text-sm text-[#55705d]">Message
              <textarea name="message" value={formData.message} onChange={handleChange} rows="5" required placeholder="How can we help?" className="mt-2 w-full resize-none border border-[#b9c9b8] bg-[#fbfaf5] px-3 py-3 text-sm text-[#193b2a] outline-none placeholder:text-[#9aaa9d] focus:border-secondary" />
            </label>
            <button type="submit" disabled={loading} className="bg-secondary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#193b2a] disabled:cursor-wait disabled:opacity-70">
              {loading ? "Sending…" : "Send message"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Contact;
