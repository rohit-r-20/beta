'use client';

import { QrCode, CheckCircle2, XCircle, Camera, Search } from 'lucide-react';
import { useState } from 'react';

export default function CheckinPage() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<'success' | 'error' | null>(null);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">QR Check-in</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Scanner */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-6">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2"><Camera className="h-5 w-5" /> Scan QR Code</h2>
          <div className="aspect-square rounded-2xl bg-[var(--bg-tertiary)] flex items-center justify-center border-2 border-dashed border-[var(--border)]">
            <div className="text-center">
              <QrCode className="h-16 w-16 text-[var(--text-muted)] mx-auto mb-3" />
              <p className="text-[var(--text-muted)] text-sm">Camera access required for scanning</p>
              <button onClick={() => setScanning(!scanning)} className="mt-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white">
                {scanning ? 'Stop Scanning' : 'Start Scanner'}
              </button>
            </div>
          </div>
          {/* Manual input */}
          <div className="mt-4">
            <label className="text-sm font-medium text-[var(--text-muted)] mb-2 block">Or enter QR code manually</label>
            <div className="flex gap-2">
              <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" /><input type="text" placeholder="Enter QR token..." className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] py-2.5 pl-10 pr-4 text-sm outline-none" /></div>
              <button className="rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white">Verify</button>
            </div>
          </div>
        </div>

        {/* Recent Check-ins */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-6">
          <h2 className="font-semibold text-lg mb-4">Recent Check-ins</h2>
          <div className="space-y-3">
            {[
              { name: 'Rahul M.', service: 'Haircut', time: '10:02 AM', success: true },
              { name: 'Priya S.', service: 'Yoga', time: '7:05 AM', success: true },
              { name: 'Unknown', service: 'Invalid QR', time: '6:55 AM', success: false },
              { name: 'Arjun K.', service: 'Spa', time: '2:01 PM', success: true },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-[var(--bg-secondary)] px-4 py-3">
                {c.success ? <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" /> : <XCircle className="h-5 w-5 text-red-500 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{c.name}</div>
                  <div className="text-xs text-[var(--text-muted)]">{c.service}</div>
                </div>
                <span className="text-xs text-[var(--text-muted)]">{c.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
