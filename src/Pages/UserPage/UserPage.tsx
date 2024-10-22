import UpdateUserForm from './UpdateUserForm';
import styles from './UserPage.module.scss';

const UserPage = () => {
  return (
    <div className={styles.container}>
      <UpdateUserForm />
    </div>
  );
};

export default UserPage;
