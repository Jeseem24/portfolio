'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import TechStackSection from '@/components/sections/TechStackSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/sections/Navbar';
import Preloader from '@/components/effects/Preloader';

const CustomCursor = dynamic(
  () => import('@/components/effects/CustomCursor'),
  { ssr: false }
);

const ParticleBackground = dynamic(
  () => import('@/components/effects/ParticleBackground'),
  { ssr: false }
);

const ScrollProgress = dynamic(
  () => import('@/components/effects/ScrollProgress'),
  { ssr: false }
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Preloader onComplete={() => setIsLoading(false)} />

      <main
        className={`relative min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden ${isLoading ? 'h-screen overflow-hidden' : ''}`}
      >
        <CustomCursor />
        <ParticleBackground />
        <ScrollProgress />
        <Navbar />

        {/* z-10 ensures content is above particle canvas (z-1) */}
        <div className={`relative z-10 flex flex-col transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ExperienceSection />
          <TechStackSection />
          <ContactSection />
          <Footer />
        </div>
      </main>
    </>
  );
}