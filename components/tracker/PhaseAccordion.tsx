'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { Phase } from '@/lib/trackData';

interface PhaseAccordionProps {
  phase: Phase;
  completedTopics: Set<string>;
  onToggle: (topicId: string, completed: boolean) => void;
  defaultOpen?: boolean;
}

export default function PhaseAccordion({
  phase,
  completedTopics,
  onToggle,
  defaultOpen = false,
}: PhaseAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  const doneCount = phase.topics.filter((t) => completedTopics.has(t.id)).length;
  const total = phase.topics.length;
  const allDone = doneCount === total;

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {open ? (
            <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
          ) : (
            <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
          )}
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900">
              Phase {phase.phaseNumber}: {phase.title}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{phase.weekRange}</p>
          </div>
        </div>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${
            allDone
              ? 'bg-gray-900 text-white'
              : doneCount > 0
              ? 'bg-gray-200 text-gray-700'
              : 'bg-gray-100 text-gray-500'
          }`}
        >
          {doneCount}/{total}
        </span>
      </button>

      {open && (
        <div className="border-t border-gray-100 divide-y divide-gray-50">
          {phase.topics.map((topic) => {
            const done = completedTopics.has(topic.id);
            return (
              <label
                key={topic.id}
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={done}
                  onChange={() => onToggle(topic.id, !done)}
                  className="w-4 h-4 accent-gray-900 flex-shrink-0"
                />
                <span
                  className={`text-sm flex-1 ${
                    done ? 'line-through text-gray-400' : 'text-gray-700'
                  }`}
                >
                  {topic.title}
                </span>
                <span className="text-xs text-gray-400 flex-shrink-0">
                  ~{topic.estimatedHours}h
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
