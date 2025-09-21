"use client";

import { useState } from "react";
import { Home, Book, GraduationCap } from "lucide-react"; 


export default function UserDashboard() {
  const [activeSection, setActiveSection] = useState("");

  return (
    <div className="flex h-full w-full bg-[#005451] p-4">
      {/* Sidebar */}
      <aside className="w-[232px] h-[696px] flex flex-col justify-between bg-[#005451] rounded p-2">
        {/* Logo container */}
        <div className="w-[232px] h-[72px] rounded bg-[#F1F1F1] flex items-center justify-center">
          <span className="font-bold text-lg">
            <img src="/images/bb1.png" alt="Logo Building Bharat" className="w-[40px] h-[40px] object-contain" />
          </span>
        </div>

        {/* Navigation */}
<nav className="flex flex-col gap-4 -mt-[300px]">
  <button
    onClick={() => setActiveSection("courses")}
    className="flex items-center gap-3 px-3 py-2 rounded text-white"
  >
    <Home
      size={25}
      className={`pb-1 ${activeSection === "courses" ? "border-b-2 border-orange-500" : ""}`}
    />
    <span>Courses</span>
  </button>

  <button
    onClick={() => setActiveSection("assignments")}
    className="flex items-center gap-3 px-3 py-2 rounded text-white"
  >
    <Book
      size={25}
      className={`pb-1 ${activeSection === "assignments" ? "border-b-2 border-orange-500" : ""}`}
    />
    <span>Assignments</span>
  </button>

  <button
    onClick={() => setActiveSection("internships")}
    className="flex items-center gap-3 px-3 py-2 rounded text-white"
  >
    <GraduationCap
      size={25}
      className={`pb-1 ${activeSection === "internships" ? "border-b-2 border-orange-500" : ""}`}
    />
    <span>Internships</span>
  </button>
</nav>



        {/* Profile */}
        <div className="px-3 py-2 rounded hover:bg-gray-200 cursor-pointer flex items-center gap-2">
          <img
            src="/images/profile.png"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <span>Profile</span>
        </div>
      </aside>

      {/* Main Section */}
      <main className="ml-4 w-full h-[800px] bg-white rounded p-4">
        {activeSection === "" && (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a section to view content
          </div>
        )}

        {activeSection === "courses" && (
          <div className="flex flex-col gap-8">
            {/* First two blocks */}
            <div className="flex gap-8 ml-[60px]">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="w-[500px] h-[330px] bg-gray-100 rounded-2xl p-4 flex flex-col"
                >
                  <img
                    src="/images/course.png"
                    alt="Course"
                    className="rounded-md h-[200px] w-full object-cover mb-4"
                  />
                  <p className="font-bold font-Montserrat text-black text-[20px] leading-[28px] text-center">Course Title</p>
                  <button className="mt-auto px-[8px] font-DMsans text-[14px] font-bold leading-[24px] py-[8px] bg-[#F97C04] text-black rounded rounded-[8px] w-full">
                    Go to Course
                  </button>
                </div>
              ))}
            </div>

            {/* Lower Section Cards */}
            <div className="flex gap-8 ml-[65px]">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-[320px] h-[280px] bg-gray-100 rounded-2xl p-4 flex flex-col"
                >
                  <img
                    src="/images/course.png"
                    alt="Course"
                    className="rounded-md h-[150px] w-full object-cover mb-4"
                  />
                  <p className="font-bold font-Montserrat text-[20px] text-black leading-[28px] text-center">Course Title</p>
                  <button className="mt-auto px-4 text-[14px] font-bold leading-[24px] py-2 bg-[#F97C04] text-black rounded rounded-[8px] w-full">
                    Go to Course
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

