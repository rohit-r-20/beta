'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, BookOpen, Settings, QrCode, BarChart3, Package, Menu, X, Bell, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/services', icon: Package, label: 'Services' },
  { href: '/dashboard/calendar', icon: Calendar, label: 'Calendar' },
  { href: '/dashboard/bookings', icon: BookOpen, label: 'Bookings' },
  { href: '/dashboard/checkin', icon: QrCode, label: 'Check-in' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-[var(--sidebar-bg)] transition-transform lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs font-bold">β</div>
          <span className="text-lg font-bold text-white">BETA Admin</span>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-white/50 hover:text-white"><X className="h-5 w-5" /></button>
        </div>
        <nav className="mt-4 px-3 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${active ? 'bg-indigo-500/20 text-white' : 'text-[var(--sidebar-text)] hover:bg-white/5 hover:text-white'}`}>
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-primary)] px-4 lg:px-8">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden rounded-lg p-2 hover:bg-[var(--bg-tertiary)]"><Menu className="h-5 w-5" /></button>
          <div className="flex items-center gap-3 ml-auto">
            <button className="relative rounded-lg p-2 hover:bg-[var(--bg-tertiary)]"><Bell className="h-5 w-5" /><span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" /></button>
            <div className="flex items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-[var(--bg-tertiary)] cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">M</div>
              <span className="text-sm font-medium hidden sm:block">Merchant</span>
              <ChevronDown className="h-4 w-4 text-[var(--text-muted)]" />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-[var(--bg-secondary)] p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
