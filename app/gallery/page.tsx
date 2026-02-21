import { createClient } from '@/lib/supabase/server';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Globe, Github, Linkedin, ArrowRight } from 'lucide-react';
import { TRACK_CONFIGS } from '@/lib/trackData';

type GalleryProject = {
  id: string;
  user_name: string;
  track_id: string;
  title: string;
  description: string;
  demo_url: string;
  github_url: string;
  linkedin_url: string;
  image_url: string;
  created_at: string;
};

const TRACK_BADGE_STYLES: Record<string, string> = {
  'fs-core': 'bg-blue-50 text-blue-700',
  'fs-ai': 'bg-purple-50 text-purple-700',
  'fs-ds': 'bg-green-50 text-green-700',
  'fs-analytics': 'bg-orange-50 text-orange-700',
  'fs-devops': 'bg-rose-50 text-rose-700',
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// ── MOCK DATA — remove this block when done testing ──────────────────────────
const MOCK_PROJECTS: GalleryProject[] = [
  { id: 'm1', user_name: 'Arjun Patel',     track_id: 'fs-ai',        title: 'AI Resume Builder',             description: 'Generates tailored resumes using GPT-4 based on job descriptions. Built with Next.js, OpenAI API, and Supabase.',               demo_url: 'https://example.com', github_url: 'https://github.com', linkedin_url: 'https://www.linkedin.com/posts/arjunpatel_buildinpublic-ai-nextjs-activity-7201234567890123456-abcd', image_url: '', created_at: '2026-02-10T10:00:00Z' },
  { id: 'm2', user_name: 'Riya Sharma',     track_id: 'fs-core',      title: 'Personal Finance Dashboard',    description: 'Track income, expenses, and savings goals with interactive charts. Full-stack app with React, Node.js, and PostgreSQL.',      demo_url: 'https://example.com', github_url: 'https://github.com', linkedin_url: '',                                                                                                                    image_url: '', created_at: '2026-02-09T10:00:00Z' },
  { id: 'm3', user_name: 'Priya Menon',     track_id: 'fs-ds',        title: 'COVID-19 Data Visualizer',      description: 'Interactive map and time-series charts of COVID-19 data across India using D3.js and Python.',                                   demo_url: '',                    github_url: 'https://github.com', linkedin_url: 'https://www.linkedin.com/posts/priyamenon_datascience-python-d3js-activity-7198876543210987654-wxyz',    image_url: '', created_at: '2026-02-08T10:00:00Z' },
  { id: 'm4', user_name: 'Karthik Reddy',   track_id: 'fs-core',      title: 'E-commerce Storefront',         description: 'A fully functional online store with cart, checkout, and Stripe payments. Built with Next.js App Router and Supabase.',        demo_url: 'https://example.com', github_url: '',                   linkedin_url: '',                                                                                                                    image_url: '', created_at: '2026-02-07T10:00:00Z' },
  { id: 'm5', user_name: 'Sneha Iyer',      track_id: 'fs-ai',        title: 'Customer Support Chatbot',      description: 'Fine-tuned LLM chatbot that handles FAQs for SaaS products. Integrated with Slack and a React UI.',                           demo_url: 'https://example.com', github_url: 'https://github.com', linkedin_url: 'https://www.linkedin.com/posts/sneha-iyer_llm-buildinpublic-saas-activity-7195432109876543210-pqrs',      image_url: '', created_at: '2026-02-06T10:00:00Z' },
  { id: 'm6', user_name: 'Vikram Singh',    track_id: 'fs-analytics', title: 'Sales Analytics Dashboard',     description: 'Real-time sales KPIs and funnel analysis using Metabase, dbt, and BigQuery. Connects to CRM data.',                            demo_url: '',                    github_url: 'https://github.com', linkedin_url: '',                                                                                                                    image_url: '', created_at: '2026-02-05T10:00:00Z' },
  { id: 'm7', user_name: 'Divya Nair',      track_id: 'fs-devops',    title: 'CI/CD Pipeline Automation',     description: 'GitHub Actions workflow that builds, tests, and deploys a Next.js app to AWS ECS on every push to main.',                       demo_url: '',                    github_url: 'https://github.com', linkedin_url: 'https://www.linkedin.com/posts/divyanair_devops-cicd-aws-activity-7192109876543219876-mnop',          image_url: '', created_at: '2026-02-04T10:00:00Z' },
  { id: 'm8', user_name: 'Rahul Gupta',     track_id: 'fs-ds',        title: 'Stock Price Predictor',         description: 'LSTM model trained on NSE historical data to predict next-day closing prices. Deployed with FastAPI and Streamlit.',           demo_url: 'https://example.com', github_url: 'https://github.com', linkedin_url: '',                                                                                                                    image_url: '', created_at: '2026-02-03T10:00:00Z' },
  { id: 'm9', user_name: 'Ananya Krishnan', track_id: 'fs-core',      title: 'Task Management App',           description: 'Kanban-style task board with drag-and-drop, team collaboration, and Slack notifications. Built with React and Express.',       demo_url: 'https://example.com', github_url: '',                   linkedin_url: 'https://www.linkedin.com/posts/ananyakrishnan_webdev-reactjs-buildinpublic-activity-7188765432109876543-efgh', image_url: '', created_at: '2026-02-02T10:00:00Z' },
];
// ── END MOCK DATA ─────────────────────────────────────────────────────────────

export default async function GalleryPage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from('gallery_projects')
    .select('id, user_name, track_id, title, description, demo_url, github_url, linkedin_url, image_url, created_at')
    .order('created_at', { ascending: false });

  // ── MOCK: merge mock projects — remove [...MOCK_PROJECTS] when done testing
  const allProjects = [...MOCK_PROJECTS, ...(projects ?? [])] as GalleryProject[];
  // ── replace with this when done: const allProjects = (projects ?? []) as GalleryProject[];

  // Group counts by track for the filter summary
  const trackCounts = allProjects.reduce<Record<string, number>>((acc, p) => {
    acc[p.track_id] = (acc[p.track_id] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navigation />

      {/* Page header */}
      <div className="bg-white border-b border-gray-100 mt-[65px]">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Community
            </p>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Project Gallery</h1>
            <p className="text-gray-500 text-base leading-relaxed">
              Real projects built by StepUp learners across all tracks. See what the community is shipping.
            </p>
          </div>

          {/* Track breakdown + leaderboard link */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {allProjects.length > 0 && (
              <>
                <span className="text-xs font-semibold px-3 py-1.5 bg-gray-900 text-white rounded-full">
                  All — {allProjects.length}
                </span>
                {Object.entries(trackCounts).map(([trackId, count]) => (
                  <span
                    key={trackId}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full ${TRACK_BADGE_STYLES[trackId] ?? 'bg-gray-100 text-gray-600'}`}
                  >
                    {TRACK_CONFIGS[trackId]?.trackName ?? trackId} — {count}
                  </span>
                ))}
              </>
            )}
            <Link
              href="/leaderboard"
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors ml-auto"
            >
              Leaderboard <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10">
        {allProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🚀</p>
            <p className="text-lg font-semibold text-gray-700 mb-2">No projects yet</p>
            <p className="text-sm text-gray-400 max-w-xs mx-auto mb-6">
              Be the first to submit your project and inspire other learners.
            </p>
            <Link
              href="/tracks"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition-colors"
            >
              Go to My Track
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl border border-gray-100 flex flex-col hover:border-gray-300 transition-colors overflow-hidden"
              >
                {/* Cover image */}
                {project.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-36 object-cover"
                  />
                )}

                <div className="p-5 flex flex-col gap-3 flex-1">
                  {/* Track badge + title */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-gray-900 leading-snug flex-1">
                      {project.title}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                        TRACK_BADGE_STYLES[project.track_id] ?? 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {TRACK_CONFIGS[project.track_id]?.trackName ?? project.track_id}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-500 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Footer: author + links */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                    <div>
                      <p className="text-xs font-medium text-gray-600">{project.user_name}</p>
                      <p className="text-xs text-gray-400">{formatDate(project.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {project.demo_url && (
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 transition-colors font-medium"
                        >
                          <Globe size={12} />
                          Demo
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 transition-colors font-medium"
                        >
                          <Github size={12} />
                          Code
                        </a>
                      )}
                      {project.linkedin_url && (
                        <a
                          href={project.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 transition-colors font-medium"
                        >
                          <Linkedin size={12} />
                          Post
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA for logged-in users */}
        {allProjects.length > 0 && (
          <div className="mt-10 text-center">
            <p className="text-sm text-gray-400 mb-3">Built something cool?</p>
            <Link
              href="/tracks"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition-colors"
            >
              Submit Your Project
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
