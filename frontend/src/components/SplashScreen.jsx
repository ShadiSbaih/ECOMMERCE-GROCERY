import { useEffect } from "react";
import { assets } from "../assets/assets.js";

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 1500);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-[#fbfaf5] text-[#193b2a]"
      role="status"
      aria-label="Loading The Green Grocer"
    >
      <div className="flex w-44 flex-col items-center">
        <img
          src={assets.logo}
          alt="The Green Grocer"
          className="h-auto w-36"
        />
        <div className="mt-8 h-px w-full overflow-hidden bg-[#d5dfd2]">
          <span className="block h-full origin-left animate-[splash-progress_1500ms_linear_forwards] bg-[#3f730a]" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
