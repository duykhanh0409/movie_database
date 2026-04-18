import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '@/services/storage';
import { SortOption, SortOrder } from '@/shared/types/api';

interface WatchlistPreferencesState {
  sortBy: SortOption | '';
  sortOrder: SortOrder;
  setSortBy: (s: SortOption | '') => void;
  toggleSortOrder: () => void;
}

export const useWatchlistPreferencesStore = create<WatchlistPreferencesState>()(
  persist(
    (set) => ({
      sortBy: '',
      sortOrder: 'desc',
      setSortBy: (sortBy) => set({ sortBy }),
      toggleSortOrder: () =>
        set((state) => ({
          sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc',
        })),
    }),
    {
      name: 'watchlist-preferences-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
