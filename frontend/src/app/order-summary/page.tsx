import React from 'react'
import CheckOutHeader from '../coupon-code/(component)/CheckOutHeader'
import { ShieldCheck} from "lucide-react";



const OrderSummary = () => {

  return (
    
    <section className=' bg-gray-100 pb-8 min-h-screen'>
            <CheckOutHeader/>
            <div className="flex flex-col lg:flex-row w-full px-8 md:px-28 items-center gap-2 sm:gap-16 lg:gap-8 mt-6 ">

            {/* Left Section — Certification Info */}
            <div className="flex flex-col w-full space-y-6">
                <h1 className=" text-lg md:text-3xl sm:text-4xl font-Montserrat font-bold text-black leading-snug"> Enhance your Programming Journey by Getting Certified! </h1>

                {/* Certificate Image */}
                <div className="w-full">
                <img
                    src="/images/certificate.png"
                    alt="Certificate"
                    className="w-full rounded-xl shadow-md object-cover"
                />
                </div>

                {/* Info Cards */}
                <div className="flex flex-col sm:flex-row  items-start sm:items-center justify-between gap-6 sm:gap-12 p-4">
                
                {/* EMI Info */}
                <div className="flex-1 space-y-2">
                    <p className="text-[#005451] font-semibold font-Montserrat text-sm sm:text-base">NO COST EMI</p>
                    <p className="text-gray-600 text-sm font-Montserrat"> Easy on your wallet. Choose no-cost EMI while paying with credit cards.</p>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-20 bg-[#005451]" />

                {/* Secure Payment */}
                <div className="flex-1">
                    <p className="text-[#005451] text-sm sm:text-base text-center font-semibold font-Montserrat xl:whitespace-nowrap">100% SAFE & SECURE PAYMENT</p>
                    <img
                    src="/images/razorpay.png"
                    alt="Razorpay secure payment"
                    className="h-8 mt-2 object-contain"
                    />
                </div>
                </div>
            </div>



            {/* Right Section — Order Summary */}
            <div className="flex w-full ">
                <div className="flex flex-col items-center bg-white border  border-teal-500 rounded-xl shadow-sm overflow-hidden w-full">

                {/* Top Section */}
                <div className="flex flex-col flex-wrap xl:flex-nowrap sm:flex-row items-center sm:items-start gap-4 p-3 sm:p-6">
                    <img
                    src="/images/course.png"
                    alt="Course thumbnail"
                    className="w-full lg:w-64 sm:h-40 rounded-lg object-cover mx-auto"
                    />
                    <div className="flex flex-col justify-center text-center sm:text-left">
                        <p className="font-Montserrat font-bold text-base sm:text-lg text-gray-900">
                            AZ Premium: Take your DSA & CP Skills to the Zenith
                        </p>
                        <p className="font-Montserrat text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed">
                            Experience Coding Success with AlgoZenith Premium Competitive Coding Training.
                        </p>
                    </div>
                </div>

                   <div className='flex flex-col w-full px-6 font-Montserrat'>
                        <div className='border-b w-full py-3 sm:py-5 flex items-center justify-between font-bold text-md'>
                              <p>{""}</p>
                              <p>$1999</p>
                        </div>
                        <div className='border-b w-full flex py-3 sm:py-5 items-center justify-between font-bold text-md'>
                              <p>Subtotoal</p>
                              <p>$1999</p>
                        </div>
                        <div className='border-b w-full flex py-3 sm:py-5 items-center justify-between font-bold text-md'>
                              <p>Discount</p>
                              <p>$1999</p>
                        </div>
                        <div className='border-b w-full flex py-3 sm:py-5 items-center justify-between font-bold text-md'>
                              <p>Total</p>
                              <p>$1999</p>
                        </div>
                         <button className='w-full py-3 my-8 bg-[#005451] rounded-lg text-white font-Montserrat text-base flex items-center justify-center'>Pay Securely<ShieldCheck className='w-7 pl-2' />  </button>
                   </div>                 
                </div>
              </div>
            </div>


    </section>
     
  )

}

export default OrderSummary
