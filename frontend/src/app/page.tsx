"use client";

import BharatMatters from '@/components/BharatMatters';
import CareerSection from '@/components/CarrerSection';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import InitiativeSection from '@/components/InitiativeFor';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <InitiativeSection/>
      <CareerSection/>
      <BharatMatters/>
      
    </div>
  );
}
