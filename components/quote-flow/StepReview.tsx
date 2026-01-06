import React from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface StepReviewProps {
    data: any;
    onBack: () => void;
    onSubmit: () => void;
}

export const StepReview: React.FC<StepReviewProps> = ({ data, onBack, onSubmit }) => {
    return (
        <div className="flex flex-col gap-6 animate-in">
            <div className="mb-4">
                <h2 className="text-3xl font-bold text-primary mb-2">Review Information</h2>
                <p className="text-xl text-gray-700">Please verify your details before getting a quote.</p>
            </div>

            <Card className="flex flex-col gap-4 bg-silver-100">
                <h3 className="text-xl font-bold border-b border-silver-300 pb-2">Business Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <span className="block text-sm font-semibold text-gray-600">Business Name</span>
                        <span className="text-lg font-medium">{data.businessName}</span>
                    </div>
                    <div>
                        <span className="block text-sm font-semibold text-gray-600">Zip Code</span>
                        <span className="text-lg font-medium">{data.zipCode}</span>
                    </div>
                </div>

                <h3 className="text-xl font-bold border-b border-silver-300 pb-2 mt-4">Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <span className="block text-sm font-semibold text-gray-600">Industry</span>
                        <span className="text-lg font-medium capitalize">{data.industry}</span>
                    </div>
                    <div>
                        <span className="block text-sm font-semibold text-gray-600">Employees</span>
                        <span className="text-lg font-medium">{data.employees || 0}</span>
                    </div>
                    <div>
                        <span className="block text-sm font-semibold text-gray-600">Est. Revenue</span>
                        <span className="text-lg font-medium">${data.revenue}</span>
                    </div>
                </div>
            </Card>

            <div className="flex flex-col-reverse md:flex-row justify-between gap-4 mt-4">
                <Button onClick={onBack} variant="outline" size="lg">
                    Back
                </Button>
                <Button onClick={onSubmit} size="lg" className="bg-green-700 hover:bg-green-800 text-white">
                    Get My Quote
                </Button>
            </div>
        </div>
    );
};
