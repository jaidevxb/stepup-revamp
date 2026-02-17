import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQ() {
  const faqs = [
    {
      question: 'Is this program free?',
      answer: 'Yes, all learning resources and the tracker dashboard are completely free. We believe in making quality education accessible to everyone.',
    },
    {
      question: 'How long does it take to complete?',
      answer: 'The FullStack Core track takes 22-25 weeks. Specialized tracks (AI, Data Science, Analytics, DevOps) extend to 26-34 weeks depending on your choice. You can learn at your own pace.',
    },
    {
      question: 'Do I need prior programming experience?',
      answer: 'No prior experience is required. We start from the fundamentals and build up gradually. However, having basic computer skills and a strong willingness to learn is essential.',
    },
    {
      question: 'What makes this different from other bootcamps?',
      answer: 'Unlike traditional bootcamps, we focus on transforming you into a Product Developer, not just a coder. We emphasize building novel projects (not clones), personal branding on LinkedIn, and understanding the "why" behind technical decisions.',
    },
    {
      question: 'Do you provide placement assistance?',
      answer: 'We focus on making you genuinely employable through skills, portfolio, and personal branding. While we don\'t guarantee placements, we connect graduates to our startup hiring network and provide LinkedIn strategy coaching.',
    },
    {
      question: 'Can I switch tracks after starting?',
      answer: 'Yes, you can switch tracks at any time through your dashboard. All tracks share the same FullStack Core foundation, so switching to a specialization later is seamless.',
    },
    {
      question: 'What if I fall behind on the weekly projects?',
      answer: 'The program is self-paced. The weekly project cadence is a goal, not a strict requirement. The key is to build consistently and ship real products, even if it takes you longer.',
    },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about the program
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-2 border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
