// ============================================================
// Zustand Stores — Global state management
// ============================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: any | null;
  token: string | null;
  setUser: (user: any) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => {
        if (typeof window !== 'undefined') localStorage.setItem('auth_token', token);
        set({ token });
      },
      logout: () => {
        if (typeof window !== 'undefined') localStorage.removeItem('auth_token');
        set({ user: null, token: null });
      },
    }),
    { name: 'user-storage' },
  ),
);

interface BookingFlowState {
  selectedService: any | null;
  selectedSlot: any | null;
  attendeeCount: number;
  notes: string;
  bookingResult: any | null;
  setSelectedService: (service: any) => void;
  setSelectedSlot: (slot: any) => void;
  setAttendeeCount: (count: number) => void;
  setNotes: (notes: string) => void;
  setBookingResult: (result: any) => void;
  resetFlow: () => void;
}

export const useBookingFlowStore = create<BookingFlowState>((set) => ({
  selectedService: null,
  selectedSlot: null,
  attendeeCount: 1,
  notes: '',
  bookingResult: null,
  setSelectedService: (service) => set({ selectedService: service }),
  setSelectedSlot: (slot) => set({ selectedSlot: slot }),
  setAttendeeCount: (count) => set({ attendeeCount: count }),
  setNotes: (notes) => set({ notes }),
  setBookingResult: (result) => set({ bookingResult: result }),
  resetFlow: () => set({
    selectedService: null,
    selectedSlot: null,
    attendeeCount: 1,
    notes: '',
    bookingResult: null,
  }),
}));

interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light',
      sidebarOpen: false,
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    { name: 'ui-storage' },
  ),
);
