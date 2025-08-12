"use client";

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import InitiativeSection from '@/components/InitiativeFor';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <InitiativeSection/>
    </div>
  );
}
