import SearchBar, { Props } from '../search/SearchBar';

import styles from './Hero.module.scss';

const Hero = ({ onSearch }: Props) => {
  return (
    <div className={styles.heroWrapper}>
      <h1>Explore the world through images</h1>
      <SearchBar onSearch={onSearch} />
    </div>
  );
};

export default Hero;
