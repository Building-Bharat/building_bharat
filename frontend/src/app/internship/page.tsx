import Footer from '@/components/CoontactUs'
import HaveQuestionsLetsTalk from '@/components/HaveQuestionsLetsTalk'
import Header from '@/components/Header'
import HowToApplyForInternship from '@/components/HowToApplyForInternship'
import Internships from '@/components/Internships'
import InternshipTypes from '@/components/InternshipTypes'
import SuccessGuide from '@/components/successGuide'
import React from 'react'

const InternshipPage = () => {


  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#E5E7EA' }}>
      <Header />
      <Internships/>
      <HowToApplyForInternship/>
      <InternshipTypes/>
      <HaveQuestionsLetsTalk/>
      <SuccessGuide/>
      <Footer/>
    </div>
  )


}

export default InternshipPage
