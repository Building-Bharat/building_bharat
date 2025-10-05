import Image from 'next/image'
import React from 'react'
import CTAButton from './CTAButton';
import { Internship } from '@/types/internship';
import { useRouter } from 'next/navigation';

interface InternshipCardProps {
  internship: Internship;
}

const IntershipCard:React.FC<InternshipCardProps> = ( {internship}) => {
  const router = useRouter();
  console.log(internship)

  const cardHandler=()=>{
      router.push(`/internship/${internship._id}`)
  }

  return (

   <div className="group relative w-full h-96 overflow-hidden rounded-2xl bg-[#F1F1F1] shadow-lg p-4">
      <Image
        src="/images/internship.svg"
        alt="Card"
        width={384} 
        height={211}
        className="w-full h-[211px] object-cover transition-transform duration-500 group-hover:scale-110"
      />
     
      <div className="absolute top-0 left-0 w-full h-0 bg-[#F1F1F1] transition-all duration-500 ease-in-out group-hover:h-1/5"></div> 
      <div className="absolute bottom-0 left-0 w-full h-40 bg-[#F1F1F1] transition-all duration-500 ease-in-out group-hover:h-4/5 p-4 flex flex-col justify-start items-center ">
        <h2 className=" text-base xl:text-lg  font-bold text-center text-gray-800 mb-2">
          {/* Internship Title */}
          {internship?.name}
        </h2>
        <p className='text-[#0A0A0A] text-sm xl:text-base group-hover:hidden font-medium mb-3 text-center'> {internship?.description} </p>
        
        <div className='space-y-2 hidden group-hover:block'>
           <p className='text-sm font-[450] text-[#0A0A0A]'>Apply By: {new Date(internship?.applyBy).toISOString().split('T')[0]}</p>
           <p className='text-sm font-[450] text-[#0A0A0A]'> Internship Type :  <span className='text-sm'>{internship?.internshipType}</span> </p>
           <p className='text-sm font-[450] text-[#0A0A0A]'>Duration : {internship?.duration} </p>
           <p className='text-sm font-[450] text-[#0A0A0A]'>Location : {internship?.location} </p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 space-y-8 transition-opacity duration-500 p-4">
          
          {/* <p className="text-[#0A0A0A] text-base font-medium mb-3 text-center">
            {/* Build and optimize transcoding workflows for various formats and resolutions using cloud-native platforms. */}
            {/* {internship?.description} */}
          {/* </p> */} 
          <CTAButton 
            onClick={cardHandler}
            label='View Internship'
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
