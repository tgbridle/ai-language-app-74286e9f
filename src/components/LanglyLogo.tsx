import langlyLogo from '@/assets/langly-logo.png';
import { cn } from '@/lib/utils';

interface LanglyLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LanglyLogo({ size = 'lg', className }: LanglyLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-20 h-20 sm:w-24 sm:h-24',
  };

  return (
    <img
      src={langlyLogo}
      alt="Langly logo"
      className={cn(sizeClasses[size], 'object-contain', className)}
    />
  );
}
