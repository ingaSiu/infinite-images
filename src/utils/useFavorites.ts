import { useEffect, useRef, useState } from 'react';

const useFavorites = (storageKey: string) => {
  const [likedPhotos, setLikedPhotos] = useState<number[]>([]);
  const initialized = useRef(false);

  const handleFavorites = (itemId: number) => {
    if (likedPhotos.includes(itemId)) {
      setLikedPhotos(likedPhotos.filter((id) => id !== itemId));
      return;
    }
    setLikedPhotos((prevLikedPhotos) => [...prevLikedPhotos, itemId]);
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
