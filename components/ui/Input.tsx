import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, helperText, id, ...props }, ref) => {
        const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

        return (
            <div className="flex flex-col gap-2 w-full">
                <label
                    htmlFor={inputId}
                    className="text-lg font-bold text-foreground"
                >
                    {label}
                </label>

                <input
                    ref={ref}
                    id={inputId}
                    className={`
            h-14 px-4 rounded-lg border-2 text-xl w-full transition-all
            focus:outline-none focus:ring-4 focus:ring-accent-gold/30
            ${error
                            ? 'border-red-600 focus:border-red-600 bg-red-50'
                            : 'border-silver-200 focus:border-primary bg-white'
                        }
            ${className || ''}
          `}
                    {...props}
                />

                {helperText && !error && (
                    <p className="text-base text-gray-600 px-1">
                        {helperText}
                    </p>
                )}

                {error && (
                    <p className="text-base font-bold text-red-700 px-1 flex items-center gap-2">
                        ⚠️ {error}
                    </p>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";
