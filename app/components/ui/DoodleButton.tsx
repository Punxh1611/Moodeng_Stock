import React from 'react';

interface DoodleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function DoodleButton({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled, 
  ...props 
}: DoodleButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary': return 'bg-piggy hover:bg-piggy-dark text-ink border-2 border-ink';
      case 'secondary': return 'bg-paper hover:bg-cream text-ink border-2 border-ink';
      case 'danger': return 'bg-danger hover:bg-red-400 text-ink border-2 border-ink';
      case 'ghost': return 'bg-transparent hover:bg-piggy/20 text-ink';
      default: return '';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm': return 'px-2 py-1 text-sm';
      case 'lg': return 'px-6 py-3 text-lg';
      case 'md':
      default: return 'px-4 py-2';
    }
  };

  return (
    <button
      className={`font-hand font-bold rounded-xl transition-all hover:rotate-[-1deg] hover:scale-105 ${getVariantStyles()} ${getSizeStyles()} ${disabled ? 'opacity-50 cursor-not-allowed hover:rotate-0 hover:scale-100' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
