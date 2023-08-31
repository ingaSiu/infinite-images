import styles from './Button.module.scss';

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: (event: React.SyntheticEvent) => void;
  isClicked?: boolean;
};

const Button = ({ children, onClick, isClicked }: ButtonProps) => (
  <button className={`${styles.btn} ${isClicked ? styles.btnClicked : styles.btn}`} onClick={onClick}>
    {children}
  </button>
);

export default Button;
