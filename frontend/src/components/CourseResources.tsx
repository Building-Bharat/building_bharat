import Image from 'next/image'
import React from 'react'

const CourseResources = () => {

 const resources = [
   
    {
         link:"",
         image:"/images/vid_resource.png",
         text:"12 hours of video content"
    },
    {
         link:"",
         image:"/images/download.png",
         text:"Downloadable resources"
    },
    {
         link:"",
         image:"/images/assignment.png",
         text:"Practical assignments"
    },
    {
         link:"",
         image:"/images/discussion.png",
         text:"Discussion forums"
    },
    {
         link:"",
         image:"/images/perk.png",
         text:"Perk"
    }
 ]

  return (
      <section id='course_resource' className='w-full'> 
            <div className='w-full flex flex-row flex-wrap md:flex-col items-center justify-center'>        
                       {resources.map((res,index)=>(
                            <div key={index} className=' flex flex-row flex-wrap md:flex-col items-center justify-center'>
                              <div className='m-2 md:m-4 rounded-lg w-36 min-h-32 md:w-44 md:min-h-36 text-sm sm:text-base bg-teal-700 p-2 md:p-4 space-y-3 flex flex-col items-center justify-center'>
                                   <p className='text-white text-sm font-normal text-center '>{res.text}</p>
                                   <Image src={res.image} alt="" width={24} height={24} />
                              </div>
                           </div>
                       ))}                 
           </div>
      </section>

  )
}

export default CourseResources
