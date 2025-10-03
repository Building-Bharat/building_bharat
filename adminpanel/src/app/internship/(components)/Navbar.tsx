'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const IntershipNavbar = () => {

   const router = useRouter()

  return (

     <nav>
          <div className='h-20 bg-[#F97C04]'>
                 <div className='flex space-x-4 items-center justify-end h-full mx-16 '>
                     <button
                        onClick={()=>router.push("/internship/create")} 
                        type="submit"
                        className="w-40 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition cursor-pointer"
                        >
                        Create Internship
                     </button>

                      <button
                        type="submit"
                        onClick={()=>router.push("/dashboard")} 
                        className="w-32 bg-gray-500 text-white py-2 rounded hover:bg-gray-700 transition cursor-pointer"
                        >
                        Dashboard
                     </button>

                 </div>
          </div>
     </nav>

  )
}

export default IntershipNavbar
