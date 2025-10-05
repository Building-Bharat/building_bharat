"use client";

import React, { useState } from "react";
import Security from "./Security";

type NavItem = {
	id: "courses" | "assignments" | "internships";
	label: string;
	isActive?: boolean;
};

type TabId = "Account" | "Notifications" | "Security";

export default function Profile(): JSX.Element {
    const [activeTab, setActiveTab] = useState<TabId>("Account");
    const [browserNotifications, setBrowserNotifications] = useState<boolean>(false);
    const [emailNotifications, setEmailNotifications] = useState<boolean>(false);
    const [productTips, setProductTips] = useState<boolean>(false);

	const navigationItems: NavItem[] = [
		{ id: "courses", label: "Courses", isActive: true },
		{ id: "assignments", label: "Assignments" },
		{ id: "internships", label: "Internships" }
	];

	const tabItems: { id: TabId; label: string; isActive?: boolean }[] = [
		{ id: "Account", label: "Account", isActive: true },
		{ id: "Notifications", label: "Notifications" },
		{ id: "Security", label: "Security" }
	];

	const personalInfo = [
		{ label: "Name", value: "User_001", actionText: "Change name", hasAction: true },
		{ label: "Email", value: "tempuser001@mail.com", subText: "Managed by Google", hasAction: false },
		{ label: "Mobile", value: "9999990000", actionText: "Update mobile", hasAction: true },
		{ label: "College", value: "xyzcollege", actionText: "Update college", hasAction: true }
	];

	return (
		<div className="flex min-h-screen w-full items-stretch justify-start relative gap-0">
			<main
				className="flex items-start p-4 relative flex-1 self-stretch grow bg-[var(--color-surface-surfacePrimary,#F1F1F1)]"
				role="main"
			>
				<section className="flex flex-col items-start gap-4 p-4 relative flex-1 self-stretch grow bg-white rounded-md overflow-hidden overflow-y-auto">
					{/* Tabs */}
					<div className="flex items-center gap-2 p-4 relative self-stretch w-full" role="tablist" aria-label="Account settings tabs">
						{tabItems.map((tab) => (
							<button
								key={tab.id}
								className={`inline-flex px-4 py-2 rounded-lg items-center justify-center border ${
									tab.id === activeTab ? "bg-[#212936] text-white border-[#212936]" : "bg-white text-black border-gray-300"
								}`}
								onClick={() => setActiveTab(tab.id)}
								role="tab"
								aria-selected={tab.id === activeTab}
								aria-controls={`${tab.id.toLowerCase()}-panel`}
							>
								{tab.label}
							</button>
						))}
					</div>

					{/* Panel title - only for Account */}
					{activeTab === "Account" && (
						<div className="flex items-center p-4 relative self-stretch w-full" role="tabpanel" id={`${activeTab.toLowerCase()}-panel`} aria-labelledby={`${activeTab.toLowerCase()}-tab`}>
							<h1 className="text-xl font-bold text-black">Personal</h1>
						</div>
					)}

					{/* Content */}
					{activeTab === "Account" && (
						<div className="flex flex-col gap-4">
							{personalInfo.map((info, idx) => (
								<div key={idx} className="flex flex-col gap-2 p-4">
									<label className="text-black font-semibold">{info.label}</label>
									<div className="text-black">{info.value}</div>
									{info.subText && <div className="text-black/70">{info.subText}</div>}
									{info.hasAction && (
										<button className="text-[#005451] font-semibold hover:underline w-fit">{info.actionText}</button>
									)}
								</div>
							))}
						</div>
					)}

                {activeTab === "Notifications" && (
                    <div className="flex flex-col gap-6">
                        {/* Browser notifications */}
                        <section className="flex flex-col gap-2 p-4">
                            <h2 className="text-base font-semibold text-black">Browser notifications</h2>
                            <button
                                className="text-[#005451] font-semibold w-fit hover:underline"
                                onClick={() => {
                                    if (typeof window !== 'undefined' && 'Notification' in window) {
                                        Notification.requestPermission().then((permission) => {
                                            if (permission === 'granted') setBrowserNotifications(true);
                                        });
                                    }
                                }}
                            >
                                {browserNotifications ? 'Enabled' : 'Enable browser notifications'}
                            </button>
                        </section>

                        {/* Email notifications */}
                        <section className="flex flex-col gap-3 p-4">
                            <h2 className="text-base font-semibold text-black">Email notifications</h2>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 border border-[#F97C04] rounded"
                                    checked={emailNotifications}
                                    onChange={(e) => setEmailNotifications(e.target.checked)}
                                />
                                <span className="text-[#005451] font-semibold">Send notifications by email</span>
                            </label>
                            <p className="text-sm text-gray-500">
                                You will still receive important account or billing emails.
                            </p>
                        </section>

                        {/* Product tips */}
                        <section className="flex flex-col gap-3 p-4">
                            <h2 className="text-base font-semibold text-black">Product tips and news</h2>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 border border-[#F97C04] rounded"
                                    checked={productTips}
                                    onChange={(e) => setProductTips(e.target.checked)}
                                />
                                <span className="text-[#005451] font-semibold">Send occasional updates and promotions</span>
                            </label>
                            <p className="text-sm text-gray-500">
                                You can unsubscribe any time. See our <a href="#" className="text-[#005451] underline">Privacy Policy</a>.
                            </p>
                        </section>
                    </div>
                )}

                {activeTab === "Security" && <Security />}

					<div className="w-full h-4" />
				</section>
			</main>
		</div>
	);
}


