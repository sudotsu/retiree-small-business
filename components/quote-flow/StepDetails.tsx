import React from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface StepDetailsProps {
    data: any;
    updateData: (key: string, value: any) => void;
    onNext: () => void;
    onBack: () => void;
}

export const StepDetails: React.FC<StepDetailsProps> = ({ data, updateData, onNext, onBack }) => {
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!data.industry) newErrors.industry = "Industry is required.";
        // Simple checks for revenue/employees, could be more robust
        if (!data.revenue) newErrors.revenue = "Estimated Revenue is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validate()) {
            onNext();
        }
    };

    return (
        <div className="flex flex-col gap-6 animate-in">
            <div className="mb-4">
                <h2 className="text-3xl font-bold text-primary mb-2">Business Details</h2>
                <p className="text-xl text-gray-700">Help us understand your coverage needs.</p>
            </div>

            <Card className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="industry-select" className="text-lg font-bold text-foreground">
                        Industry
                    </label>
                    <select
                        id="industry-select"
                        className="h-14 px-4 rounded-lg border-2 border-silver-200 text-xl w-full bg-white focus:border-primary focus:ring-4 focus:ring-accent-gold/30"
                        value={data.industry || ''}
                        onChange={(e) => updateData('industry', e.target.value)}
                    >
                        <option value="">Select an industry...</option>
                        <option value="consulting">Consulting</option>
                        <option value="retail">Retail</option>
                        <option value="technology">Technology / IT</option>
                        <option value="construction">Construction / Handyman</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.industry && <p className="text-base font-bold text-red-700">⚠️ {errors.industry}</p>}
                </div>

                <Input
                    label="Number of Employees"
                    type="number"
                    value={data.employees || ''}
                    onChange={(e) => updateData('employees', e.target.value)}
                    placeholder="0"
                    helperText="Include yourself."
                />

                <Input
                    label="Estimated Annual Revenue ($)"
                    type="number"
                    value={data.revenue || ''}
                    onChange={(e) => updateData('revenue', e.target.value)}
                    placeholder="e.g. 50000"
                    error={errors.revenue}
                />
            </Card>

            <div className="flex flex-col-reverse md:flex-row justify-between gap-4 mt-4">
                <Button onClick={onBack} variant="outline" size="lg">
                    Back
                </Button>
                <Button onClick={handleNext} size="lg">
                    Next: Review
                </Button>
            </div>
        </div>
    );
};
