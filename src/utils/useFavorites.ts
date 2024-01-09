import { useEffect, useState } from 'react';

const useFavorites = (storageKey: string) => {
  const [likedPhotos, setLikedPhotos] = useState<number[]>([]);

  const handleFavorites = (itemId: number) => {
    if (likedPhotos.includes(itemId)) {
      setLikedPhotos(likedPhotos.filter((id) => id !== itemId));
      return;
    }
    setLikedPhotos((prevLikedPhotos) => [...prevLikedPhotos, itemId]);
  };

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(likedPhotos));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likedPhotos]);

  return { handleFavorites, likedPhotos, setLikedPhotos };
};

export default useFavorites;
