"use client";

import Image from "next/image";
import { Globe, ChevronDown, ChevronUp, Check } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import CookieSettings from "./CookieSettings";

export default function Footer() {
  const [showCookies, setShowCookies] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");

  const languages = ["English", "Hindi"];
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <footer className="bg-[#0A0A0A] text-white w-full overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ml-[16px] sm:ml-[50px] gap-8 px-4 sm:px-6 lg:px-8 py-10">
        {/* Building Bharat */}
        <div className="flex flex-col gap-4 p-2 sm:p-4">
          <h3 className="font-bold text-[16px] sm:text-[20px] font-Montserrat mb-4 cursor-pointer">
            Building Bharat
          </h3>

          {/* Social Icons */}
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <Link
              href="https://www.youtube.com/@thebuildingBharat"
              target="_blank"
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
            <button
              onClick={() => setShowCookies(true)}
              className="text-sm underline underline-offset-4 hover:no-underline leading-[32px] font-DMsans"
            >
              Cookie settings
            </button>

            <div className="hidden sm:block w-px h-5 bg-[#F9FAFB]"></div>

            {/* Language Dropdown */}
            <div ref={dropdownRef} className="relative">
              <div
                onClick={() => setLangOpen(!langOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[8px] border border-[#F1F1F1] cursor-pointer transition-all"
              >
                <Globe size={20} className="text-[#F1F1F1]" />
                <span className="text-[#F1F1F1] text-[14px] font-DMsans font-bold">
                  {selectedLang}
                </span>
                {langOpen ? (
                  <ChevronUp size={18} className="text-[#F1F1F1]" />
                ) : (
                  <ChevronDown size={18} className="text-[#F1F1F1]" />
                )}
              </div>

              {langOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-40 bg-[#F9FAFB] rounded-lg shadow-lg py-2 z-50">
                  {languages.map((lang) => (
                    <div
                      key={lang}
                      onClick={() => {
                        setSelectedLang(lang);
                        setLangOpen(false);
                      }}
                      className="flex items-center px-3 py-2 hover:bg-gray-200 cursor-pointer"
                    >
                      <div className="w-5 flex justify-center">
                        {selectedLang === lang && (
                          <Check size={16} className="text-black" />
                        )}
                      </div>
                      <span className="text-black text-sm">{lang}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4 p-2 sm:p-4">
          <h4 className="font-bold text-[16px] sm:text-[20px] font-Montserrat text-[#F1F1F1] cursor-pointer">
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
              className="relative inline-flex w-fit text-sm sm:text-[14px] font-DMsans 
               hover:text-gray-300 transition-colors
               after:content-[''] after:absolute after:left-0 after:-bottom-0.5 
               after:h-[2px] after:w-0 after:bg-gray-300 
               after:transition-all after:duration-500 hover:after:w-full"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Courses */}
        <div className="flex flex-col gap-4 p-2 sm:p-4">
          <h4 className="font-bold text-[16px] sm:text-[20px] font-Montserrat text-[#F1F1F1] cursor-pointer">
            Courses
          </h4>
          {["Course 1", "Course 2", "Course 3"].map((item, i) => (
            <a
              key={i}
              href="#"
              className="relative inline-flex w-fit text-sm sm:text-[14px] font-DMsans 
               hover:text-gray-300 transition-colors
               after:content-[''] after:absolute after:left-0 after:-bottom-0.5 
               after:h-[2px] after:w-0 after:bg-gray-300 
               after:transition-all after:duration-500 hover:after:w-full"
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Cookie Settings Modal */}
      {showCookies && <CookieSettings onClose={() => setShowCookies(false)} />}
    </footer>
  );
}
