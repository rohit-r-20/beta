'use client';

import { Plus, Search, MoreVertical, Star, Edit, Trash2, Eye } from 'lucide-react';

const services = [
  { id: 1, name: 'Premium Haircut', category: 'Salon', price: 599, duration: 45, bookings: 234, rating: 4.8, active: true },
  { id: 2, name: 'Full Body Massage', category: 'Spa', price: 1800, duration: 90, bookings: 156, rating: 4.9, active: true },
  { id: 3, name: 'Yoga Session', category: 'Fitness', price: 499, duration: 60, bookings: 312, rating: 4.7, active: true },
  { id: 4, name: 'Photography Session', category: 'Photography', price: 3500, duration: 120, bookings: 89, rating: 4.6, active: false },
];

export default function ServicesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold">Services</h1><p className="text-sm text-[var(--text-muted)]">Manage your service offerings</p></div>
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:from-indigo-600 hover:to-purple-700 transition-all">
          <Plus className="h-4 w-4" /> Add Service
        </button>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] overflow-hidden">
        <div className="p-4 border-b border-[var(--border)]">
          <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" /><input type="text" placeholder="Search services..." className="w-full sm:max-w-sm rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] py-2 pl-10 pr-4 text-sm outline-none" /></div>
        </div>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
            <th className="px-4 py-3 text-left font-medium text-[var(--text-muted)]">Service</th>
            <th className="px-4 py-3 text-left font-medium text-[var(--text-muted)]">Category</th>
            <th className="px-4 py-3 text-left font-medium text-[var(--text-muted)]">Price</th>
            <th className="px-4 py-3 text-left font-medium text-[var(--text-muted)]">Duration</th>
            <th className="px-4 py-3 text-left font-medium text-[var(--text-muted)]">Bookings</th>
            <th className="px-4 py-3 text-left font-medium text-[var(--text-muted)]">Rating</th>
            <th className="px-4 py-3 text-left font-medium text-[var(--text-muted)]">Status</th>
            <th className="px-4 py-3 text-right font-medium text-[var(--text-muted)]">Actions</th>
          </tr></thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-secondary)] transition-colors">
                <td className="px-4 py-3 font-medium">{s.name}</td>
                <td className="px-4 py-3"><span className="rounded-full bg-[var(--bg-tertiary)] px-2.5 py-0.5 text-xs">{s.category}</span></td>
                <td className="px-4 py-3 font-semibold">₹{s.price}</td>
                <td className="px-4 py-3 text-[var(--text-muted)]">{s.duration} min</td>
                <td className="px-4 py-3">{s.bookings}</td>
                <td className="px-4 py-3"><span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />{s.rating}</span></td>
                <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${s.active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{s.active ? 'Active' : 'Inactive'}</span></td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="rounded-lg p-1.5 hover:bg-[var(--bg-tertiary)]"><Eye className="h-4 w-4 text-[var(--text-muted)]" /></button>
                    <button className="rounded-lg p-1.5 hover:bg-[var(--bg-tertiary)]"><Edit className="h-4 w-4 text-[var(--text-muted)]" /></button>
                    <button className="rounded-lg p-1.5 hover:bg-red-50"><Trash2 className="h-4 w-4 text-red-400" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
