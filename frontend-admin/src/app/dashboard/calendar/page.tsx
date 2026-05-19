'use client';

import { Fragment } from 'react';

export default function CalendarPage() {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const hours = Array.from({ length: 12 }, (_, i) => `${i + 8}:00`);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Calendar & Slots</h1>
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-6 overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="grid grid-cols-8 gap-px bg-[var(--border)]">
            <div className="bg-[var(--bg-primary)] p-2" />
            {days.map(d => <div key={d} className="bg-[var(--bg-primary)] p-2 text-center text-sm font-semibold">{d}</div>)}
            {hours.map(h => (
              <Fragment key={h}>
              <div className="bg-[var(--bg-primary)] p-2 text-xs text-[var(--text-muted)] text-right pr-3">{h}</div>
              {days.map(d => {
                const hasBooking = Math.random() > 0.7;
                const blocked = Math.random() > 0.9;
                return <div key={`${h}-${d}`} className={`bg-[var(--bg-primary)] p-1 min-h-[40px] ${blocked ? 'bg-red-50' : ''}`}>
                  {hasBooking && <div className="rounded-md bg-indigo-100 text-indigo-700 px-1.5 py-0.5 text-[10px] font-medium">Booked</div>}
                  {blocked && <div className="rounded-md bg-red-100 text-red-700 px-1.5 py-0.5 text-[10px] font-medium">Blocked</div>}
                </div>;
              })}
            </Fragment>))}
          </div>
        </div>
      </div>
    </div>
  );
}
