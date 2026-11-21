import React from 'react';

/**
 * Clean SVG Country Flags - Zero Unicode Emojis
 */

export function TanzaniaFlag({ className = "w-6 h-4" }) {
  return (
    <svg 
      className={`${className} inline-block rounded-xs shadow-xs overflow-hidden shrink-0`} 
      viewBox="0 0 48 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Tanzania Flag"
    >
      {/* Green upper triangle */}
      <polygon points="0,0 48,0 0,32" fill="#1EB53A" />
      {/* Blue lower triangle */}
      <polygon points="48,0 48,32 0,32" fill="#00A3DD" />
      {/* Yellow outer diagonal band */}
      <polygon points="0,32 6,32 48,4 48,0 42,0 0,28" fill="#FCD116" />
      {/* Black diagonal center band */}
      <polygon points="0,32 3,32 48,2 48,0 45,0 0,30" fill="#000000" />
    </svg>
  );
}

export function UKFlag({ className = "w-6 h-4" }) {
  return (
    <svg 
      className={`${className} inline-block rounded-xs shadow-xs overflow-hidden shrink-0`} 
      viewBox="0 0 60 30" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="United Kingdom Flag"
    >
      <clipPath id="uk-clip">
        <rect width="60" height="30" rx="1" />
      </clipPath>
      <g clipPath="url(#uk-clip)">
        {/* Navy Blue background */}
        <rect width="60" height="30" fill="#012169" />
        {/* White saltire diagonals */}
        <line x1="0" y1="0" x2="60" y2="30" stroke="#FFFFFF" strokeWidth="6" />
        <line x1="60" y1="0" x2="0" y2="30" stroke="#FFFFFF" strokeWidth="6" />
        {/* Red saltire diagonals */}
        <line x1="0" y1="0" x2="60" y2="30" stroke="#C8102E" strokeWidth="2" />
        <line x1="60" y1="0" x2="0" y2="30" stroke="#C8102E" strokeWidth="2" />
        {/* White cross */}
        <rect x="25" width="10" height="30" fill="#FFFFFF" />
        <rect y="10" width="60" height="10" fill="#FFFFFF" />
        {/* Red cross */}
        <rect x="27" width="6" height="30" fill="#C8102E" />
        <rect y="12" width="60" height="6" fill="#C8102E" />
      </g>
    </svg>
  );
}
