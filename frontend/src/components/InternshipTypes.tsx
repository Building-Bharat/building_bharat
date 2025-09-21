import React from 'react'

const InternshipTypes = () => {


  return (
      <section>
            <div className=' lg:h-[160px] bg-black my-16'>
                   <div className='flex gap-4 py-8 lg:gap-8 items-center justify-center h-full flex-wrap '>

                         <div className='text-[#F1F1F1]  min-w-[160px] md:min-w-[200px] space-y-2 flex flex-col items-center justify-center'>
                            <h1 className='font-bold text-base md:text-xl'>25+</h1>
                            <p className='text-[14px] md:text-base font-[450] font-DMsans'>Government Internship</p>
                         </div>
                          <div className='text-white space-y-2  min-w-[160px] md:min-w-[200px] flex flex-col items-center justify-center'>
                            <h1 className='font-bold text-base md:text-xl'>12+</h1>
                            <p className= 'text-[14px] md:text-base font-[450] font-DMsans'>International Internships</p>
                         </div>
                          <div className='text-white space-y-2  min-w-[160px] md:min-w-[200px] flex flex-col items-center justify-center'>
                            <h1 className='font-bold text-base md:text-xl'>150+</h1>
                            <p className='text-[14px] md:text-basetext-base font-[450] font-DMsans'>Public Policy Internship</p>
                         </div>
                          <div className='text-white space-y-2 min-w-[160px] md:min-w-[200px] flex flex-col items-center justify-center'>
                            <h1 className='font-bold text-base md:text-xl'>10k</h1>
                            <p className='text-[14px] md:text-base font-[450] font-DMsans'>Average Stipend</p>
                         </div>
                        
                   </div>
            </div>
      </section>
  )
}

export default InternshipTypes
