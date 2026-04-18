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

export interface MovieDetailsDTO extends MovieDTO {
  runtime: number | null;
  genres: { id: number; name: string }[];
  status: string;
  original_language: string;
  tagline: string | null;
  release_dates?: {
    results: {
      iso_3166_1: string;
      release_dates: {
        certification: string;
      }[];
    }[];
  };
  credits?: CreditsDTO;
}

export interface CastDTO {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface CrewDTO {
  id: number;
  name: string;
  job: string;
  department: string;
}

export interface CreditsDTO {
  cast: CastDTO[];
  crew: CrewDTO[];
}
