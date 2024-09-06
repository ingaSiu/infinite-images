import styles from './Button.module.scss';

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: (event: React.SyntheticEvent) => void;
  isClicked?: boolean;
  variant?: boolean;
};

const Button = ({ children, onClick, isClicked, variant }: ButtonProps) => (
  <button
    className={`${variant ? styles.secondary : styles.primary} ${isClicked ? styles.btnClicked : ''}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
