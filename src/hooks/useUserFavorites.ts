import { useEffect, useState } from 'react';

import { BASE_URL } from '../api/baseApi';
import httpClient from '../api/httpClient';

type FavoritesProp = {
  alt: string;
  id: number;
  photographer: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
};

export const useUserFavorites = () => {
  const [favorites, setFavorites] = useState<FavoritesProp[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = async () => {
    try {
      setIsLoading(true);
      const { data } = await httpClient.get(`${BASE_URL}users/favorites`, {
        withCredentials: true,
      });
      setFavorites(data);
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to fetch favorites');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return { favorites, isLoading, error, fetchFavorites };
};
