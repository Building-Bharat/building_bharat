// components/Footer.tsx
import Image from "next/image";
import { Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white w-full">
      {/* Top Section */}
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row justify-between gap-6 sm:gap-4 px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 md:py-16">
        {/* Building Bharat */}
        <div className="w-full sm:w-[426.67px] h-auto sm:h-[344px] flex flex-col gap-4 p-4 text-center sm:text-left">
          <h3 className="font-bold text-base sm:text-lg ml-0 sm:ml-[6px]">Building Bharat</h3>
          <div className="flex gap-4 justify-center sm:justify-start">
            <Image
              src="/icons/youtube.png"
              alt="YouTube"
              width={40}
              height={40}
              className="rounded-full w-10 h-10 sm:w-12 sm:h-12"
            />
            <Image
              src="/icons/twitter.png"
              alt="Twitter"
              width={40}
              height={40}
              className="rounded-full w-10 h-10 sm:w-12 sm:h-12"
            />
            <Image
              src="/icons/instagram.png"
              alt="Instagram"
              width={40}
              height={40}
              className="rounded-full w-10 h-10 sm:w-12 sm:h-12"
            />
            <Image
              src="/icons/facebook.png"
              alt="Facebook"
              width={40}
              height={40}
              className="rounded-full w-10 h-10 sm:w-12 sm:h-12"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="w-full sm:w-[394.67px] h-auto sm:h-[344px] flex flex-col gap-4 p-4 text-center sm:text-left">
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
            <a key={i} href="#" className="h-[32px] flex items-center justify-center sm:justify-start text-sm hover:text-gray-300 transition-colors">
              {item}
            </a>
          ))}
        </div>

        {/* Resources */}
        <div className="w-full sm:w-[394.67px] h-auto sm:h-[344px] flex flex-col gap-4 p-4 text-center sm:text-left">
          <h4 className="font-bold text-sm">Resources</h4>
          {Array(5)
            .fill("Lorem ipsum")
            .map((item, i) => (
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

      {/* Bottom Section */}
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8 px-4 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8 border-t border-gray-700">
        {/* Left */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
          <a href="#" className="text-sm underline hover:text-gray-300 transition-colors">
            Cookie settings
          </a>
          <div className="hidden sm:block w-px h-5 bg-gray-600"></div>

          {/* Language Selector */}
          <div className="flex items-center gap-2 border border-gray-600 rounded px-3 py-2 cursor-pointer hover:border-gray-400 transition-colors">
            <Globe size={16} />
            <select
              className="bg-transparent text-sm outline-none"
              defaultValue="English"
            >
              <option value="English">English</option>
              <option value="Hindi">हिन्दी</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}
