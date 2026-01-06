'use client';

import React, { useState } from 'react';
import { ProgressBar } from '../ui/ProgressBar';
import { StepBasics } from './StepBasics';
import { StepDetails } from './StepDetails';
import { StepReview } from './StepReview';
import { useRouter } from 'next/navigation';

export default function QuoteWizard() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        businessName: '',
        zipCode: '',
        industry: '',
        employees: '',
        revenue: ''
    });

    const updateData = (key: string, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const nextStep = () => setStep(s => Math.min(s + 1, 3));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const handleSubmit = async () => {
        // In a real app, we'd submit to API. 
        // For this demo, we simulate a delay then redirect.
        // We could store data in query params or local storage to show on success page.
        const query = new URLSearchParams(formData as any).toString();
        router.push(`/quote/success?${query}`);
    };

    return (
        <div className="max-w-2xl mx-auto w-full px-4 py-8">
            <ProgressBar currentStep={step} totalSteps={3} />

            <div className="min-h-[400px]">
                {step === 1 && (
                    <StepBasics
                        data={formData}
                        updateData={updateData}
                        onNext={nextStep}
                    />
                )}
                {step === 2 && (
                    <StepDetails
                        data={formData}
                        updateData={updateData}
                        onNext={nextStep}
                        onBack={prevStep}
                    />
                )}
                {step === 3 && (
                    <StepReview
                        data={formData}
                        onBack={prevStep}
                        onSubmit={handleSubmit}
                    />
                )}
            </div>
        </div>
    );
}
