import { useEffect, useRef, useState } from 'react';

import { BASE_URL } from '../api/baseApi';
import httpClient from '../api/httpClient';
import { useAuthContext } from '../hooks/useAuthContext';

const useFavorites = (storageKey: string) => {
  const [likedPhotos, setLikedPhotos] = useState<number[]>([]);
  const initialized = useRef(false);
  const { user, isAuthenticated } = useAuthContext();

  const addFavorite = async (itemId: number, alt: string, photographer: string, src: object) => {
    if (isAuthenticated && user) {
      try {
        setLikedPhotos((prevLikedPhotos) => [...prevLikedPhotos, itemId]);

        await httpClient.post(
          `${BASE_URL}users/favorites`,
          { id: itemId, alt, photographer, src: JSON.stringify(src) },
          { withCredentials: true },
        );
        //TODO add detch favourites. it will get new favourites, refresh local storage and state
      } catch (error) {
        console.error('Error adding favorite', error);
      }
    } else {
      setLikedPhotos((prevLikedPhotos) => [...prevLikedPhotos, itemId]);
    }
  };

  const deleteFavorite = async (itemId: number) => {
    if (isAuthenticated && user) {
      try {
        await httpClient.delete(`${BASE_URL}users/favorites/${itemId}`, { withCredentials: true });
        setLikedPhotos((prevLikedPhotos) => prevLikedPhotos.filter((id) => id !== itemId));
      } catch (error) {
        console.error('Error deleting favorite', error);
      }
    } else {
      setLikedPhotos((prevLikedPhotos) => prevLikedPhotos.filter((id) => id !== itemId));
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      const storedData = window.localStorage.getItem(storageKey);
      if (storedData !== null) {
        setLikedPhotos(JSON.parse(storedData));
      }
    }
    initialized.current = true;
  }, [storageKey]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(likedPhotos));
  }, [likedPhotos, storageKey]);

  return { addFavorite, likedPhotos, setLikedPhotos, deleteFavorite };
};

export default useFavorites;
