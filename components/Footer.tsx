import { Code2, Send } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="h-6 w-6" />
              <span className="text-xl font-semibold">StepUp</span>
            </div>
            <p className="text-sm text-gray-400">
              Transforming beginners into startup-ready Product Developers.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Program</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#program" className="hover:text-white transition-colors">Overview</Link></li>
              <li><Link href="#tracks" className="hover:text-white transition-colors">Tracks</Link></li>
              <li><Link href="/tracks" className="hover:text-white transition-colors">My Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#resources" className="hover:text-white transition-colors">Learning Materials</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Project Gallery</Link></li>
              <li><Link href="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <a
              href="https://t.me/+umF60BUfik0xZTll"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <Send className="h-4 w-4 flex-shrink-0" />
              Telegram
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>© 2026 StepUp. Built for builders, by builders.</p>
        </div>
      </div>
    </footer>
  );
}
