'use client';
import { Search, Filter } from 'lucide-react';
const bookings = [
  { ref: 'BK-A1B2', user: 'Rahul M.', service: 'Haircut', date: 'May 20', time: '10:00 AM', status: 'CONFIRMED', amount: '₹599' },
  { ref: 'BK-C3D4', user: 'Priya S.', service: 'Yoga', date: 'May 20', time: '7:00 AM', status: 'CHECKED_IN', amount: '₹499' },
  { ref: 'BK-E5F6', user: 'Arjun K.', service: 'Massage', date: 'May 21', time: '2:00 PM', status: 'PENDING', amount: '₹1,800' },
  { ref: 'BK-G7H8', user: 'Meera L.', service: 'Dance', date: 'May 22', time: '5:00 PM', status: 'CANCELLED', amount: '₹699' },
];
const colors: Record<string,string> = { CONFIRMED: 'bg-green-50 text-green-700', CHECKED_IN: 'bg-purple-50 text-purple-700', PENDING: 'bg-yellow-50 text-yellow-700', CANCELLED: 'bg-red-50 text-red-700' };
export default function BookingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Bookings</h1>
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] overflow-hidden">
        <div className="p-4 border-b border-[var(--border)] flex gap-2">
          <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" /><input placeholder="Search bookings..." className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] py-2 pl-10 pr-4 text-sm outline-none" /></div>
          <button className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-sm"><Filter className="h-4 w-4" /> Filter</button>
        </div>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
            {['Reference','Customer','Service','Date','Time','Status','Amount'].map(h => <th key={h} className="px-4 py-3 text-left font-medium text-[var(--text-muted)]">{h}</th>)}
          </tr></thead>
          <tbody>{bookings.map(b => (
            <tr key={b.ref} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-secondary)]">
              <td className="px-4 py-3 font-mono text-xs">{b.ref}</td>
              <td className="px-4 py-3 font-medium">{b.user}</td>
              <td className="px-4 py-3">{b.service}</td>
              <td className="px-4 py-3 text-[var(--text-muted)]">{b.date}</td>
              <td className="px-4 py-3 text-[var(--text-muted)]">{b.time}</td>
              <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors[b.status]}`}>{b.status}</span></td>
              <td className="px-4 py-3 font-semibold">{b.amount}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
