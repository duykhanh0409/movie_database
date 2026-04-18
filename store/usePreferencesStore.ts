import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '@/services/storage/mmkv';
import { Category, SortOption, SortOrder } from '@/types/api';

interface PreferencesState {
  category: Category;
  sortBy: SortOption;
  sortOrder: SortOrder;
  setCategory: (c: Category) => void;
  setSortBy: (s: SortOption) => void;
  toggleSortOrder: () => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      category: 'now_playing',
      sortBy: 'rating',
      sortOrder: 'desc',
      setCategory: (category) => set({ category }),
      setSortBy: (sortBy) => set({ sortBy }),
      toggleSortOrder: () =>
        set((state) => ({
          sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc',
        })),
    }),
    {
      name: 'preferences-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
