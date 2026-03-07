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
      {/* Left page fill */}
      <path
        d="M2 6s1.5-2 5-2 5 2 5 2v11s-1.5-1-5-1-5 1-5 1V6z"
        fill="url(#leftPage)"
      />
      {/* Right page fill */}
      <path
        d="M12 6s1.5-2 5-2 5 2 5 2v11s-1.5-1-5-1-5 1-5 1V6z"
        fill="url(#rightPage)"
      />
      {/* Outline strokes */}
      <path
        d="M2 3h6a4 4 0 0 1 4 4 4 4 0 0 1 4-4h6v14a2 2 0 0 1-2 2h-4.5a2 2 0 0 0-1.5.7 2 2 0 0 0-1.5-.7H7a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.8"
      />
      {/* Spine */}
      <path
        d="M12 7v13"
        stroke="#5a3a3a"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}
