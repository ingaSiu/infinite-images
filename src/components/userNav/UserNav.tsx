import { FAVORITES_PATH, USER_PATH } from '../../routes/consts';

import { NavLink } from 'react-router-dom';
import styles from './UserNav.module.scss';

const UserNav = () => {
  return (
    <section className={styles.userPages}>
      <NavLink to={FAVORITES_PATH} end style={({ isActive }) => ({ color: isActive ? '#ebac96' : '' })}>
        My Favorites
      </NavLink>
      <NavLink to={USER_PATH} end style={({ isActive }) => ({ color: isActive ? '#ebac96' : '' })}>
        My profile
      </NavLink>
    </section>
  );
};

export default UserNav;
