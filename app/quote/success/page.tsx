'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const businessName = searchParams.get('businessName');
    const industry = searchParams.get('industry');

    return (
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-8 animate-in">
            <div className="text-green-700">
                <CheckCircle size={80} />
            </div>

            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-primary">Quote Ready!</h1>
                <p className="text-xl text-gray-700">
                    Great news for <span className="font-bold">{businessName}</span>.
                </p>
            </div>

            <Card className="w-full bg-blue-50 border-blue-200">
                <h2 className="text-2xl font-bold text-primary mb-4 text-center">Estimated Policy Premium</h2>
                <div className="text-center py-6">
                    <span className="text-5xl font-black text-primary">$45</span>
                    <span className="text-xl text-gray-600"> / month</span>
                    <p className="mt-2 text-lg text-gray-700 font-medium">
                        Standard Business Owners Policy (BOP) for {industry}
                    </p>
                </div>
                <div className="border-t border-blue-200 pt-4 mt-4">
                    <ul className="space-y-2 text-lg">
                        <li className="flex items-center gap-2">✅ General Liability: $1,000,000</li>
                        <li className="flex items-center gap-2">✅ Property Damage: $50,000</li>
                        <li className="flex items-center gap-2">✅ Business Income: 12 Months</li>
                    </ul>
                </div>
            </Card>

            <div className="flex flex-col gap-4 w-full md:w-auto">
                <Button size="xl" className="w-full md:w-auto bg-green-700 hover:bg-green-800">
                    Purchase Policy Online
                </Button>
                <div className="text-center">
                    <span className="text-lg font-bold text-gray-700">OR</span>
                </div>
                <Button variant="outline" size="lg" className="w-full md:w-auto">
                    Call an Agent: 1-800-555-0199
                </Button>
            </div>

            <Link href="/" className="text-primary hover:underline underline-offset-4 mt-8">
                Return to Home
            </Link>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <main className="min-h-screen bg-background py-12 px-4">
            <Suspense fallback={<div>Loading quote...</div>}>
                <SuccessContent />
            </Suspense>
        </main>
    );
}
