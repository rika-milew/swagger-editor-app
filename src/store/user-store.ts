import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AppUser } from '@/types/auth.types';

export type UserStore = {
  user: AppUser | null;
  setUser: (user: AppUser | null) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user): void => set({ user }),
      clearUser: (): void => set({ user: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ id: state.user?.id }),
    },
  ),
);
