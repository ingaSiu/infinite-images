/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef } from 'react';

import Card from '../components/card/Card';
import { FAVORITES_KEY } from '../consts/favoritesKey';
import Loader from '../components/loader/Loader';
import Nav from '../components/nav/Nav';
import styles from './Home.module.scss';
import useFavorites from '../utils/useFavorites';
import useFetch from '../utils/useFetch';

const Home = () => {
  const { errorMsg, isLoading, images, page, getImages, setPage } = useFetch();

  const { handleFavorites, likedPhotos } = useFavorites(FAVORITES_KEY);

  const prevPage = useRef(0);
  const bottom = useRef<HTMLDivElement | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      const getImagesAndObserve = async () => {
        await getImages();
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            setPage((currentPage) => currentPage + 1);
          }
        });
        if (bottom.current) {
          observer.observe(bottom.current);
        }
      };
      console.log('initial useffect');
      getImagesAndObserve();
      initialized.current = true;
    }
  }, []);

  useEffect(() => {
    if (page > 1 && prevPage.current < page) {
      console.log('useeffect for pages');
      getImages();
    }
    prevPage.current = page;
  }, [page]);

  const onSearch = (query: string) => {
    console.log('onsearch in home called');
    console.log(query);
    getImages(query);
  };

  return (
    <>
      <Nav onSearch={onSearch} />
      <div className={styles.pageWrapper}>
        {images.length > 0 && (
          <div className={styles.imagesContainer}>
            {images.map((item, index) => (
              <Card
                key={item.id}
                src={item.src.large}
                alt={item.alt}
                photographer={item.photographer}
                onClick={() => handleFavorites(item.id)}
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
