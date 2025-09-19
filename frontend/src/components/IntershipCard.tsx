import Image from 'next/image'
import React from 'react'
import CTAButton from './CTAButton';

const IntershipCard = ( {internship}) => {
  return (
    // <div className='w-full p-4 bg-[#F1F1F1] rounded-2xl border border-gray-300  shadow-sm '>
    //     <div className='flex flex-col items-center justify-center '>
    //            <div className='w-full'> 
    //                 {/* image section  */}
    //                 <Image src="/images/internship.svg" alt="internship" width={331} height={330} className='w-full object-cover' />
    //            </div>
    //            <div className=' w-full my-12'>
    //                <h1 className='text-[#0A0A0A] font-bold text-lg text-center'>Internship Title</h1>
    //            </div>
    //     </div>
    // </div>






   <div className="group relative w-full h-96 overflow-hidden rounded-2xl bg-[#F1F1F1] shadow-lg p-4">
      <Image
        src="/images/internship.svg"
        alt="Card"
        width={384} 
        height={211}
        className="w-full h-[211px] object-cover transition-transform duration-500 group-hover:scale-110"
      />
     
      <div className="absolute top-0 left-0 w-full h-0 bg-[#F1F1F1] transition-all duration-500 ease-in-out group-hover:h-1/5"></div> 
      <div className="absolute bottom-0 left-0 w-full h-24 bg-[#F1F1F1] transition-all duration-500 ease-in-out group-hover:h-4/5 p-4 flex flex-col justify-start items-center ">
        <h2 className="text-xl  font-bold text-center text-gray-800 group-hover:mb-4">
          Internship Title
        </h2>
        <div className="opacity-0 group-hover:opacity-100 space-y-8 transition-opacity duration-500 p-4">
          <p className="text-[#0A0A0A] text-base font-medium mb-3 text-center">
            Build and optimize transcoding workflows for various formats and resolutions using cloud-native platforms.
          </p>
          <CTAButton 
            label='Apply to Internship'
            textColor='#0A0A0A'
            width={'100%'}
            arrowColor='#0A0A0A'
            disableBorderRadiusChange={true}
            keepFixedSizeOnHover={true}
          />
        </div>
      </div>
    </div>

  );

}



export default IntershipCard
