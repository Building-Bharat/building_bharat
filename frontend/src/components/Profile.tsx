"use client";

import React, { useState, useEffect } from "react";
import Security from "./Security";
import axios from "axios";

type NavItem = {
	id: "courses" | "assignments" | "internships";
	label: string;
	isActive?: boolean;
};

type TabId = "Account" | "Notifications" | "Security";

interface UserData {
	name: string;
	email: string;
	username?: string;
	whatsappNumber?: string;
	collegeName?: string;
	department?: string;
	state?: string;
	collegePassout?: number;
}

export default function Profile(): JSX.Element {
    const [activeTab, setActiveTab] = useState<TabId>("Account");
    const [browserNotifications, setBrowserNotifications] = useState<boolean>(false);
    const [emailNotifications, setEmailNotifications] = useState<boolean>(false);
    const [productTips, setProductTips] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

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

	// Fetch user data
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const userId = localStorage.getItem('userId');
				if (!userId) {
					console.error('No user ID found');
					setLoading(false);
					return;
				}

				const response = await axios.get(`http://localhost:5000/api/v1/user/${userId}`);
				if (response.data?.data) {
					setUserData(response.data.data);
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchUserData();
	}, []);

	const personalInfo = [
		{ 
			label: "Name", 
			value: loading ? "Loading..." : (userData?.name || "Not set"), 
			actionText: "Change name", 
			hasAction: true 
		},
		{ 
			label: "Email", 
			value: loading ? "Loading..." : (userData?.email || "Not set"), 
			subText: "", 
			hasAction: false 
		},
		{ 
			label: "Username", 
			value: loading ? "Loading..." : (userData?.username || "Not set"), 
			actionText: "Update username", 
			hasAction: true 
		},
		{ 
			label: "Mobile", 
			value: loading ? "Loading..." : (userData?.whatsappNumber || "Not set"), 
			actionText: "Update mobile", 
			hasAction: true 
		},
		{ 
			label: "College", 
			value: loading ? "Loading..." : (userData?.collegeName || "Not set"), 
			actionText: "Update college", 
			hasAction: true 
		},
		{ 
			label: "Department", 
			value: loading ? "Loading..." : (userData?.department || "Not set"), 
			actionText: "Update department", 
			hasAction: true 
		},
		{ 
			label: "State", 
			value: loading ? "Loading..." : (userData?.state || "Not set"), 
			actionText: "Update state", 
			hasAction: true 
		},
		{ 
			label: "Passout Year", 
			value: loading ? "Loading..." : (userData?.collegePassout?.toString() || "Not set"), 
			actionText: "Update year", 
			hasAction: true 
		}
	];

    	return (
        <>
        {/* Mobile layout (Account) */}
        <div className="sm:hidden fixed inset-0 w-screen h-screen overflow-y-auto overflow-x-hidden bg-white">
            <div className="w-full max-w-[460px] mx-auto px-4 py-4 bg-white flex flex-col gap-4">
                {/* Top bar with simple actions */}
                <div className="w-full px-4 py-2 bg-white shadow-md inline-flex justify-between items-center">
                    <div className="w-10 h-10 bg-zinc-300" />
                    <div className="w-7 h-6 bg-orange-500" />
                    <div className="p-2 bg-white rounded-lg flex justify-center items-center">
                        <div className="w-6 h-6 bg-gray-300" />
                    </div>
                </div>

                {/* Tabs */}
                <div className="w-full px-4 py-2 inline-flex items-center gap-2">
                    <button
                        onClick={() => setActiveTab("Account")}
                        data-state={activeTab === "Account" ? "toggleON" : "toggleOFF"}
                        className={`px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] ${
                            activeTab === "Account" ? "bg-[#212936] text-white outline-[#212936]" : "outline-gray-300 text-black"
                        }`}
                    >
                        Account
                    </button>
                    <button
                        onClick={() => setActiveTab("Notifications")}
                        data-state={activeTab === "Notifications" ? "toggleON" : "toggleOFF"}
                        className={`px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] ${
                            activeTab === "Notifications" ? "bg-[#212936] text-white outline-[#212936]" : "outline-gray-300 text-black"
                        }`}
                    >
                        Notifications
                    </button>
                    <button
                        onClick={() => setActiveTab("Security")}
                        data-state={activeTab === "Security" ? "toggleON" : "toggleOFF"}
                        className={`px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] ${
                            activeTab === "Security" ? "bg-[#212936] text-white outline-[#212936]" : "outline-gray-300 text-black"
                        }`}
                    >
                        Security
                    </button>
                </div>

                {/* Account panel for mobile */}
                {activeTab === "Account" && (
                    <div className="w-full flex flex-col gap-2">
                        <div className="px-4 py-2">
                            <h2 className="text-base font-bold text-black">Personal</h2>
                        </div>
                        {personalInfo.map((info, idx) => (
                            <div key={idx} className="px-4 py-2 flex flex-col gap-2">
                                <div className="text-xs font-bold text-black">{info.label}</div>
                                <div className="text-sm font-bold text-black">{info.value}</div>
                                {info.subText && <div className="text-sm text-black">{info.subText}</div>}
                                {info.hasAction && (
                                    <button className="text-[#005451] text-sm font-bold w-fit">{info.actionText}</button>
                                )}
                            </div>
                        ))}
                        <div className="h-4" />
                    </div>
                )}

                {activeTab === "Notifications" && (
                    <div className="w-full flex flex-col gap-3">
                        {/* Browser notifications */}
                        <div className="w-full px-4 py-2 flex flex-col gap-2">
                            <div className="text-xs font-bold text-black">Browser notifications</div>
                            <button
                                className="text-[#005451] text-sm font-bold w-fit hover:underline"
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
                        </div>

                        {/* Email notifications */}
                        <div className="w-full px-4 py-2 flex flex-col gap-2">
                            <div className="text-xs font-bold text-black">Email notifications</div>
                            <div className="flex flex-col gap-4">
                                <label className="inline-flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="w-6 h-6 rounded border border-[#F97C04]"
                                        checked={emailNotifications}
                                        onChange={(e) => setEmailNotifications(e.target.checked)}
                                    />
                                    <span className="text-[#005451] text-xs font-bold">Send notifications by email</span>
                                </label>
                                <div className="inline-flex items-center gap-4">
                                    <div className="w-10 h-6 opacity-0 rounded border border-[#F97C04]" />
                                    <p className="flex-1 text-sm text-gray-500">
                                        You’ll still get other emails from Building Bharat, like important account or billing info.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Product tips and news */}
                        <div className="w-full px-4 py-2 flex flex-col gap-2">
                            <div className="text-xs font-bold text-black">Product tips and news</div>
                            <div className="flex flex-col gap-4">
                                <label className="inline-flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="w-6 h-6 rounded border border-[#F97C04]"
                                        checked={productTips}
                                        onChange={(e) => setProductTips(e.target.checked)}
                                    />
                                    <span className="text-[#005451] text-xs font-bold">Send me occasional emails with updates and promotions from Building Bharat</span>
                                </label>
                                <div className="inline-flex items-center gap-4">
                                    <div className="w-6 h-6 opacity-0 rounded border border-[#F97C04]" />
                                    <p className="flex-1 text-sm text-gray-500">
                                        You can unsubscribe any time. For more information, review our{' '}
                                        <a href="#" className="text-[#005451] underline">Privacy Policy</a>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="h-4" />
                    </div>
                )}

                {activeTab === "Security" && (
                    <div className="px-2"><Security /></div>
                )}
            </div>
        </div>

        {/* Desktop layout */}
		<div className="hidden sm:flex min-h-screen w-full items-stretch justify-start relative gap-0">
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
		</>
		);
}


