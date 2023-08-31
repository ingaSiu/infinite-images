import { useEffect, useRef, useState } from 'react';

import Card from '../components/card/Card';
import { PexelsImage } from '../types/images';
import { getImagesPaginated } from '../api/images';
import styles from './Home.module.scss';

const Home = () => {
  const [images, setImages] = useState<PexelsImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [liked, setLiked] = useState<number[]>([]);

  const bottom = useRef<HTMLDivElement | null>(null);

  //workaround for strict mode for useffect firing twice
  const initialized = useRef(false);

  const handleFavourites = (itemId: number) => {
    if (liked.includes(itemId)) {
      setLiked(liked.filter((id) => id !== itemId));

      return;
    }
    setLiked((prevLiked) => [...prevLiked, itemId]);

    console.log('Adding item to liked array:', liked);
  };

  const getImages = () => {
    setIsLoading(true);
    return getImagesPaginated(page).then((photos) => {
      console.log(photos);

      //setImages((prevItems) => [...new Set([...prevItems, ...photos])]);
      setImages((prevItems) => [...prevItems, ...photos]);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    //will trigger only on 1st useeffect - page load
    if (!initialized.current) {
      const data = window.localStorage.getItem('favouriteImages');
      if (data !== null) setLiked(JSON.parse(data));
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
    window.localStorage.setItem('favouriteImages', JSON.stringify(liked));
  }, [liked]);

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
              isClicked={liked.includes(item.id)}
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
