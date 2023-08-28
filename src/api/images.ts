// const URL = 'https://api.pexels.com/v1/curated?page=2&per_page=40';
const KEY = 'rXHEVgX4HhHjBUUyjdjobJlrsW0MX3OZDWMCCHWM8nQRdDQE5Bk72Hfx';

export const getImagesPaginated = (page: number = 1, perPage: number = 40): Promise<any> => {
  return fetch(`https://api.pexels.com/v1/curated?page=${page}&per_page=${perPage}`, {
    headers: {
      Authorization: KEY,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.photos;
    });
};
