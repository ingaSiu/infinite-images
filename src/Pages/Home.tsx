/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef, useState } from 'react';

import Card from '../components/card/Card';
import Loader from '../components/loader/Loader';
import { PexelsImage } from '../types/images';
import { getImagesPaginated } from '../api/images';
import styles from './Home.module.scss';

const Home = () => {
  const FAVOURITES_KEY = import.meta.env.VITE_FAVOURITES_KEY;
  const [images, setImages] = useState<PexelsImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [likedPhotos, setLikedPhotos] = useState<number[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const prevPage = useRef(0);
  const bottom = useRef<HTMLDivElement | null>(null);
  const initialized = useRef(false);

  const handleFavourites = (itemId: number) => {
    if (likedPhotos.includes(itemId)) {
      setLikedPhotos(likedPhotos.filter((id) => id !== itemId));
      return;
    }
    setLikedPhotos((prevLikedPhotos) => [...prevLikedPhotos, itemId]);
  };

  const getImages = async () => {
    try {
      setIsLoading(true);
      const photos = await getImagesPaginated(page);
      const filteredPhotos = photos.filter((photo) => !images.some((image) => image.id === photo.id));
      setImages((currentItems) => [...currentItems, ...filteredPhotos]);
    } catch (err) {
      if (page > 1) {
        setPage((currentPage) => currentPage - 1);
      }
      setErrorMsg('Could not load images');
      setTimeout(() => {
        setErrorMsg(null);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('initial effect');
    if (!initialized.current) {
      console.log('initial page load');
      const getImagesAndObserve = async () => {
        await getImages();
        const observer = new IntersectionObserver((entries) => {
          console.log('creating intersect observer');
          if (entries[0].isIntersecting) {
            console.log('intersecting');
            setPage((currentPage) => currentPage + 1);
          }
        });
        if (bottom.current) {
          observer.observe(bottom.current);
        }
      };

      const data = window.localStorage.getItem(FAVOURITES_KEY);
      if (data !== null) setLikedPhotos(JSON.parse(data));
      getImagesAndObserve();
      initialized.current = true;
    }
  }, []);

  useEffect(() => {
    if (page > 1 && prevPage.current < page) {
      getImages();
    }
    prevPage.current = page;
  }, [page]);

  useEffect(() => {
    window.localStorage.setItem(FAVOURITES_KEY, JSON.stringify(likedPhotos));
  }, [likedPhotos]);

  return (
    <>
      <div className={styles.pageWrapper}>
        {images.length > 0 && (
          <div className={styles.imagesContainer}>
            {images.map((item, index) => (
              <Card
                key={item.id}
                src={item.src.large}
                alt={item.alt}
                photographer={item.photographer}
                onClick={() => handleFavourites(item.id)}
                isClicked={likedPhotos.includes(item.id)}
                tabIndex={index}
              />
            ))}
          </div>
        )}
        {isLoading && <Loader />}
        {errorMsg && <div className={styles.toast}>{errorMsg}</div>}
      </div>
      <div ref={bottom}></div>
      <div className={styles.intersectBox}>&nbsp;</div>
    </>
  );
};

export default Home;
