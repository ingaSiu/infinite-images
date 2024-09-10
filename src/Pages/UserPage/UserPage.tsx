import styles from './UserPage.module.scss';

const UserPage = () => {
  return (
    <div className={styles.container}>
      <h1>Favorite images</h1>
      <div className={styles.cardsWrapper}>
        <div className={styles.card}>card</div>
        <div className={styles.card}>card</div>
        <div className={styles.card}>card</div>
      </div>
    </div>
  );
};

export default UserPage;
