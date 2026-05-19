'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle2, QrCode, Calendar, Clock, MapPin, Download, Share2, ArrowLeft, ChevronRight } from 'lucide-react';
import { ThemeToggle } from '../../../components/ThemeToggle';

export default function BookingSuccessPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Sticky header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--border-subtle)]">
        <div className="container-main flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="btn-ghost p-2">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-[var(--text-primary)]">Booking Confirmed</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <div className="pt-16 flex items-center justify-center py-12">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto max-w-md w-full px-4">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-primary)] p-8 text-center shadow-xl">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </motion.div>

          <h1 className="text-2xl font-bold">Booking Confirmed!</h1>
          <p className="mt-2 text-[var(--text-muted)]">Your booking has been successfully confirmed</p>

          <div className="mt-6 rounded-2xl bg-[var(--bg-secondary)] p-4 text-left space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-[var(--text-muted)]">Reference</span><span className="font-mono font-semibold">BK-A1B2C3</span></div>
            <div className="flex justify-between"><span className="text-[var(--text-muted)]">Service</span><span className="font-medium">Premium Haircut</span></div>
            <div className="flex justify-between"><span className="text-[var(--text-muted)]">Date & Time</span><span className="font-medium">May 20 · 10:00 AM</span></div>
            <div className="flex justify-between"><span className="text-[var(--text-muted)]">Amount Paid</span><span className="font-bold text-green-600">₹741</span></div>
          </div>

          {/* QR Code */}
          <div className="mt-6 rounded-2xl border-2 border-dashed border-[var(--border)] p-6">
            <QrCode className="mx-auto h-32 w-32 text-[var(--text-primary)]" />
            <p className="mt-3 text-xs text-[var(--text-muted)]">Show this QR at the venue for check-in</p>
          </div>

          <div className="mt-6 flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] py-3 text-sm font-medium hover:bg-[var(--bg-tertiary)] transition-colors">
              <Download className="h-4 w-4" /> Save
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] py-3 text-sm font-medium hover:bg-[var(--bg-tertiary)] transition-colors">
              <Share2 className="h-4 w-4" /> Share
            </button>
          </div>

          <Link href="/user/bookings" className="mt-4 block w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 font-semibold text-white hover:from-indigo-600 hover:to-purple-700 transition-all">
            View My Bookings
          </Link>
        </div>
      </motion.div>
      </div>
    </main>
  );
}
