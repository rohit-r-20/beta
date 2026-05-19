'use client';

import { TrendingUp, Users, Calendar, IndianRupee, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2 } from 'lucide-react';

const kpis = [
  { label: 'Total Revenue', value: '₹4,82,350', change: '+12.5%', up: true, icon: IndianRupee, color: 'from-indigo-500 to-purple-600' },
  { label: 'Total Bookings', value: '1,847', change: '+8.2%', up: true, icon: Calendar, color: 'from-cyan-500 to-blue-600' },
  { label: 'Active Users', value: '3,265', change: '+15.3%', up: true, icon: Users, color: 'from-emerald-500 to-green-600' },
  { label: 'Conversion Rate', value: '68.4%', change: '-2.1%', up: false, icon: TrendingUp, color: 'from-amber-500 to-orange-600' },
];

const recentBookings = [
  { id: 1, user: 'Rahul M.', service: 'Premium Haircut', time: '10:00 AM', status: 'CONFIRMED', amount: '₹599' },
  { id: 2, user: 'Priya S.', service: 'Yoga Class', time: '7:00 AM', status: 'CHECKED_IN', amount: '₹499' },
  { id: 3, user: 'Arjun K.', service: 'Spa Treatment', time: '2:00 PM', status: 'PENDING', amount: '₹1,800' },
  { id: 4, user: 'Meera L.', service: 'Dance Class', time: '5:00 PM', status: 'CONFIRMED', amount: '₹699' },
  { id: 5, user: 'Vikram R.', service: 'Photography', time: '11:00 AM', status: 'COMPLETED', amount: '₹3,500' },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">Welcome back! Here&apos;s your business overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-5 card-hover">
            <div className="flex items-center justify-between mb-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${kpi.color} text-white`}>
                <kpi.icon className="h-5 w-5" />
              </div>
              <span className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${kpi.up ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {kpi.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {kpi.change}
              </span>
            </div>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <div className="text-xs text-[var(--text-muted)] mt-0.5">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Revenue Chart Placeholder */}
        <div className="lg:col-span-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-6">
          <h2 className="font-semibold text-lg mb-4">Revenue Overview</h2>
          <div className="h-64 flex items-end gap-2">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-md bg-gradient-to-t from-indigo-500 to-purple-400 transition-all hover:from-indigo-600 hover:to-purple-500" style={{ height: `${h}%` }} />
                <span className="text-[10px] text-[var(--text-muted)]">{['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Stats */}
        <div className="lg:col-span-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-6">
          <h2 className="font-semibold text-lg mb-4">Today&apos;s Activity</h2>
          <div className="space-y-4">
            {[
              { label: 'Bookings Today', value: '24', icon: Calendar, color: 'text-indigo-500' },
              { label: 'Check-ins', value: '18', icon: CheckCircle2, color: 'text-green-500' },
              { label: 'Pending', value: '6', icon: Clock, color: 'text-amber-500' },
              { label: 'Revenue Today', value: '₹14,350', icon: IndianRupee, color: 'text-purple-500' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center justify-between rounded-xl bg-[var(--bg-secondary)] px-4 py-3">
                <div className="flex items-center gap-3">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <span className="text-sm text-[var(--text-secondary)]">{stat.label}</span>
                </div>
                <span className="font-bold">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-6">
        <h2 className="font-semibold text-lg mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-[var(--border)] text-[var(--text-muted)]">
              <th className="pb-3 text-left font-medium">Customer</th>
              <th className="pb-3 text-left font-medium">Service</th>
              <th className="pb-3 text-left font-medium">Time</th>
              <th className="pb-3 text-left font-medium">Status</th>
              <th className="pb-3 text-right font-medium">Amount</th>
            </tr></thead>
            <tbody>
              {recentBookings.map((b) => (
                <tr key={b.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-secondary)] transition-colors">
                  <td className="py-3 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">{b.user[0]}</div>
                    <span className="font-medium">{b.user}</span>
                  </td>
                  <td className="py-3">{b.service}</td>
                  <td className="py-3 text-[var(--text-muted)]">{b.time}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${b.status === 'CONFIRMED' ? 'bg-green-50 text-green-700' : b.status === 'CHECKED_IN' ? 'bg-purple-50 text-purple-700' : b.status === 'COMPLETED' ? 'bg-blue-50 text-blue-700' : 'bg-yellow-50 text-yellow-700'}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3 text-right font-semibold">{b.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
