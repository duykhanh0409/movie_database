import { useInfiniteQuery } from '@tanstack/react-query';
import { moviesApi } from '@/services/api/movies.api';
import { movieKeys } from '@/shared/constants/queryKeys';
import { Category } from '@/types/api';

export function useMovies(category: Category, query?: string) {
  return useInfiniteQuery({
    queryKey: movieKeys.list(category, query),
    queryFn: async ({ pageParam = 1 }) => {
      return moviesApi.getByCategory(category, pageParam, query);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000,
  });
}
