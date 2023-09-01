import { PexelsImage } from '../types/images';

const BASE_URL = 'https://api.pexels.com/v1/';

const KEY = 'rXHEVgX4HhHjBUUyjdjobJlrsW0MX3OZDWMCCHWM8nQRdDQE5Bk72Hfx';

export const getImagesPaginated = async (page: number = 1, perPage: number = 40): Promise<PexelsImage[]> => {
  try {
    const response = await fetch(`${BASE_URL}curated?page=${page}&per_page=${perPage}`, {
      headers: {
        Authorization: KEY,
      },
    });
    if (!response.ok) {
      // Handle non-OK responses (e.g., 404, 500)
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    return data.photos;
  } catch (err) {
    // Handle any other errors that may occur during the fetch or JSON parsing
    console.error('An error occurred:', err);
    throw err; // Rethrow the error to indicate that the operation failed
  }
};
