import { PexelsImage } from '../types/images';

const BASE_URL = 'https://api.pexels.com/v1/';

const KEY = 'rXHEVgX4HhHjBUUyjdjobJlrsW0MX3OZDWMCCHWM8nQRdDQE5Bk72Hfx';

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
