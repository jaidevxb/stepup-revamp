import { Suspense } from 'react';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ResourcesContent from '@/components/resources/ResourcesContent';

export const metadata: Metadata = {
  title: 'Learning Resources – StepUp',
  description: 'Curated, structured learning materials for each specialization track.',
};

function LoadingFallback() {
  return (
    <div className="py-24 text-center">
      <div className="text-gray-400 text-sm">Loading resources...</div>
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA]">
      <Navigation />
      <Suspense fallback={<LoadingFallback />}>
        <ResourcesContent />
      </Suspense>
      <Footer />
    </main>
  );
}
