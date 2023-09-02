/* eslint-disable react-hooks/exhaustive-deps */

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
    try {
      setIsLoading(true);
      const photos = await getImagesPaginated(page);
      console.log(photos);
      //check if api returned duplicates and remove if any
      const filteredPhotos = photos.filter((photo) => !images.some((image) => image.id === photo.id));
      setImages((prevItems) => [...prevItems, ...filteredPhotos]);
      setIsLoading(false);
    } catch (err) {
      if (page > 1) {
        setPage((prevItem) => prevItem - 1);
      }
      //TODO add some UI error
      console.error('An error occurred while fetching images:', err);
      // setErrorState(err.message); can make err msg
    }
  };

  useEffect(() => {
    //will trigger only on 1st useeffect - page load
    if (!initialized.current) {
      console.log('initial load effect logic');
      const getImagesAndObserve = async () => {
        await getImages();
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            console.log('is intersecting. increasing page');
            setPage((prevPage) => prevPage + 1);
          }
        });
        if (bottom.current) {
          observer.observe(bottom.current);
        }
      };

      const data = window.localStorage.getItem('favouriteImages');
      if (data !== null) setLikedPhotos(JSON.parse(data));
      getImagesAndObserve();
      initialized.current = true;
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
        <div className={styles.imagesContainer}>
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
      {/*TODO create nice loader*/}
      {isLoading && <p className={styles.loader}>Loading...</p>}
      <div ref={bottom}></div>
      {/*TODO add Load more button as a backup*/}
    </div>
  );
};

export default Home;
