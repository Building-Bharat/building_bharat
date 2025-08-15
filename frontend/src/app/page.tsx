"use client";

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import BharatMatters from '@/components/BharatMatters';
import CareerSection from '@/components/CarrerSection';
import ImpactMatrix from '@/components/ImpactMatrix';
import InitiativeSection from '@/components/InitiativeFor';
import NetworkSection from '@/components/NetworkSection';
import StoriesThatInspire from '@/components/StoriesThatInspire';

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
      <NetworkSection/>
    </div>
  );
}
