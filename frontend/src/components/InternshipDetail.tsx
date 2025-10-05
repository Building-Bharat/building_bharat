import React from 'react'
import CTAButton from './CTAButton'
import Image from 'next/image'
import styles from "../app/courses/(component)/scrollbar-hide.module.css";
import { Internship } from '@/types/internship';
import Loader from './Loader';
import Link from 'next/link';



interface InternshipDetail22Props {
  id: string;
}

async function getInternship(id: string): Promise<Internship> {
  const res = await fetch(`http://localhost:5000/api/v1/internship/${id}`, {
    cache: "no-store", 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch internship");
  }
  return res.json();
}


const InternshipDetail = async({ id}:InternshipDetail22Props) => {

  let data = null;
  try {
     const response = await getInternship(id);
     data = await response?.data
  } catch (err) {
    console.error("Error fetching internship:", err);
  }

   if(!data) return <div className='flex flex-col my-6'><p className='text-center text-black my-5 font-medium'>Internship is not found  <Link href="/internship" className='block w-fit mx-auto px-3 py-2 border my-3 rounded-lg border-green-800 '>Explore more</Link> </p>  <Loader/> </div>

  return (
    <>

     <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 m-4 sm:mx-16 ">

          {/* Left Scrollable Content */}
          <div className={`h-auto xl:h-screen sm:overflow-y-auto  ${styles.scrollbarHide} `}>
          
                  <div className='w-full'>
                
                                    <div className='space-y-4'>
                                        <h1 className='text-[#0A0A0A] text-xl font-bold '>{data?.name}</h1>
                                        <p className='text-base text-[#0A0A0A] font-[450]'>{data?.frim}</p>
                                    </div>
                
                
                                    <div className=''> 
                                         <div className='bg-gray-700 w-full h-56 my-8 relative'>
                                             {/* image  */}
                                             <Image src="/images/internship.svg" fill alt='Internship' className=' object-cover' /> 
                                         </div>
                
                                         <h1 className='text-base font-bold text-[#0A0A0A]'>About the Internship</h1>
                                         {/* <p className='text-base font-[450] text-[#0A0A0A] mt-4'>FOX Corporation is hiring for the role of Video Engineering Intern !</p> */}
                                         <p className='text-base font-[450] text-[#0A0A0A] mt-4'>{data?.description}</p>
                                    </div>
                
                                    <div className='my-8 space-y-8'>
                                         <h1 className="text-base font-bold mb-2 text-[#0A0A0A]">Responsibilities of the Intern:</h1>
                                         <div className='ml-2'>
                                              <ul className="list-disc list-inside text-[#0A0A0A] space-y-2 text-base font-[450]">
                                                    {data && data?.responsibilities.map((respons:string,index:string)=>(
                                                       <li key={index}>{respons}</li>   
                                                     ))}
                                              </ul>
                                         </div>
                                    </div>

                                </div>

                       </div>

          {/* Sticky Card Section */}
          <div className="">
               <div className="sticky top-6"> 
                      <div className=' lg:w-[328px] m-4 mx-auto '>
                                 <div className='bg-[#F1F1F1] w-full mx-auto border rounded-lg p-4 space-y-8 '> 
                                       <h1 className='text-base font-bold text-[#0A0A0A]'>Additional Informations:</h1>
                                        <div className='space-y-4'>
                                             <h2 className='text-base font-bold text-[#0A0A0A]'>Internship Location(s)</h2>
                                             <p className='text-base font-[450] text-[#0A0A0A]'>{data?.location}</p>
                                        </div> 
                                        <div className='space-y-4'>
                                             <h2 className='text-base font-bold text-[#0A0A0A]'>Internship Duration</h2>
                                             <p className='text-base font-[450] text-[#0A0A0A]'>{data?.duration} months</p>
                                        </div>
                                        <div className='space-y-4'>
                                             <h2 className='text-base font-bold text-[#0A0A0A]'>Stipend</h2>
                                             <p className='text-base font-[450] text-[#0A0A0A]'>{data?.stipend ? data?.stipend:"Not Disclosed" }</p>
                                        </div>
                                        <div className='space-y-4 pb-8'>
                                             <h2 className='text-base font-bold text-[#0A0A0A]'>Internship Type</h2>
                                             <p className='text-base font-[450] text-[#0A0A0A]'>{data?.internshipType}</p>
                                        </div>
                                       <Link href={`/internship/apply/${id}`} className=''>
                                           <CTAButton 
                                                 label='Apply Now'
                                                 textColor='#0A0A0A'
                                                 width={'100%'}
                                                 arrowColor='#0A0A0A'
                                                 disableBorderRadiusChange={true}
                                                 keepFixedSizeOnHover={true}
                                            />
                                       </Link>
                                 </div>
                        </div>               

               </div>
          </div>
     </div>
    </>

  )


}

export default InternshipDetail
