import { ArrowRight, Clock } from 'lucide-react';
import type { Resource } from './resourcesData';

const ctaLabel: Record<Resource['type'], string> = {
  YouTube: 'Watch Video',
  Docs: 'Read Docs',
  Course: 'View Course',
  Udemy: 'View Course',
  Channel: 'View Channel',
};

const difficultyStyle: Record<NonNullable<Resource['difficulty']>, string> = {
  Beginner: 'bg-gray-100 text-gray-600',
  Intermediate: 'bg-gray-200 text-gray-700',
  Advanced: 'bg-gray-800 text-white',
};

export default function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-5 px-6 py-5 bg-white rounded-xl border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all duration-200 group"
    >
      {/* Emoji icon */}
      <div className="flex-shrink-0 w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
        {resource.emoji}
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 text-base leading-snug">
          {resource.title}
        </p>
        <p className="text-sm text-gray-500 mt-1 leading-relaxed line-clamp-1">
          {resource.description}
        </p>
        <span className="inline-flex items-center gap-1.5 mt-2.5 text-sm font-semibold text-gray-700 group-hover:gap-2 transition-all duration-150">
          {ctaLabel[resource.type]}
          <ArrowRight size={14} />
        </span>
      </div>

      {/* Right meta */}
      {resource.type !== 'Channel' && (
        <div className="flex-shrink-0 flex flex-col items-end gap-2">
          {resource.duration && (
            <span className="flex items-center gap-1.5 text-sm text-gray-400">
              <Clock size={13} />
              {resource.duration}
            </span>
          )}
          {resource.difficulty && (
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${difficultyStyle[resource.difficulty]}`}>
              {resource.difficulty}
            </span>
          )}
        </div>
      )}
    </a>
  );
}
