"use client";

import React from "react";
import MeetYourCourseMentor from "./MeetYourCourseMentor";

export type CourseDetailsProps = {
	title?: string;
	duration?: string;
	price?: string;
};

export default function CourseDetails({ title = "Course Title", duration = "8 Hours", price = "₹999" }: CourseDetailsProps) {
	return (
		<div className="w-full" style={{ background: "#E5E7EA" }}>
			{/* Main Course Content */}
			<section className="w-full flex justify-center px-4 sm:px-6 md:px-8">
				<div className="w-full max-w-[1160px] mx-auto py-8">
					<h1 className="font-Montserrat font-extrabold text-[24px] md:text-[28px] text-[#0A0A0A]">{title}</h1>
					<div className="mt-4 w-full h-[220px] md:h-[320px] bg-[#0A0A0A] rounded-[8px]" />
					<div className="mt-4 flex flex-col md:flex-row gap-4 items-start">
						<p className="text-sm md:text-base text-[#0A0A0A] opacity-80 flex-1">
							Master the art of field operations for political campaigns. Learn how to build and manage ground teams, volunteer networks, constituency strategies, and voter outreach programs.
						</p>
						<div className="flex items-center gap-3">
							<span className="text-[#0A0A0A] font-medium">{duration}</span>
							<span className="text-[#0A0A0A] font-bold">{price}</span>
						</div>
					</div>
					<div className="mt-8 bg-white rounded-[8px] border border-[#E5E7EA] p-4">
						<h2 className="font-Montserrat font-bold text-[#0A0A0A]">Course Content</h2>
						<ul className="list-disc pl-5 mt-2 text-[#0A0A0A] opacity-80">
							<li>Module 1: Volunteer Recruitment & Management</li>
							<li>Module 2: Door-to-Door Canvassing Strategies</li>
							<li>Module 3: Event Operations & Management</li>
						</ul>
					</div>
				</div>
			</section>
		</div>
	);
}
