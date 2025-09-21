import Footer from '@/components/CoontactUs'
import HaveQuestionsLetsTalk from '@/components/HaveQuestionsLetsTalk'
import Header from '@/components/Header'
import InternshipDetail from '@/components/InternshipDetail'
import SuccessGuide from '@/components/successGuide'
import React from 'react'

const InternshipDetailPage = () => {


  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#E5E7EA' }}>
         <Header/>
        <InternshipDetail/>
        <HaveQuestionsLetsTalk/>
        <SuccessGuide/>
        <Footer/>
    </div>
  )

}

export default InternshipDetailPage
