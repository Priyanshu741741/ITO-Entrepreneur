// src/components/common/Button/Button.tsx
import { ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  fullWidth = false,
  type = 'button',
  disabled = false
}: ButtonProps) => {
  const buttonClass = `
    ${styles.button} 
    ${styles[variant]} 
    ${styles[size]}
    ${fullWidth ? styles.fullWidth : ''}
    ${disabled ? styles.disabled : ''}
  `;

  return (
    <button 
      className={buttonClass}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;