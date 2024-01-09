import { useEffect, useState } from 'react';

import { FAVORITES_KEY } from '../const/favoritesKey';

const useFavorites = () => {
  const [likedPhotos, setLikedPhotos] = useState<number[]>([]);

  const handleFavorites = (itemId: number) => {
    if (likedPhotos.includes(itemId)) {
      setLikedPhotos(likedPhotos.filter((id) => id !== itemId));
      return;
    }
    setLikedPhotos((prevLikedPhotos) => [...prevLikedPhotos, itemId]);
  };

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(likedPhotos));
  }, [likedPhotos]);

  return { handleFavorites, likedPhotos, setLikedPhotos };
};

export default useFavorites;
