import { FAVORITES_PATH, USER_PATH } from '../../routes/consts';

import { NavLink } from 'react-router-dom';
import styles from './UserNav.module.scss';

const UserNav = () => {
  const isElementActive = ({ isActive }: { isActive: boolean }) => ({ color: isActive ? '#ebac96' : '' });
  return (
    <section className={styles.userPages}>
      <NavLink to={FAVORITES_PATH} end style={isElementActive}>
        My Favorites
      </NavLink>
      <NavLink to={USER_PATH} end style={isElementActive}>
        My profile
      </NavLink>
    </section>
  );
};

export default UserNav;
