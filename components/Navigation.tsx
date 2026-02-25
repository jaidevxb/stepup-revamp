'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileBottomNav from '@/components/MobileBottomNav';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Code2 className="h-6 w-6 text-gray-900" />
              <span className="text-xl font-semibold text-gray-900">StepUp</span>
            </Link>

            {/* Mobile: Get Started button */}
            <Link
              href="/tracks"
              className="md:hidden text-sm font-semibold px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Get Started
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('why-product-dev')}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Why Product Dev?
              </button>
              <button
                onClick={() => scrollToSection('program')}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Program
              </button>
              <Link href="/resources" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Resources
              </Link>
              <Link href="/gallery" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Gallery
              </Link>
              <Link href="/tracks" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                My Track
              </Link>
              <Button
                onClick={() => scrollToSection('tracks')}
                className="bg-gray-900 hover:bg-gray-800 text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <MobileBottomNav />
    </>
  );
}
