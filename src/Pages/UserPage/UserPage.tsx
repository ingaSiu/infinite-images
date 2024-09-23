import styles from './UserPage.module.scss';

const UserPage = () => {
  return (
    <div className={styles.container}>
      <section>
        <span>My favorites</span>
        <span>My profile</span>
      </section>
      <h1>My profile details</h1>
    </div>
  );
};

export default UserPage;
