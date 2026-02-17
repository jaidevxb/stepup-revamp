import { ArrowRight, Clock } from 'lucide-react';

interface TimelineItem {
  number: number;
  title: string;
  description: string;
  duration: string;
  topics: string[];
  tools: string[];
}

const timelineItems: TimelineItem[] = [
  {
    number: 1,
    title: 'HTML & CSS Fundamentals',
    description: 'Learn the building blocks of web development.',
    duration: '2-3 weeks',
    topics: ['HTML5', 'CSS3', 'Responsive Design', 'Flexbox & Grid'],
    tools: ['VS Code', 'Chrome DevTools', 'CodePen', 'Cursor'],
  },
  {
    number: 2,
    title: 'JavaScript Basics',
    description: 'Master the language of the web.',
    duration: '3-4 weeks',
    topics: ['ES6+', 'DOM Manipulation', 'Async Programming', 'OOP', 'Event Loop', 'TypeScript'],
    tools: ['Node.js', 'npm', 'Jest', 'ESLint', 'TypeScript', 'Cursor'],
  },
  {
    number: 3,
    title: 'Frontend Framework (React)',
    description: 'Build modern user interfaces.',
    duration: '4-5 weeks',
    topics: ['Components', 'Hooks', 'State Management', 'Routing', 'Code Splitting', 'Virtual DOM'],
    tools: ['React', 'Next.js', 'Tailwind CSS', 'Typescript', 'Cursor'],
  },
  {
    number: 4,
    title: 'Backend Development',
    description: 'Learn server-side programming.',
    duration: '4-5 weeks',
    topics: ['REST APIs', 'Authentication', 'Microservices', 'WebSockets'],
    tools: ['Node.js', 'Express', 'FastAPI', 'Django', 'Nginx', 'Google Cloud', 'AWS', 'Digital Ocean'],
  },
  {
    number: 5,
    title: 'Database Management',
    description: 'Understand data storage and retrieval.',
    duration: '3-4 weeks',
    topics: ['SQL', 'NoSQL', 'MongoDB', 'PostgreSQL', 'ORM', 'Prisma', 'Mongoose', 'Data Modeling', 'Indexing'],
    tools: ['MongoDB Compass', 'pgAdmin', 'Prisma', 'Docker', 'Pinecone', 'Supabase', 'Typesense'],
  },
  {
    number: 6,
    title: 'AI & Advanced Tools',
    description: 'Master modern development and AI integration.',
    duration: '4-5 weeks',
    topics: ['AI APIs', 'Vector Databases', 'Search Engines', 'Payment Processing'],
    tools: ['Hugging Face', 'LangChain', 'Vercel', 'Puppeteer', 'Strapi', 'Stripe', 'Razorpay', 'Chargebee'],
  },
];

export default function LearningPath() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#F8F9FA]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Learning Path
          </h2>
          <p className="text-lg text-gray-600">
            A structured roadmap to master full stack development step by step.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-5 top-0 w-0.5 h-full bg-gray-200 md:left-6" />

          {/* Timeline Items */}
          <div className="space-y-6">
            {timelineItems.map((item) => (
              <div key={item.number} className="relative flex gap-6 md:gap-8">
                {/* Circle */}
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gray-900 rounded-full flex items-center justify-center z-10 shadow-sm">
                  <span className="text-white font-bold text-sm md:text-base">
                    {String(item.number).padStart(2, '0')}
                  </span>
                </div>

                {/* Card */}
                <div className="flex-1 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-300 overflow-hidden mb-2">
                  <div className="flex flex-col md:flex-row">
                    {/* Left: title + meta */}
                    <div className="p-5 md:p-6 md:w-64 md:flex-shrink-0 md:border-r border-gray-100">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      <div className="flex items-center gap-1.5 mt-3">
                        <Clock size={12} className="text-gray-400" />
                        <span className="text-xs text-gray-400">{item.duration}</span>
                      </div>
                    </div>

                    {/* Right: topics + tools */}
                    <div className="flex-1 p-5 md:p-6 flex flex-col gap-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Topics</p>
                        <div className="flex flex-wrap gap-1.5">
                          {item.topics.map((topic) => (
                            <span
                              key={topic}
                              className="px-2.5 py-1 bg-gray-50 text-gray-700 text-xs rounded-full border border-gray-200"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Tools</p>
                        <div className="flex flex-wrap gap-1.5">
                          {item.tools.map((tool) => (
                            <span
                              key={tool}
                              className="px-2.5 py-1 bg-gray-900 text-white text-xs rounded-full"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-20">
          <a
            href="/resources"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-300 shadow-sm"
          >
            Explore Learning Resources
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
