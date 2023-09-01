import { useEffect, useRef, useState } from 'react';

import Card from '../components/card/Card';
import { PexelsImage } from '../types/images';
import { getImagesPaginated } from '../api/images';
import styles from './Home.module.scss';

const Home = () => {
  const [images, setImages] = useState<PexelsImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [likedPhotos, setLikedPhotos] = useState<number[]>([]);

  const bottom = useRef<HTMLDivElement | null>(null);

  //workaround for strict mode for useffect firing twice
  const initialized = useRef(false);

  const handleFavourites = (itemId: number) => {
    if (likedPhotos.includes(itemId)) {
      setLikedPhotos(likedPhotos.filter((id) => id !== itemId));

      return;
    }
    setLikedPhotos((prevLikedPhotos) => [...prevLikedPhotos, itemId]);

    console.log('Adding item to liked array:', likedPhotos);
  };

  const getImages = async () => {
    setIsLoading(true);
    const photos = await getImagesPaginated(page);
    console.log(photos);
    //setImages((prevItems) => [...new Set([...prevItems, ...photos])]);
    setImages((prevItems) => [...prevItems, ...photos]);
    setIsLoading(false);
  };

  useEffect(() => {
    //will trigger only on 1st useeffect - page load
    if (!initialized.current) {
      const data = window.localStorage.getItem('favouriteImages');
      if (data !== null) setLikedPhotos(JSON.parse(data));
      console.log('initial load effect logic');
      initialized.current = true;
      getImages().then(() => {
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            console.log('is intersecting. increasing page');
            setPage((prevPage) => prevPage + 1);
          }
        });
        if (bottom.current) {
          observer.observe(bottom.current);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (page > 1) {
      console.log('page change effect logic');
      getImages();
    }
  }, [page]);

  useEffect(() => {
    window.localStorage.setItem('favouriteImages', JSON.stringify(likedPhotos));
  }, [likedPhotos]);

  return (
    <div>
      {images.length > 0 && (
        <div className={styles.imgWrapper}>
          {images.map((item) => (
            <Card
              key={item.id}
              src={item.src.medium}
              alt={item.alt}
              photographer={item.photographer}
              onClick={() => handleFavourites(item.id)}
              isClicked={likedPhotos.includes(item.id)}
            />
          ))}
        </div>
      )}
      {isLoading && <p>Loading...</p>}
      <div ref={bottom}></div>
    </div>
  );
};

export default Home;
