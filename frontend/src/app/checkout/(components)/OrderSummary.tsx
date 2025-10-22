'use client'
import CTAButton from '@/components/CTAButton'
import React, { useState } from 'react'

interface OrderSummaryProps {
  courseId?: string;
  userId?: string;
  course?: any;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ courseId, userId, course }) => {
  const [studentCode, setStudentCode] = useState('');

  return (
      <section className='w-full max-w-md mx-auto'>
           <form className='flex flex-col p-6 items-start justify-center w-full border bg-white rounded-lg shadow-lg'>
                 <h1 className='text-base font-bold py-4 '>Order Summary</h1>
                 <div className='flex space-x-4'>
                      <div className='w-24 h-24 bg-gray-600 rounded-lg'></div>
                      <div className='flex flex-col items-start justify-between'>
                         <h1 className='text-base font-[450] text-[#0A0A0A]'>
                           {course?.title || 'Course Title'}
                         </h1>
                         <p className='text-[13px]'>₹{course?.price || '0'}</p>
                         <p className='text-[13px]'>VAT (included)</p>
                      </div>
                 </div> 
                 <hr className='my-4 w-full bg-gray-400 text-gray-600' />
                 <div className='flex items-center justify-between w-full'>
                    <p className='font-semibold'>Total</p>
                    <p className='font-semibold'>₹{course?.price || '0'}</p>
                 </div>

                 <div className='w-full'>
                     <div className='w-full flex flex-col'>
                           <input 
                             type="text" 
                             placeholder='Enter Student Code (Optional)' 
                             className='p-4 bg-gray-200 border my-8 border-orange-300 rounded-lg outline-none'
                             value={studentCode}
                             onChange={(e) => setStudentCode(e.target.value)}
                           />
                            <div className='flex space-x-3 items-start justify-start rounded-2xl'>
                             <input
                                type="checkbox"
                                id="currentlyStudying"
                                name="currentlyStudying"
                                className="
                                    w-6 h-6
                                    appearance-none
                                    border border-orange-500 rounded-lg
                                    cursor-pointer
                                    checked:bg-orange-600 checked:border-orange-600
                                    flex items-center justify-center
                                    before:content-['']
                                    checked:before:content-['✓']
                                    before:text-white before:font-bold before:text-sm 
                                    mt-1
                                "
                            />
                            <p className='text-sm'>Click here to agree to share your email and agree to <a href="#" className='underline'>our privacy policy</a></p>
                           </div>

                           <p className='flex text-center space-x-1 w-full items-center justify-center py-4'>Need Help? <a href={"/"} className='text-[#F97C04] underline'> Contact US</a> </p> 
                     </div>
                 </div>

                 <div className='space-y-4 my-4'>
                    <p className='text-sm'>You are purchasing a digital license for this product. For full terms, see <a href="#" className='underline'>purchase policy.</a> </p>
                    <p className='text-sm'>By selecting 'Place Order' below, you certify that you are over 18 and an authorized user of this payment method, and agree to the <a href="#" className='underline'>End User License Agreement.</a>  </p>
                     <CTAButton  
                            label='Place Order'
                            textColor='#0A0A0A'
                            width={'100%'}
                            arrowColor='#0A0A0A'
                            disableBorderRadiusChange={true}
                            keepFixedSizeOnHover={true}
                     />
                 </div>

           </form>
      </section>
  )
}

export default OrderSummary