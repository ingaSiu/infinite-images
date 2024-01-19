import { getImagesPaginated, searchImagesPaginated } from '../api/images';

import { PexelsImage } from '../types/images';
import { useState } from 'react';

const useFetch = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prevQuery, setPrevQuery] = useState('');
  const [images, setImages] = useState<PexelsImage[]>([]);
  const [page, setPage] = useState(1);

  const getNewImages = async (query: string = '') => {
    return getImages(query, false);
  };

  const getImagesNextPage = async () => {
    return getImages('', true);
  };

  const getImages = async (query: string = '', onlyPageUpdate: boolean = false) => {
    if (onlyPageUpdate) {
      query = prevQuery;
    }
    try {
      setIsLoading(true);
      const isQueryChanged = prevQuery !== query;
      const photos =
        query === ''
          ? await getImagesPaginated(isQueryChanged ? 1 : page)
          : await searchImagesPaginated(query, isQueryChanged ? 1 : page);
      const filteredPhotos = photos.filter((photo) => !images.some((image) => image.id === photo.id));
      if (isQueryChanged) {
        setPage(1);
        setImages(filteredPhotos);
        setPrevQuery(query);
      } else {
        setImages((currentItems) => [...currentItems, ...filteredPhotos]);
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

  return { errorMsg, isLoading, images, page, getNewImages, getImagesNextPage, setPage };
};

export default useFetch;
