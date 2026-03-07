import { cn } from '@/lib/utils';

interface LanglyLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LanglyLogo({ size = 'lg', className }: LanglyLogoProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-20 h-20 sm:w-24 sm:h-24',
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(sizeClasses[size], className)}
    >
      <defs>
        <linearGradient id="leftPage" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#b8943d" stopOpacity="0.65" />
        </linearGradient>
        <linearGradient id="rightPage" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b5998" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#2c4a7c" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {/* Left page */}
      <path
        d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2V3z"
        fill="url(#leftPage)"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right page */}
      <path
        d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7V3z"
        fill="url(#rightPage)"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Spine */}
      <path
        d="M12 7v14"
        stroke="#5a3a3a"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
