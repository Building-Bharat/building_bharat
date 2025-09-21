"use client";

import React from "react";
import CourseView from "./CourseView";

export type CourseDetailsProps = {
    title?: string;
    duration?: string;
    price?: string;
};

export default function CourseDetail({ title = "Course Title", duration = "8 Hours", price = "₹999" }: CourseDetailsProps) {

    return (
        <section className="w-full flex-col justify-center text-start px-4 sm:px-6 md:px-4 lg:px-16 mt-0 md:mt-32 lg:mt-0 " style={{ background: "#E5E7EA" }} > 
                <div className="space-y-2 mt-[64px] mb-4">
                    <h1 className="text-[#005451] text-[18px] md:text-[32px] font-extrabold">Political Field Operations Mastery</h1>
                    <p className="text-[#0A0A0A] text-[13px] md:text-[16px] font-bold">Duration {duration} </p>
                </div>            
               <CourseView/>
               
        </section>
    );
}
