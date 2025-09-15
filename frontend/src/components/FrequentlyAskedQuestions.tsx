"use client";

import React, { useState } from "react";

interface FAQItem {
	id: number;
	question: string;
	answer: string;
}

export default function FrequentlyAskedQuestions() {
	const [expandedItems, setExpandedItems] = useState<number[]>([]);

	const faqData: FAQItem[] = [
		{
			id: 1,
			question: "Who can enroll in these courses?",
			answer: "Our courses are open to anyone interested in political field operations, campaign management, and public service. Whether you're a student, professional, or someone looking to make a career change, you're welcome to enroll."
		},
		{
			id: 2,
			question: "Are the courses recognized or certified?",
			answer: "Yes, all our courses provide completion certificates that are recognized in the political and public service sectors. These certificates can enhance your resume and demonstrate your expertise to potential employers."
		},
		{
			id: 3,
			question: "How are the courses structured?",
			answer: "Our courses are structured in modular format with video lectures, practical exercises, case studies, and real-world projects. Each module builds upon the previous one, ensuring comprehensive learning."
		},
		{
			id: 4,
			question: "What career opportunities can I expect after completing a course?",
			answer: "Graduates can pursue careers as campaign managers, field directors, political consultants, community organizers, and various roles in government and non-profit organizations."
		},
		{
			id: 5,
			question: "Can I learn at my own pace?",
			answer: "Absolutely! Our courses are designed for self-paced learning. You can access the content 24/7 and complete modules according to your schedule and learning speed."
		},
		{
			id: 6,
			question: "Can I get a refund if I'm not satisfied with the course?",
			answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied with the course content or learning experience, you can request a full refund within 30 days of enrollment."
		}
	];

	const toggleItem = (id: number) => {
		setExpandedItems(prev => 
			prev.includes(id) 
				? prev.filter(item => item !== id)
				: [...prev, id]
		);
	};

	return (
		<div className="flex flex-col gap-4 md:gap-8 items-start justify-start self-stretch flex-shrink-0 relative mt-16 mx-4 md:mx-16 mb-16">
			{/* Title */}
			<div className="text-[#005451] text-left font-Montserrat text-[16px] md:text-[20px] lg:text-[24px] leading-[24px] md:leading-[28px] lg:leading-[32px] font-bold relative self-stretch">
				Frequently Asked Questions
			</div>

			{/* FAQ Items */}
			<div className="w-full flex flex-col gap-4 md:gap-4 items-start justify-start self-stretch flex-shrink-0 relative">
				{faqData.map((item) => (
					<div
						key={item.id}
						className="w-full border border-[#9ea2ae] bg-[#F1F1F1] p-2 md:p-4 rounded-[16px] flex flex-col gap-4 md:gap-8 items-center md:justify-center justify-center self-stretch flex-shrink-0 relative"
					>
						<button
							onClick={() => toggleItem(item.id)}
							className="w-full flex flex-row gap-4 md:gap-8 items-center justify-start self-stretch flex-shrink-0 relative cursor-pointer transition-colors duration-200 md:rounded-[12px] p-0"
						>
							<div className="text-[#0a0a0a] text-left font-DmSans text-[14px] md:text-[16px] leading-[20px] font-normal relative flex-1">
								{item.question}
							</div>
							<div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 relative overflow-visible aspect-square transition-transform duration-200">
								<img
									className={`w-full h-full transition-transform duration-200 ${
										expandedItems.includes(item.id) ? 'rotate-180' : ''
									}`}
									src="/icons/arrow_down.png"
									alt="Toggle answer"
								/>
							</div>
						</button>
						
						{/* Answer - Expandable */}
						{expandedItems.includes(item.id) && (
							<div className="w-full text-black text-left font-DmSans text-[14px] md:text-[16px] leading-[20px] font-normal px-0 transition-all duration-700 ease-in-out">
								{item.answer}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
