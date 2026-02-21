'use client';

import { useRouter } from 'next/navigation';
import { TABS } from './resourcesData';

interface TabNavProps {
  activeTab: string;
}

export default function TabNav({ activeTab }: TabNavProps) {
  const router = useRouter();

  return (
    <div className="overflow-x-auto pb-3">
      <div className="flex gap-2 min-w-max mx-auto w-fit">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => router.push(`/resources?track=${tab.id}`)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-900 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
