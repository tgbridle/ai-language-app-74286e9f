import { cn } from '@/lib/utils';

interface LanglyLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LanglyLogo({ size = 'lg', className }: LanglyLogoProps) {
  const sizeConfig = {
    sm: { h: 24, dotR: 3, gap: 9, fs: 16, textX: 22 },
    md: { h: 32, dotR: 4, gap: 11, fs: 22, textX: 28 },
    lg: { h: 48, dotR: 6, gap: 16, fs: 36, textX: 42 },
  };

  const { h, dotR, gap, fs, textX } = sizeConfig[size];
  // Dots sit at the top-left, text baseline at the bottom
  const dotCy = dotR + 1;
  const dot1Cx = dotR + 1;
  const dot2Cx = dot1Cx + gap;
  const textBaseline = h;
  const totalWidth = textX + fs * 3.6;

  return (
    <svg
      viewBox={`0 0 ${totalWidth} ${h + 2}`}
      height={h}
      className={cn('shrink-0', className)}
      aria-label="Langly"
      role="img"
    >
      <defs>
        <linearGradient id={`dot-grad-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <circle cx={dot1Cx} cy={dotCy} r={dotR} fill={`url(#dot-grad-${size})`} />
      <circle cx={dot2Cx} cy={dotCy} r={dotR} fill={`url(#dot-grad-${size})`} />
      <text
        x={textX}
        y={textBaseline}
        fontFamily="'Inter', system-ui, sans-serif"
        fontWeight="800"
        fontSize={fs}
        fill="#1e293b"
        dominantBaseline="auto"
      >
        Langly
      </text>
    </svg>
  );
}
