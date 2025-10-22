"use client";

import Header from '@/components/Header';
import PremiumAccess from '@/components/PremiumAccess';
import MeetYourMentors from '@/components/MeetYourMentors';
import StoriesThatInspire from '@/components/StoriesThatInspire';
import HaveQuestionsLetsTalk from '@/components/HaveQuestionsLetsTalk';
import SuccessGuide from '@/components/successGuide';
import Footer from '@/components/CoontactUs';
import WeeklyTopCourses from '@/components/WeeklyTopCourses';
import ChooseYourCareerPaths from '@/components/ChooseYourCareerPaths';
import { useEffect, useState } from 'react';
import { courseAPI } from '@/lib/api';


export default function Courses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      try {
        const list = await courseAPI.getCourses();
        setCourses(Array.isArray(list) ? list : []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#E5E7EA' }}>
      <Header />
      <WeeklyTopCourses courses={courses} loading={loading} />
      <ChooseYourCareerPaths courses={courses} loading={loading} />
      <PremiumAccess/>
      <MeetYourMentors/>
      <StoriesThatInspire/>
      <HaveQuestionsLetsTalk/>
      <SuccessGuide/>
      <Footer/>
    </div>
  );
}
