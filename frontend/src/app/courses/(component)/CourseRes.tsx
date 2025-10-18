import CTAButton from '@/components/CTAButton'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  course?: any;
  courseId?: string;
}

const CourseRes = ({ course, courseId }: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const courseIdFromQuery = params.get('courseId') || undefined;
  const resolvedCourseId = courseId || courseIdFromQuery || undefined;
  const price = course?.price ?? 6999;

  // Check if user is logged in
  const isUserLoggedIn = () => {
    if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token'); // Assuming JWT token is stored as 'token'
      return !!(userId && token);
    }
    return false;
  };

  const handleEnrollClick = () => {
    const isLoggedIn = isUserLoggedIn();
    
    if (!isLoggedIn) {
      // User not logged in - redirect to login with return URL
      const returnUrl = encodeURIComponent(`/account-setup?courseId=${resolvedCourseId || ''}`);
      router.push(`/login?returnUrl=${returnUrl}`);
    } else {
      // User is logged in - go directly to account setup
      const userId = localStorage.getItem('userId');
      const qs = new URLSearchParams();
      if (resolvedCourseId) qs.set('courseId', resolvedCourseId);
      if (userId) qs.set('userId', userId);
      router.push(`/account-setup?${qs.toString()}`);
    }
  };
  return (

     <section className='w-full'>
           <div className=' py-0 px-0 lg:py-8 lg:px-8 w-full'>
                 <h1 className='whitespace-nowrap w-full font-Montserrat text-base md:text-xl py-2 lg:py-4 font-bold text-[#005451] '>This Course Includes:</h1>
                 <ul className='py-4 grid grid-cols-2 w-full overflow-hidden lg:grid-cols-1 text-[#0A0A0A] font-medium gap-3 lg:gap-5 list-disc list-inside '>
                     <li className='text-[12px] w-full lg:min-w-[300px] sm:text-base whitespace-nowrap marker:text-teal-700'>Video Content</li>
                     <li className='text-[12px] w-full lg:min-w-[300px] sm:text-base whitespace-nowrap marker:text-teal-700'>Downloadable resources</li>
                     <li className='text-[12px] w-full lg:min-w-[300px] sm:text-base whitespace-nowrap marker:text-teal-700'>Practical assignments</li>
                     <li className='text-[12px] w-full lg:min-w-[300px] sm:text-base whitespace-nowrap marker:text-teal-700'>Discussion forums</li>
                     <li className='text-[12px] w-full lg:min-w-[300px] sm:text-base whitespace-nowrap marker:text-teal-700'>Post course internship</li>
                 </ul>
                <h1 className='text-base md:text-xl font-bold text-[#0A0A0A] font-Montserrat my-4 md:my-6 '>₹{price}</h1>
                  <CTAButton label='Enroll Now'
                        textColor='#0A0A0A'
                        width={'100%'}
                        arrowColor='#0A0A0A'
                        disableBorderRadiusChange={true}
                        keepFixedSizeOnHover={true}
                        onClick={handleEnrollClick}
                 />
           </div>
     </section>
  )
}

export default CourseRes
