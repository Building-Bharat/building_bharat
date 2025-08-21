"use client";

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import BharatMatters from '@/components/BharatMatters';
import CareerSection from '@/components/CarrerSection';
import Footer from '@/components/CoontactUs';
import ImpactMatrix from '@/components/ImpactMatrix';
import InitiativeSection from '@/components/InitiativeFor';
import StoriesThatInspire from '@/components/StoriesThatInspire';
import HaveQuestionsLetsTalk from '@/components/HaveQuestionsLetsTalk';
import SuccessGuide from '@/components/successGuide';
import NetworkSection from '@/components/NetworkSection';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#E5E7EA' }}>
      <Header />
      <HeroSection />
      <InitiativeSection/>
      <CareerSection/>
      <BharatMatters/>
      <StoriesThatInspire/>
      <ImpactMatrix/>
      <NetworkSection/>
      <HaveQuestionsLetsTalk/>
      <SuccessGuide/>
      <Footer/>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
