import React from 'react';

interface DoodleBorderProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'highlight' | 'warning';
}

export function DoodleBorder({ children, className = '', variant = 'default' }: DoodleBorderProps) {
  const getColors = () => {
    switch (variant) {
      case 'highlight': return { bg: 'bg-piggy/10', stroke: '#FFB5B5' };
      case 'warning': return { bg: 'bg-warn/20', stroke: '#FFE082' };
      default: return { bg: 'bg-paper', stroke: '#3D3329' };
    }
  };

  const { bg, stroke } = getColors();

  return (
    <div className={`relative p-4 ${bg} ${className}`}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <rect
          x="2"
          y="2"
          width="calc(100% - 4px)"
          height="calc(100% - 4px)"
          rx="12"
          ry="14"
          fill="none"
          stroke={stroke}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="10 4 20 5 8 3"
        />
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
