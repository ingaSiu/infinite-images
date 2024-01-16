import { PexelsImage } from '../types/images';

const BASE_URL = 'https://api.pexels.com/v1/';

const KEY = import.meta.env.VITE_ACCESS_KEY;

export const getImagesPaginated = async (page: number = 1, perPage: number = 40): Promise<PexelsImage[]> => {
  return getPhotos(`${BASE_URL}curated?page=${page}&per_page=${perPage}`);
};

export const searchImagesPaginated = async (
  query: string,
  page: number = 1,
  perPage: number = 40,
): Promise<PexelsImage[]> => {
  return getPhotos(`${BASE_URL}search?query=${query}&page=${page}&per_page=${perPage}`);
};

const getPhotos = async (fetchUrl: string): Promise<PexelsImage[]> => {
  const response = await fetch(fetchUrl, {
    headers: {
      Authorization: KEY,
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }
  const data = await response.json();
  return data.photos;
};
