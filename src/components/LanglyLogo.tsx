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
        <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(217, 60%, 65%)" />
          <stop offset="100%" stopColor="hsl(230, 45%, 55%)" />
        </linearGradient>
      </defs>
      {/* Left page */}
      <path
        d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2V3z"
        stroke="url(#bookGradient)"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right page */}
      <path
        d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7V3z"
        stroke="url(#bookGradient)"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
