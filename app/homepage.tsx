'use client';

import Hero from '@/components/sections/Hero';
import MarketReality from '@/components/sections/MarketReality';
import Comparison from '@/components/sections/Comparison';
import LearningPath from '@/components/sections/LearningPath';
import ProgramOverview from '@/components/sections/ProgramOverview';
import Tracks from '@/components/sections/Tracks';
import BuildInPublic from '@/components/sections/BuildInPublic';
import SocialProof from '@/components/sections/SocialProof';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <MarketReality />
      <Comparison />
      <LearningPath />
      <ProgramOverview />
      <Tracks />
      <BuildInPublic />
      <SocialProof />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
