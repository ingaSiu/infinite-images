import Button from '../button/Button';
import styles from './Card.module.scss';

type CardProps = {
  photographer?: string;
  alt: string;
  src: string;
  onClick?: (event: React.SyntheticEvent) => void;
  isClicked?: boolean;
  tabIndex: number;
};

const Card = ({ alt, src, photographer, onClick, isClicked, tabIndex }: CardProps) => {
  return (
    <div tabIndex={tabIndex} className={styles.imageWrapper}>
      <img src={src} alt={alt} loading="lazy" className={styles.image} />
      <div className={styles.overlay}>
        <div className={styles.textWrapper}>
          <div className={styles.title}>{alt}</div>
          <div className={styles.author}>{photographer}</div>
        </div>

        <div className={styles.btnWrapper}>
          <Button onClick={onClick} isClicked={isClicked}>
            {isClicked ? 'Remove' : 'Favorite'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
