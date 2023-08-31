import Button from '../button/Button';
import styles from './Card.module.scss';

type CardProps = {
  photographer?: string;
  alt: string;
  src: string;
  onClick?: (event: React.SyntheticEvent) => void;
  isClicked?: boolean;
};

const Card = ({ alt, src, photographer, onClick, isClicked }: CardProps) => {
  return (
    <div className={styles.container}>
      <img src={src} alt={alt} loading="lazy" className={styles.image} />
      <div className={styles.overlay}>
        <div className={styles.textWrapper}>
          <div className={styles.title}>{alt}</div>
          <div className={styles.author}>{photographer}</div>
        </div>

        <div className={styles.btnWrapper}>
          <Button onClick={onClick} isClicked={isClicked}>
            Favourite
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
