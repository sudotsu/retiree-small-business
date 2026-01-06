import React from 'react';
import QuoteWizard from '@/components/quote-flow/QuoteWizard';

export default function QuotePage() {
    return (
        <main className="min-h-screen bg-background py-10">
            <div className="container mx-auto px-4">
                <header className="mb-8 text-center">
                    <h1 className="text-4xl font-extrabold text-primary mb-2">Get Your Business Quote</h1>
                    <p className="text-xl text-gray-600">Fast, easy, and secure.</p>
                </header>

                <QuoteWizard />
            </div>
        </main>
    );
}
