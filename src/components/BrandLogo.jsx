import React from 'react';

export function HaloPesaLogo({ className = "h-8", variant = "default" }) {
  // Brand color is vibrant Halotel orange #F05A22
  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {/* HaloPesa Spiral / Drop Icon */}
      <svg
        viewBox="0 0 100 100"
        className="w-8 h-8 shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="48" fill="#F05A22" />
        <path
          d="M34 58C34 46 42 34 56 32C65 30.5 72 37 72 46C72 57 63 66 52 66C43 66 34 62 34 58Z"
          fill="#FFFFFF"
        />
        <circle cx="46" cy="50" r="9" fill="#F05A22" />
      </svg>

      {/* Brand Text */}
      <div className="flex items-center">
        <span
          className="font-bold tracking-tight text-2xl md:text-3xl"
          style={{
            color: variant === 'white' ? '#FFFFFF' : '#F05A22',
            fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
          }}
        >
          halo<span className="font-extrabold">pesa</span>
        </span>
      </div>
    </div>
  );
}

export function GoldCoin({ className = "w-10 h-6", rotation = 25 }) {
  return (
    <svg
      viewBox="0 0 80 50"
      className={`${className} filter drop-shadow-md`}
      style={{ transform: `rotate(${rotation}deg)` }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Coin 3D Rim */}
      <ellipse cx="40" cy="28" rx="34" ry="16" fill="#D98200" />
      <path d="M6 25 C 6 36, 74 36, 74 25 L 74 29 C 74 40, 6 40, 6 29 Z" fill="#C27100" />
      {/* Coin Top Face */}
      <ellipse cx="40" cy="22" rx="33" ry="14" fill="#FFC83B" />
      <ellipse cx="40" cy="22" rx="27" ry="11" stroke="#FFA700" strokeWidth="2" fill="#FDB813" />
      {/* Coin Inner Detail */}
      <ellipse cx="40" cy="22" rx="16" ry="6" fill="#F29F05" opacity="0.6" />
    </svg>
  );
}

export function PlusSymbol({ size = "16px", color = "#F5A623" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"
    >
      <rect x="9" y="2" width="6" height="20" rx="3" fill={color} />
      <rect x="2" y="9" width="20" height="6" rx="3" fill={color} />
    </svg>
  );
}
