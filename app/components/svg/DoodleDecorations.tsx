import React from 'react';

export function DoodleStar({ size = 24, className = '', color = '#FFE082' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width={size} height={size} className={className}>
      <path d="M 20 5 L 25 15 L 35 15 L 28 22 L 30 32 L 20 27 L 10 32 L 12 22 L 5 15 L 15 15 Z" fill={color} stroke="#3D3329" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function DoodleHeart({ size = 24, className = '', color = '#FFB5B5' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width={size} height={size} className={className}>
      <path d="M 20 35 C 20 35, 5 25, 5 13 C 5 5, 15 5, 20 12 C 25 5, 35 5, 35 13 C 35 25, 20 35, 20 35 Z" fill={color} stroke="#3D3329" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function DoodleSparkle({ size = 24, className = '', color = '#FEF3D0' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width={size} height={size} className={className}>
      <path d="M 20 5 C 20 15, 25 20, 35 20 C 25 20, 20 25, 20 35 C 20 25, 15 20, 5 20 C 15 20, 20 15, 20 5 Z" fill={color} stroke="#3D3329" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function DoodleDivider({ className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10" width="100%" height="20" className={className} preserveAspectRatio="none">
      <path d="M 0 5 Q 12 0, 25 5 T 50 5 T 75 5 T 100 5" fill="none" stroke="#3D3329" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
