import { useEffect, useState } from 'react';

import Card from '../components/card/Card';
import { PexelsImage } from '../types/images';
import { getImagesPaginated } from '../api/images';
import styles from './Home.module.scss';

const Home = () => {
  const [images, setImages] = useState<PexelsImage[]>([]);

  const getImages = () => {
    getImagesPaginated().then((photos) => {
      console.log(photos);
      setImages(photos);
    });
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div>
      {images.length > 0 && (
        <div className={styles.imgWrapper}>
          {images.map((item) => (
            <Card key={item.id} src={item.src.medium} alt={item.alt} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
