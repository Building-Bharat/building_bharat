"use client";

import Header from '@/components/Header';
import PremiumAccess from '@/components/PremiumAccess';
import MeetYourMentors from '@/components/MeetYourMentors';
import StoriesThatInspire from '@/components/StoriesThatInspire';
import HaveQuestionsLetsTalk from '@/components/HaveQuestionsLetsTalk';
import SuccessGuide from '@/components/successGuide';
import Footer from '@/components/CoontactUs';
import WeeklyTopCourses from '@/components/WeeklyTopCourses';
import ChooseYourCareerPath from '@/components/ChooseYourCareerPath';


export default function Courses() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#E5E7EA' }}>
      <Header />
      <WeeklyTopCourses/>
      <ChooseYourCareerPath/>
      <PremiumAccess/>
      <MeetYourMentors/>
      <StoriesThatInspire/>
      <HaveQuestionsLetsTalk/>
      <SuccessGuide/>
      <Footer/>
    </div>
  );
}
