import { getImagesPaginated, searchImagesPaginated } from '../api/images';

import { PexelsImage } from '../types/images';
import { useState } from 'react';

const useFetch = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<PexelsImage[]>([]);
  const [page, setPage] = useState(1);

  const getImages = async (query: string | null = null) => {
    try {
      setIsLoading(true);
      if (query === null) {
        const photos = await getImagesPaginated(page);
        const filteredPhotos = photos.filter((photo) => !images.some((image) => image.id === photo.id));
        setImages((currentItems) => [...currentItems, ...filteredPhotos]);
      } else {
        const photos = await searchImagesPaginated(query, page);
        const filteredPhotos = photos.filter((photo) => !images.some((image) => image.id === photo.id));
        setImages(filteredPhotos);
        //TODO: solve search pagination bug
      }
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

  return { errorMsg, isLoading, images, page, getImages, setPage };
};

export default useFetch;
