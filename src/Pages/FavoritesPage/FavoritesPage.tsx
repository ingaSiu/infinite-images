import FavoritesCard from '../../components/favoritesCard/FavoritesCard';
import Loader from '../../components/loader/Loader';
import styles from './FavoritesPage.module.scss';
import useFavorites from '../../utils/useFavorites';
import { useUserFavorites } from '../../hooks/useUserFavorites';

const FavoritesPage = () => {
  const { favorites, fetchFavorites, isLoading } = useUserFavorites();
  const { deleteFavorite } = useFavorites();

  return (
    <div>
      <div className={styles.container}>
        <h1>Favorite images</h1>
        <div className={styles.cardsWrapper}>
          {isLoading && <Loader />}
          {favorites.length > 0 ? (
            favorites.map((fav, index) => (
              <FavoritesCard
                key={fav.id}
                src={fav.src.large}
                alt={fav.alt}
                photographer={fav.photographer}
                tabIndex={index}
                isClicked={true}
                onClick={() => deleteFavorite(fav.id, fetchFavorites)}
                onViewImage={() => window.open(fav.src.original, '_blank')}
              />
            ))
          ) : (
            <p>No favorites yet!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
