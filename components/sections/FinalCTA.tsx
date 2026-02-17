'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  const scrollToTracks = () => {
    document.getElementById('tracks')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          The Opportunity is There.
          <br />
          <span className="text-gray-300">Are You Ready?</span>
        </h2>
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          Don't just learn to code. Learn to ship products. Learn to think like a Product Developer.
          <br />
          Choose your track and start building today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/tracks">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 w-full sm:w-auto">
              Get Started - It's Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white/10 hover:text-white" onClick={scrollToTracks}>
            View All Tracks
          </Button>
        </div>
        <p className="text-sm text-gray-400 mt-6">
          No credit card required. Start learning immediately.
        </p>
      </div>
    </section>
  );
}
