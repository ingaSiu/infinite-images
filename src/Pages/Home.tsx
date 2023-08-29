import { useEffect, useState } from 'react';

import Card from '../components/card/Card';
import { PexelsImage } from '../types/images';
import { getImagesPaginated } from '../api/images';
import styles from './Home.module.scss';

const Home = () => {
  const [images, setImages] = useState<PexelsImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const getImages = () => {
    setIsLoading(true);

    getImagesPaginated(page).then((photos) => {
      console.log(photos);

      setImages((prevItems) => [...prevItems, ...photos]);

      setIsLoading(false);
    });
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    getImages();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]);

  return (
    <div>
      {images.length > 0 && (
        <div className={styles.imgWrapper}>
          {images.map((item) => (
            <Card key={item.id} src={item.src.medium} alt={item.alt} />
          ))}
        </div>
      )}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default Home;
