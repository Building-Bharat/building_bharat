"use client";

import React from "react";

type Session = {
	location: string;
	provider: string;
	os: string;
	browser: string;
	lastAccessed: string;
	created: string;
	isCurrent?: boolean;
};

const mockSessions: Session[] = [
	{
		location: "Noida, India",
		provider: "Google · 122.161.65.135",
		os: "Windows",
		browser: "Chrome",
		lastAccessed: "21 minutes ago",
		created: "Created 1 month ago",
		isCurrent: true
	},
	{
		location: "Delhi, India",
		provider: "App · 122.161.65.135",
		os: "Windows",
		browser: "Chrome",
		lastAccessed: "2 hours ago",
		created: "Created 1 month ago",
		isCurrent: false
	}
];

export default function Security(): JSX.Element {
    return (
        <div className="flex-1 w-full p-0 bg-transparent">
            <div className="w-full p-4 bg-white rounded-none border-0 shadow-none flex flex-col gap-4">
				{/* Tabs header outside is handled by parent */}
				<div className="p-4">
					<h2 className="text-xl font-bold text-black">Sessions</h2>
				</div>
				<p className="px-4 text-sm text-black">
					All of your active sessions are listed below. End any sessions you don't recognize or trust.
				</p>
                <div className="w-full">
					<div className="grid grid-cols-4 gap-8 p-4 text-sm font-bold text-gray-500 shadow-none">
						<div>Location &amp; IP</div>
						<div>OS &amp; Browser</div>
						<div>Last accessed</div>
						<div className="text-center">Manage</div>
					</div>
					<div className="border-t border-gray-300" />
                    {mockSessions.map((s, idx) => (
                        <div key={idx} className="grid grid-cols-4 gap-8 p-4 text-sm">
							<div className="flex flex-col">
								<span className="text-black">{s.location}</span>
								<span className="text-gray-500">{s.provider}</span>
							</div>
							<div className="flex flex-col">
								<span className="text-black">{s.os}</span>
								<span className="text-gray-500">{s.browser}</span>
							</div>
							<div className="flex flex-col">
								<span className="text-black">{s.lastAccessed}</span>
								<span className="text-gray-500">{s.created}</span>
							</div>
							<div className="flex items-center justify-center">
								{ s.isCurrent ? (
									<span className="text-gray-500 font-medium">Current</span>
								) : (
									<button className="text-red-600 font-semibold hover:underline">Sign out</button>
								)}
							</div>
						</div>
					))}
				</div>
				<div className="h-4" />
			</div>
		</div>
	);
}


