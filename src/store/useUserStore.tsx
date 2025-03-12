import { IUser } from "@/types/user";
import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

interface UserStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  clearUser: () => void;
  updateUser: (updates: Partial<IUser>) => void;
  isLoading: boolean;
  error: string | null;
}

// Custom sessionStorage storage for Zustand
const sessionStorageStore: PersistStorage<{ user: IUser | null }> = {
  getItem: (key) => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  },
  setItem: (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key) => {
    sessionStorage.removeItem(key);
  },
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user, isLoading: false, error: null }),

      clearUser: () => set({ user: null, isLoading: false, error: null }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: "user-storage",
      storage: sessionStorageStore,
      partialize: (state) => ({ user: state.user }),
    }
  )
);
