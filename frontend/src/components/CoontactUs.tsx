// components/Footer.tsx
import Image from "next/image";
import { Globe } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white w-full h-full min-h-[380px] overflow-y-hidden border border-[#F1F1F14D]">
      {/* Top Section */}
      <div className="max-w-[1440px] mx-auto flex flex-wrap md:flex-nowrap gap-[32px] sm:gap-[110px] px-4 sm:px-6 sm:px-0 py-10">
        {/* Building Bharat */}
        <div className="w-full md:w-[365px] h-auto sm:h-[220px] flex flex-col gap-4 p-4 items-start">
          <h3 className="font-bold text-[20px] leading-[28px] ml-[0px] sm:ml-[5px] mb-[16px] font-Montserrat font-weight:700">
            Building Bharat
          </h3>
          <div className="flex gap-7">
            <Link
              href="https://www.youtube.com/@thebuildingBharat"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/youtube.png"
                alt="YouTube"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
              />
            </Link>
            <Link
              href="https://x.com/building_bharat"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/twitter.png"
                alt="YouTube"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
              />
            </Link>

            <Link
              href="https://www.instagram.com/building.bharat/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/instagram.png"
                alt="YouTube"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
              />
            </Link>
            <Image
              src="/icons/facebook.png"
              alt="Facebook"
              width={40}
              height={40}
              className="rounded-full cursor-pointer"
            />
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
          <h4 className="font-bold text-[20px] leading-[28px] font-Montserrat font-weight:700 text-[#F1F1F1]">
            Quick Links
          </h4>
          {[
            "About Us",
            "Workshops",
            "Blogs",
            "Privacy Policy",
            "Terms & Conditions",
          ].map((item, i) => (
            <a
              key={i}
              href="#"
              className="h-[32px] flex items-center font-DMsans font-weight:100 justify-center sm:justify-start text-[14px] leading-[20px] hover:text-gray-300 transition-colors gap-[32px]"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Resources */}
        <div className="w-full md:w-[394.67px] h-auto flex flex-col gap-4 p-4 items-start">
          <h4 className="font-bold text-[20px] leading-[28px] font-Montserrat font-weight:700 text-[#F1F1F1]">
            Courses
          </h4>
          {["Course 1", "Course 2", "Course 3"].map((item, i) => (
            <a
              key={i}
              href="#"
              className="h-[32px] flex items-center justify-center sm:justify-start text-sm hover:text-gray-300 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
