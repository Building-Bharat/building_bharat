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

  const items = [
    {
      key: "essential",
      title: "ESSENTIAL",
      desc: "These items are necessary for the website to work.",
    },
    {
      key: "marketing",
      title: "MARKETING",
      desc: "These items help deliver advertising that’s more relevant to you. They may also be used to limit the number of times you see an ad and measure the effectiveness of ad campaigns. These are third party cookies provided by our advertising partners.",
    },
    {
      key: "personalization",
      title: "Personalization",
      desc: "These cookies help tailor content and recommendations based on your preferences, making your experience more relevant and personalized.",
    },
    {
      key: "analytics",
      title: "Analytics",
      desc: "These items help us understand visitor interactions, measure website performance, and spot potential technical issues. These don’t include essential cookies that provide incidental analytics while making the website work.",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4 sm:px-6">
  <div className="w-full max-w-[1200px] bg-[#0A0A0A] 
       max-h-[100vh] overflow-y-auto 
       rounded-2xl p-6 sm:p-10 lg:p-14 
       flex flex-col justify-between gap-10 sm:gap-12 lg:gap-16 scrollbar-hide">

        {/* Header */}
        <div className="flex flex-col gap-6 sm:gap-8">
          <h2 className="text-white font-Montserrat font-bold text-lg sm:text-xl lg:text-[20px] leading-[28px]">
            Cookie Preferences
          </h2>
          <p className="text-white font-dmSans text-sm sm:text-base leading-[20px]">
            This website uses cookies, pixel tags, and local storage for
            performance and marketing purposes. We use our own cookies and some
            from third parties. If you opted to accept any non-essential
            cookies, you can change or customize your selection at any time by
            changing the boxes checked below. To learn more about our privacy
            practices, please see our Privacy Policy.
          </p>
        </div>

        {/* Settings Grid */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-32">
          {/* Left Column */}
          <div className="flex flex-col gap-10 sm:gap-14 lg:gap-20 flex-1">
            {items.slice(0, 2).map(({ key, title, desc }) => (
              <div key={key} className="flex items-start gap-6 sm:gap-8 px-2 sm:px-4">
                {/* Toggle */}
                <button
                  disabled={key === "essential"}
                  onClick={() => toggleSetting(key as keyof typeof settings)}
                  className={`relative w-[64px] h-[32px] rounded-full flex-shrink-0 transition
                    ${
                      settings[key as keyof typeof settings]
                        ? "bg-[#394050]"
                        : "border border-[#9EA2AE] bg-transparent"
                    }
                    ${key === "essential" ? "cursor-not-allowed opacity-70" : ""}
                  `}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-[28px] h-[27px] rounded-full transition-transform
                      ${
                        settings[key as keyof typeof settings]
                          ? "bg-[#0A0A0A] translate-x-[32px]"
                          : "bg-[#1a1a1a] border border-[#9EA2AE] translate-x-0"
                      }
                    `}
                  ></span>
                </button>

                {/* Text */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-white font-Montserrat font-bold text-base sm:text-lg lg:text-[20px] leading-[28px]">
                    {title}
                  </h3>
                  <p className="text-white font-dmSans text-sm sm:text-base leading-[20px]">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8 sm:gap-10 lg:gap-8 flex-1">
            {items.slice(2).map(({ key, title, desc }) => (
              <div key={key} className="flex items-start gap-6 sm:gap-8 px-1 sm:px-2">
                {/* Right section toggle */}
                <button
                  onClick={() => toggleSetting(key as keyof typeof settings)}
                  className={`relative w-[64px] h-[32px] rounded-full flex-shrink-0 transition-all duration-300
                    ${
                      settings[key as keyof typeof settings]
                        ? "bg-[#394050]"
                        : "border border-[#9EA2AE] bg-transparent"
                    }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-[28px] h-[27px] rounded-full transition-transform duration-300
                      ${
                        settings[key as keyof typeof settings]
                          ? "bg-[#0A0A0A] translate-x-[32px]"
                          : "border border-[#9EA2AE] bg-transparent translate-x-0"
                      }
                    `}
                  ></span>
                </button>

                {/* Text */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-white font-Montserrat font-bold text-base sm:text-lg lg:text-[20px] leading-[28px]">
                    {title}
                  </h3>
                  <p className="text-white font-dmSans text-sm sm:text-base leading-[20px]">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center ">
          <button
            onClick={savePreferences}
            className="px-6 sm:px-8 py-2 sm:py-3 bg-[#E5E7EA] rounded-lg text-[#0A0A0A] text-sm sm:text-base font-dmSans font-bold -mt-0  sm:-mt-[20px] "
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

