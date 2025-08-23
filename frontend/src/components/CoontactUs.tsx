// components/Footer.tsx
import Image from "next/image";
import { Globe } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white w-full overflow-hidden">
      {/* Top Section */}
      <div className="max-w-[1440px]  mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ml-[16px] sm:ml-[50px] gap-8 px-4 sm:px-6 lg:px-8 py-10">
        {/* Building Bharat */}
        <div className="flex flex-col gap-4 p-2 sm:p-4">
          <h3 className="font-bold text-[16px] sm:text-[20px] leading-[24px] sm:leading-[28px] font-Montserrat mb-4">
            Building Bharat
          </h3>

          {/* Social Icons */}
          <div className="flex flex-wrap gap-4 sm:gap-6">
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
              href="https://www.linkedin.com/company/buildingbharat/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/linkedin.png"
                alt="Linkedin"
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
                src="/icons/insta.png"
                alt="Instagram"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
              />
            </Link>
            <Link
              href="https://whatsapp.com/channel/0029Vb6EEEw5Ejy3yymn7E3T"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/whatsapp.png"
                alt="Whatsapp"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
              />
            </Link>
          </div>

          {/* Cookie + Language */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
            <a href="#" className="text-sm underline font-DMsans">
              Cookie settings
            </a>

            <div className="hidden sm:block w-px h-5 bg-[#F9FAFB]"></div>

            <div className="inline-flex items-center gap-4 px-4 py-2 rounded-[8px] border border-[#F1F1F1] cursor-pointer">
              {/* Globe icon */}
              <Globe size={20} className="text-[#F1F1F1]" />

              {/* Language select */}
              <select
                className="bg-transparent text-[#F1F1F1] text-[14px] font-DMsans font-bold leading-6 outline-none cursor-pointer"
                defaultValue="English"
              >
                <option value="English" className="text-black">
                  English
                </option>
                <option value="Hindi" className="text-black">
                  हिन्दी
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4 p-2 sm:p-4">
          <h4 className="font-bold text-[16px] sm:text-[20px] leading-[24px] sm:leading-[28px] font-Montserrat text-[#F1F1F1]">
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
              className="text-sm sm:text-[14px] leading-[20px] font-DMsans hover:text-gray-300 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Courses */}
        <div className="flex flex-col gap-4 p-2 sm:p-4">
          <h4 className="font-bold text-[16px] sm:text-[20px] leading-[24px] sm:leading-[28px] font-Montserrat text-[#F1F1F1]">
            Courses
          </h4>
          {["Course 1", "Course 2", "Course 3"].map((item, i) => (
            <a
              key={i}
              href="#"
              className="text-sm sm:text-[14px] leading-[20px] font-DMsans hover:text-gray-300 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
