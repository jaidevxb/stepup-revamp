import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, TrendingUp, Users, Award } from 'lucide-react';

export default function BuildInPublic() {
  const tips = [
    {
      icon: MessageSquare,
      text: 'Post about every project you build — what problem it solves, what you learned, what tech you used.',
    },
    {
      icon: TrendingUp,
      text: 'Share your learning journey weekly — people root for builders.',
    },
    {
      icon: Users,
      text: 'Engage with startup founders and CTOs in comments.',
    },
    {
      icon: Award,
      text: 'Your LinkedIn profile is the first thing a recruiter sees. Make it count.',
    },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Build in Public</h2>
          <p className="text-lg text-gray-600">
            Your LinkedIn is your storefront. Your GitHub is your portfolio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <Card className="border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white">
              <CardContent className="p-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-900 rounded-full"></div>
                    <div>
                      <div className="font-semibold text-gray-900">Your Name</div>
                      <div className="text-xs text-gray-500">Product Developer</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    Just shipped my 4th project this month! 🚀
                    <br /><br />
                    Built a real-time collaborative task manager with:
                    <br />
                    • Next.js + TypeScript
                    <br />
                    • WebSockets for live updates
                    <br />
                    • Supabase for auth + DB
                    <br /><br />
                    Key learning: State management gets complex fast. Used Zustand to keep it clean.
                    <br /><br />
                    #BuildInPublic #WebDev #ProductDevelopment
                  </div>
                  <div className="flex gap-4 pt-3 text-xs text-gray-500">
                    <span>💬 24 comments</span>
                    <span>🔁 12 reposts</span>
                    <span>❤️ 89 reactions</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {tips.map((tip, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <tip.icon className="h-5 w-5 text-gray-900" />
                </div>
                <p className="text-sm text-gray-700 leading-relaxed pt-2">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-lg p-6 inline-block">
            "If you build something and nobody knows about it, did you really build it?"
          </p>
        </div>
      </div>
    </section>
  );
}
