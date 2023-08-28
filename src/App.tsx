import { useEffect, useState } from 'react';

import { getImagesPaginated } from './api/images';

const App = () => {
  const [images, setImages] = useState([]);

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
        <ul>
          {images.map((item) => (
            <li key={item.id}>{item.photographer}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;

