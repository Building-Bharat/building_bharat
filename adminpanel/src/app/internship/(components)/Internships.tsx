'use client'
import React, { useEffect, useState } from 'react'
import InternshipCard from './InternshipCard'
import toast from 'react-hot-toast';
import Loader from '@/components/Loader';

const Internships = () => {


    const [showDialog, setShowDialog] = useState(false);
     const handleDelete = () => {
      setShowDialog(false);
      console.log("Card deleted ");
      // here you can call API to delete the card
    }

  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


   useEffect(() => {
    const fetchInternships = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("http://localhost:5000/api/v1/internship");
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to fetch internships");
        }
       
        const {data} = await res.json();
         console.log(data)
        if (data.length === 0) {
          throw new Error("No internships found");
        }
        setInternships(data?.internships);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
        toast.error(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  if (loading) return <Loader/>;


  return (
    <section className='mx-16'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 w-full mt-4 md:mt-8' >
         {
            internships && internships.map((internship,index)=>(
                 <InternshipCard key={index} internship={internship} />
            ))
         }  
     </div>

      
       {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg w-80">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Confirm Delete
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Are you sure you want to delete this card? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
    
  )
}

export default Internships
