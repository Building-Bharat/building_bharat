"use client";

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import BharatMatters from '@/components/BharatMatters';
import CareerSection from '@/components/CarrerSection';
import Footer from '@/components/CoontactUs';
import ImpactMatrix from '@/components/ImpactMatrix';
import InitiativeSection from '@/components/InitiativeFor';
import NetworkSection from '@/components/NetworkSection';
import StoriesThatInspire from '@/components/StoriesThatInspire';
import HaveQuestionsLetsTalk from '@/components/HaveQuestionsLetsTalk';
import SuccessGuide from '@/components/successGuide';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: '#E5E7EA' }}>
      <Header />
      <HeroSection />
      <InitiativeSection/>
      <CareerSection/>
      <BharatMatters/>
    <StoriesThatInspire/>
    <ImpactMatrix/>
    <HaveQuestionsLetsTalk/>
    <NetworkSection/>
      <SuccessGuide/>
      <Footer/>
    </div>
  );
}
