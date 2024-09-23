import { FAVORITES_PATH, USER_PATH } from '../../routes/consts';

import styles from './UserPage.module.scss';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <section className={styles.userPages}>
        <p onClick={() => navigate(FAVORITES_PATH)}>My favorites</p>
        <p onClick={() => navigate(USER_PATH)}>My profile</p>
      </section>
      <h1>My profile details</h1>
    </div>
  );
};

export default UserPage;
