"use client";

import Header from '@/components/Header';
import PremiumAccess from '@/components/PremiumAccess';
import StoriesThatInspire from '@/components/StoriesThatInspire';
import HaveQuestionsLetsTalk from '@/components/HaveQuestionsLetsTalk';
import SuccessGuide from '@/components/successGuide';
import Footer from '@/components/CoontactUs';


export default function Courses() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#E5E7EA' }}>
      <Header />
      <PremiumAccess/>
      <StoriesThatInspire/>
      <HaveQuestionsLetsTalk/>
      <SuccessGuide/>
      <Footer/>
    </div>
  );
}
