// components/Footer.tsx
import Image from "next/image";
import { Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white w-full">
      {/* Top Section */}
      <div className="max-w-[1440px] mx-auto flex flex-wrap md:flex-nowrap justify-between gap-4 px-16 py-16">
        {/* Building Bharat */}
        <div className="w-[426.67px] h-[344px] flex flex-col gap-4 p-4">
          <h3 className="font-bold text-lg ml-[6px]">Building Bharat</h3>
          <div className="flex gap-4">
            <Image
              src="/icons/youtube.png"
              alt="YouTube"
              width={48}
              height={48}
              className="rounded-full"
            />
            <Image
              src="/icons/twitter.png"
              alt="Twitter"
              width={48}
              height={48}
              className="rounded-full"
            />
            <Image
              src="/icons/instagram.png"
              alt="Instagram"
              width={48}
              height={48}
              className="rounded-full"
            />
            <Image
              src="/icons/facebook.png"
              alt="Facebook"
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="w-[394.67px] h-[344px] flex flex-col gap-4 p-4">
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
        <div className="w-[394.67px] h-[344px] flex flex-col gap-4 p-4">
          <h4 className="font-bold text-sm">Resources</h4>
          {Array(5)
            .fill("Lorem ipsum")
            .map((item, i) => (
              <a
                key={i}
                href="#"
                className="h-[32px] flex items-center text-sm"
              >
                {item}
              </a>
            ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-[1440px] mx-auto flex justify-between items-center px-16 py-8 border-t border-gray-700">
        {/* Left */}
        <div className="flex items-center gap-8">
          <a href="#" className="text-sm underline">
            Cookie settings
          </a>
          <div className="w-px h-5 bg-gray-600"></div>

          {/* Language Selector */}
          <div className="flex items-center gap-2 border border-gray-600 rounded px-3 py-2 cursor-pointer">
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
