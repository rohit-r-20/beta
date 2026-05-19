'use client';

import { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, MapPin, Star, Clock, Shield, Search, SlidersHorizontal, List, Map } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from '../../../components/ThemeToggle';

// Demo providers — in production these come from the API
const DEMO_PROVIDERS = [
  {
    id: 'p1', name: 'Apollo Dental Care', slug: 'apollo-dental',
    rating: 4.8, reviewCount: 324, city: 'Chennai', address: '42 Anna Nagar Main Road',
    distance: '1.2 km', isVerified: true, isOpen: true,
    tags: ['Root Canal', 'Braces', 'Whitening', 'Implants'],
    price: '₹500', image: '🦷', openTime: '9 AM – 9 PM',
  },
  {
    id: 'p2', name: 'Smile Dental Studio', slug: 'smile-dental',
    rating: 4.6, reviewCount: 189, city: 'Chennai', address: '15 T Nagar High Road',
    distance: '2.4 km', isVerified: true, isOpen: true,
    tags: ['Cleaning', 'Fillings', 'Cosmetic'],
    price: '₹400', image: '😁', openTime: '8 AM – 8 PM',
  },
  {
    id: 'p3', name: 'Clove Dental', slug: 'clove-dental',
    rating: 4.5, reviewCount: 567, city: 'Chennai', address: '78 Adyar Bridge Road',
    distance: '3.1 km', isVerified: true, isOpen: false,
    tags: ['Pediatric', 'Orthodontics', 'Surgery'],
    price: '₹600', image: '🌿', openTime: '10 AM – 7 PM',
  },
  {
    id: 'p4', name: 'Pearl White Clinic', slug: 'pearl-white',
    rating: 4.3, reviewCount: 98, city: 'Chennai', address: '5 Mylapore Tank Street',
    distance: '4.0 km', isVerified: false, isOpen: true,
    tags: ['Whitening', 'Braces', 'Check-up'],
    price: '₹350', image: '💎', openTime: '9 AM – 6 PM',
  },
  {
    id: 'p5', name: 'Dr. Dental Express', slug: 'dr-dental',
    rating: 4.7, reviewCount: 215, city: 'Chennai', address: '22 Velachery Main Road',
    distance: '5.6 km', isVerified: true, isOpen: true,
    tags: ['Emergency', '24/7', 'Root Canal', 'Implants'],
    price: '₹450', image: '🏥', openTime: '24 Hours',
  },
  {
    id: 'p6', name: 'Sparkling Smiles', slug: 'sparkling-smiles',
    rating: 4.4, reviewCount: 142, city: 'Chennai', address: '9 OMR IT Expressway',
    distance: '7.2 km', isVerified: true, isOpen: true,
    tags: ['Cosmetic', 'Veneers', 'Scaling'],
    price: '₹550', image: '✨', openTime: '9 AM – 8 PM',
  },
];

const CATEGORY_NAMES: Record<string, string> = {
  dental: 'Dental Clinics', hospitals: 'Hospitals', 'eye-clinics': 'Eye Clinics',
  fitness: 'Fitness Trainers', veterinary: 'Veterinary', physiotherapy: 'Physiotherapy',
  'mental-health': 'Mental Health', dermatology: 'Dermatology',
  'hair-salons': 'Hair Salons', 'nail-art': 'Nail Art', spas: 'Spas',
  bridal: 'Bridal', makeup: 'Makeup Artists', tattoo: 'Tattoo Studios',
  'car-wash': 'Car Wash', 'bike-wash': 'Bike Wash', 'service-centers': 'Service Centers',
  tyres: 'Tyres & Wheels', detailing: 'Detailing', 'ev-charging': 'EV Charging',
  cleaning: 'Cleaning', plumbing: 'Plumbing', electrical: 'Electrical',
  'pest-control': 'Pest Control', 'ac-service': 'AC Service', painting: 'Painting',
  carpentry: 'Carpentry', movies: 'Movie Tickets', concerts: 'Concerts',
  'sports-events': 'Sports Events', 'theme-parks': 'Theme Parks', gaming: 'Gaming Zones',
  comedy: 'Comedy Shows', gyms: 'Gyms', yoga: 'Yoga Classes', swimming: 'Swimming Pools',
  cricket: 'Cricket Ground', football: 'Football Turf', badminton: 'Badminton',
  tutors: 'Tutors', music: 'Music Classes', dance: 'Dance Classes', art: 'Art & Craft',
  language: 'Language', coding: 'Coding', legal: 'Legal Advice',
  accounting: 'Tax & Accounting', photography: 'Photography', consulting: 'Consulting',
  events: 'Event Planning', 'bike-rentals': 'Bike Rentals', 'car-rentals': 'Car Rentals',
  halls: 'Hall Booking', equipment: 'Equipment', camping: 'Camping Gear',
};

const SORT_OPTIONS = [
  { value: 'distance', label: 'Nearest' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'price', label: 'Lowest Price' },
  { value: 'reviews', label: 'Most Reviewed' },
];

export default function ProviderDiscoveryPage({ params }: { params: Promise<{ bookingType: string; category: string }> }) {
  const { bookingType, category } = use(params);
  const [sortBy, setSortBy] = useState('distance');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const categoryName = CATEGORY_NAMES[category] || category;

  return (
    <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--border-subtle)]">
        <div className="container-main flex items-center justify-between h-16">
          <div className="flex items-center gap-4 min-w-0">
            <Link href={`/${bookingType}`} className="btn-ghost p-2 shrink-0">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] min-w-0">
              <Link href="/" className="hover:text-[var(--text-primary)] transition-colors shrink-0">Home</Link>
              <ChevronRight size={14} className="shrink-0" />
              <Link href={`/${bookingType}`} className="hover:text-[var(--text-primary)] transition-colors truncate shrink-0">{bookingType}</Link>
              <ChevronRight size={14} className="shrink-0" />
              <span className="text-[var(--text-primary)] truncate">{categoryName}</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <div className="pt-16">
        {/* Header */}
        <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
          <div className="container-main py-8">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 text-sm text-indigo-400 mb-2">
                <MapPin size={14} />
                <span>Showing providers near Chennai</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black mb-2">{categoryName}</h1>
              <p className="text-[var(--text-secondary)]">{DEMO_PROVIDERS.length} providers found nearby</p>
            </motion.div>

            {/* Filters bar */}
            <div className="flex items-center justify-between mt-6 flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    placeholder="Search providers..."
                    className="input pl-10 py-2.5 text-sm w-64 text-[var(--text-primary)] placeholder-[var(--text-muted)]"
                  />
                </div>
                <button className="btn-secondary py-2.5 px-3 text-sm">
                  <SlidersHorizontal size={14} />
                  <span className="hidden sm:inline">Filters</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input py-2.5 text-sm w-40 cursor-pointer text-[var(--text-primary)]"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <div className="flex items-center rounded-xl border border-[var(--border-default)] overflow-hidden">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-indigo-500/20 text-indigo-400' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                  >
                    <List size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`p-2.5 transition-colors ${viewMode === 'map' ? 'bg-indigo-500/20 text-indigo-400' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                  >
                    <Map size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Provider list */}
        <div className="container-main py-8">
          <div className="grid gap-4">
            {DEMO_PROVIDERS.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link href={`/${bookingType}/${category}/${p.slug}`}>
                  <div className="group glass-card p-5 md:p-6 flex gap-5 cursor-pointer hover:border-[var(--border-strong)] transition-all">
                    {/* Logo */}
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-[var(--border-subtle)] flex items-center justify-center text-3xl md:text-4xl shrink-0 group-hover:scale-105 transition-transform">
                      {p.image}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-base md:text-lg truncate text-[var(--text-primary)]">{p.name}</h3>
                            {p.isVerified && (
                              <Shield size={14} className="text-blue-400 shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)] mb-2 flex-wrap">
                            <div className="flex items-center gap-1">
                              <Star size={13} className="text-amber-400 fill-amber-400" />
                              <span className="text-[var(--text-primary)] font-semibold">{p.rating}</span>
                              <span>({p.reviewCount})</span>
                            </div>
                            <span className="text-[var(--border-strong)]">•</span>
                            <div className="flex items-center gap-1">
                              <MapPin size={13} />
                              {p.distance}
                            </div>
                            <span className="text-[var(--border-strong)]">•</span>
                            <div className="flex items-center gap-1">
                              <Clock size={13} />
                              {p.openTime}
                            </div>
                          </div>
                          <p className="text-xs text-[var(--text-muted)] mb-2.5 truncate">{p.address}</p>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {p.tags.slice(0, 4).map((t) => (
                              <span key={t} className="badge badge-primary text-[10px] py-0.5 px-2">{t}</span>
                            ))}
                          </div>
                        </div>

                        {/* Right side */}
                        <div className="text-right shrink-0 hidden sm:block">
                          <div className={`text-xs font-semibold px-2 py-1 rounded-full mb-2 inline-block ${p.isOpen ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/15 text-red-400 border border-red-500/20'}`}>
                            {p.isOpen ? 'Open Now' : 'Closed'}
                          </div>
                          <div className="text-lg font-bold text-[var(--text-primary)]">
                            {p.price}<span className="text-xs text-[var(--text-muted)] font-normal"> onwards</span>
                          </div>
                          <button className="btn-primary text-xs py-2 px-4 mt-2 rounded-lg">
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
