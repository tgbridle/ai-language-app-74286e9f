import { cn } from '@/lib/utils';

interface LanglyLogoProps {
  size?: 'sm' | 'lg';
  className?: string;
}

export function LanglyLogo({ size = 'lg', className }: LanglyLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    lg: 'w-16 h-16',
  };

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-2xl',
        sizeClasses[size],
        className
      )}
      style={{
        background: 'linear-gradient(135deg, #A855F7 0%, #3B82F6 100%)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* Speech bubble tail */}
      <div
        className="absolute -bottom-1 -left-0.5 w-3 h-3 rounded-sm"
        style={{
          background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
          transform: 'rotate(45deg)',
        }}
      />
      
      {/* L letter */}
      <span
        className={cn(
          'font-bold text-white relative z-10',
          size === 'lg' ? 'text-3xl' : 'text-lg'
        )}
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        L
      </span>
    </div>
  );
}
