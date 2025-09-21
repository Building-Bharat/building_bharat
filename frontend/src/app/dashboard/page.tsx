"use client";

import { useState } from "react";
import { Home, Book, GraduationCap } from "lucide-react";
import Link from "next/link";
import AssignmentsSection from "@/components/assignmentDash";

export default function UserDashboard() {
  const [activeSection, setActiveSection] = useState("");
  const [courseTab, setCourseTab] = useState<"my" | "all">("my");

  return (
    <div className="flex h-full w-full bg-[#005451] p-4">
      {/* Sidebar */}
      <aside className="w-[232px] h-[696px] flex flex-col justify-between bg-[#005451] rounded p-2">
        {/* Logo container */}
        <div className="w-[232px] h-[72px] rounded rounded-[8px] -mt-[7px] bg-[#F1F1F1] flex items-center justify-center">
          <span className="font-bold text-lg">
            <img
              src="/images/bb1.png"
              alt="Logo Building Bharat"
              className="w-[40px] h-[40px] object-contain"
            />
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
              className={`pb-1 w-[30px] h-[30px] ${
                activeSection === "courses" ? "border-b-2 border-[#F97C04]" : ""
              }`}
            />
            <span className="text-[#F1F1F1] font-bold text-[16px] leading-[24px] font-DMsans font-weight:700">
              Courses
            </span>
          </button>

          <button
            onClick={() => setActiveSection("assignments")}
            className="flex items-center gap-3 px-3 py-2 rounded text-white"
          >
            <Book
              size={25}
              className={`pb-1 w-[30px] h-[30px] ${
                activeSection === "assignments"
                  ? "border-b-2 border-orange-500"
                  : ""
              }`}
            />
            <span className="text-[#F1F1F1] font-bold text-[16px] leading-[24px] font-DMsans font-weight:700">
              Assignments
            </span>
          </button>

          <button
            onClick={() => setActiveSection("internships")}
            className="flex items-center gap-3 px-3 py-2 rounded text-white"
          >
            <GraduationCap
              size={25}
              className={`pb-1 w-[30px] h-[30px] ${
                activeSection === "internships"
                  ? "border-b-2 border-orange-500"
                  : ""
              }`}
            />
            <span className="text-[#F1F1F1] font-bold text-[16px] leading-[24px] font-DMsans font-weight:700">
              Internships
            </span>
          </button>
        </nav>

        {/* Profile */}
        <div className="px-3 py-2 rounded hover:bg-orange-500 cursor-pointer flex items-center gap-2">
          <img
            src="/images/profile.png"
            alt="Profile"
            className="w-[40px] h-[40px] rounded-full"
          />
          <span className="text-[#F1F1F1] font-bold text-[16px] leading-[24px] font-DMsans font-weight:700">
            Profile
          </span>
        </div>
      </aside>

      {/* Main Section */}
      <main className="ml-4 w-full h-[800px] bg-white rounded rounded-[8px] p-4">
        {activeSection === "" && (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a section to view content
          </div>
        )}

        {activeSection === "assignments" && (
          <AssignmentsSection/>
        )}

        {activeSection === "courses" && (
          <div className="flex flex-col gap-8">
            {/* Toggle Buttons */}
            <div className="flex gap-4 ml-[75px] mt-[20px]">
              <button
                onClick={() => setCourseTab("my")}
                className={`px-6 py-2 rounded-lg font-semibold ${
                  courseTab === "my"
                    ? "bg-[#212936] text-white"
                    : "bg-white border border-gray-400 text-black"
                }`}
              >
                My Courses
              </button>
              <button
                onClick={() => setCourseTab("all")}
                className={`px-6 py-2 rounded-lg font-semibold ${
                  courseTab === "all"
                    ? "bg-[#212936] text-white"
                    : "bg-white border border-gray-400 text-black"
                }`}
              >
                All Courses
              </button>
            </div>

            {/* My Courses Section */}
            {courseTab === "my" && (
              <div className="flex gap-8 ml-[60px]" id="mycourses">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-[500px] h-[370px] bg-gray-100 rounded-2xl p-4 flex flex-col"
                  >
                    <img
                      src="/images/course.png"
                      alt="Course"
                      className="rounded-md h-[250px] w-full object-cover mb-4"
                    />
                    <p className="font-bold h-auto font-Montserrat text-black text-[20px] leading-[28px] text-center">
                      Course Title
                    </p>
                    <Link href={`/dashboard/courseoverview/${i}`}>
                      <button className="mt-[8px] px-[8px] font-DMsans text-[14px] font-bold leading-[24px] py-[8px] bg-[#F97C04] text-black rounded-[8px] w-full">
                        Go to Course
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* All Courses Section */}
            {courseTab === "all" && (
              <div className="flex flex-col gap-8" id="allcourses">
                {/* Big cards */}
                <div className="flex gap-8 ml-[60px]">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-[500px] h-[360px] bg-gray-100 rounded-2xl p-4 flex flex-col"
                    >
                      <img
                        src="/images/course.png"
                        alt="Course"
                        className="rounded-md h-[230px] w-full object-cover mb-4"
                      />
                      <p className="font-bold font-Montserrat text-black text-[20px] leading-[28px] text-center">
                        Course Title
                      </p>
                      <Link href={`/dashboard/courseoverview/${i}`}>
                        <button className="mt-[8px] px-[8px] font-DMsans text-[14px] font-bold leading-[24px] py-[8px] bg-[#F97C04] text-black rounded-[8px] w-full">
                          {"Enroll Now"}
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Small cards */}
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
                      <p className="font-bold font-Montserrat text-[20px] text-black leading-[28px] text-center">
                        Course Title
                      </p>
                      <Link href={`/dashboard/courseoverview/${i}`}>
                      <button className="mt-auto px-4 text-[14px] font-bold leading-[24px] py-2 bg-[#F97C04] text-black rounded-[8px] w-full">
                        {"Enroll Now"}
                      </button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
