"use client";

import { useState } from "react";
import { BookOpen, ChevronDown, Folder, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function CourseOverview() {
  const [progress] = useState(20); // Example static progress
  const [isOpen, setIsOpen] = useState(false);
    const modules = ["Module 1", "Module 2", "Module 3"];

  return (
    <div className="flex w-[800px] ml-[70px] h-[700px] -mt-[10px] rounded-[8px] bg-[#005451] overflow-y-scroll overflow-x-hidden no-scrollbar">
      {/* Main Course Content */}
<div className="flex-1 flex flex-col bg-white w-[400px] overflow-y-scroll overflow-x-hidden no-scrollbar ">
  {/* Video/Image Preview */}
<div className="w-[800px] h-[450px] mb-4 overflow-hidden relative">
  {/* Dimmed Image */}
  <img
    src="/images/course.png"
    alt="Course Preview"
    className="w-full h-full object-cover brightness-[0.2]"
  />

  {/* Play Button (centered) */}
  <button className="absolute inset-0 flex items-center justify-center text-white text-5xl">
    <img src="/icons/play_circle.png" alt="" className="w-[50px] h-[50px]" />
  </button>
</div>
        {/* Course Title & Description */}
        <h2 className="ml-[30px] mt-[30px] text-black font-DMsans text-[16px] leading-[24px] font-bold mb-2">
          Political Field Operations Mastery
        </h2>
        <p className="font-weight:450 w-[636px] mt-[10px] text-[16px] leading-[24px] text-black font-DMsans ml-[30px] mb-4">
          Master the art of field operations for political campaigns. Learn how
          to build and manage ground teams, volunteer coordination, canvassing
          strategies, and voter outreach programs.
        </p>

        {/* Action Button + Status */}
<div className="flex items-center gap-3 ml-[28px] mt-2">
  <button className="bg-[#F97C04] text-black px-6 py-2 rounded-lg font-semibold w-[180px] h-[44px]">
    {"Go to Course"}
  </button>
  <p className="text-[13px] leading-[20px] font-DMsans font-weight:300 text-[#6D717F]">Already Enrolled</p>
</div>


        {/* Modules/Response */}
<div className="mt-6 w-[750px] ml-[25px] h-[90px] rounded-[8px] border border-[#9EA2AE]">
  {/* Header row */}
  <div
    className="flex items-center justify-between p-4 cursor-pointer bg-gray-100 rounded-lg"
    onClick={() => setIsOpen(!isOpen)}
  >
    <div className="flex items-center gap-2">
      
      <img src="/icons/description.png" alt="modules logo" />
      <span className="text-[16px] leading-[20px] font-DMsans text-black font-weight:450">Modules</span>
    </div>

    {/* Right arrow */}
    <ChevronDown
      size={20}
      className={`text-orange-500 transform transition-transform duration-300 ${
        isOpen ? "rotate-180" : ""
      }`}
    />
  </div>

  {/* Expandable content */}
  {isOpen && (
    <div className="bg-white border-t">
      <ul className="divide-y">
        <li className="p-4 flex items-center gap-2 cursor-pointer hover:bg-gray-50">
  <Link href="/dashboard/module" className="flex items-center gap-2 w-full">
    <img src="/icons/description.png" alt="Module icon" className="w-5 h-5" />
    <span>Module 1</span>
  </Link>
</li>
        <li className="p-4 flex items-center gap-2 cursor-pointer hover:bg-gray-50">
  <Link href="/dashboard/module" className="flex items-center gap-2 w-full">
    <img src="/icons/description.png" alt="Module icon" className="w-5 h-5" />
    <span>Module 2</span>
  </Link>
</li>
        <li className="p-4 flex items-center gap-2 cursor-pointer hover:bg-gray-50">
  <Link href="/dashboard/module" className="flex items-center gap-2 w-full">
    <img src="/icons/description.png" alt="Module icon" className="w-5 h-5" />
    <span>Module 3</span>
  </Link>
</li>
      </ul>
    </div>
  )}
</div>


      </div>
    </div>
  );
}
