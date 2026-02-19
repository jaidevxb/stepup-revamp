'use client';

import { useState } from 'react';
import { Code2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { TRACK_OPTIONS, PROJECT_IDEAS } from '@/lib/trackData';

export default function Onboarding({ userId }: { userId: string }) {
  // Pre-fill name from localStorage (set in AuthPage during sign-up)
  const [name, setName] = useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem('stepup_pending_name') ?? '' : ''
  );
  const [selectedTrack, setSelectedTrack] = useState('fs-core');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setErr('');

    const supabase = createClient();
    const { error } = await supabase.from('profiles').insert({
      id: userId,
      name: name.trim(),
      selected_track: selectedTrack,
    });

    if (error) {
      setLoading(false);
      setErr(error.message);
      return;
    }

    // Seed the 4 track-specific project ideas — only if none exist yet
    const { data: existing } = await supabase
      .from('projects')
      .select('id')
      .eq('user_id', userId)
      .limit(1);

    if (!existing || existing.length === 0) {
      const ideas = PROJECT_IDEAS[selectedTrack] ?? [];
      await supabase.from('projects').insert(
        ideas.map((title, i) => ({
          user_id: userId,
          track_id: selectedTrack,
          week_number: i + 1,
          title,
          status: 'not-started',
          linkedin_url: '',
        }))
      );
    }

    // Clean up the pending name now that the profile is created
    localStorage.removeItem('stepup_pending_name');
    // Hard redirect — router.refresh() doesn't reliably re-render server components
    window.location.replace('/tracks');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Code2 className="h-7 w-7 text-gray-900" />
          <span className="text-2xl font-semibold text-gray-900">StepUp</span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome aboard 👋</h1>
          <p className="text-gray-500 text-sm mb-6">
            Tell us a bit about yourself and choose your specialization track.
          </p>

          {err && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
              {err}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Your name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jaidev"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Choose your specialization track
              </label>
              <div className="space-y-2">
                {TRACK_OPTIONS.map((track) => (
                  <label
                    key={track.id}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-150 ${
                      selectedTrack === track.id
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="track"
                      value={track.id}
                      checked={selectedTrack === track.id}
                      onChange={() => setSelectedTrack(track.id)}
                      className="mt-0.5 accent-gray-900"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{track.label}</p>
                      <p className="text-xs text-gray-500">{track.tagline}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-60"
            >
              {loading ? 'Setting up...' : 'Start My Journey →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
