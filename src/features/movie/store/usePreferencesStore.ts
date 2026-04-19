import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '@/services/storage';
import { Category, SortOption } from '@/shared/types/api';

interface PreferencesState {
  category: Category;
  sortBy: SortOption | '';
  setCategory: (c: Category) => void;
  setSortBy: (s: SortOption | '') => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      category: 'now_playing',
      sortBy: '',
      setCategory: (category) => set({ category }),
      setSortBy: (sortBy) => set({ sortBy }),
    }),
    {
      name: 'preferences-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
