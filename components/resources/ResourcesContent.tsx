'use client';

import { useSearchParams } from 'next/navigation';
import { resources, TABS } from './resourcesData';
import TabNav from './TabNav';
import ResourceCard from './ResourceCard';

export default function ResourcesContent() {
  const searchParams = useSearchParams();
  const trackParam = searchParams.get('track');

  const validTabs = TABS.map((t) => t.id);
  const activeTab = validTabs.includes(trackParam ?? '') ? (trackParam as string) : 'fs-core';

  const trackData = resources[activeTab];

  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-[#F8F9FA] border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Learning Resources
          </h1>
          <p className="text-lg text-gray-500">
            Curated, structured learning materials for each specialization track.
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-0 z-10 bg-white border-b border-gray-100 py-4 px-4 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <TabNav activeTab={activeTab} />
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900">{trackData.label}</h2>
            <p className="text-gray-600 mt-1">{trackData.description}</p>
            <p className="text-gray-400 text-sm mt-1">
              {trackData.resources.length} resources
            </p>
          </div>

          <div className="space-y-3">
            {trackData.resources.map((resource) => (
              <ResourceCard key={resource.title} resource={resource} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
