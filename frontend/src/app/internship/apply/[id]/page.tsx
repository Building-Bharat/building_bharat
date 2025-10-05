import React from 'react'
import Apply from '../../(components)/Apply'
import Header from '@/components/Header';
import Footer from '@/components/CoontactUs';


interface ApplyPageProps {
  params: { id: string };
}

const ApplyPage = async({params}:ApplyPageProps) => {
  
  const {id} = await params
 
  return (
    <>
    
    <div className='min-h-screen  bg-gray-200'>
       <Header/>    
       <Apply id={id} />
      <Footer/>  
    </div>
    </>
  )
}

export default ApplyPage
