import { useEffect, useState } from 'react';

import { BASE_URL } from '../api/baseApi';
import { FavoritesProp } from '../types/favorites';
import httpClient from '../api/httpClient';

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

      const favoriteIds = data.map((favorite: FavoritesProp) => favorite.id);
      window.localStorage.setItem('favorites', JSON.stringify(favoriteIds));

      console.log('Favorites updated:', data);

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
