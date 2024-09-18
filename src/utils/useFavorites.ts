import { useEffect, useRef, useState } from 'react';

import { BASE_URL } from '../api/baseApi';
import httpClient from '../api/httpClient';
import { useAuthContext } from '../hooks/useAuthContext';

const useFavorites = (storageKey: string) => {
  const [likedPhotos, setLikedPhotos] = useState<number[]>([]);
  const initialized = useRef(false);
  const { user, isAuthenticated } = useAuthContext();

  const handleFavorites = async (itemId: number, imageUrl: string) => {
    if (isAuthenticated && user) {
      try {
        if (likedPhotos.includes(itemId)) {
          setLikedPhotos(likedPhotos.filter((id) => id !== itemId));
          return;
        } else {
          setLikedPhotos((prevLikedPhotos) => [...prevLikedPhotos, itemId]);

          await httpClient.post(`${BASE_URL}users/favorites`, { id: itemId, url: imageUrl }, { withCredentials: true });
        }
      } catch (error) {
        console.error('Error adding favorite', error);
      }
    } else {
      if (likedPhotos.includes(itemId)) {
        setLikedPhotos(likedPhotos.filter((id) => id !== itemId));
      } else {
        setLikedPhotos((prevLikedPhotos) => [...prevLikedPhotos, itemId]);
      }
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

  return { handleFavorites, likedPhotos, setLikedPhotos };
};

export default useFavorites;
