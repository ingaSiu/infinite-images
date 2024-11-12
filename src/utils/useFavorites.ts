import { useEffect, useState } from 'react';

import { BASE_URL } from '../api/baseApi';
import { LOGIN_PATH } from '../routes/consts';
import httpClient from '../api/httpClient';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { useUserFavorites } from '../hooks/useUserFavorites';

const useFavorites = () => {
  const [likedPhotos, setLikedPhotos] = useState<number[]>([]);
  //const initialized = useRef(false);
  const { user, isAuthenticated } = useAuthContext();
  const { fetchFavorites, favorites } = useUserFavorites();
  const navigate = useNavigate();

  const addFavorite = async (itemId: number, alt: string, photographer: string, src: object) => {
    if (isAuthenticated && user) {
      try {
        setLikedPhotos((prevLikedPhotos) => [...prevLikedPhotos, itemId]);

        await httpClient.post(
          `${BASE_URL}users/favorites`,
          { id: itemId, alt, photographer, src: JSON.stringify(src) },
          { withCredentials: true },
        );
        fetchFavorites();
        toast.success('Favorite image added!');
      } catch (error) {
        console.error('Error adding favorite', error);
        toast.error('Could not add to favorites');
      }
    } else {
      console.log('User not authenticated, cannot add favorite.');
      navigate(LOGIN_PATH);
      toast.error('Please log in to add favorites');
    }
  };

  const deleteFavorite = async (itemId: number, fetchFavorites: () => void) => {
    if (isAuthenticated && user) {
      const confirmed = window.confirm('Are you sure you want to remove this image?');
      if (confirmed) {
        try {
          await httpClient.delete(`${BASE_URL}users/favorites/${itemId}`, { withCredentials: true });
          //setLikedPhotos((prevLikedPhotos) => prevLikedPhotos.filter((id) => id !== itemId));

          fetchFavorites();
          toast.success('Image removed');
        } catch (error) {
          console.error('Error deleting favorite', error);
          toast.error('Error removing favorite');
        }
      } else {
        return;
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      const favoriteIds = favorites.map((favorite) => favorite.id);
      setLikedPhotos(favoriteIds);
    } else {
      setLikedPhotos([]);
    }
  }, [isAuthenticated, user, favorites]);

  return { addFavorite, deleteFavorite, likedPhotos };
};

export default useFavorites;
