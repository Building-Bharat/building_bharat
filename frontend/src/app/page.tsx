"use client";

import BharatMatters from '@/components/BharatMatters';
import CareerSection from '@/components/CarrerSection';
import Footer from '@/components/CoontactUs';
import ImpactMatrix from '@/components/ImpactMatrix';


import InitiativeSection from '@/components/InitiativeFor';
import NetworkSection from '@/components/NetworkSection';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-surface-surfacePrimary, #E5E5E5)' }}>
      
      
      <InitiativeSection/>
      <CareerSection/>
      <BharatMatters/>
      <ImpactMatrix/>
      <NetworkSection/>
      <Footer/>
      
    </div>
  );
}
