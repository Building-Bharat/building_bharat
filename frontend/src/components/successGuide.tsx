"use client";
import { Montserrat, DM_Sans } from "next/font/google";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"], // ExtraBold
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "300"], // Regular + Light
});

export default function SuccessGuide() {
  const [submitted, setSubmitted] = useState(false);

   const showAutoToast = () => {
    toast.success("This will disappear in 2s"); // closes automatically
  };

  const showManualToast = () => {
    toast.error("This will stay until closed", {
      autoClose: false,
      closeButton: undefined,   // won't close automatically
    
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const email = emailInput.value;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setSubmitted(true);
    toast.success("Email submitted successfully!");
  };

  return (
    <section className="w-full max-w-full min-h-full bg-[#0A0A0A] mx-auto flex flex-col md:flex-row md:items-center gap-6 pt-[32px] pr-[16px] pb-[32px] pl-[16px] sm:p-[64px]">
      {/* Left Section */}
      <div className="flex-1 flex flex-col gap-10 p-4 w-full md:max-w-[544px] min-h-[400px] md:ml-8 order-2 md:order-1">
        <h3
          className={`${montserrat.className} font-bold text-[16px] sm:text-[20px] leading-[24px] sm:leading-[28px] text-[#F1F1F1]`}
        >
          Download the Free Political Career Success Guide
        </h3>

        {/* List */}
        <ul className="flex flex-col gap-6">
          {[
            "Master Behavioral & HR Interview Rounds with targeted preparation strategies.",
            "Access top industry questions asked in political, policy, and governance interviews.",
            "Leverage proven answer templates to leave a strong impression.",
          ].map((item, i) => (
            <li
              key={i}
              className={`${dmSans.className} text-[14px] leading-[20px] text-[#F1F1F1] flex gap-2`}
            >
              <span className="text-[#F9FAFB]">•</span> {item}
            </li>
          ))}
        </ul>

        {/* Form / Success Message */}
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-2 w-full max-w-[512px] mt-2">
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="
    w-full sm:w-[327px] 
    h-[48px] 
    rounded-[8px] 
    bg-[#E5E7EA] 
    border border-[#F97C04] 
    px-4 py-3 
    text-[13px] leading-[20px] 
    font-[DM Sans] font-light 
    text-[#6D717F] 
    placeholder-[#6D717F] 
    focus:outline-none focus:ring-2 focus:ring-[#F97C04]/50
  "
              />
              <button
                className="group 
             relative inline-flex items-center justify-center
             w-full md:w-auto   /* full width on small screens */
             px-8 py-3
             bg-[#F97C04] text-[#0A0A0A]
             rounded-lg 
             font-[DM Sans] font-bold text-[16px] leading-6
             transition-all duration-300 ease-in-out
             transform hover:scale-x-105 hover:translate-x-1 ml-0 sm:ml-[16px]"
              >
                {/* Arrow (slides in on hover) */}
                <svg
                  className="w-5 h-5 absolute left-4 
               opacity-0 -translate-x-2 
               transition-all duration-300 ease-in-out
               group-hover:opacity-100 group-hover:translate-x-0"
                  fill="none"
                  stroke="#0A0A0A"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>

                {/* Button text */}
                <span className="pl-1">Submit</span>
              </button>
            </div>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-[512px] mt-2 text-center mr-[90px] text-green-400 font-semibold text-[16px]"
          >
            Email address Submitted successfully!
          </motion.div>
        )}

        {/* Toast */}
         <div>
      <ToastContainer
    position="top-right"
    autoClose={2000}
    closeOnClick={true}
    newestOnTop={true}
    pauseOnHover={true}
    pauseOnFocusLoss={true}
    draggable={true}
  />
    </div>
      </div>

      {/* Right Section */}
      <div className="block md:hidden lg:flex flex-1 justify-center p-4 mb-[16px] order-1 md:order-2">
        <div className="w-full max-w-[512px] h-auto aspect-[16/10] bg-[#394050]" />
      </div>
    </section>
  );
}
