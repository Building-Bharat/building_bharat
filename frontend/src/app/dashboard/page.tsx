"use client";

import { useEffect, useState } from "react";
import { Home, Book, GraduationCap } from "lucide-react";
import Link from "next/link";
import AssignmentsSection from "@/components/assignmentDash";
import { toast } from "react-toastify";
import CTAButton from "@/components/CTAButton";
import Image from "next/image";

export interface Internship {
  applied: boolean;
  _id: string;
  name: string;
  description: string;
  skills: string[];
  duration: string;
  stipend: string;
  applyBy: string;
}

export default function UserDashboard() {
  const [activeSection, setActiveSection] = useState("");
  const [courseTab, setCourseTab] = useState<"my" | "all">("my");
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "applied">("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fetchInternships = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/v1/internship/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setInternships(data?.data?.internships || []);
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.message || "Something went wrong while fetching internships."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  return (
    <div className="flex h-full w-full bg-[#005451] p-4 relative">
      {/* ============== SIDEBAR (Desktop only) ============== */}
      <aside className="hidden sm:flex w-[232px] h-[696px] flex-col justify-between bg-[#005451] rounded p-2">
        {/* Logo container */}
        <div className="w-[232px] h-[72px] rounded-[8px] -mt-[7px] bg-[#F1F1F1] flex items-center justify-center">
          <img
            src="/images/bb1.png"
            alt="Logo Building Bharat"
            className="w-[40px] h-[40px] object-contain"
          />
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
            <span className="text-[#F1F1F1] font-bold text-[16px] leading-[24px]">
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
            <span className="text-[#F1F1F1] font-bold text-[16px] leading-[24px]">
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
            <span className="text-[#F1F1F1] font-bold text-[16px] leading-[24px]">
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
          <span className="text-[#F1F1F1] font-bold text-[16px] leading-[24px]">
            Profile
          </span>
        </div>
      </aside>

      {/* ============== MOBILE NAVBAR ============== */}
<div className="flex sm:hidden flex-col w-full">
  {/* Top bar */}
  <div className="flex items-center h-[70px] justify-between bg-[#005451] px-4 text-black shadow-md fixed top-0 left-0 w-full z-50">
    {/* Hamburger */}
    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
      <img src="/icons/dehaze.png" alt="menu" className="w-7 h-7" />
    </button>

    {/* Logo */}
    <div className="w-[60px] h-[60px] rounded rounded-[8px] bg-[#F1F1F1] items-center flex">
     <img src="/images/bb1.png" alt="Logo" className="w-[40px] ml-[10px]" />
    </div>
  
    
  </div>

  {/* Fullscreen Menu Overlay */}
  {mobileMenuOpen && (
    <div className="fixed inset-0 bg-[#005451] mt-[63px] text-white flex flex-col items-center justify-center gap-10 text-xl z-40 transition-all duration-500">
      <button
        onClick={() => {
          setActiveSection("courses");
          setMobileMenuOpen(false);
        }}
        className="hover:text-orange-400 font-Montserrat font-bold text-[16px] leading-[24px]"
      >
        Courses
      </button>
      <button
        onClick={() => {
          setActiveSection("assignments");
          setMobileMenuOpen(false);
        }}
        className="hover:text-orange-400 font-Montserrat font-bold text-[16px] leading-[24px]"
      >
        Assignments
      </button>
      <button
        onClick={() => {
          setActiveSection("internships");
          setMobileMenuOpen(false);
        }}
        className="hover:text-orange-400 font-Montserrat font-bold text-[16px] leading-[24px]"
      >
        Internships
      </button>
      <div className="">
        <button
        onClick={() => setMobileMenuOpen(false)}
        className="hover:text-orange-400 mt-[200px]"
      >
        Profile
      </button>
      </div>
    </div>
    
  )}
</div>

      {/* ============== MAIN SECTION ============== */}
      <main className={`h-[800px] bg-white rounded overflow-y-scroll no-scrollbar p-4 
    ${mobileMenuOpen ? "w-0 hidden" : "w-full sm:ml-4"}`}>
        {activeSection === "" && (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a section to view content
          </div>
        )}

        {activeSection === "assignments" && <AssignmentsSection />}

        {activeSection === "internships" && (
          <div className="overflow-y-scroll mb-[90px] no-scrollbar w-auto h-auto">
            <section>
              <div className="flex flex-col w-full px-4 sm:px-16 pb-8">
                {/* Toggle Buttons */}
                <div className="flex gap-4 mb-6 h-[50px]">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`px-4 py-2 rounded-lg font-bold border ${
                      activeTab === "all"
                        ? "bg-[#212936] text-white border-[#212936]"
                        : "bg-gray text-gray-600"
                    }`}
                  >
                    All Internships
                  </button>

                  <button
                    onClick={() => setActiveTab("applied")}
                    className={`px-4 py-2 rounded-lg font-bold border ${
                      activeTab === "applied"
                        ? "bg-[#212936] text-white border-black"
                        : "bg-white text-gray-600 border-black"
                    }`}
                  >
                    Applied Internships
                  </button>
                </div>

                {loading ? (
                  <p className="text-gray-600 mt-8">Loading internships...</p>
                ) : internships.length === 0 ? (
                  <p className="text-red-500 mt-8">No internships found.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 w-full mt-4 md:mt-8">
                    {internships
                      .filter((internship) =>
                        activeTab === "all" ? true : internship.applied === true
                      )
                      .map((internship) => (
                        <div
                          key={internship._id}
                         className="group relative w-full h-96 overflow-hidden rounded-2xl bg-[#F1F1F1] shadow-lg p-4"
                        >
                          <Image
                            src="/images/internship.svg"
                            alt="Card"
                            width={384}
                            height={211}
                            className="w-full h-[211px] object-cover transition-transform duration-500 group-hover:scale-110"
                          />

                          <div className="absolute bottom-0 left-0 w-full h-24 bg-[#F1F1F1] transition-all duration-500 ease-in-out group-hover:h-4/5 p-4 flex flex-col justify-start items-center ">
                            <h2 className="text-xl font-bold text-center text-gray-800 group-hover:mb-4">
                              {internship.name}
                            </h2>
                            <div className="opacity-0 group-hover:opacity-100 space-y-8 transition-opacity duration-500 p-4">
                              <p className="text-[#0A0A0A] text-base font-medium mb-3 text-center">
                                {internship.description}
                              </p>

                              <Link href={`/internship/${internship._id}`}>
                                <CTAButton
                                  label="Apply to Internship"
                                  textColor="#0A0A0A"
                                  width="100%"
                                  arrowColor="#0A0A0A"
                                  disableBorderRadiusChange={true}
                                  keepFixedSizeOnHover={true}
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {activeSection === "courses" && (
          <div className="flex flex-col gap-8">
            {/* Toggle Buttons */}
            <div className="flex gap-4 sm:ml-[75px] mt-[20px]">
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
              <div className="flex flex-col md:flex-row ml-0 sm:ml-[70px] gap-8 w-full">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-full md:w-[500px] h-auto bg-gray-200 rounded-2xl p-4 flex flex-col"
                  >
                    <img
                      src="/images/course.png"
                      alt="Course"
                      className="rounded-md h-[200px] md:h-[250px] w-full object-cover mb-4"
                    />
                    <p className="font-bold text-black text-[18px] md:text-[20px] text-center">
                      Course Title
                    </p>
                    <Link href={`/dashboard/courseoverview/${i}`}>
                      <button className="mt-[8px] px-[8px] py-[8px] bg-[#F97C04] font-bold font-DMsans text-black rounded-[8px] w-full">
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
                <div className="flex flex-col md:flex-row gap-8 md:ml-[70px]">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-full md:w-[500px] h-[360px] bg-gray-200 rounded-2xl p-4 flex flex-col"
                    >
                      <img
                        src="/images/course.png"
                        alt="Course"
                        className="rounded-md h-[230px] w-full object-cover mb-4"
                      />
                      <p className="font-bold text-black text-[20px] text-center">
                        Course Title
                      </p>
                      <Link href={`/dashboard/courseoverview/${i}`}>
                        <button className="mt-[8px] px-[8px] text-[14px] font-bold py-[8px] bg-[#F97C04] text-black rounded-[8px] w-full">
                          Enroll Now
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Small cards */}
                <div className="flex flex-col md:flex-row gap-8 md:ml-[70px]">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-full md:w-[320px] h-[280px] bg-gray-200 rounded-2xl p-4 flex flex-col"
                    >
                      <img
                        src="/images/course.png"
                        alt="Course"
                        className="rounded-md h-[150px] w-full object-cover mb-4"
                      />
                      <p className="font-bold text-[20px] text-black text-center">
                        Course Title
                      </p>
                      <Link href={`/dashboard/courseoverview/${i}`}>
                        <button className="mt-auto px-4 text-[14px] font-bold py-2 bg-[#F97C04] text-black rounded-[8px] w-full">
                          Enroll Now
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

