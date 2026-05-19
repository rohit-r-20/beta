'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ChevronRight, Star, Sparkles, ArrowRight, Zap, Shield, Clock } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';

// ---- Inline icon map (lucide names → emoji fallback for SSR safety) ----
const ICON_MAP: Record<string, string> = {
  'calendar-check': '📅', sparkles: '✨', car: '🚗', home: '🏠',
  film: '🎬', dumbbell: '💪', 'graduation-cap': '🎓', briefcase: '💼',
  key: '🔑', landmark: '🏛️',
};

const BOOKING_TYPES = [
  { slug: 'appointments', name: 'Appointments', emoji: '🏥', color: '#6366f1', gradient: 'from-indigo-500 to-purple-600', desc: 'Doctors, specialists & more' },
  { slug: 'beauty', name: 'Beauty & Wellness', emoji: '✨', color: '#ec4899', gradient: 'from-pink-500 to-orange-400', desc: 'Salons, spas & self-care' },
  { slug: 'automotive', name: 'Automotive', emoji: '🚗', color: '#3b82f6', gradient: 'from-blue-500 to-cyan-400', desc: 'Car wash, service & repairs' },
  { slug: 'home-services', name: 'Home Services', emoji: '🏠', color: '#10b981', gradient: 'from-emerald-500 to-blue-500', desc: 'Cleaning, plumbing & more' },
  { slug: 'entertainment', name: 'Entertainment', emoji: '🎬', color: '#f59e0b', gradient: 'from-amber-500 to-red-500', desc: 'Movies, events & concerts' },
  { slug: 'sports', name: 'Sports & Fitness', emoji: '💪', color: '#ef4444', gradient: 'from-red-500 to-orange-500', desc: 'Gyms, courts & classes' },
  { slug: 'education', name: 'Education', emoji: '🎓', color: '#8b5cf6', gradient: 'from-violet-500 to-indigo-500', desc: 'Tutors, classes & workshops' },
  { slug: 'professional', name: 'Professional', emoji: '💼', color: '#64748b', gradient: 'from-slate-500 to-slate-700', desc: 'Legal, finance & consulting' },
  { slug: 'rentals', name: 'Rentals', emoji: '🔑', color: '#0ea5e9', gradient: 'from-sky-500 to-indigo-500', desc: 'Vehicles, spaces & gear' },
];

const SEARCH_SUGGESTIONS = [
  'dental near me', 'car wash', 'movie tickets', 'yoga class',
  'salon appointment', 'bike rental', 'fitness trainer', 'home cleaning',
];

const STATS = [
  { value: '500+', label: 'Service Categories' },
  { value: '10K+', label: 'Providers' },
  { value: '1M+', label: 'Bookings Made' },
  { value: '4.8★', label: 'Average Rating' },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // Animated placeholder
  useEffect(() => {
    const suggestion = SEARCH_SUGGESTIONS[suggestionIndex];
    let charIndex = isTyping ? 0 : suggestion.length;
    let timer: NodeJS.Timeout;

    const tick = () => {
      if (isTyping) {
        setPlaceholder(suggestion.slice(0, charIndex));
        charIndex++;
        if (charIndex > suggestion.length) {
          setTimeout(() => setIsTyping(false), 1500);
          return;
        }
      } else {
        setPlaceholder(suggestion.slice(0, charIndex));
        charIndex--;
        if (charIndex < 0) {
          setIsTyping(true);
          setSuggestionIndex((i) => (i + 1) % SEARCH_SUGGESTIONS.length);
          return;
        }
      }
      timer = setTimeout(tick, isTyping ? 80 : 40);
    };

    timer = setTimeout(tick, 100);
    return () => clearTimeout(timer);
  }, [suggestionIndex, isTyping]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300">
      {/* ---- NAVBAR ---- */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="container-main flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold">β</div>
            <span className="font-bold text-lg gradient-text">BETA</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/explore" className="btn-ghost text-sm">Explore</Link>
            <Link href="/bookings" className="btn-ghost text-sm">My Bookings</Link>
            <Link href="/auth/login" className="btn-secondary text-sm py-2 px-4">Sign In</Link>
            <Link href="/auth/register" className="btn-primary text-sm py-2 px-4">Get Started</Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* ---- HERO ---- */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]" />
          {/* Animated grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="container-main relative z-10 text-center py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 badge badge-primary mb-6">
              <Sparkles size={12} />
              Universal Service Marketplace
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-none">
              Book{' '}
              <span className="gradient-text">Anything</span>
              <br />
              <span className="text-[var(--text-primary)]">Near You</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10">
              From dental clinics to car washes, yoga classes to movie tickets —
              discover and book every service in one place.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-8">
              <div className="relative glass-card p-1.5 flex items-center gap-2">
                <div className="flex items-center gap-2 pl-4 text-[var(--text-secondary)] shrink-0">
                  <Search size={20} />
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Try "${placeholder}"...`}
                  className="flex-1 bg-transparent outline-none text-[var(--text-primary)] placeholder-[var(--text-muted)] py-3 text-base"
                />
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors px-3 py-2 rounded-lg hover:bg-white/5 shrink-0 hidden sm:flex"
                >
                  <MapPin size={14} />
                  Detect location
                </button>
                <button type="submit" className="btn-primary shrink-0 py-3 px-5 rounded-xl">
                  <Search size={16} />
                  <span className="hidden sm:block">Search</span>
                </button>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-2">
                Popular: Car wash · Dental · Salon · Gym · Movie tickets
              </p>
            </form>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black gradient-text">{s.value}</div>
                  <div className="text-xs text-[var(--text-secondary)] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-9 border-2 border-[var(--border-strong)] rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-[var(--text-secondary)] rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* ---- CATEGORY GRID ---- */}
      <section className="py-20 border-t border-[var(--border-subtle)]">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <div className="badge badge-primary mb-3">All Categories</div>
              <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)]">What do you need?</h2>
              <p className="text-[var(--text-secondary)] mt-2">Browse by service type</p>
            </div>
            <Link href="/explore" className="btn-ghost hidden md:flex items-center gap-1.5">
              View all <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {BOOKING_TYPES.map((bt, i) => (
              <motion.div
                key={bt.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/${bt.slug}`}>
                  <div className="group glass-card p-5 cursor-pointer hover:scale-[1.02] transition-all duration-300 hover:border-[var(--border-strong)] h-full">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${bt.gradient} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {bt.emoji}
                    </div>
                    <h3 className="font-bold text-sm leading-tight mb-1 text-[var(--text-primary)]">{bt.name}</h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-snug">{bt.desc}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Explore</span>
                      <ChevronRight size={12} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* "More" card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: BOOKING_TYPES.length * 0.05 }}
            >
              <Link href="/explore">
                <div className="group glass-card p-5 cursor-pointer hover:scale-[1.02] transition-all duration-300 hover:border-indigo-500/30 h-full flex flex-col items-center justify-center text-center gradient-border">
                  <div className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    +
                  </div>
                  <h3 className="font-bold text-sm text-[var(--text-primary)]">More</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">All categories</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---- WHY BETA ---- */}
      <section className="py-20 border-t border-[var(--border-subtle)]">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="badge badge-primary mb-3">Why BETA</div>
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)]">Built for everyone</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Zap size={24} />, title: 'Instant Booking', desc: 'Book any service in under 60 seconds. Real-time slot availability, no back-and-forth.', color: '#f59e0b' },
              { icon: <Shield size={24} />, title: 'Verified Providers', desc: 'Every provider is verified, reviewed, and rated by real customers for your peace of mind.', color: '#10b981' },
              { icon: <Clock size={24} />, title: 'Manage Everything', desc: 'All your bookings in one dashboard. Reschedule, cancel, and get QR check-in codes.', color: '#6366f1' },
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${feat.color}20`, color: feat.color }}>
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-[var(--text-primary)]">{feat.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="py-20 border-t border-[var(--border-subtle)]">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden glass-card p-12 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-4 text-[var(--text-primary)]">
                Ready to book your next service?
              </h2>
              <p className="text-[var(--text-secondary)] mb-8 max-w-lg mx-auto">
                Join millions of users who trust BETA for all their service bookings.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Link href="/explore" className="btn-primary px-8 py-4 text-base">
                  <Search size={18} />
                  Start Exploring
                </Link>
                <Link href="/auth/register" className="btn-secondary px-8 py-4 text-base">
                  Create Free Account
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="border-t border-[var(--border-subtle)] py-10">
        <div className="container-main">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold">β</div>
              <span className="font-bold gradient-text">BETA</span>
            </Link>
            <p className="text-[var(--text-muted)] text-sm">© 2026 BETA Universal Service Marketplace</p>
            <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
              <Link href="/privacy" className="hover:text-[var(--text-primary)] transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-[var(--text-primary)] transition-colors">Terms</Link>
              <Link href="/help" className="hover:text-[var(--text-primary)] transition-colors">Help</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
