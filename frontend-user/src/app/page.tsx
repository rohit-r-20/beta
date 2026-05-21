'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, ChevronRight, Star, Tag, Flame,
  Plane, Hotel, TrainFront, Palmtree, Film, CalendarDays,
  Ticket, Music, PartyPopper, Gamepad2, Bell, Menu,
  Stethoscope, Sparkles, CarFront, House, GraduationCap, Briefcase,
  Dumbbell, Key, Scissors, Wrench, ArrowRight, TrendingUp,
  Zap, Shield, Clock
} from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { BottomNav } from '../components/BottomNav';

/* ================================================================
   DATA
   ================================================================ */

const SEARCH_SUGGESTIONS = [
  'dental near me', 'car wash', 'movie tickets', 'yoga class',
  'salon appointment', 'bike rental', 'fitness trainer', 'home cleaning',
];

const BANNERS = [
  {
    id: 1,
    gradient: 'from-indigo-600 via-purple-600 to-pink-500',
    title: 'Flat 50% OFF',
    subtitle: 'on your first booking — any service',
    cta: 'Book Now',
    emoji: '🎉',
  },
  {
    id: 2,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    title: 'Home Services',
    subtitle: 'AC repair, plumbing & more starting ₹149',
    cta: 'Explore',
    emoji: '🏠',
  },
  {
    id: 3,
    gradient: 'from-orange-500 via-red-500 to-pink-600',
    title: 'Weekend Special',
    subtitle: 'Movie + dinner combos from ₹599',
    cta: 'Grab Deal',
    emoji: '🍿',
  },
];

const CATEGORIES = [
  { slug: 'appointments', name: 'Health', icon: Stethoscope, color: '#6366f1', gradient: 'from-indigo-500 to-purple-600' },
  { slug: 'beauty', name: 'Beauty', icon: Scissors, color: '#ec4899', gradient: 'from-pink-500 to-rose-500' },
  { slug: 'automotive', name: 'Auto', icon: CarFront, color: '#3b82f6', gradient: 'from-blue-500 to-cyan-400' },
  { slug: 'home-services', name: 'Home', icon: House, color: '#10b981', gradient: 'from-emerald-500 to-teal-500' },
  { slug: 'entertainment', name: 'Shows', icon: Film, color: '#f59e0b', gradient: 'from-amber-500 to-orange-500' },
  { slug: 'sports', name: 'Fitness', icon: Dumbbell, color: '#ef4444', gradient: 'from-red-500 to-rose-500' },
  { slug: 'education', name: 'Learn', icon: GraduationCap, color: '#8b5cf6', gradient: 'from-violet-500 to-purple-500' },
  { slug: 'professional', name: 'Pro', icon: Briefcase, color: '#64748b', gradient: 'from-slate-500 to-slate-600' },
  { slug: 'rentals', name: 'Rentals', icon: Key, color: '#0ea5e9', gradient: 'from-sky-500 to-blue-500' },
  { slug: 'services', name: 'Repair', icon: Wrench, color: '#f97316', gradient: 'from-orange-500 to-amber-500' },
];

const OFFER_TABS = [
  { key: 'trending', label: 'Trending', icon: Flame },
  { key: 'flights', label: 'Flights', icon: Plane },
  { key: 'hotels', label: 'Hotels', icon: Hotel },
  { key: 'rails', label: 'Rails', icon: TrainFront },
  { key: 'holidays', label: 'Holidays', icon: Palmtree },
];

const OFFERS: Record<string, { id: string; title: string; subtitle: string; discount: string; gradient: string; validTill: string; icon: string }[]> = {
  trending: [
    { id: 't1', title: 'Salon Day Out', subtitle: 'Flat 40% off haircuts', discount: '40% OFF', gradient: 'from-fuchsia-600 to-pink-500', validTill: 'Valid till May 31', icon: '💇' },
    { id: 't2', title: 'Dental Checkup', subtitle: 'Free X-ray with consultation', discount: 'FREE X-RAY', gradient: 'from-blue-600 to-indigo-500', validTill: 'Valid till Jun 5', icon: '🦷' },
    { id: 't3', title: 'Car Detailing', subtitle: 'Premium wash from ₹299', discount: '₹299 Only', gradient: 'from-emerald-600 to-green-500', validTill: 'Valid till May 28', icon: '🚗' },
  ],
  flights: [
    { id: 'f1', title: 'Chennai → Delhi', subtitle: 'Non-stop flights from ₹2,999', discount: '₹2,999', gradient: 'from-sky-600 to-blue-500', validTill: 'Book by May 25', icon: '✈️' },
    { id: 'f2', title: 'Mumbai → Goa', subtitle: 'Weekend getaway specials', discount: '20% OFF', gradient: 'from-violet-600 to-purple-500', validTill: 'Limited seats', icon: '🏖️' },
  ],
  hotels: [
    { id: 'h1', title: 'Luxury Stays', subtitle: '5-star hotels from ₹4,999/night', discount: 'From ₹4,999', gradient: 'from-amber-600 to-orange-500', validTill: 'Summer special', icon: '🏨' },
    { id: 'h2', title: 'Business Hotels', subtitle: 'Corporate rates + breakfast', discount: '30% OFF', gradient: 'from-teal-600 to-cyan-500', validTill: 'For corporates', icon: '💼' },
  ],
  rails: [
    { id: 'r1', title: 'Tatkal Assist', subtitle: 'We book your tatkal tickets', discount: '₹49 Fee', gradient: 'from-red-600 to-orange-500', validTill: 'Any route', icon: '🚂' },
    { id: 'r2', title: 'Rajdhani Special', subtitle: 'Premium cabins available', discount: 'Book Now', gradient: 'from-indigo-600 to-blue-500', validTill: 'Selected routes', icon: '🛤️' },
  ],
  holidays: [
    { id: 'p1', title: 'Manali Calling', subtitle: '3N/4D packages from ₹8,999', discount: '₹8,999', gradient: 'from-cyan-600 to-blue-500', validTill: 'Group deals', icon: '🏔️' },
    { id: 'p2', title: 'Goa Beach Vibes', subtitle: 'All-inclusive resort packages', discount: '25% OFF', gradient: 'from-orange-600 to-red-500', validTill: 'Monsoon offer', icon: '🌴' },
  ],
};

const UPCOMING = [
  { id: 'u1', type: 'Movie', title: 'Mission Impossible 9', venue: 'PVR, Chennai', date: 'May 23', image: '🎬', color: '#ef4444' },
  { id: 'u2', type: 'Event', title: 'Sunburn Festival', venue: 'Marina Beach', date: 'Jun 1', image: '🎵', color: '#8b5cf6' },
  { id: 'u3', type: 'Comedy', title: 'Stand Up Night', venue: 'The Music Academy', date: 'May 26', image: '😂', color: '#f59e0b' },
  { id: 'u4', type: 'Sports', title: 'CSK vs MI', venue: 'Chepauk Stadium', date: 'May 30', image: '🏏', color: '#10b981' },
  { id: 'u5', type: 'Gaming', title: 'BGMI Tournament', venue: 'Online + Venue', date: 'Jun 5', image: '🎮', color: '#3b82f6' },
];

/* ================================================================
   COMPONENT
   ================================================================ */

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [activeBanner, setActiveBanner] = useState(0);
  const [activeOfferTab, setActiveOfferTab] = useState('trending');
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
        if (charIndex > suggestion.length) { setTimeout(() => setIsTyping(false), 1500); return; }
      } else {
        setPlaceholder(suggestion.slice(0, charIndex));
        charIndex--;
        if (charIndex < 0) { setIsTyping(true); setSuggestionIndex((i) => (i + 1) % SEARCH_SUGGESTIONS.length); return; }
      }
      timer = setTimeout(tick, isTyping ? 80 : 40);
    };
    timer = setTimeout(tick, 100);
    return () => clearTimeout(timer);
  }, [suggestionIndex, isTyping]);

  // Auto-rotate banners
  useEffect(() => {
    const timer = setInterval(() => setActiveBanner((p) => (p + 1) % BANNERS.length), 4500);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300 pb-20">

      {/* ═══════════ TOP BAR ═══════════ */}
      <header className="sticky top-0 z-50 glass border-b border-[var(--border-subtle)]">
        <div className="px-4 py-2.5 flex items-center gap-2.5">
          <Link href="/" className="shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-black shadow-lg shadow-indigo-500/20">β</div>
          </Link>

          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative flex items-center">
              <Search size={15} className="absolute left-3 text-[var(--text-muted)]" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search "${placeholder}"...`}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--brand-primary)] focus:shadow-[0_0_0_3px_var(--brand-primary-soft)] outline-none transition-all duration-200"
              />
            </div>
          </form>

          <button className="shrink-0 flex items-center gap-1 text-xs font-medium text-[var(--text-secondary)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl px-2.5 py-2 hover:border-[var(--border-strong)] transition-all">
            <MapPin size={13} className="text-[var(--brand-primary)]" />
            <span className="hidden sm:inline max-w-[70px] truncate">Chennai</span>
          </button>

          <button className="shrink-0 relative p-2 rounded-xl hover:bg-[var(--bg-elevated)] transition-colors text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <ThemeToggle />
        </div>
      </header>

      {/* ═══════════ BANNER CAROUSEL ═══════════ */}
      <section className="px-4 pt-4">
        <div className="relative rounded-2xl overflow-hidden h-44 sm:h-52 shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBanner}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className={`absolute inset-0 bg-gradient-to-br ${BANNERS[activeBanner].gradient} flex flex-col justify-end`}
            >
              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
              {/* Radial highlight */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-[60px]" />

              <div className="relative z-10 p-5 sm:p-6 flex items-end justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight drop-shadow-sm">
                    {BANNERS[activeBanner].title}
                  </h2>
                  <p className="text-white/75 text-sm mt-1 max-w-[240px]">{BANNERS[activeBanner].subtitle}</p>
                  <button className="mt-3 bg-white text-gray-900 font-bold text-xs px-5 py-2 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-100 transition-all duration-200">
                    {BANNERS[activeBanner].cta} →
                  </button>
                </div>
                <span className="text-5xl sm:text-6xl opacity-80 drop-shadow-lg animate-float">{BANNERS[activeBanner].emoji}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {BANNERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveBanner(i)}
                className={`h-[5px] rounded-full transition-all duration-500 ${
                  i === activeBanner ? 'w-7 bg-white shadow-sm' : 'w-[5px] bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CATEGORY GRID ═══════════ */}
      <section className="px-4 pt-7 pb-1">
        <div className="grid grid-cols-5 gap-x-1 gap-y-5">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.035, type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Link href={`/${cat.slug}`} className="flex flex-col items-center gap-2 group">
                <div
                  className={`w-[52px] h-[52px] sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 active:scale-95 transition-all duration-200`}
                  style={{ boxShadow: `0 4px 14px ${cat.color}30` }}
                >
                  <cat.icon size={22} className="text-white drop-shadow-sm" strokeWidth={2} />
                </div>
                <span className="text-[10.5px] sm:text-xs font-semibold text-[var(--text-secondary)] text-center leading-tight group-hover:text-[var(--text-primary)] transition-colors">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Thin divider */}
      <div className="section-divider mt-4" />

      {/* ═══════════ OFFERS ═══════════ */}
      <section className="pt-5 pb-2">
        <div className="px-4 flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[var(--brand-primary-soft)] flex items-center justify-center">
              <Tag size={14} className="text-[var(--brand-primary)]" />
            </div>
            <h2 className="text-[17px] font-bold tracking-tight">Offers & Deals</h2>
          </div>
          <Link href="/offers" className="flex items-center gap-0.5 text-xs font-semibold text-[var(--brand-primary)] hover:underline">
            View All <ChevronRight size={14} />
          </Link>
        </div>

        {/* Tabs */}
        <div className="px-4 mb-4 overflow-x-auto hide-scrollbar">
          <div className="flex gap-2 w-max">
            {OFFER_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveOfferTab(tab.key)}
                className={`pill ${activeOfferTab === tab.key ? 'pill-active' : ''}`}
              >
                <tab.icon size={13} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Offer Cards */}
        <div className="px-4 overflow-x-auto hide-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeOfferTab}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="flex gap-3 w-max pb-3"
            >
              {(OFFERS[activeOfferTab] || []).map((offer) => (
                <div
                  key={offer.id}
                  className={`offer-card relative w-[260px] sm:w-72 h-[140px] rounded-2xl bg-gradient-to-br ${offer.gradient} p-4 flex flex-col justify-between shrink-0 cursor-pointer hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 shadow-lg`}
                  style={{ boxShadow: `0 8px 24px rgba(0,0,0,0.3)` }}
                >
                  {/* Decorative circle */}
                  <div className="absolute top-3 right-3 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl">
                    {offer.icon}
                  </div>

                  <div className="relative z-10">
                    <span className="inline-block bg-white/25 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-[3px] rounded-full tracking-wide">
                      {offer.discount}
                    </span>
                    <h3 className="text-white font-bold text-[15px] leading-tight mt-1.5">{offer.title}</h3>
                    <p className="text-white/65 text-xs mt-0.5">{offer.subtitle}</p>
                  </div>
                  <span className="relative z-10 text-white/40 text-[10px] font-medium">{offer.validTill}</span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Thin divider */}
      <div className="section-divider" />

      {/* ═══════════ UPCOMING ═══════════ */}
      <section className="pt-5 pb-4">
        <div className="px-4 flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[var(--brand-primary-soft)] flex items-center justify-center">
              <CalendarDays size={14} className="text-[var(--brand-primary)]" />
            </div>
            <h2 className="text-[17px] font-bold tracking-tight">Upcoming</h2>
          </div>
          <Link href="/entertainment" className="flex items-center gap-0.5 text-xs font-semibold text-[var(--brand-primary)] hover:underline">
            View All <ChevronRight size={14} />
          </Link>
        </div>

        {/* Category Pills */}
        <div className="px-4 mb-3 overflow-x-auto hide-scrollbar">
          <div className="flex gap-2 w-max">
            {[
              { label: 'Movies', icon: Film },
              { label: 'Events', icon: PartyPopper },
              { label: 'Concerts', icon: Music },
              { label: 'Sports', icon: Ticket },
              { label: 'Gaming', icon: Gamepad2 },
            ].map((pill, i) => (
              <button key={pill.label} className={`pill ${i === 0 ? 'pill-active' : ''}`}>
                <pill.icon size={13} />
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="px-4 overflow-x-auto hide-scrollbar">
          <div className="flex gap-3 w-max pb-2">
            {UPCOMING.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, type: 'spring', stiffness: 250, damping: 20 }}
                className="w-[152px] sm:w-44 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden cursor-pointer card-hover group shrink-0"
              >
                {/* Visual area */}
                <div
                  className="h-[100px] sm:h-[110px] flex items-center justify-center relative overflow-hidden"
                  style={{ background: `linear-gradient(145deg, ${item.color}15, ${item.color}35)` }}
                >
                  {/* Decorative blobs */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-20" style={{ background: item.color }} />
                  <div className="absolute -bottom-3 -left-3 w-12 h-12 rounded-full opacity-15" style={{ background: item.color }} />
                  <span className="text-[44px] sm:text-[52px] group-hover:scale-110 transition-transform duration-300 drop-shadow-lg relative z-10">{item.image}</span>
                  <span
                    className="absolute top-2 left-2 text-[9px] font-bold px-2 py-[2px] rounded-full text-white uppercase tracking-wider"
                    style={{ background: item.color }}
                  >
                    {item.type}
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="text-[13px] font-bold leading-tight truncate">{item.title}</h3>
                  <p className="text-[10.5px] text-[var(--text-muted)] mt-0.5 truncate">{item.venue}</p>
                  <div className="flex items-center gap-1 mt-2 text-[10px] font-semibold rounded-full bg-[var(--bg-elevated)] w-fit px-2 py-0.5" style={{ color: item.color }}>
                    <CalendarDays size={10} />
                    <span>{item.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Thin divider */}
      <div className="section-divider" />

      {/* ═══════════ WHY BETA — Trust Section ═══════════ */}
      <section className="px-4 py-6">
        <div className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-5 overflow-hidden relative">
          {/* Decorative glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/8 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-purple-500/6 rounded-full blur-[50px] pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={14} className="text-[var(--brand-primary)]" />
              <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider">Trusted Platform</span>
            </div>

            <div className="grid grid-cols-4 gap-3 text-center">
              {[
                { value: '500+', label: 'Categories', icon: TrendingUp, color: '#6366f1' },
                { value: '10K+', label: 'Providers', icon: Shield, color: '#10b981' },
                { value: '1M+', label: 'Bookings', icon: Zap, color: '#f59e0b' },
                { value: '4.8★', label: 'Rating', icon: Star, color: '#ec4899' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-0.5" style={{ background: `${stat.color}15` }}>
                    <stat.icon size={14} style={{ color: stat.color }} />
                  </div>
                  <div className="text-base sm:text-lg font-black gradient-text leading-none">{stat.value}</div>
                  <div className="text-[9px] sm:text-[10px] text-[var(--text-muted)] font-medium leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="px-4 pb-24 pt-2 text-center">
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[8px] font-bold text-white">β</div>
          <span className="text-xs font-bold gradient-text">BETA</span>
        </div>
        <p className="text-[10px] text-[var(--text-muted)]">© 2026 BETA Universal Service Marketplace</p>
      </footer>

      {/* ═══════════ BOTTOM NAV ═══════════ */}
      <BottomNav />
    </main>
  );
}
