import Card from '../../components/card/Card';
import styles from './UserPage.module.scss';
import { useUserFavorites } from '../../hooks/useUserFavorites';

const UserPage = () => {
  const { favorites } = useUserFavorites();
  return (
    <div className={styles.container}>
      <section>
        <span>My favorites</span>
        <span>My profile</span>
      </section>
      <h1>Favorite images</h1>
      <div className={styles.cardsWrapper}>
        {favorites.length > 0 ? (
          favorites.map((fav, index) => (
            <Card key={fav.id} src={fav.src.large} alt={fav.alt} photographer={fav.photographer} tabIndex={index} />
          ))
        ) : (
          <p>No favorites yet!</p>
        )}
      </div>
    </div>
  );
};

export default UserPage;
