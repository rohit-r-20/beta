'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, CreditCard, Clock, MapPin, ArrowLeft, ChevronRight } from 'lucide-react';
import { ThemeToggle } from '../../../components/ThemeToggle';

export default function CheckoutPage() {
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
              <span className="text-[var(--text-primary)]">Checkout</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <div className="pt-16">
        <div className="container-main py-8">
          <h1 className="text-2xl font-bold mb-6">Booking Checkout</h1>
          <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-4">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-6">
              <h2 className="font-semibold text-lg mb-4">Booking Details</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Service</span><span className="font-medium">Premium Haircut</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Date</span><span className="font-medium">May 20, 2026</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Time</span><span className="font-medium">10:00 AM</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Duration</span><span className="font-medium">45 minutes</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Venue</span><span className="font-medium">Style Studio, Chennai</span></div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-6">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2"><CreditCard className="h-5 w-5" /> Payment</h2>
              <div className="rounded-xl border border-[var(--primary)] bg-[var(--primary)]/5 p-4 flex items-center gap-3">
                <div className="h-10 w-14 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold">Razorpay</div>
                <div><div className="font-medium text-sm">Pay via Razorpay</div><div className="text-xs text-[var(--text-muted)]">UPI, Cards, Net Banking, Wallets</div></div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-[var(--text-muted)]"><Shield className="h-4 w-4 text-green-500" /> 256-bit SSL encrypted payment</div>
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="sticky top-20 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-6">
              <h2 className="font-semibold text-lg mb-4">Price Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Service fee</span><span>₹599</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Platform fee</span><span>₹29</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">GST (18%)</span><span>₹113</span></div>
                <hr className="border-[var(--border)]" />
                <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-[var(--primary)]">₹741</span></div>
              </div>
              <Link href="/booking/success" className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3.5 font-semibold text-white hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25">
                Pay ₹741
              </Link>
              <div className="mt-3 flex items-center justify-center gap-1 text-xs text-[var(--text-muted)]"><Clock className="h-3.5 w-3.5" /> Hold expires in 9:45</div>
            </motion.div>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
}
