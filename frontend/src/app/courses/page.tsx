import ChooseYourCareerPath from '@/components/ChooseYourCareerPath'
import Header from '@/components/Header'
import WeeklyTopCourses from '@/components/WeeklyTopCourses'
import React from 'react'

const page = () => {

  return (
     <section id='courses' className='w-full bg-[#E5E7EA] min-h-screen'>
          <Header/>
          <WeeklyTopCourses/>
          <ChooseYourCareerPath/>
        

     </section>
  )
}

export default page
