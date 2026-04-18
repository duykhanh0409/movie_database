import { TMDB_BASE_URL } from '@/shared/constants/api';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiClient {
  private baseUrl = TMDB_BASE_URL;

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    }

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new ApiError(res.status, await res.text());
    }
    return res.json();
  }
}

export const apiClient = new ApiClient();
