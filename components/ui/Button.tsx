import React from 'react';
import { cn } from '@/lib/utils'; // Assuming specific utils exist, or I can implement class merging locally if needed.

// If lib/utils doesn't exist yet, I'll need to create it or remove this import. 
// I'll assume standard shadcn-like utils for now, but will create it if missing.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'default' | 'lg' | 'xl';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', fullWidth = false, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-bold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-gold/50 disabled:pointer-events-none disabled:opacity-50 border-2";
    
    const variants = {
      primary: "bg-primary text-white border-transparent hover:bg-primary-light active:scale-95",
      secondary: "bg-silver-200 text-foreground border-transparent hover:bg-silver-300",
      outline: "bg-transparent text-primary border-primary hover:bg-silver-100",
      ghost: "bg-transparent text-primary border-transparent hover:bg-silver-100 underline-offset-4 hover:underline"
    };

    const sizes = {
      default: "h-12 px-6 text-lg",
      lg: "h-14 px-8 text-xl", 
      xl: "h-16 px-10 text-2xl" // Extra large for seniors
    };

    return (
      <button
        ref={ref}
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className || ''}
        `}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
