import { useEffect, useState } from 'react';

import { BASE_URL } from '../api/baseApi';
import { FavoritesProp } from '../types/favorites';
import axios from 'axios';
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
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to fetch favorites');
      } else {
        setError('An unexpected error occurred');
      }

      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return { favorites, isLoading, error, fetchFavorites };
};
