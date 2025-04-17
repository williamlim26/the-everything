import React from 'react';

interface ButtonProps {
  buttonText: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  buttonText,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false
}) => {
  // Base classes
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 flex items-center justify-center';

  // Size classes
  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-2.5 px-5 text-lg'
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow',
    secondary: 'bg-slate-700 hover:bg-slate-800 text-white shadow-sm hover:shadow',
    success: 'bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow'
  };

  // Disabled classes
  const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105 active:scale-95';

  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';

  // Combine all classes
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${widthClasses}`;

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};

export default Button;
