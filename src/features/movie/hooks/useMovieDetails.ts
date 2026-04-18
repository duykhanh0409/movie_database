import { useQuery } from '@tanstack/react-query';
import { moviesApi } from '@/features/movie/api/movies.api';
import { mapMovieDetailsDTO } from '@/features/movie/model/movie.mapper';
import { movieKeys } from '@/shared/constants/queryKeys';

export function useMovieDetails(id: number) {
  return useQuery({
    queryKey: movieKeys.details(id),
    queryFn: async () => {
      const data = await moviesApi.getDetails(id);
      return mapMovieDetailsDTO(data);
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!id,
  });
}
