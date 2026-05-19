'use client';

import { User, Mail, Phone, Camera, Bell, Shield, LogOut } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">U</div>
              <button className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-[var(--primary)] flex items-center justify-center text-white shadow-lg">
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-bold">User Name</h2>
              <p className="text-sm text-[var(--text-muted)]">Member since 2026</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { icon: User, label: 'Full Name', value: 'User Name' },
              { icon: Mail, label: 'Email', value: 'user@example.com' },
              { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-xs font-medium text-[var(--text-muted)] mb-1 block">{field.label}</label>
                <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3">
                  <field.icon className="h-4 w-4 text-[var(--text-muted)]" />
                  <input type="text" defaultValue={field.value} className="flex-1 bg-transparent outline-none text-sm" />
                </div>
              </div>
            ))}
            <button className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 font-semibold text-white hover:from-indigo-600 hover:to-purple-700 transition-all mt-4">
              Save Changes
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] divide-y divide-[var(--border)]">
          {[
            { icon: Bell, label: 'Notifications', desc: 'Manage notification preferences' },
            { icon: Shield, label: 'Privacy & Security', desc: 'Account security settings' },
            { icon: LogOut, label: 'Log Out', desc: 'Sign out of your account', danger: true },
          ].map((item) => (
            <button key={item.label} className="flex w-full items-center gap-4 px-6 py-4 hover:bg-[var(--bg-tertiary)] transition-colors text-left">
              <item.icon className={`h-5 w-5 ${item.danger ? 'text-red-500' : 'text-[var(--text-muted)]'}`} />
              <div>
                <div className={`font-medium text-sm ${item.danger ? 'text-red-500' : ''}`}>{item.label}</div>
                <div className="text-xs text-[var(--text-muted)]">{item.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
