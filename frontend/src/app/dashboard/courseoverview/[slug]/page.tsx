"use client";

import CourseOverview from "@/components/courseoverview";

import { Book, GraduationCap, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useState } from "react";


export default function CourseOverviewPage({
  params,
}: {
  params: { id: string };
}) {

   const [activeSection, setActiveSection] = useState("");
   const [progress] = useState(51);
   const[internshipScore] = useState(75);
   const router = useRouter();
   const navigateTo = (path: string, section: string) => {
    setActiveSection(section);
    router.push(path);
  };

  return (
    <div className="flex h-screen bg-[#005451] overflow-hidden">
       {/* Sidebar */}
       <aside className="w-[250px] ml-[30px] h-full flex flex-col justify-between bg-[#005451] rounded p-2">
      {/* Logo container */}
      <div className="w-[232px] h-[72px] rounded rounded-[8px] mt-[5px] ml-[40px]  bg-[#F1F1F1] flex items-center justify-center">
        <span className="font-bold text-lg">
          <img src="/images/bb1.png" alt="Logo Building Bharat" className="w-[40px] h-[40px] object-contain" />
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-4 -mt-[300px]">
        <button
          onClick={() => {
            setActiveSection("courses");
            router.push("/dashboard"); // Navigate to dashboard
          }}
          className="flex items-center gap-3 px-3 py-2 rounded ml-[30px] text-white"
        >
          <Home
            size={25}
            className={`pb-1 w-[30px] h-[30px] ${activeSection === "courses" ? "border-b-2 border-[#F97C04]" : ""}`}
          />
          <span className="text-[#F1F1F1] font-bold text-[16px] leading-[24px] font-DMsans">Courses</span>
        </button>

        <button
          onClick={() => {
            setActiveSection("assignments");
            router.push("/dashboard"); // Navigate to assignments
          }}
          className="flex items-center gap-3 ml-[30px] px-3 py-2 rounded text-white"
        >
          <Book
            size={25}
            className={`pb-1 w-[30px] h-[30px] ${activeSection === "assignments" ? "border-b-2 border-orange-500" : ""}`}
          />
          <span className="text-[#F1F1F1] font-bold text-[16px] leading-[24px] font-DMsans">Assignments</span>
        </button>

        <button
          onClick={() => {
            setActiveSection("internships");
            router.push("/dashboard"); // Navigate to internships
          }}
          className="flex items-center ml-[30px] gap-3 px-3 py-2 rounded text-white"
        >
          <GraduationCap
            size={25}
            className={`pb-1 w-[30px] h-[30px] ${activeSection === "internships" ? "border-b-2 border-orange-500" : ""}`}
          />
          <span className="text-[#F1F1F1] font-bold text-[16px] leading-[24px] font-DMsans">Internships</span>
        </button>
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
      <main className="flex-1 p-6 mr-[20px]">
        {/* Wrap CourseDetail inside your layout */}
        <CourseOverview />
      </main>
      {/* Right Sidebar */}
      <aside className="w-[300px] bg-[#005451] mt-[50px] mr-[40px] text-white p-6 flex flex-col">
        {/* Progress */}
        <div className="mb-6">
  <p className="font-bold font-DMsans text-[16px] leading-[24px] font-weight:700 ">
    Course Progress
  </p>

  {/* Progress row */}
  <div className="flex items-center gap-3 mt-[18px]">
    {/* Progress bar */}
    <div className="w-[165px] border border-[#ffffff] rounded-full h-[20px]">
      <div
        className="bg-orange-400 h-[18px] rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>

    {/* Percentage on right */}
    <span className="text-[16px] leading-[20px] font-DMsans text-[#ffffff] font-weight:450">{progress}%</span>
  </div>
</div>


       {/* Includes */}
<div className="mb-6 ">
  <p className="font-bold font-DMsans text-[16px] leading-[24px] font-weight:700 mb-2">
    This Course Includes:
  </p>
  <ul className="list-disc list-outside pl-6 mt-[25px] space-y-2 w-[164px]">
    <li className="font-DMsans marker:text-[#F97C04] marker:text-2xl text-[16px] leading-[20px] font-weight:450">
      Video content
    </li>
    <li className="font-DMsans marker:text-[#F97C04] marker:text-2xl text-[16px] leading-[20px] font-weight:450">
      Downloadable resources
    </li>
    <li className="font-DMsans marker:text-[#F97C04] marker:text-2xl text-[16px] leading-[20px] font-weight:450">
      Practical assignments
    </li>
    <li className="font-DMsans marker:text-[#F97C04] marker:text-2xl text-[16px] leading-[20px] font-weight:450">
      Discussion forums
    </li>
    <li className="font-DMsans marker:text-[#F97C04] marker:text-2xl text-[16px] leading-[20px] font-weight:450">
      Post course internship
    </li>
  </ul>
</div>


       {/* Internship */}
<div className="mb-6">
  {/* Heading */}
  <p className="font-bold font-DMsans mt-[10px] leading-[24px] font-weight:700  text-[16px] mb-3">Internship</p>

  {/* Apply button */}
  <button className={`border w-full border-[#9EA2AE] text-[#6D717F] rounded-lg px-4 py-2 mb-3 ${progress >= 50 && internshipScore>=75 ? "text-[#ffffff] border-white" : "border-[#9EA2AE] text-[#6D717F] cursor-auto" }`}>
    Apply
  </button>

  {/* Conditions */}
  <div className="flex items-center gap-2 mb-2 mt-[5px]">
    {/* Alert Icon Placeholder */}
    <img
      src="/icons/error.png"   
      alt="alert"
      className="w-6 h-6 mr-[5px]"
    />
    <p className="text-[13px] font-DMsans leading-[20px] w-[200px] font-weight:300 text-[#ffffff]">
      Course completion should be 50%
    </p>
  </div>

  <div className="flex items-center gap-2">
    {/* Alert Icon Placeholder */}
    <img
      src="/icons/error.png"   
      alt="alert"
      className="w-6 h-6 mr-[5px]"
    />
    <p className="text-[13px] font-DMsans leading-[20px] w-[200px] font-weight:300 text-[#ffffff]">
      Assignments’ score is less than 75%
    </p>
  </div>
</div>

      </aside>
    </div>
  );
}
