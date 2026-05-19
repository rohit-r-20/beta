'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, SlidersHorizontal, MapPin, Star, Clock, ChevronDown, Grid3X3, List } from 'lucide-react';

const mockServices = Array.from({ length: 12 }, (_, i) => ({
  id: `svc-${i + 1}`,
  name: ['Premium Haircut', 'Yoga Class', 'Table Reservation', 'Concert Tickets', 'Spa Treatment', 'Gym Session', 'Dance Class', 'Photography', 'Music Lesson', 'Art Workshop', 'Cooking Class', 'Tennis Court'][i],
  merchant: ['Style Studio', 'ZenFit', 'The Grand', 'EventHub', 'Serenity Spa', 'FitZone', 'Rhythm Dance', 'ClickPro', 'MelodyMakers', 'ArtHouse', 'ChefTable', 'SportArena'][i],
  price: [599, 499, 1200, 2500, 1800, 399, 699, 3500, 800, 1200, 1500, 600][i],
  rating: [4.8, 4.9, 4.7, 4.6, 4.9, 4.5, 4.8, 4.7, 4.6, 4.8, 4.9, 4.5][i],
  reviews: [234, 189, 156, 445, 312, 567, 123, 89, 67, 145, 201, 334][i],
  duration: [45, 60, 120, 180, 90, 60, 75, 120, 45, 90, 150, 60][i],
  city: 'Chennai',
  image: `https://picsum.photos/seed/${i + 10}/400/250`,
  category: ['Salon', 'Fitness', 'Dining', 'Events', 'Wellness', 'Fitness', 'Dance', 'Photography', 'Music', 'Art', 'Cooking', 'Sports'][i],
}));

export default function SearchPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)]">
      {/* Search Header */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-primary)] sticky top-[57px] z-40">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-muted)]" />
              <input type="text" placeholder="Search services..." className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] py-3 pl-12 pr-4 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20" />
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-3 text-sm font-medium hover:bg-[var(--bg-tertiary)] transition-colors">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </button>
              <div className="flex rounded-xl border border-[var(--border)] overflow-hidden">
                <button onClick={() => setViewMode('grid')} className={`p-3 ${viewMode === 'grid' ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--bg-tertiary)]'}`}>
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button onClick={() => setViewMode('list')} className={`p-3 ${viewMode === 'list' ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--bg-tertiary)]'}`}>
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            {['All', 'Salon', 'Fitness', 'Dining', 'Events', 'Wellness', 'Sports'].map((cat) => (
              <button key={cat} className="shrink-0 rounded-full border border-[var(--border)] px-4 py-1.5 text-sm font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors whitespace-nowrap">
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-[var(--text-muted)]">{mockServices.length} services found</p>
          <button className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
            Sort by: <span className="font-medium">Relevance</span> <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
          {mockServices.map((service, i) => (
            <motion.div key={service.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link href={`/service/${service.id}`} className={`block rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] overflow-hidden card-hover ${viewMode === 'list' ? 'flex' : ''}`}>
                <div className={`relative ${viewMode === 'list' ? 'w-48 shrink-0' : ''}`}>
                  <img src={service.image} alt={service.name} className={`w-full object-cover ${viewMode === 'list' ? 'h-full' : 'h-48'}`} />
                  <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm">
                    {service.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-base line-clamp-1">{service.name}</h3>
                  <p className="text-sm text-[var(--text-muted)] mt-0.5 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {service.merchant} · {service.city}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold">{service.rating}</span>
                      <span className="text-xs text-[var(--text-muted)]">({service.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                      <Clock className="h-3.5 w-3.5" /> {service.duration}min
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-bold text-[var(--primary)]">₹{service.price}</span>
                    <span className="rounded-lg bg-[var(--primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--primary)]">Book Now</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
