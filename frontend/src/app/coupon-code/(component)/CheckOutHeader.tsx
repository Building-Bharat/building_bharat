import {  MailIcon, MoveRight } from 'lucide-react'
import React from 'react'


const CheckOutHeader = () => {

  return (
         <header className="md:px-16">
            <div className="container mx-auto flex flex-row items-center justify-between py-3 font-Montserrat">                
                {/* Left Section */}
                <div className="flex items-center space-x-4">
                <img src="/images/logo.png" alt="Logo" className="h-14 w-14 sm:h-16 sm:w-16 object-contain" />
                {/* <h2 className="text-2xl font-semibold tracking-wide text-blue-400">
                    Building Bharat
                </h2> */}
                </div>

                {/* Right Section */}
                <div className="mt-4 sm:mt-0 text-center sm:text-right flex space-x-6 items-center justify-center">
                <p className="text-sm text-black font-semibold space-x-2 hidden lg:flex">
                    FACING ISSUES? CONTACT US <span className='ml-2'><MoveRight/></span>
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-1 sm:gap-4 mt-1 ">
                    
                    <div className="flex items-center gap-2 text-sm text-black font-medium transition">
                     <img src="/icons/whatsapp.svg" alt="" className='w-5 h-5' />
                    +91 98766543210
                    </div>
                    <p className="flex items-center gap-2 text-sm font-medium transition text-black">
                    <span className=' text-black'> <MailIcon className='w-6 h-6' /> </span> 
                      abc@gmail.com
                    </p>
                </div>
                </div>

            </div>
            </header>

  )
}

export default CheckOutHeader
