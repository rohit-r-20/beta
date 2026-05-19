'use client';

import { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '../../components/ThemeToggle';

const CATEGORY_DATA: Record<string, {
  name: string; emoji: string; gradient: string; desc: string;
  categories: { name: string; emoji: string; slug: string; desc: string }[];
}> = {
  appointments: {
    name: 'Appointments', emoji: '🏥', gradient: 'from-indigo-500 to-purple-600',
    desc: 'Book appointments with healthcare professionals and specialists',
    categories: [
      { name: 'Dental Clinics', emoji: '🦷', slug: 'dental', desc: 'Checkups, cleanings & treatments' },
      { name: 'Hospitals', emoji: '🏥', slug: 'hospitals', desc: 'General & specialist consultations' },
      { name: 'Eye Clinics', emoji: '👁️', slug: 'eye-clinics', desc: 'Vision tests & eye care' },
      { name: 'Fitness Trainers', emoji: '🏋️', slug: 'fitness', desc: 'Personal training sessions' },
      { name: 'Veterinary', emoji: '🐾', slug: 'veterinary', desc: 'Pet care & checkups' },
      { name: 'Physiotherapy', emoji: '🧘', slug: 'physiotherapy', desc: 'Rehab & pain management' },
      { name: 'Mental Health', emoji: '🧠', slug: 'mental-health', desc: 'Counseling & therapy' },
      { name: 'Dermatology', emoji: '💆', slug: 'dermatology', desc: 'Skin care & treatments' },
    ],
  },
  beauty: {
    name: 'Beauty & Wellness', emoji: '✨', gradient: 'from-pink-500 to-orange-400',
    desc: 'Salons, spas, and wellness centers near you',
    categories: [
      { name: 'Hair Salons', emoji: '💇', slug: 'hair-salons', desc: 'Haircuts, styling & coloring' },
      { name: 'Nail Art', emoji: '💅', slug: 'nail-art', desc: 'Manicures, pedicures & designs' },
      { name: 'Spas', emoji: '🛁', slug: 'spas', desc: 'Massages & relaxation' },
      { name: 'Bridal', emoji: '👰', slug: 'bridal', desc: 'Complete bridal packages' },
      { name: 'Makeup Artists', emoji: '💄', slug: 'makeup', desc: 'Events & special occasions' },
      { name: 'Tattoo Studios', emoji: '🎨', slug: 'tattoo', desc: 'Custom tattoo & piercing' },
    ],
  },
  automotive: {
    name: 'Automotive', emoji: '🚗', gradient: 'from-blue-500 to-cyan-400',
    desc: 'Car wash, service centers, and vehicle maintenance',
    categories: [
      { name: 'Car Wash', emoji: '🫧', slug: 'car-wash', desc: 'Full wash, foam & detailing' },
      { name: 'Bike Wash', emoji: '🛵', slug: 'bike-wash', desc: 'Two-wheeler cleaning' },
      { name: 'Service Centers', emoji: '🔧', slug: 'service-centers', desc: 'Servicing & repairs' },
      { name: 'Tyres & Wheels', emoji: '⚙️', slug: 'tyres', desc: 'Tyre fitting & alignment' },
      { name: 'Detailing', emoji: '✨', slug: 'detailing', desc: 'Premium interior & exterior' },
      { name: 'EV Charging', emoji: '⚡', slug: 'ev-charging', desc: 'Electric vehicle stations' },
    ],
  },
  'home-services': {
    name: 'Home Services', emoji: '🏠', gradient: 'from-emerald-500 to-blue-500',
    desc: 'Plumbing, electrical, cleaning and more at your doorstep',
    categories: [
      { name: 'Cleaning', emoji: '🧹', slug: 'cleaning', desc: 'Deep & regular cleaning' },
      { name: 'Plumbing', emoji: '🔩', slug: 'plumbing', desc: 'Leaks, pipes & installation' },
      { name: 'Electrical', emoji: '⚡', slug: 'electrical', desc: 'Wiring & appliances' },
      { name: 'Pest Control', emoji: '🪲', slug: 'pest-control', desc: 'Safe & effective treatment' },
      { name: 'AC Service', emoji: '❄️', slug: 'ac-service', desc: 'Servicing & gas refilling' },
      { name: 'Painting', emoji: '🎨', slug: 'painting', desc: 'Interior & exterior painting' },
      { name: 'Carpentry', emoji: '🪚', slug: 'carpentry', desc: 'Furniture & woodwork' },
    ],
  },
  entertainment: {
    name: 'Entertainment', emoji: '🎬', gradient: 'from-amber-500 to-red-500',
    desc: 'Movies, events, concerts, and experiences',
    categories: [
      { name: 'Movie Tickets', emoji: '🎫', slug: 'movies', desc: 'Latest films & showtimes' },
      { name: 'Concerts', emoji: '🎵', slug: 'concerts', desc: 'Live music & performances' },
      { name: 'Sports Events', emoji: '🏆', slug: 'sports-events', desc: 'Cricket, football & more' },
      { name: 'Theme Parks', emoji: '🎡', slug: 'theme-parks', desc: 'Rides & attractions' },
      { name: 'Gaming Zones', emoji: '🎮', slug: 'gaming', desc: 'Arcades & gaming lounges' },
      { name: 'Comedy Shows', emoji: '😂', slug: 'comedy', desc: 'Stand-up & improv shows' },
    ],
  },
  sports: {
    name: 'Sports & Fitness', emoji: '💪', gradient: 'from-red-500 to-orange-500',
    desc: 'Gyms, sports courts, swimming pools, and fitness classes',
    categories: [
      { name: 'Gyms', emoji: '🏋️', slug: 'gyms', desc: 'Weights, cardio & classes' },
      { name: 'Yoga Classes', emoji: '🧘', slug: 'yoga', desc: 'All levels & styles' },
      { name: 'Swimming Pools', emoji: '🏊', slug: 'swimming', desc: 'Lap swimming & lessons' },
      { name: 'Cricket Ground', emoji: '🏏', slug: 'cricket', desc: 'Box & ground booking' },
      { name: 'Football Turf', emoji: '⚽', slug: 'football', desc: '5-a-side & 7-a-side' },
      { name: 'Badminton', emoji: '🏸', slug: 'badminton', desc: 'Court booking by hour' },
    ],
  },
  education: {
    name: 'Education', emoji: '🎓', gradient: 'from-violet-500 to-indigo-500',
    desc: 'Tutors, coaching classes, workshops, and courses',
    categories: [
      { name: 'Tutors', emoji: '📚', slug: 'tutors', desc: 'School & college subjects' },
      { name: 'Music Classes', emoji: '🎸', slug: 'music', desc: 'Guitar, piano & vocals' },
      { name: 'Dance Classes', emoji: '💃', slug: 'dance', desc: 'Classical, hip-hop & more' },
      { name: 'Art & Craft', emoji: '🖼️', slug: 'art', desc: 'Painting, pottery & craft' },
      { name: 'Language', emoji: '🌐', slug: 'language', desc: 'English, French & more' },
      { name: 'Coding', emoji: '💻', slug: 'coding', desc: 'Web, app & data courses' },
    ],
  },
  professional: {
    name: 'Professional Services', emoji: '💼', gradient: 'from-slate-500 to-slate-700',
    desc: 'Lawyers, accountants, consultants, and more',
    categories: [
      { name: 'Legal Advice', emoji: '⚖️', slug: 'legal', desc: 'Family, property & business law' },
      { name: 'Tax & Accounting', emoji: '🧮', slug: 'accounting', desc: 'ITR, GST & audits' },
      { name: 'Photography', emoji: '📷', slug: 'photography', desc: 'Events & commercial shoots' },
      { name: 'Consulting', emoji: '📊', slug: 'consulting', desc: 'Business & strategy advice' },
      { name: 'Event Planning', emoji: '🎉', slug: 'events', desc: 'Weddings & corporate events' },
    ],
  },
  rentals: {
    name: 'Rentals', emoji: '🔑', gradient: 'from-sky-500 to-indigo-500',
    desc: 'Rent vehicles, equipment, spaces and more',
    categories: [
      { name: 'Bike Rentals', emoji: '🛵', slug: 'bike-rentals', desc: 'Hourly & daily bike hire' },
      { name: 'Car Rentals', emoji: '🚗', slug: 'car-rentals', desc: 'Self-drive & chauffeur' },
      { name: 'Hall Booking', emoji: '🏛️', slug: 'halls', desc: 'Banquets & event spaces' },
      { name: 'Equipment', emoji: '🔧', slug: 'equipment', desc: 'Tools & machinery' },
      { name: 'Camping Gear', emoji: '⛺', slug: 'camping', desc: 'Tents, bags & gear sets' },
    ],
  },
};

export default function CategoryPage({ params }: { params: Promise<{ bookingType: string }> }) {
  const { bookingType } = use(params);
  const data = CATEGORY_DATA[bookingType];

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🔍</p>
          <h1 className="text-2xl font-bold mb-2">Category not found</h1>
          <Link href="/" className="btn-primary mt-4 inline-flex">Go home</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Sticky header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="container-main flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="btn-ghost p-2">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-white">{data.name}</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero banner */}
      <section className="pt-16">
        <div className={`bg-gradient-to-br ${data.gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="container-main relative z-10 py-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="text-5xl mb-4">{data.emoji}</div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-3">{data.name}</h1>
              <p className="text-white/70 text-lg max-w-xl">{data.desc}</p>
              <div className="flex items-center gap-2 mt-4 text-white/60 text-sm">
                <MapPin size={14} />
                <span>Showing providers near your location</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subcategories grid */}
      <section className="py-12">
        <div className="container-main">
          <h2 className="text-xl font-bold text-slate-300 mb-6">Choose a service type</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.categories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link href={`/${bookingType}/${cat.slug}`}>
                  <div className="group glass-card p-6 cursor-pointer hover:scale-[1.03] transition-all duration-300 hover:border-white/20">
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {cat.emoji}
                    </div>
                    <h3 className="font-bold text-sm mb-1">{cat.name}</h3>
                    <p className="text-xs text-slate-500 leading-snug">{cat.desc}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Find nearby</span>
                      <ChevronRight size={12} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
