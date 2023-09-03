import { PexelsImage } from '../types/images';

const BASE_URL = 'https://api.pexels.com/v1/';

const KEY = import.meta.env.VITE_ACCESS_KEY;

export const getImagesPaginated = async (page: number = 1, perPage: number = 40): Promise<PexelsImage[]> => {
  const response = await fetch(`${BASE_URL}curated?page=${page}&per_page=${perPage}`, {
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
