import { FAVORITES_PATH, USER_PATH } from '../../routes/consts';

import styles from './UserNav.module.scss';
import { useNavigate } from 'react-router-dom';

const UserNav = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.userPages}>
      <p onClick={() => navigate(FAVORITES_PATH)}>My favorites</p>
      <p onClick={() => navigate(USER_PATH)}>My profile</p>
    </section>
  );
};

export default UserNav;
