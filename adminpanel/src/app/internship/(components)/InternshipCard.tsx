'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const InternshipCard = ({ internship }: any) => {


  console.log(internship)
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [token,setToken] = useState<string | null>(localStorage.getItem("token"));


    const handleDelete = async(e: React.FormEvent) => {
      e.preventDefault();
  
      setLoading(true);
      setError(null);
      setSuccess(null);
  
      try {
         
         const res = await fetch(`http://localhost:5000/api/v1/internship/admin/${internship?._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to create internship");
        }

        setSuccess("Internship deleted successfully!");
      } catch (err: any) {
          console.log(error)
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      } 
  
    };
  
      useEffect(() => {
      if (error) {
        toast.error(error)
        const timer = setTimeout(() => {
          setError(null); // clear error after 5 seconds
        }, 5000);
  
        return () => clearTimeout(timer); 
      }
      if(success){
       router.refresh();
       toast.success(success)
      }
    }, [error,success]);

  return (


      <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200">
      {/* Top image */}
      <div className="relative h-48 w-full">
        <Image
          src="/images/course.png" // replace with your image
          alt="Card Image"
          fill
          className="object-cover"
        />
      </div>

      {/* Bottom content */}
      <div className="p-4 flex flex-col gap-3">
        <h3 className="text-md font-semibold text-gray-800">
          {internship?.name} 
        </h3>
        <p className="text-gray-500 text-xs"> Apply By: {new Date(internship?.applyBy).toLocaleDateString("en-GB")} </p>

        {/* Action buttons */}
        <div className="flex gap-2 mt-2">
          <button onClick={()=>router.push(`/internship/update/${internship?._id}`)} className="flex-1 bg-blue-600 text-white py-2 cursor-pointer rounded-lg hover:bg-blue-700 transition">
            Update
          </button>
          <button onClick={handleDelete} className="flex-1 cursor-pointer bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
            Delete
          </button>
        </div>
      </div>
    </div>


  )
}

export default InternshipCard
