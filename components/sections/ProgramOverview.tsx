import { Fragment } from 'react';
import { ArrowRight, Code2, Lightbulb, TrendingUp, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function ProgramOverview() {
  const steps = [
    {
      number: 1,
      icon: Code2,
      title: 'Master the Stack',
      description: 'Build a strong foundation in fullstack development with modern tools and frameworks.',
    },
    {
      number: 2,
      icon: Lightbulb,
      title: 'Build Novel Products Weekly',
      description: 'Ship unique projects every week. No clones, no tutorials — real products that solve real problems.',
    },
    {
      number: 3,
      icon: TrendingUp,
      title: 'Build Your Brand',
      description: 'Learn to showcase your work on LinkedIn, optimize your GitHub, and craft a compelling narrative.',
    },
    {
      number: 4,
      icon: Briefcase,
      title: 'Get Hired as a Product Developer',
      description: 'Position yourself for high-value roles at startups that need builders, not just coders.',
    },
  ];

  return (
    <section id="program" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">The STEP UP Program</h2>
          <p className="text-lg text-gray-600">
            Four steps to transform from beginner to product developer
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-0">
          {steps.map((step, index) => (
            <Fragment key={step.number}>
              <div className="flex-1">
                <Card className="h-full border-2 border-gray-200 hover:border-gray-900 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-3">
                        <step.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-sm font-bold text-gray-500">STEP {step.number}</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center px-2 flex-shrink-0">
                  <ArrowRight className="h-5 w-5 text-gray-300" />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
