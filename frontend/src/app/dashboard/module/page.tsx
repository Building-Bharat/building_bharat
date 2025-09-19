"use client";

import ModuleMiddleCard from "@/components/moduleCardMid";
import { Book, GraduationCap, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import router, { Router } from "next/router";
import { useState } from "react";

export default function modulesPage() {

    const [activeModule, setActiveModule] = useState<string | null>("module1");
  const [activeItem, setActiveItem] = useState<string | null>("Video");
    
    

  const modules = [
    {
      id: "module1",
      title: "Module 1",
      items: ["Video", "Reading", "Assignment"],
    },
    {
      id: "module2",
      title: "Module 2",
      items: ["Video", "Reading", "Assignment"],
    },
    {
      id: "module3",
      title: "Module 3",
      items: ["Video", "Reading", "Assignment"],
    },
  ];

      return(
           <div className="flex h-screen bg-[#005451] overflow-hidden">

             {/* Sidebar */}
       <aside className="w-[300px] h-full flex flex-col justify-between bg-[#005451] rounded p-2">
      {/* Logo container */}
      <div className="w-[232px] h-[72px] ml-[34px] rounded rounded-[8px] mt-[5px]  bg-[#F1F1F1] flex items-center justify-center">
        <span className="font-bold text-lg">
          <img src="/images/bb1.png" alt="Logo Building Bharat" className="w-[40px] h-[40px] object-contain" />
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-12 ml-[30px] -mt-[40px]">
      {modules.map((module) => (
        <div key={module.id}>
          {/* Module Header */}
          <button
            onClick={() =>
              setActiveModule(activeModule === module.id ? null : module.id)
            }
            className="flex items-center gap-2 w-full"
          >
            {/* Orange bar only when active */}
            {activeModule === module.id ? (
              <span className="w-1 h-10 mr-[4px] bg-[#F97C04] rounded"></span>
            ) : (
              <span className="w-1 h-30"></span>
            )}
            <span className="font-bold text-[#ffffff] text-[16px] leading-[24px] font-DMsans font-weight:700">{module.title}</span>
          </button>

          {/* Sub-items */}
          {activeModule === module.id && (
            <div className="flex flex-col gap-4 mt-10">
              {module.items.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveItem(item)}
                  className={`px-3 py-2 h-[52px] rounded-md text-[13px] leading-[20px] font-DMsans font-weight:300 text-left ${
                    activeItem === item
                      ? "bg-white text-black font-light"
                      : "text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>


      {/* Profile */}
      <div
        onClick={() => router.push("/profile")} // Navigate to profile
        className="px-3 py-2 rounded hover:bg-orange-500 cursor-pointer flex items-center gap-2"
      >
        <img src="/images/profile.png" alt="Profile" className="w-[40px] h-[40px] rounded-full" />
        <span className="text-[#F1F1F1] font-bold text-[16px] leading-[24px] font-DMsans">Profile</span>
      </div>
    </aside>
        {/* Main middle section card */}
            <div className="flex-1 p-6">
               <ModuleMiddleCard/>
            </div>
           </div>

      )
    }