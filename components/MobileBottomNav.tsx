'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, BookOpen, Map, Images, Trophy } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home',        icon: Home,        href: '/' },
  { label: 'Program',     icon: LayoutGrid,  href: '/#program' },
  { label: 'Tracks',      icon: Map,         href: '/#tracks' },
  { label: 'Resources',   icon: BookOpen,    href: '/resources' },
  { label: 'Gallery',     icon: Images,      href: '/gallery' },
  { label: 'Leaderboard', icon: Trophy,      href: '/leaderboard' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    const path = href.split('#')[0] || '/';
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 safe-area-bottom">
      <div className="flex items-stretch h-16 px-3">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${
                active ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <item.icon size={19} strokeWidth={active ? 2.5 : 1.8} />
              <span className={`text-[10px] leading-tight ${active ? 'font-semibold' : 'font-medium'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
