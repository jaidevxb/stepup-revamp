import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

export default function SocialProof() {
  const testimonials = [
    {
      name: 'Dr. Bargava Subramanian',
      role: 'Data Scientist & Author',
      company: 'Cisco',
      quote: 'The best way to learn is by building. StepUp\'s focus on shipping real products every week is exactly what the industry needs.',
    },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Endorsed by Industry Experts</h2>
        </div>

        <div className="grid gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2 border-gray-200">
              <CardContent className="p-8">
                <Quote className="h-10 w-10 text-gray-300 mb-4" />
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-900 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-xs text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
