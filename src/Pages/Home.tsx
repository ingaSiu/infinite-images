import { useEffect, useRef, useState } from 'react';

import Card from '../components/card/Card';
import { PexelsImage } from '../types/images';
import { getImagesPaginated } from '../api/images';
import styles from './Home.module.scss';

const Home = () => {
  const [images, setImages] = useState<PexelsImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);

  const bottom = useRef<HTMLDivElement | null>(null);

  //workaround for strict mode for useffect firing twice
  const initialized = useRef(false);

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

  return (
    <div>
      {images.length > 0 && (
        <div className={styles.imgWrapper}>
          {images.map((item) => (
            <Card key={item.id} src={item.src.medium} alt={item.alt} photographer={item.photographer} />
          ))}
        </div>
      )}
      {isLoading && <p>Loading...</p>}
      <div ref={bottom}></div>
    </div>
  );
};

export default Home;
