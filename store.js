import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      user: {},
      token: null,
      setUserRole: (role) => set((state) => ({ ...state, role })),
      setToken: (token) => set((state) => ({ ...state, token })),
    }),
    {
      name: 'authStore',
    }
  )
);
