export type Category = 'now_playing' | 'upcoming' | 'popular';
export type SortOption = 'alphabetical' | 'rating' | 'release_date';
export type SortOrder = 'asc' | 'desc';

export interface MovieDTO {
  id: number;
  title: string;
  original_title?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  overview: string;
  vote_average: number;
  popularity?: number;
  genre_ids?: number[];
}

export interface MovieListResponse {
  page: number;
  results: MovieDTO[];
  total_pages: number;
  total_results: number;
}
