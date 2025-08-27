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
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="w-[1200px] bg-[#0A0A0A] h-[700px] rounded-2xl p-14 flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col gap-8">
          <h2 className="text-white font-Montserrat font-bold text-[20px] leading-[28px]">
            Cookie Preferences
          </h2>
          <p className="text-white font-dmSans text-[16px] leading-[20px]">
            This website uses cookies, pixel tags, and local storage for
            performance and marketing purposes. We use our own cookies and some
            from third parties. If you opted to accept any non-essential
            cookies, you can change or customize your selection at any time by
            changing the boxes checked below. To learn more about our privacy
            practices, please see our Privacy Policy.
          </p>
        </div>

        {/* Settings Grid */}
        <div className="flex gap-32">
          {/* Left Column */}
          <div className="flex flex-col gap-20 flex-1">
            {items.slice(0, 2).map(({ key, title, desc }) => (
              <div key={key} className="flex items-start gap-8 px-4">
                {/* Toggle */}
                <button
  disabled={key === "essential"} // essential cannot be changed
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
                  <h3 className="text-white font-Montserrat font-bold text-[20px] leading-[28px]">
                    {title}
                  </h3>
                  <p className="text-white font-dmSans text-[16px] leading-[20px]">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col  gap-10 flex-1">
            {items.slice(2).map(({ key, title, desc }) => (
              <div key={key} className="flex items-start gap-8 px-1">
                
                
{/* Right section toggle */}
<button
  onClick={() => toggleSetting(key as keyof typeof settings)}
  className={`relative w-[64px] h-[32px] rounded-full flex-shrink-0 transition-all duration-300
    ${
      settings[key as keyof typeof settings]
        ? "bg-[#394050]" // active track
        : "border border-[#9EA2AE] bg-transparent" // inactive track
    }`}
>
  <span
    className={`absolute top-0.5 left-0.5 w-[28px] h-[27px] rounded-full transition-transform duration-300
      ${
        settings[key as keyof typeof settings]
          ? "bg-[#0A0A0A] translate-x-[32px]" // knob slides to right
          : "border border-[#9EA2AE] bg-transparent translate-x-0" // knob stays left
      }
    `}
  ></span>
</button>



                {/* Text */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-white font-Montserrat font-bold text-[20px] leading-[28px]">
                    {title}
                  </h3>
                  <p className="text-white font-dmSans text-[16px] leading-[20px]">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <button
            onClick={savePreferences}
            className="px-8 py-3 bg-[#E5E7EA] rounded-lg text-[#0A0A0A] text-[16px] font-dmSans font-bold"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
