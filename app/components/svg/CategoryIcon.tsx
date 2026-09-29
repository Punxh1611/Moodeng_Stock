import React from 'react';
import { Category } from '~/lib/types';

interface CategoryIconProps {
  category: Category;
  size?: number;
  className?: string;
}

export function CategoryIcon({ category, size = 32, className = '' }: CategoryIconProps) {
  const commonProps = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 40 40",
    width: size,
    height: size,
    className,
    stroke: "#3D3329",
    strokeWidth: "2",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (category) {
    case 'อาหาร':
      return (
        <svg {...commonProps} fill="#FEF3D0">
          <path d="M 8 20 C 8 35, 32 35, 32 20 Z" />
          <path d="M 8 20 L 32 20" />
          <path d="M 15 10 C 15 5, 20 5, 20 2" fill="none" strokeDasharray="3 3" />
          <path d="M 25 12 C 25 7, 30 7, 30 4" fill="none" strokeDasharray="3 3" />
        </svg>
      );
    case 'เครื่องดื่ม':
      return (
        <svg {...commonProps} fill="#C8E6C9">
          <rect x="12" y="15" width="16" height="20" rx="2" ry="2" />
          <path d="M 12 15 L 28 15" />
          <path d="M 18 15 L 22 5" fill="none" />
        </svg>
      );
    case 'ของใช้':
      return (
        <svg {...commonProps} fill="#FFB5B5">
          <rect x="10" y="15" width="20" height="20" rx="4" ry="4" />
          <path d="M 16 15 L 16 8 C 16 5, 24 5, 24 8 L 24 15" />
          <circle cx="10" cy="8" r="3" fill="#FFF8E7" />
          <circle cx="30" cy="12" r="2" fill="#FFF8E7" />
        </svg>
      );
    case 'ยา':
      return (
        <svg {...commonProps} fill="#FFE082">
          <rect x="8" y="14" width="24" height="12" rx="6" ry="6" />
          <path d="M 20 14 L 20 26" />
          <path d="M 12 20 L 16 20 M 14 18 L 14 22" stroke="#EF9A9A" strokeWidth="2.5" />
        </svg>
      );
    case 'อื่นๆ':
    default:
      return (
        <svg {...commonProps} fill="#E88B8B">
          <path d="M 8 15 L 20 8 L 32 15 L 32 30 L 20 37 L 8 30 Z" />
          <path d="M 8 15 L 20 22 L 32 15" />
          <path d="M 20 22 L 20 37" />
        </svg>
      );
  }
}
