import langlyLogo from '@/assets/langly-logo.png';
import { cn } from '@/lib/utils';

interface LanglyLogoProps {
  size?: 'sm' | 'lg';
  className?: string;
}

export function LanglyLogo({ size = 'lg', className }: LanglyLogoProps) {
  const sizeClasses = {
    sm: 'w-7 h-7',
    lg: 'w-12 h-12',
  };

  return (
    <img
      src={langlyLogo}
      alt="Langly logo"
      className={cn(sizeClasses[size], 'object-contain', className)}
    />
  );
}
