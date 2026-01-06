import React from 'react';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
    label?: string; // Optional label for screen readers "Step X of Y"
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, label }) => {
    const percentage = Math.min(100, Math.max(0, (currentStep / totalSteps) * 100));

    return (
        <div
            className="w-full flex flex-col gap-2 mb-8"
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={label || `Step ${currentStep} of ${totalSteps}`}
        >
            <div className="flex justify-between text-base font-bold text-primary">
                <span>Step {currentStep}</span>
                <span>{totalSteps} Steps</span>
            </div>
            <div className="w-full h-4 bg-silver-200 rounded-full overflow-hidden border border-silver-300">
                <div
                    className="h-full bg-accent-gold transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};
