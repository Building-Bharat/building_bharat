import React from 'react'
import ApplicationForm from './ApplicationForm'
import { Internship } from '@/types/internship';



async function getInternship(id: string): Promise<Internship> {
  const res = await fetch(`http://localhost:5000/api/v1/internship/${id}`, {
    cache: "no-store", 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch internship");
  }
  return res.json();
}


const Apply = async ({id}:{id:string}) => {

     const response = await getInternship(id);
     const data = await response?.data
  
   return (
    <div className='m-4 md:mx-16 mt-16 py-4'>
         <ApplicationForm data={data} />
    </div>
  )
}

export default Apply
