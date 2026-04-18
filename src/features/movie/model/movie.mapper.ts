import { MovieDTO, MovieDetailsDTO } from '@/shared/types/api';
import { Movie, MovieDetails } from '@/features/movie/model/movie';

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

export function mapMovieDetailsDTO(dto: MovieDetailsDTO): MovieDetails {
  let rating = null;
  if (dto.release_dates?.results) {
    const usRelease = dto.release_dates.results.find(r => r.iso_3166_1 === 'US');
    if (usRelease && usRelease.release_dates.length > 0) {
      rating = usRelease.release_dates[0].certification || null;
    }
  }

  return {
    ...mapMovieDTO(dto),
    runtime: dto.runtime,
    genres: dto.genres || [],
    status: dto.status || '',
    originalLanguage: dto.original_language || '',
    rating,
    tagline: dto.tagline || null,
  };
}
