import React from 'react';

interface BounceBadgeProps {
  children: React.ReactNode;
  variant?: 'warning' | 'danger' | 'success';
  className?: string;
}

export function BounceBadge({ children, variant = 'warning', className = '' }: BounceBadgeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'danger': return 'bg-danger text-ink';
      case 'success': return 'bg-mint text-ink';
      case 'warning':
      default: return 'bg-warn text-ink';
    }
  };

  return (
    <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-bold border-2 border-ink animate-[bounce-badge_1s_ease-in-out_infinite] ${getVariantStyles()} ${className}`}>
      {children}
    </span>
  );
}
