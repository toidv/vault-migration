
import React from 'react';
import { cn } from '@/lib/utils';

interface TokenIconProps {
  symbol: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const TokenIcon: React.FC<TokenIconProps> = ({ 
  symbol, 
  size = 'md', 
  className 
}) => {
  // Placeholder for actual token icon implementation
  // In a real app, we would fetch the icons from a token API
  
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };
  
  // Generate a color based on the token symbol for demo purposes
  const getColorFromSymbol = (sym: string) => {
    const colors = [
      'from-purple-500 to-blue-500',
      'from-blue-500 to-cyan-500',
      'from-emerald-500 to-green-500',
      'from-orange-500 to-amber-500',
      'from-pink-500 to-rose-500',
    ];
    
    let hash = 0;
    for (let i = 0; i < sym.length; i++) {
      hash = sym.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };
  
  return (
    <div 
      className={cn(
        'rounded-full flex items-center justify-center bg-gradient-to-r font-bold text-white',
        sizeClasses[size],
        getColorFromSymbol(symbol),
        className
      )}
    >
      {symbol.substring(0, 2)}
    </div>
  );
};

export default TokenIcon;
