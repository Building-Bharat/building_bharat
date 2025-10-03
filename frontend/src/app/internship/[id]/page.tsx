import Footer from '@/components/CoontactUs'
import HaveQuestionsLetsTalk from '@/components/HaveQuestionsLetsTalk'
import Header from '@/components/Header'
import InternshipDetail from '@/components/InternshipDetail'
import React from 'react'

interface InternshipDetailPageProps {
  params: { id: string };
}
const InternshipDetailPage = async ({ params }: InternshipDetailPageProps) => {
           const { id } = await params;
  return (

           <div className='bg-[#E5E7EA] m-0'>
            <Header/>
            <InternshipDetail id={id} />
            <HaveQuestionsLetsTalk/>
            <Footer/>
           </div> 

  )

}

export default InternshipDetailPage
