import { useEffect, useRef, useState } from 'react';

const useFavorites = (storageKey: string) => {
  const [likedPhotos, setLikedPhotos] = useState<number[]>([]);
  const initialized = useRef(false);

  const handleFavorites = (itemId: number) => {
    console.log('handle favourites');
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
        console.log('get');
        console.log(JSON.parse(storedData));
        setLikedPhotos(JSON.parse(storedData));
      }
    }
    initialized.current = true;
  }, [storageKey]);

  useEffect(() => {
    console.log('set');
    console.log(likedPhotos);
    window.localStorage.setItem(storageKey, JSON.stringify(likedPhotos));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likedPhotos, storageKey]);

  return { handleFavorites, likedPhotos, setLikedPhotos };
};

export default useFavorites;
