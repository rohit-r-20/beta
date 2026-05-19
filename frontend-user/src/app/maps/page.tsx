'use client';

import { MapPin, Star, Navigation } from 'lucide-react';

export default function MapsPage() {
  return (
    <div className="flex h-[calc(100vh-57px)]">
      {/* Sidebar */}
      <div className="w-full sm:w-96 overflow-y-auto border-r border-[var(--border)] bg-[var(--bg-primary)]">
        <div className="p-4 border-b border-[var(--border)]">
          <h1 className="text-lg font-bold flex items-center gap-2"><MapPin className="h-5 w-5 text-[var(--primary)]" /> Nearby Services</h1>
          <button className="mt-2 flex items-center gap-2 rounded-lg bg-[var(--primary)]/10 px-3 py-2 text-sm font-medium text-[var(--primary)] w-full justify-center hover:bg-[var(--primary)]/20 transition-colors">
            <Navigation className="h-4 w-4" /> Use My Location
          </button>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="p-4 hover:bg-[var(--bg-tertiary)] cursor-pointer transition-colors">
              <h3 className="font-semibold text-sm">{['Style Studio', 'ZenFit Yoga', 'The Grand Restaurant', 'Serenity Spa', 'FitZone Gym', 'ArtHouse Gallery', 'ChefTable Kitchen', 'SportArena'][i]}</h3>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{(i * 0.3 + 0.5).toFixed(1)} km away</p>
              <div className="flex items-center gap-1 mt-1"><Star className="h-3 w-3 text-yellow-500 fill-yellow-500" /><span className="text-xs font-medium">{(4.5 + Math.random() * 0.5).toFixed(1)}</span></div>
            </div>
          ))}
        </div>
      </div>
      {/* Map placeholder */}
      <div className="hidden sm:flex flex-1 items-center justify-center bg-[var(--bg-tertiary)]">
        <div className="text-center">
          <MapPin className="h-16 w-16 text-[var(--text-muted)] mx-auto mb-4" />
          <p className="text-[var(--text-muted)]">Map integration will render here</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">Connect Google Maps API key to enable</p>
        </div>
      </div>
    </div>
  );
}
