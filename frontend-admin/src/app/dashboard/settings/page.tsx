'use client';
import { Building2, Mail, Phone, Globe, MapPin, Camera } from 'lucide-react';
export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Merchant Settings</h1>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-6">
            <h2 className="font-semibold text-lg mb-4">Business Information</h2>
            <div className="space-y-4">
              {[
                { icon: Building2, label: 'Business Name', value: 'Style Studio' },
                { icon: Mail, label: 'Email', value: 'contact@stylestudio.com' },
                { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
                { icon: Globe, label: 'Website', value: 'www.stylestudio.com' },
                { icon: MapPin, label: 'Address', value: '42 Anna Nagar, Chennai' },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-xs font-medium text-[var(--text-muted)] mb-1 block">{f.label}</label>
                  <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2.5">
                    <f.icon className="h-4 w-4 text-[var(--text-muted)]" /><input defaultValue={f.value} className="flex-1 bg-transparent outline-none text-sm" />
                  </div>
                </div>
              ))}
              <button className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 font-semibold text-white mt-2">Save Changes</button>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-6 text-center">
            <div className="mx-auto h-24 w-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold mb-3">S</div>
            <button className="flex items-center gap-2 mx-auto rounded-xl border border-[var(--border)] px-4 py-2 text-sm"><Camera className="h-4 w-4" /> Change Logo</button>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-6">
            <h3 className="font-semibold mb-3">Business Hours</h3>
            {['Mon-Fri: 9:00 AM - 8:00 PM', 'Saturday: 10:00 AM - 6:00 PM', 'Sunday: Closed'].map(h => (
              <p key={h} className="text-sm text-[var(--text-secondary)] py-1">{h}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
