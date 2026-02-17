import { Code2, Github, Linkedin, Twitter } from 'lucide-react';
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
              <li><Link href="#" className="hover:text-white transition-colors">Project Ideas</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>© 2026 StepUp. Built for builders, by builders.</p>
        </div>
      </div>
    </footer>
  );
}
