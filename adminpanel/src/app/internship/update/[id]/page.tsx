'use client'
import React, { useEffect, useState } from 'react'
import UpdateInternship from '../../(components)/UpdateIntership'
import IntershipNavbar from '../../(components)/Navbar'
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';



const UpdateInternshipPage = () => {
  const params = useParams();
  const { id } = params;
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    useEffect(() => {
    if (!id) return;

    const fetchInternship = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`http://localhost:5000/api/v1/internship/${id}`);

        if (!res.ok) {
          const {data} = await res.json();
          throw new Error(data.message || "Failed to fetch internship");
        }

        const {data} = await res.json();
        setInternship(data);
        console.log(internship)

      } catch (err: any) {
        setError(err.message || "Something went wrong");
        toast.error(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchInternship();
  }, [id]);




//   const internship: Internship = {
//   name: "Full Stack Web Development Internship",
//   description:
//     "Work with our engineering team to build scalable web applications using React, Node.js, and MongoDB.",
//   skills: "JavaScript, React, Node.js, MongoDB, Git",
//   duration: 6, // can also be "6" if you want it as a string
//   stipend: 12000, 
//   internshipType: "Hybrid", // Remote | Onsite | Hybrid
//   applyBy: "2026-07-31", // ISO date string
//   responsibilities: [
//     "Develop user-facing features using React",
//     "Implement REST APIs with Node.js and Express",
//     "Design and manage MongoDB databases",
//     "Collaborate with designers and other developers",
//     "Write clean, maintainable, and testable code",
//   ],
// };


  return (
    <div className='mb-16'>
        <IntershipNavbar/>
       <UpdateInternship internship={internship} />   
    </div>
  )
}

export default UpdateInternshipPage
