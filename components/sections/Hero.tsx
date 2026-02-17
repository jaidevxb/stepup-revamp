'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Don't Just Learn to Code.{' '}
              <span className="text-gray-600">Learn to Ship Products.</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              The STEP UP Program transforms beginners into startup-ready{' '}
              <span className="font-semibold text-gray-900">Product Developers</span>{' '}
              — the kind startups actually want to hire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white">
                Choose Your Track
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-900 hover:bg-gray-50">
                See the Program
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gray-900 rounded-lg p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
                <code>{`const ProductDeveloper = {
  skills: [
    'fullstack',
    'product-thinking',
    'user-empathy',
    'business-context'
  ],

  mindset: 'outcome-first',

  build: () => {
    return 'products that matter';
  },

  ship: () => {
    console.log('Weekly. Always.');
  }
};

export default ProductDeveloper;`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
