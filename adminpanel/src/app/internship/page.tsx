import React from 'react'
import IntershipNavbar from './(components)/Navbar'
import Internships from './(components)/Internships'

const InternshipPage = () => {


  return (
    <div className='m-0 bg-white min-h-screen mb-12'>
        <IntershipNavbar/>
        <Internships/>
    </div>
  )


}

export default InternshipPage
