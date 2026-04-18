import { useQuery } from '@tanstack/react-query';
import { moviesApi } from '@/features/movie/api/movies.api';
import { mapCreditsDTO } from '@/features/movie/model/credits.mapper';
import { movieKeys } from '@/shared/constants/queryKeys';

export function useMovieCredits(id: number) {
  return useQuery({
    queryKey: movieKeys.credits(id),
    queryFn: async () => {
      const data = await moviesApi.getCredits(id);
      return mapCreditsDTO(data);
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    enabled: !!id,
  });
}
