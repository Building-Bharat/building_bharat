"use client";
import React from 'react'
import IntershipCard from './IntershipCard'
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';


export interface Internship {
  _id: string;
  name: string;
  description: string;
  skills: string[];
  duration: string;
  stipend: string;
  applyBy: string;
}


const Internships = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong while fetching internships.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  return (
    <section>
      <div className="flex flex-col items-center justify-center w-full px-4 sm:px-16 pb-8">
        <h1 className="text-[#005451] text-[18px] md:text-[32px] font-extrabold text-center mt-16 font-Montserrat">
          Explore Internships
        </h1>

        {loading ? (
          <p className="text-gray-600 mt-8">Loading internships...</p>
        ) : internships.length === 0 ? (
          <p className="text-red-500 mt-8">No internships found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 w-full mt-4 md:mt-8">
            {internships.map((internship) => (
              <IntershipCard key={internship._id} internship={internship} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Internships;

