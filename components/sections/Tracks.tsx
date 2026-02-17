import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Rocket, Brain, BarChart3, PieChart, Server } from 'lucide-react';

export default function Tracks() {
  const tracks = [
    {
      id: 'fs-core',
      icon: Rocket,
      title: 'FullStack Core',
      tagline: 'The foundation every product dev needs',
      duration: '22-25 weeks',
    },
    {
      id: 'fs-ai',
      icon: Brain,
      title: 'FS + AI',
      tagline: 'Build intelligent products with LLMs',
      duration: '26-30 weeks',
    },
    {
      id: 'fs-ds',
      icon: BarChart3,
      title: 'FS + Data Science',
      tagline: 'Extract insights, build data products',
      duration: '26-34 weeks',
    },
    {
      id: 'fs-analytics',
      icon: PieChart,
      title: 'FS + Analytics',
      tagline: 'Make data-driven product decisions',
      duration: '26-32 weeks',
    },
    {
      id: 'fs-devops',
      icon: Server,
      title: 'FS + DevOps',
      tagline: 'Ship fast, ship reliably',
      duration: '26-32 weeks',
    },
  ];

  return (
    <section id="tracks" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Specialization</h2>
          <p className="text-lg text-gray-600">
            Start with the core, then specialize based on your career goals
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-4 mb-12">
          {tracks.map((track) => (
            <Link
              key={track.id}
              href={`/resources?track=${track.id}`}
              className="block"
            >
              <Card className="border-2 border-gray-200 hover:border-gray-900 transition-all duration-300 cursor-pointer group h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-gray-100 group-hover:bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4 transition-colors">
                    <track.icon className="h-7 w-7 text-gray-900 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{track.title}</h3>
                  <p className="text-xs text-gray-600 mb-3 min-h-[32px]">{track.tagline}</p>
                  <div className="text-xs font-medium text-gray-500">{track.duration}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/resources"
            className="inline-flex items-center px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Explore All Resources
          </Link>
        </div>
      </div>
    </section>
  );
}
