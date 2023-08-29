import styles from './Card.module.scss';

type CardProps = {
  photographer?: string;

  alt: string;
  liked?: boolean;
  src: string;
};

const Card = ({ alt, src, photographer }: CardProps) => {
  return (
    <div className={styles.container}>
      <img src={src} alt={alt} loading="lazy" className={styles.image} />
      <div className={styles.overlay}>
        <div className={styles.title}>{alt}</div>
        <div className={styles.author}>{photographer}</div>
        <button>Favorite</button>
      </div>
    </div>
  );
};

export default Card;
