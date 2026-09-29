import React from 'react';

export function MooDengMascot({ mood = 'happy', className = '', size = 120 }: { mood?: 'happy' | 'surprised' | 'sad', className?: string, size?: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 120 120" 
      width={size} 
      height={size} 
      className={`animate-[wiggle_3s_ease-in-out_infinite] ${className}`}
    >
      <style>
        {`
          @keyframes blink {
            0%, 96%, 98% { transform: scaleY(1); }
            97%, 99% { transform: scaleY(0.1); }
          }
          @keyframes tail-wag {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(15deg); }
          }
          .eye-blink {
            transform-origin: center;
            animation: blink 4s infinite;
          }
          .tail-wag {
            transform-origin: 20px 80px;
            animation: tail-wag 2s infinite ease-in-out;
          }
        `}
      </style>
      
      {/* Ears (small and round) */}
      <path 
        d="M 30 40 C 20 20, 45 20, 45 40" 
        fill="#C4B4B4" 
        stroke="#3D3329" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M 90 40 C 100 20, 75 20, 75 40" 
        fill="#C4B4B4" 
        stroke="#3D3329" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />

      {/* Body (hippo shape, a bit wider) */}
      <path 
        d="M 20 65 C 20 25, 100 25, 100 65 C 100 95, 85 110, 50 105 C 25 100, 20 90, 20 65 Z" 
        fill="#C4B4B4" 
        stroke="#3D3329" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* Eyes */}
      <g className="eye-blink">
        <circle cx="40" cy="50" r="3.5" fill="#3D3329" />
        <circle cx="80" cy="50" r="3.5" fill="#3D3329" />
        {/* Cute blush */}
        <ellipse cx="32" cy="55" rx="4" ry="2" fill="#FFB5B5" opacity="0.8" />
        <ellipse cx="88" cy="55" rx="4" ry="2" fill="#FFB5B5" opacity="0.8" />
      </g>

      {/* Big Snout (Hippo signature) */}
      <path 
        d="M 25 75 C 25 55, 95 55, 95 75 C 95 95, 25 95, 25 75 Z" 
        fill="#FFB5B5" 
        stroke="#3D3329" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />
      
      {/* Nostrils */}
      <ellipse cx="45" cy="70" rx="2.5" ry="4" fill="#3D3329" />
      <ellipse cx="75" cy="70" rx="2.5" ry="4" fill="#3D3329" />

      {/* Mouth based on mood */}
      {mood === 'happy' && (
        <path d="M 50 82 C 55 86, 65 86, 70 82" fill="none" stroke="#3D3329" strokeWidth="2.5" strokeLinecap="round" />
      )}
      {mood === 'surprised' && (
        <circle cx="60" cy="83" r="3" fill="none" stroke="#3D3329" strokeWidth="2.5" />
      )}
      {mood === 'sad' && (
        <path d="M 50 84 C 55 80, 65 80, 70 84" fill="none" stroke="#3D3329" strokeWidth="2.5" strokeLinecap="round" />
      )}

      {/* Stubby Legs */}
      <path d="M 35 100 L 35 115 C 35 120, 48 120, 48 115 L 48 103" fill="#C4B4B4" stroke="#3D3329" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 72 103 L 72 115 C 72 120, 85 120, 85 115 L 85 100" fill="#C4B4B4" stroke="#3D3329" strokeWidth="2.5" strokeLinecap="round" />

      {/* Tail */}
      <path className="tail-wag" d="M 22 80 C 10 80, 5 95, 12 100" fill="none" stroke="#3D3329" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
