import { createClient } from '@/lib/supabase/server';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { Trophy, ArrowRight } from 'lucide-react';

export const revalidate = 60;

type LeaderboardEntry = {
  user_name: string;
  count: number;
};

const MEDALS = ['🥇', '🥈', '🥉'];

// ── MOCK DATA — remove this block when done testing ──────────────────────────
const MOCK_ENTRIES: LeaderboardEntry[] = [
  { user_name: 'Arjun Patel',     count: 4 },
  { user_name: 'Riya Sharma',     count: 3 },
  { user_name: 'Karthik Reddy',   count: 3 },
  { user_name: 'Priya Menon',     count: 2 },
  { user_name: 'Sneha Iyer',      count: 2 },
  { user_name: 'Vikram Singh',    count: 1 },
  { user_name: 'Divya Nair',      count: 1 },
  { user_name: 'Rahul Gupta',     count: 1 },
  { user_name: 'Ananya Krishnan', count: 1 },
];
// ── END MOCK DATA ─────────────────────────────────────────────────────────────

export default async function LeaderboardPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from('gallery_projects')
    .select('user_id, user_name');

  // Aggregate count per user
  const map: Record<string, { name: string; count: number }> = {};
  for (const row of (data ?? [])) {
    if (!map[row.user_id]) map[row.user_id] = { name: row.user_name, count: 0 };
    map[row.user_id].count++;
  }

  const realEntries: LeaderboardEntry[] = Object.values(map)
    .map(({ name, count }) => ({ user_name: name, count }));

  // ── MOCK: merge mock + real, re-sort — remove [...MOCK_ENTRIES, ...] when done testing
  const entries = [...MOCK_ENTRIES, ...realEntries]
    .sort((a, b) => b.count - a.count)
    .slice(0, 50);
  // ── replace with this when done:
  // const entries = realEntries.sort((a, b) => b.count - a.count).slice(0, 50);

  const totalProjects = entries.reduce((sum, e) => sum + e.count, 0);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navigation />

      {/* Page header */}
      <div className="bg-white border-b border-gray-100 mt-[65px]">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Community</p>
          <div className="flex items-center gap-3 mb-3">
            <Trophy size={26} className="text-gray-900" />
            <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
          </div>
          <p className="text-gray-500 text-base leading-relaxed">
            Top builders in the StepUp community, ranked by projects shipped.
          </p>

          <div className="mt-5 flex items-center gap-4">
            {entries.length > 0 && (
              <span className="text-xs font-semibold px-3 py-1.5 bg-gray-900 text-white rounded-full">
                {totalProjects} projects shipped
              </span>
            )}
            <Link
              href="/gallery"
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
            >
              View Gallery <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10">
        {entries.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🏆</p>
            <p className="text-lg font-semibold text-gray-700 mb-2">No submissions yet</p>
            <p className="text-sm text-gray-400 max-w-xs mx-auto mb-6">
              Be the first to ship a project and claim the top spot.
            </p>
            <Link
              href="/tracks"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition-colors"
            >
              Go to My Track
            </Link>
          </div>
        ) : (
          <div className="space-y-2">

            {/* Top 3 — highlighted */}
            {entries.slice(0, 3).map((entry, i) => (
              <div
                key={i}
                className={`bg-white rounded-xl border flex items-center gap-4 px-6 py-5 ${
                  i === 0
                    ? 'border-yellow-200 shadow-sm'
                    : i === 1
                    ? 'border-gray-200'
                    : 'border-gray-200'
                }`}
              >
                <span className="text-2xl flex-shrink-0">{MEDALS[i]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-bold text-gray-900 truncate">{entry.user_name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Rank #{i + 1}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-2xl font-bold text-gray-900">{entry.count}</p>
                  <p className="text-xs text-gray-400">project{entry.count !== 1 ? 's' : ''} shipped</p>
                </div>
              </div>
            ))}

            {/* Divider if there are entries beyond top 3 */}
            {entries.length > 3 && (
              <div className="pt-2 pb-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-1">Others</p>
              </div>
            )}

            {/* Rank 4+ — compact list */}
            {entries.slice(3).map((entry, i) => (
              <div
                key={i + 3}
                className="bg-white rounded-xl border border-gray-100 px-5 py-3.5 flex items-center gap-4 hover:border-gray-200 transition-colors"
              >
                <span className="text-sm font-bold text-gray-300 w-6 text-center flex-shrink-0">
                  #{i + 4}
                </span>
                <p className="text-sm font-semibold text-gray-900 flex-1 truncate">{entry.user_name}</p>
                <span className="text-sm text-gray-500 flex-shrink-0">
                  <span className="font-bold text-gray-900">{entry.count}</span> shipped
                </span>
              </div>
            ))}

          </div>
        )}

        {/* CTA */}
        {entries.length > 0 && (
          <div className="mt-10 text-center">
            <p className="text-sm text-gray-400 mb-3">Want to climb the ranks?</p>
            <Link
              href="/tracks"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition-colors"
            >
              Submit Your Project
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
