import { MovieDTO } from '@/types/api';
import { Movie } from '@/types/movie';

export function buildImageUrl(path: string | null, size: string = 'w500'): string | null {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function mapMovieDTO(dto: MovieDTO): Movie {
  return {
    id: dto.id,
    title: dto.title,
    posterUrl: buildImageUrl(dto.poster_path, 'w500'),
    backdropUrl: buildImageUrl(dto.backdrop_path, 'w780'),
    releaseDate: dto.release_date || '',
    overview: dto.overview || '',
    voteAverage: dto.vote_average || 0,
  };
}
