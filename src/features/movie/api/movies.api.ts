import { apiClient } from '@/services/apiClient';
import { Category, MovieListResponse, MovieDetailsDTO, CreditsDTO } from '@/shared/types/api';

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
  getDetails: (id: number) => {
    return apiClient.get<MovieDetailsDTO>(`/movie/${id}`, {
      append_to_response: 'release_dates',
    });
  },
  getCredits: (id: number) => {
    return apiClient.get<CreditsDTO>(`/movie/${id}/credits`);
  },
};
