import React from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface StepBasicsProps {
    data: any;
    updateData: (key: string, value: any) => void;
    onNext: () => void;
}

export const StepBasics: React.FC<StepBasicsProps> = ({ data, updateData, onNext }) => {
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!data.businessName) newErrors.businessName = "Business Name is required.";
        if (!data.zipCode) newErrors.zipCode = "Zip Code is required.";
        else if (!/^\d{5}$/.test(data.zipCode)) newErrors.zipCode = "Please enter a valid 5-digit Zip Code.";

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
                <h2 className="text-3xl font-bold text-primary mb-2">Let's get started</h2>
                <p className="text-xl text-gray-700">Tell us a little about your business.</p>
            </div>

            <Card className="flex flex-col gap-6">
                <Input
                    label="Business Name"
                    placeholder="e.g. Smith Consulting"
                    value={data.businessName || ''}
                    onChange={(e) => updateData('businessName', e.target.value)}
                    error={errors.businessName}
                    autoFocus // A11y: Focus on first input for better keyboard nav
                />

                <Input
                    label="Business Zip Code"
                    placeholder="e.g. 12345"
                    value={data.zipCode || ''}
                    onChange={(e) => updateData('zipCode', e.target.value)}
                    error={errors.zipCode}
                    maxLength={5}
                    inputMode="numeric"
                />
            </Card>

            <Button onClick={handleNext} size="lg" className="mt-4 w-full md:w-auto self-end">
                Next: Business Details
            </Button>
        </div>
    );
};
