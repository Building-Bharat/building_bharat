"use client";

import Header from '@/components/Header';
import SuccessGuide from '@/components/successGuide';
import Footer from '@/components/CoontactUs';
import BlogsPage from '@/components/blogspage';




export default function blogs() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#E5E7EA' }}>
      <Header />
      <BlogsPage/>
      <SuccessGuide/>
      <Footer/>
    </div>
  );
}
