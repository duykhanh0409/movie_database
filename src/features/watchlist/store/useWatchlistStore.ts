import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '@/services/storage';
import { Movie } from '@/features/movie/model/movie';

interface WatchlistState {
  items: Movie[];
  addMovie: (movie: Movie) => void;
  removeMovie: (id: number) => void;
  isInWatchlist: (id: number) => boolean;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addMovie: (movie) =>
        set((state) => {
          if (state.items.some((m) => m.id === movie.id)) return state;
          return { items: [...state.items, movie] };
        }),
      removeMovie: (id) =>
        set((state) => ({ items: state.items.filter((m) => m.id !== id) })),
      isInWatchlist: (id) => get().items.some((m) => m.id === id),
    }),
    {
      name: 'watchlist-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
