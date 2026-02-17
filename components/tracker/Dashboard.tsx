'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, ChevronDown } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { TRACK_CONFIGS, TRACK_OPTIONS, PROJECT_IDEAS } from '@/lib/trackData';
import Navigation from '@/components/Navigation';
import PhaseAccordion from './PhaseAccordion';
import ProjectLog, { type Project } from './ProjectLog';

// ─── IST streak helpers ───────────────────────────────────────────────────────

function getISTDateString(): string {
  // IST = UTC + 5h30m
  const now = new Date();
  const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  return ist.toISOString().split('T')[0]; // YYYY-MM-DD
}

function computeNewStreak(lastActiveDate: string | null, currentStreak: number): number {
  const today = getISTDateString();
  if (!lastActiveDate) return 1;
  if (lastActiveDate === today) return currentStreak; // already active today

  const yesterday = new Date(new Date(today).getTime() - 86400000)
    .toISOString()
    .split('T')[0];
  if (lastActiveDate === yesterday) return currentStreak + 1;

  return 1; // missed a day → reset
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface DashboardProps {
  name: string;
  selectedTrack: string;
  initialCompleted: string[];
  initialProjects: Project[];
  streakCount: number;
  lastActiveDate: string | null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Dashboard({
  name,
  selectedTrack: initialTrack,
  initialCompleted,
  initialProjects,
  streakCount: initialStreak,
  lastActiveDate: initialLastActive,
}: DashboardProps) {
  const router = useRouter();
  const supabase = createClient();

  const [currentTrack, setCurrentTrack] = useState(initialTrack);
  const [showTrackPicker, setShowTrackPicker] = useState(false);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set(initialCompleted));
  const [streak, setStreak] = useState(initialStreak);
  const [lastActive, setLastActive] = useState(initialLastActive);
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const trackConfig = TRACK_CONFIGS[currentTrack];
  const allTopics = trackConfig.phases.flatMap((p) => p.topics);
  const totalTopics = allTopics.length;
  const doneCount = allTopics.filter((t) => completedTopics.has(t.id)).length;
  const percent = totalTopics > 0 ? Math.round((doneCount / totalTopics) * 100) : 0;
  const doneProjects = projects.filter((p) => p.status === 'done').length;
  const totalProjects = projects.length;

  // ─── Toggle topic + update streak ──────────────────────────────────────────

  const handleToggle = useCallback(
    async (topicId: string, shouldComplete: boolean) => {
      setCompletedTopics((prev) => {
        const next = new Set(prev);
        if (shouldComplete) next.add(topicId);
        else next.delete(topicId);
        return next;
      });

      if (shouldComplete) {
        await supabase.from('progress').upsert({ topic_id: topicId });

        // Update streak only on completion, not unchecking
        const today = getISTDateString();
        if (lastActive !== today) {
          const newStreak = computeNewStreak(lastActive, streak);
          setStreak(newStreak);
          setLastActive(today);
          await supabase
            .from('profiles')
            .update({ streak_count: newStreak, last_active_date: today })
            .eq('id', (await supabase.auth.getUser()).data.user!.id);
        }
      } else {
        await supabase.from('progress').delete().eq('topic_id', topicId);
      }
    },
    [supabase, streak, lastActive]
  );

  // ─── Change track + load/seed its projects ──────────────────────────────────

  const handleChangeTrack = async (newTrack: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('profiles').update({ selected_track: newTrack }).eq('id', user.id);
    setCurrentTrack(newTrack);
    setShowTrackPicker(false);

    // Fetch projects for the new track
    const { data: existing } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .eq('track_id', newTrack)
      .order('week_number');

    if (existing && existing.length > 0) {
      setProjects(existing as Project[]);
    } else {
      // Seed default project ideas for this track
      const ideas = PROJECT_IDEAS[newTrack] ?? [];
      const { data: seeded } = await supabase
        .from('projects')
        .insert(ideas.map((title, i) => ({
          user_id: user.id,
          track_id: newTrack,
          week_number: i + 1,
          title,
          status: 'not-started',
          linkedin_url: '',
        })))
        .select();
      if (seeded) setProjects(seeded as Project[]);
    }
  };

  // ─── Sign out ───────────────────────────────────────────────────────────────

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/tracks');
    router.refresh();
  };

  const firstIncompleteIndex = trackConfig.phases.findIndex(
    (phase) => phase.topics.some((t) => !completedTopics.has(t.id))
  );

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Main site Navigation */}
      <Navigation />

      {/* Dashboard sub-header */}
      <div className="bg-white border-b border-gray-100 mt-[65px]">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">My Dashboard</p>
            <h1 className="text-base font-bold text-gray-900 mt-0.5">
              Hey, {name} 👋
            </h1>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <LogOut size={15} />
            Sign out
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 space-y-6">

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
            <p className="text-3xl font-bold text-gray-900">{percent}%</p>
            <p className="text-xs text-gray-400 mt-1">Complete</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
            <p className="text-3xl font-bold text-gray-900">
              🔥 {streak}
            </p>
            <p className="text-xs text-gray-400 mt-1">Day Streak</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
            <p className="text-3xl font-bold text-gray-900">
              {doneProjects}/{totalProjects}
            </p>
            <p className="text-xs text-gray-400 mt-1">Projects Done</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Overall Progress</p>
            <p className="text-xs text-gray-400">{doneCount} / {totalTopics} topics</p>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-900 rounded-full transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Track selector */}
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-0.5">Current Track</p>
              <p className="text-sm font-bold text-gray-900">{trackConfig.trackName}</p>
            </div>
            <button
              onClick={() => setShowTrackPicker((v) => !v)}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 border border-gray-200 rounded-lg hover:border-gray-900 hover:text-gray-900 transition-all text-gray-600"
            >
              Change Track
              <ChevronDown size={13} className={`transition-transform ${showTrackPicker ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showTrackPicker && (
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              {TRACK_OPTIONS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleChangeTrack(t.id)}
                  className={`w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-all ${
                    currentTrack === t.id
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{t.label}</p>
                    <p className="text-xs text-gray-400">{t.tagline}</p>
                  </div>
                  {currentTrack === t.id && (
                    <span className="text-xs font-medium px-2 py-0.5 bg-gray-900 text-white rounded-full flex-shrink-0 mt-0.5">
                      Active
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Phase Accordions */}
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
            Learning Checklist
          </h2>
          <div className="space-y-2">
            {trackConfig.phases.map((phase, index) => (
              <PhaseAccordion
                key={`${currentTrack}-${phase.phaseNumber}`}
                phase={phase}
                completedTopics={completedTopics}
                onToggle={handleToggle}
                defaultOpen={index === firstIncompleteIndex}
              />
            ))}
          </div>
        </div>

        {/* Project Log */}
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
            Weekly Projects
          </h2>
          <ProjectLog
            key={currentTrack}
            initialProjects={projects}
            trackId={currentTrack}
          />
        </div>

        <div className="pb-8" />
      </div>
    </div>
  );
}
