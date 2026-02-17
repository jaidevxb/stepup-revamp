'use client';

import { useState, useTransition, useRef, useEffect, useCallback } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export type Project = {
  id: string;
  week_number: number;
  title: string;
  status: 'not-started' | 'in-progress' | 'done';
  linkedin_url: string;
  track_id?: string;
};

const STATUS_LABELS: Record<Project['status'], string> = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  done: 'Done ✓',
};

const STATUS_STYLES: Record<Project['status'], { pill: string; option: string }> = {
  'not-started': { pill: 'bg-gray-100 text-gray-500', option: 'text-gray-500' },
  'in-progress': { pill: 'bg-gray-200 text-gray-700', option: 'text-gray-700' },
  done: { pill: 'bg-gray-900 text-white', option: 'text-gray-900 font-semibold' },
};

function StatusSelect({
  value,
  onChange,
}: {
  value: Project['status'];
  onChange: (v: Project['status']) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors whitespace-nowrap ${STATUS_STYLES[value].pill}`}
      >
        {STATUS_LABELS[value]}
        <ChevronDown size={11} className={`flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-20 top-full left-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {(Object.keys(STATUS_LABELS) as Project['status'][]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => { onChange(s); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors ${
                value === s ? 'font-semibold text-gray-900 bg-gray-50' : 'text-gray-600'
              }`}
            >
              {STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Auto-resize textarea that deletes the row on blur if empty
function AutoTextarea({
  value,
  onChange,
  onBlurEmpty,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  onBlurEmpty: () => void;
  placeholder: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const resize = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }, []);

  useEffect(() => { resize(); }, [value, resize]);

  return (
    <textarea
      ref={ref}
      rows={1}
      value={value}
      onChange={(e) => { onChange(e.target.value); resize(); }}
      onBlur={() => { if (!value.trim()) onBlurEmpty(); }}
      placeholder={placeholder}
      className="w-full text-sm text-gray-900 placeholder-gray-400 bg-transparent resize-none overflow-hidden focus:outline-none focus:ring-1 focus:ring-gray-200 rounded px-1 py-0.5 leading-snug"
    />
  );
}

interface ProjectLogProps {
  initialProjects: Project[];
  trackId: string;
}

export default function ProjectLog({ initialProjects, trackId }: ProjectLogProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [addError, setAddError] = useState('');
  const [, startTransition] = useTransition();
  const supabase = createClient();

  const addWeek = async () => {
    // Block add if the last row has no project name
    const last = projects[projects.length - 1];
    if (last && !last.title.trim()) {
      setAddError('Give the current project a name first.');
      return;
    }
    setAddError('');

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const nextWeek = projects.length > 0
      ? Math.max(...projects.map((p) => p.week_number)) + 1
      : 1;

    const { data, error } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        track_id: trackId,
        week_number: nextWeek,
        title: '',
        status: 'not-started',
        linkedin_url: '',
      })
      .select()
      .single();

    if (!error && data) {
      setProjects((prev) => [...prev, data as Project]);
    }
  };

  const updateField = (id: string, field: keyof Project, value: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
    startTransition(async () => {
      await supabase.from('projects').update({ [field]: value }).eq('id', id);
    });
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    startTransition(async () => {
      await supabase.from('projects').delete().eq('id', id);
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-gray-900">Weekly Project Log</h2>
          {addError && (
            <p className="text-xs text-red-500 mt-0.5">{addError}</p>
          )}
        </div>
        <button
          onClick={addWeek}
          className="flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Plus size={13} />
          Add Week
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="px-6 py-10 text-center">
          <p className="text-sm text-gray-400">No projects logged yet.</p>
          <p className="text-xs text-gray-400 mt-1">Click "Add Week" to log your first project.</p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm table-fixed">
            <colgroup>
              <col className="w-14" />
              <col />
              <col className="w-36" />
              <col className="w-56" />
            </colgroup>
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Wk</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Project</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">LinkedIn Post</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {projects.map((project) => (
                <tr key={project.id} className="align-top">
                  <td className="px-4 py-3 text-sm text-gray-500 font-medium">{project.week_number}</td>
                  <td className="px-4 py-3">
                    <AutoTextarea
                      value={project.title}
                      onChange={(v) => updateField(project.id, 'title', v)}
                      onBlurEmpty={() => deleteProject(project.id)}
                      placeholder="Project name..."
                    />
                  </td>
                  <td className="px-4 py-3">
                    <StatusSelect
                      value={project.status}
                      onChange={(v) => updateField(project.id, 'status', v)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="url"
                      value={project.linkedin_url}
                      onChange={(e) => updateField(project.id, 'linkedin_url', e.target.value)}
                      placeholder="Paste link..."
                      className="w-full text-sm text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none focus:ring-1 focus:ring-gray-200 rounded px-1 py-0.5"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
