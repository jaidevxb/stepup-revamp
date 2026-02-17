import { createClient } from '@/lib/supabase/server';
import AuthPage from '@/components/tracker/AuthPage';
import Onboarding from '@/components/tracker/Onboarding';
import Dashboard from '@/components/tracker/Dashboard';
import type { Project } from '@/components/tracker/ProjectLog';

export default async function TracksPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <AuthPage error={error} />;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) {
    return <Onboarding userId={user.id} />;
  }

  const [{ data: progressRows }, { data: projectRows }] = await Promise.all([
    supabase.from('progress').select('topic_id').eq('user_id', user.id),
    supabase.from('projects').select('*').eq('user_id', user.id).eq('track_id', profile.selected_track).order('week_number'),
  ]);

  return (
    <Dashboard
      name={profile.name}
      selectedTrack={profile.selected_track}
      initialCompleted={(progressRows ?? []).map((r) => r.topic_id as string)}
      initialProjects={(projectRows ?? []) as Project[]}
      streakCount={profile.streak_count ?? 0}
      lastActiveDate={profile.last_active_date ?? null}
    />
  );
}
