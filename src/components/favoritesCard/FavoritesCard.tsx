import Button from '../button/Button';
import styles from './FavoritesCard.module.scss';

type FavoritesCardProps = {
  photographer?: string;
  alt: string;
  src: string;
  onViewImage?: (event: React.SyntheticEvent) => void;
  onClick?: (event: React.SyntheticEvent) => void;
  isClicked?: boolean;
  tabIndex: number;
};
const FavoritesCard = ({ alt, src, photographer, onClick, onViewImage, isClicked, tabIndex }: FavoritesCardProps) => {
  return (
    <div tabIndex={tabIndex} className={styles.imageWrapper}>
      <img src={src} alt={alt} loading="lazy" className={styles.image} />
      <div className={styles.overlay}>
        <div className={styles.textWrapper}>
          <div className={styles.title}>{alt}</div>
          <div className={styles.author}>{photographer}</div>
        </div>

        <div className={styles.btnContainer}>
          <Button onClick={onClick} isClicked={isClicked}>
            {isClicked ? 'Remove' : 'Favorite'}
          </Button>
          <Button onClick={onViewImage}>View Image</Button>
        </div>
      </div>
    </div>
  );
};

export default FavoritesCard;
