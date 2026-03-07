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
        <linearGradient id="leftPage" x1="0%" y1="20%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="hsl(217, 30%, 72%)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(217, 25%, 58%)" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id="rightPage" x1="20%" y1="0%" x2="100%" y2="80%">
          <stop offset="0%" stopColor="hsl(217, 35%, 60%)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="hsl(217, 30%, 48%)" stopOpacity="0.4" />
        </linearGradient>
        <filter id="pageShadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0.3" dy="0.3" stdDeviation="0.4" floodColor="#000" floodOpacity="0.15" />
        </filter>
      </defs>
      {/* Left page */}
      <path
        d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2V3z"
        fill="url(#leftPage)"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#pageShadow)"
      />
      {/* Right page */}
      <path
        d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7V3z"
        fill="url(#rightPage)"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#pageShadow)"
      />
      {/* Spine highlight */}
      <path
        d="M12 7v14"
        stroke="#4a2c2c"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.35"
      />
      {/* DE text on left page */}
      <text
        x="6.5"
        y="12.5"
        textAnchor="middle"
        fontSize="3.2"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
        fill="currentColor"
        opacity="0.18"
        letterSpacing="0.3"
      >
        DE
      </text>
      {/* EN text on right page */}
      <text
        x="17.5"
        y="12.5"
        textAnchor="middle"
        fontSize="3.2"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
        fill="currentColor"
        opacity="0.18"
        letterSpacing="0.3"
      >
        EN
      </text>
    </svg>
  );
}
