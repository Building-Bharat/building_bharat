"use client";

import React from "react";
import CourseVideo from "./CourseVideo";

export type CourseDetailsProps = {
    title?: string;
    duration?: string;
    price?: string;
};

export default function CourseDetail({ title = "Course Title", duration = "8 Hours", price = "₹999" }: CourseDetailsProps) {

    return (
        <section className="w-full flex-col justify-center text-start px-4 sm:px-6 md:px-16" style={{ background: "#E5E7EA" }} > 
                <div className="space-y-2 mt-[64px] mb-4">
                    <h1 className="text-[#0A0A0A] text-[18px] md:text-[32px] font-extrabold">Political Field Operations Mastery</h1>
                    <p className="text-[#0A0A0A] text-[13px] md:text-[16px] font-bold">Duration {duration} </p>
                </div>            
               <CourseVideo />
        </section>
    );
}
