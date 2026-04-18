export const movieKeys = {
  all: ['movies'] as const,
  lists: () => [...movieKeys.all, 'list'] as const,
  list: (category: string, query?: string) =>
    [...movieKeys.lists(), { category, query }] as const,
  details: (id: number) => [...movieKeys.all, 'detail', id] as const,
  credits: (id: number) => [...movieKeys.all, 'credits', id] as const,
  recommendations: (id: number) =>
    [...movieKeys.all, 'recommendations', id] as const,
};
