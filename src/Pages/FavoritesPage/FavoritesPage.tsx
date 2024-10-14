import { FAVORITES_PATH, USER_PATH } from '../../routes/consts';

import Card from '../../components/card/Card';
import styles from './FavoritesPage.module.scss';
import useFavorites from '../../utils/useFavorites';
import { useNavigate } from 'react-router-dom';
import { useUserFavorites } from '../../hooks/useUserFavorites';

const FavoritesPage = () => {
  const { favorites, fetchFavorites } = useUserFavorites();
  const { deleteFavorite } = useFavorites();
  const navigate = useNavigate();
  return (
    <div>
      <section className={styles.userPages}>
        <p onClick={() => navigate(FAVORITES_PATH)}>My favorites</p>
        <p onClick={() => navigate(USER_PATH)}>My profile</p>
      </section>

      <div className={styles.container}>
        <h1>Favorite images</h1>
        <div className={styles.cardsWrapper}>
          {favorites.length > 0 ? (
            favorites.map((fav, index) => (
              <Card
                key={fav.id}
                src={fav.src.large}
                alt={fav.alt}
                photographer={fav.photographer}
                tabIndex={index}
                isClicked={true}
                onClick={() => deleteFavorite(fav.id, fetchFavorites)}
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
