export interface Movie {
  id: number;
  title: string;
  posterUrl: string | null;
  backdropUrl: string | null;
  releaseDate: string;
  overview: string;
  voteAverage: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  runtime: number | null;
  genres: Genre[];
  status: string;
  originalLanguage: string;
  rating: string | null; // e.g. PG-13
  tagline: string | null;
}
