"use client";

import { useState } from "react";

export default function AssignmentsSection() {
  const [activeTab, setActiveTab] = useState("Pending");

  const tabs = ["Pending", "Completed", "Course 1", "Course 2"];
  const assignments = [
    { id: 1, title: "Assignment", img: "/images/course.png" },
    { id: 2, title: "Assignment", img: "/images/course.png" },
    { id: 3, title: "Assignment", img: "/images/course.png" },
  ];

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md border ${
              activeTab === tab
                ? "bg-[#1C1C1C] text-white font-bold"
                : "bg-white text-black font-bold"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Assignment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-white rounded-lg shadow-md border p-3 w-[330px] h-[315px]"
          >
            <img
              src={assignment.img}
              alt="assignment"
              className="w-full h-[180px] rounded-md object-cover"
            />
            <div className="p-2 text-center w-full">
              <h3 className="mt-[10px] text-[20px] leading-[28px] font-weight:700 text-black font-bold font-Montserrat">{assignment.title}</h3>
              <button className="bg-[#F97C04] mt-[20px] w-full text-black px-4 py-2 rounded-md font-bold">
                View Assignment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
