"use client";

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import BharatMatters from '@/components/BharatMatters';
import CareerSection from '@/components/CarrerSection';
import Footer from '@/components/CoontactUs';
import ImpactMatrix from '@/components/ImpactMatrix';
import InitiativeSection from '@/components/InitiativeFor';
import NetworkSection from '@/components/NetworkSection';
import SuccessGuide from '@/components/successGuide';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-surface-surfacePrimary, #F1F1F1)' }}>
      <Header />
      <HeroSection />
      <InitiativeSection/>
      <CareerSection/>
      <BharatMatters/>
      <ImpactMatrix/>
      <NetworkSection/>
      <SuccessGuide/>
      <Footer/>
    </div>
  );
}
