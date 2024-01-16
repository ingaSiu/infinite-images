import SearchBar, { Props } from '../search/SearchBar';

import styles from './Nav.module.scss';

const Nav = ({ onSearch }: Props) => {
  return (
    <div className={styles.navContainer}>
      <h2>Images viewing website</h2>
      <SearchBar onSearch={onSearch} />
    </div>
  );
};

export default Nav;
