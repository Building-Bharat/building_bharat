"use client";

import { useState } from "react";

export default function CookieSettings({ onClose }: { onClose: () => void }) {
  const [settings, setSettings] = useState({
    essential: true,
    marketing: false,
    personalization: false,
    analytics: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    if (key === "essential") return; // Essential cannot be disabled
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const savePreferences = () => {
    localStorage.setItem("cookiePreferences", JSON.stringify(settings));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div
        className="
          w-[1160px] h-[666px] bg-[#0A0A0A] text-white rounded-[16px] shadow-lg
          p-[64px] flex flex-col gap-[64px] overflow-y-scroll no-scrollbar overflow-x-hidden
        "
      >
        {/* Title */}
        <h2 className="w-[1024px] h-[38px] font-Montserrat font-extrabold text-[32px] leading-[38px] text-white">
          Cookie Preferences
        </h2>

        {/* Description */}
        <p className="w-[1024px] h-[112px] font-Montserrat font-bold text-[20px] leading-[28px] text-white">
          This website uses cookies, pixel tags, and local storage for
          performance and marketing purposes. We use our own cookies and some
          from third parties. If you opted to accept any non-essential cookies,
          you can change or customize your selection at any time by changing the
          boxes checked below. To learn more about our privacy practices, please
          see our Privacy Policy.
        </p>

        {/* Settings List */}
        <div className="flex flex-col gap-8">
          {[
            {
              key: "essential",
              title: "ESSENTIAL",
              desc: "These items are necessary for the website to work.",
            },
            {
              key: "marketing",
              title: "MARKETING",
              desc: "These items help deliver advertising more relevant to you.",
            },
            {
              key: "personalization",
              title: "PERSONALIZATION",
              desc: "These items remember choices like username, language, region.",
            },
            {
              key: "analytics",
              title: "ANALYTICS",
              desc: "These items help us understand visitor interactions.",
            },
          ].map(({ key, title, desc }) => (
            <div
              key={key}
              className="w-[1024px] h-[64px] flex items-center gap-6 px-[16px]"
            >
              {/* Toggle on LEFT */}
              <button
                onClick={() => toggleSetting(key as keyof typeof settings)}
                className={`w-[64px] h-[32px] rounded-[16px] p-[2px] flex items-center transition ${
                  settings[key as keyof typeof settings]
                    ? "bg-[#394050] justify-end"
                    : "bg-gray-600 justify-start"
                }`}
              >
                <span className="w-[28px] h-[28px] bg-white rounded-full"></span>
              </button>

              {/* Text on RIGHT */}
              <div className="flex flex-col">
                <h3 className="font-Montserrat font-extrabold text-[16px] leading-[24px]">
                  {title}
                </h3>
                <p className="font-Montserrat font-medium text-[14px] leading-[20px] text-gray-300">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="w-auto flex justify-center mt-1">
          <button
            onClick={savePreferences}
            className="
              px-8 py-3 
              bg-[#E5E7EA] 
              rounded-lg 
              flex items-center justify-center 
              text-[#0A0A0A] text-[16px] leading-[24px] 
              font-dmSans font-bold
            "
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}


