// components/Footer.tsx
import Image from "next/image";
import { Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white w-full border border-[#F1F1F14D]">
      {/* Top Section */}
      <div className="max-w-[1440px] mx-auto flex flex-wrap md:flex-nowrap gap-4 px-6 sm:px-12 md:px-16 py-16">
        {/* Building Bharat */}
        <div className="w-full md:w-[426.67px] h-auto flex flex-col gap-4 p-4 items-start">
          <h3 className="font-semibold text-[20px] leading-[28px] ml-[0px] sm:ml-[5px] mb-[16px] font-Montserrat">
            Building Bharat
          </h3>
          <div className="flex gap-7">
            <Image src="/icons/youtube.png" alt="YouTube" width={40} height={40} className="rounded-full cursor-pointer" />
            <Image src="/icons/twitter.png" alt="Twitter" width={40} height={40} className="rounded-full cursor-pointer" />
            <Image src="/icons/instagram.png" alt="Instagram" width={40} height={40} className="rounded-full cursor-pointer" />
            <Image src="/icons/facebook.png" alt="Facebook" width={40} height={40} className="rounded-full cursor-pointer" />
          </div>

          {/* Cookie + Language */}
          <div className="flex flex-wrap items-center gap-4 mt-8 ml-[0px] sm:ml-[2px]">
            <a href="#" className="text-sm underline font-DMsans">
              Cookie settings
            </a>

            {/* Divider Line (hidden on xs) */}
            <div className="block w-px h-5 bg-[#F9FAFB] ml-[24px]"></div>

            {/* Language Selector */}
            <div className="flex items-center gap-2 border border-[#F1F1F1] rounded pt-[8px] pr-[16px] pb-[8px] pl-[16px] cursor-pointer ml-[26px]">
              <Globe size={16} />
              <select
                className="bg-[#0A0A0A] text-sm outline-none font-DMsans"
                defaultValue="English"
              >
                <option value="English">English</option>
                <option value="Hindi">हिन्दी</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="w-full md:w-[394.67px] h-auto flex flex-col gap-4 p-4 items-start">
          <h4 className="font-bold text-sm">Quick Links</h4>
          {[
            "About Us",
            "Courses",
            "Workshops",
            "Careers",
            "Blog",
            "Privacy Policy",
            "Terms & Conditions",
          ].map((item, i) => (
            <a key={i} href="#" className="h-[32px] flex items-center text-sm">
              {item}
            </a>
          ))}
        </div>

        {/* Resources */}
        <div className="w-full md:w-[394.67px] h-auto flex flex-col gap-4 p-4 items-start">
          <h4 className="font-bold text-sm">Resources</h4>
          {Array(5)
            .fill("Lorem ipsum")
            .map((item, i) => (
              <a key={i} href="#" className="h-[32px] flex items-center text-sm">
                {item}
              </a>
            ))}
        </div>
      </div>
    </footer>
  );
}

