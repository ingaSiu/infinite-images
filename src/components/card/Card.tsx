import styles from './Card.module.scss';

type CardProps = {
  photographer?: string;

  alt: string;
  liked?: boolean;
  src: string;
};

const Card = ({ alt, src }: CardProps) => {
  return (
    <div className={styles.container}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default Card;
