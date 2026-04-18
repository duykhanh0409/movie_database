import { apiClient } from './client';
import { Category, MovieListResponse } from '@/types/api';

export const moviesApi = {
  getByCategory: (category: Category, page: number, query?: string) => {
    if (query) {
      return apiClient.get<MovieListResponse>('/search/movie', {
        query,
        page: String(page),
      });
    }
    return apiClient.get<MovieListResponse>(`/movie/${category}`, {
      page: String(page),
    });
  },
};
