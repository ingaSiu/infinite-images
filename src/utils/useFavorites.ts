import { useEffect, useState } from 'react';

import { BASE_URL } from '../api/baseApi';
import httpClient from '../api/httpClient';
import { useAuthContext } from '../hooks/useAuthContext';
import { useUserFavorites } from '../hooks/useUserFavorites';

const useFavorites = () => {
  const [likedPhotos, setLikedPhotos] = useState<number[]>([]);
  //const initialized = useRef(false);
  const { user, isAuthenticated } = useAuthContext();
  const { fetchFavorites, favorites } = useUserFavorites();

  const addFavorite = async (itemId: number, alt: string, photographer: string, src: object) => {
    if (isAuthenticated && user) {
      try {
        setLikedPhotos((prevLikedPhotos) => [...prevLikedPhotos, itemId]);

        await httpClient.post(
          `${BASE_URL}users/favorites`,
          { id: itemId, alt, photographer, src: JSON.stringify(src) },
          { withCredentials: true },
        );
        fetchFavorites();
      } catch (error) {
        console.error('Error adding favorite', error);
      }
    } else {
      console.log('User not authenticated, cannot add favorite.');
    }
  };

  const deleteFavorite = async (itemId: number, fetchFavorites: () => void) => {
    if (isAuthenticated && user) {
      try {
        await httpClient.delete(`${BASE_URL}users/favorites/${itemId}`, { withCredentials: true });
        //setLikedPhotos((prevLikedPhotos) => prevLikedPhotos.filter((id) => id !== itemId));

        console.log('Deleted favorite, calling fetchFavorites');
        fetchFavorites();
      } catch (error) {
        console.error('Error deleting favorite', error);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      const favoriteIds = favorites.map((favorite) => favorite.id);
      setLikedPhotos(favoriteIds);
    } else {
      setLikedPhotos([]);
    }
  }, [isAuthenticated, user, favorites]);

  return { addFavorite, deleteFavorite, likedPhotos };
};

export default useFavorites;
