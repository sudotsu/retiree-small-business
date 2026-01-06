import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={`
          bg-white rounded-xl border-2 border-silver-200 shadow-sm p-6
          hover:shadow-md transition-shadow
          ${className || ''}
        `}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Card.displayName = "Card";
