'use client'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

const Coupon = () => {
  
     const router = useRouter();

  return (
     <section className='pb-12'>
          <div className='w-full px-4 sm:px-16 md:px-24 lg:px-32'>              
               <h1 className='text-center text-md sm:text-2xl lg:text-4xl text-black my-8 font-bold font-Montserrat'>Choose a payment plan that suits your mode of Investment</h1>
                <div className="flex flex-col xl:flex-row w-full items-stretch justify-center gap-6">
                    {/* Coupon Form */}
                    <div className="w-full flex-1">
                        <form className="flex flex-col justify-between h-full bg-white border border-teal-500 p-4 rounded-xl shadow-sm">
                        <div className="w-full">
                            <p className="text-gray-700 font-medium mb-1 font-Montserrat py-4 text-md">
                            Coupon / Referral Code (If Any)
                            </p>
                            <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Enter Code"
                                className="w-full px-4 py-2 pr-24 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-500 text-gray-800"
                            />
                            <button
                                type="submit"
                                className="absolute right-1 top-1 bottom-1 bg-gradient-to-r from-teal-800 via-teal-700 to-teal-600 font-Montserrat text-white font-medium px-5 rounded-md hover:from-teal-700 hover:via-teal-800 hover:to-teal-900 transition-all duration-300 shadow-md"
                            >
                                Apply
                            </button>
                            </div>
                        </div>

                        <div className="w-full border my-4 border-teal-500 p-2 text-[#005451] bg-teal-100 rounded-lg text-center font-Montserrat text-xs sm:text-sm font-semibold">
                            Apply a Coupon/Referral Code to unlock even more discounts!
                        </div>
                        </form>
                    </div>

                    {/* Course Brief */}
                    <div className="w-full flex-1">
                        <div className="flex flex-col justify-between h-full bg-white border border-teal-500 rounded-xl shadow-sm overflow-hidden">
                        {/* Top Section */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-6">
                            <img
                            src="/images/course.png"
                            alt="Course thumbnail"
                            className="w-full sm:w-72 sm:h-32 rounded-lg object-cover"
                            />
                            <div className="flex flex-col justify-center text-center sm:text-left">
                            <p className="font-Montserrat font-bold text-base sm:text-lg text-gray-900">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus excepturi alias necessitatibus
                            </p>
                            <p className="font-Montserrat text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed">
                                Experience Coding Success with AlgoZenith Premium Competitive Coding Training 
                            </p>
                            </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="flex flex-col sm:flex-row w-full">
                            <div className="flex-1 bg-[#005451] text-teal-100 text-center font-Montserrat font-bold py-3 text-base sm:text-lg">
                            ₹1,999 <span className="text-sm font-normal">(Inc. GST)</span>
                            </div>
                            <div className="flex-1 bg-teal-100 text-[#005451] text-center font-Montserrat font-medium py-3 text-sm sm:text-lg flex flex-col sm:flex-row items-center justify-center gap-2">
                            <p>Valid until</p>
                            <p className="font-semibold">12:34:34</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>



                 {/* select payment plan  */}
                 <div className='p-4 bg-white my-8 rounded-xl border border-teal-500'>
                        <p className=' text-base sm:text-xl font-extrabold font-Montserrat text-gray-500'>Select Payment Plans</p>
                        <div className='flex space-x-3 items-center justify-start font-bold my-4 font-Montserrat'>
                             <div className='bg-black w-4 h-4 rounded-full flex items-center justify-center'>
                                  <div className='bg-white w-[6px] h-[6px] rounded-full'></div>
                             </div>
                            <p> $1999</p>
                        </div>
                        <button className='w-full mt-8 mb-2 flex items-center justify-center py-3 bg-gradient-to-r from-[#005451] via-teal-700 to-teal-600 rounded-lg text-white font-Montserrat font-medium hover:from-teal-700 hover:via-teal-800 hover:to-teal-900 transition-all duration-500'>Complete Order <ArrowRight className='ml-2 w-5'/>  </button>
                 </div>

                 {/* back  */}
                 <button 
                     onClick={()=>router.push("/account-setup")}
                     type="submit"
                     className="bg-gradient-to-r flex items-center text-teal-900 justify-center px-8 py-3 from-white via-gray-100 to-gray-300 font-Montserrat transition-all duration-500 font-semibold border rounded-md hover:from-gray-100 hover:via-gray-300 hover:to-gray-400 "
                     >
                      <ArrowLeft className='mr-2 w-5'/>  
                      Back
                </button>


          </div>        
     </section>
  )
}

export default Coupon
