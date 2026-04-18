export interface Movie {
  id: number;
  title: string;
  posterUrl: string | null;
  backdropUrl: string | null;
  releaseDate: string;
  overview: string;
  voteAverage: number;
}
