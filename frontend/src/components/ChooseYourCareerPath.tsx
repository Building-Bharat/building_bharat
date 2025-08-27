import React from 'react'
import CTAButton from './CTAButton'

const ChooseYourCareerPath = () => {
  return (

         <section className="mt-16 my-4 mx-0 lg:mx-16">
                  <div className="w-full lg:max-w-[1152px] mx-auto px-8 lg:px-0">
                  <h1 className="text-lg w-full text-black lg:text-[32px] leading-[38px] text-center font-extrabold py-2">
                        Choose Your Career Path
                  </h1>

                  {/* Grid container */}
                  <div className="min-h-[440px] w-full bg-gray-300 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center pb-44">
                        <CareerPathCard />
                        <CareerPathCard />
                        <CareerPathCard />
                        <CareerPathCard />
                  </div>
                  </div>
        </section>

      )
}




const CareerPathCard = () =>{

  
    return (

          <div className="w-full max-w-[396px] shadow-md">
                  <div className="w-full px-4 border border-gray-800 rounded-lg overflow-hidden">
                        <div className="h-[196px] w-full rounded-lg bg-gray-600">
                              {/* image */}
                        </div>
                        {/* Card Content */}
                        <div className="">
                              <h2 className="text-lg font-bold">Card Title</h2>
                              <p className="text-sm text-gray-300">Card description goes here...</p>
                        </div>
                         <CTAButton label='View Course Details'></CTAButton>
                  </div>
        </div>



    )

}

export default ChooseYourCareerPath




