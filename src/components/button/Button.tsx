import styles from './Button.module.scss';

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: (event: React.SyntheticEvent) => void;
  isClicked?: boolean;
  variant?: boolean;
  disabled?: boolean;
};

const Button = ({ children, onClick, isClicked, variant, disabled }: ButtonProps) => (
  <button
    className={`${variant ? styles.secondary : styles.primary} ${isClicked ? styles.btnClicked : ''}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
