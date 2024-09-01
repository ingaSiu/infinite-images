import { PexelsImage } from '../types/images';
import axios from 'axios';

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
  try {
    const response = await axios.get(fetchUrl, {
      headers: {
        Authorization: KEY,
      },
    });

    return response.data.photos;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`HTTP Error: ${error.response?.status || error.message}`);
    } else {
      throw new Error(`Unexpected Error: ${error}`);
    }
  }
};
