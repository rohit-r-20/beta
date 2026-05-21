'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Sparkles, Route, User } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/categories', label: 'Categories', icon: LayoutGrid },
  { href: '/ai', label: 'AI', icon: Sparkles, special: true },
  { href: '/user/bookings', label: 'Tracks', icon: Route },
  { href: '/profile', label: 'Profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-[var(--border-subtle)] safe-bottom">
      <div className="flex items-center justify-around h-[62px] max-w-lg mx-auto px-1">
        {NAV_ITEMS.map((item) => {
          const isHome = item.href === '/';
          const active = isHome ? pathname === '/' : pathname.startsWith(item.href);

          if (item.special) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-0.5 relative -mt-5"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-200 ${
                  active
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-500/30 scale-110'
                    : 'bg-gradient-to-br from-indigo-500/80 to-purple-600/80 shadow-indigo-500/15 hover:shadow-indigo-500/25 hover:scale-105'
                }`}>
                  <item.icon size={20} className="text-white" strokeWidth={2} />
                </div>
                <span className={`text-[9px] font-bold tracking-wider ${active ? 'text-[var(--brand-primary)]' : 'text-[var(--text-muted)]'}`}>
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all duration-200 group relative"
            >
              {active && (
                <span className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-6 h-[2.5px] rounded-full bg-[var(--brand-primary)]" />
              )}
              <item.icon
                size={21}
                className={`transition-all duration-200 ${
                  active
                    ? 'text-[var(--brand-primary)]'
                    : 'text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]'
                }`}
                strokeWidth={active ? 2.5 : 1.7}
              />
              <span
                className={`text-[9px] font-semibold tracking-wide transition-colors duration-200 ${
                  active
                    ? 'text-[var(--brand-primary)]'
                    : 'text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
