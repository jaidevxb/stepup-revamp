import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

export default function Comparison() {
  const dimensions = [
    {
      aspect: 'Focus',
      fullstack: '"How to build it"',
      product: '"What to build and why"'
    },
    {
      aspect: 'Orientation',
      fullstack: 'Technology-first',
      product: 'Outcome-first'
    },
    {
      aspect: 'Workflow',
      fullstack: 'Receives specs, implements',
      product: 'Questions specs, proposes alternatives'
    },
    {
      aspect: 'Skills',
      fullstack: 'Frontend + Backend + DB',
      product: 'Fullstack + Product sense + User empathy'
    },
    {
      aspect: 'Autonomy',
      fullstack: 'Needs PM direction',
      product: 'Can own a feature end-to-end'
    },
    {
      aspect: 'Career Ceiling',
      fullstack: 'Senior Engineer',
      product: 'Tech Lead / CTO / Founder'
    },
    {
      aspect: 'Market Value',
      fullstack: 'Competitive',
      product: 'Highly differentiated'
    },
  ];

  return (
    <section id="why-product-dev" className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Fullstack Developer vs Product Developer
          </h2>
          <p className="text-lg text-gray-600">
            Understanding the difference that matters
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="border-2 border-gray-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Fullstack Developer</h3>
              <div className="space-y-4">
                {dimensions.map((dim, index) => (
                  <div key={index} className="border-b border-gray-100 pb-3">
                    <div className="text-xs font-semibold text-gray-500 mb-1">{dim.aspect}</div>
                    <div className="text-sm text-gray-700">{dim.fullstack}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-900 bg-gray-900 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Product Developer</h3>
              <div className="space-y-4">
                {dimensions.map((dim, index) => (
                  <div key={index} className="border-b border-gray-700 pb-3">
                    <div className="text-xs font-semibold text-gray-400 mb-1">{dim.aspect}</div>
                    <div className="text-sm text-gray-100 flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{dim.product}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-xl font-semibold text-gray-900 bg-white border-2 border-gray-200 rounded-lg p-6 inline-block">
            Every product developer is a fullstack developer. Not every fullstack developer is a product developer.{' '}
            <span className="text-gray-600">StepUp trains you to be both.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
