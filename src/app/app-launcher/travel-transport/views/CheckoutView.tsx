import React, { useState } from 'react';
import { BookingItem } from '../types';
import { ArrowUturnLeftIcon, CheckCircleIcon } from '../../../../icons';
import PassengerInfoForm from '../../../../components/app-launcher/travel-transport/PassengerInfoForm';
import PaymentForm from '../../../../components/app-launcher/travel-transport/PaymentForm';
import BookingSummary from '../../../../components/app-launcher/travel-transport/BookingSummary';
import { useTravelBooking } from '../context/TravelBookingContext';

interface CheckoutViewProps {
    item: BookingItem;
    onBack: () => void;
    onComplete: () => void;
}

type Step = 'info' | 'payment' | 'confirmation';

const CheckoutView: React.FC<CheckoutViewProps> = ({ item, onBack, onComplete }) => {
    const { passengers, updatePassengers } = useTravelBooking();
    const [step, setStep] = useState<Step>('info');

    const handleNext = () => {
        if (step === 'info') setStep('payment');
        if (step === 'payment') setStep('confirmation');
    };

    const steps = [
        { id: 'info', label: 'Passenger Info' },
        { id: 'payment', label: 'Payment' },
        { id: 'confirmation', label: 'Confirmation' },
    ];
    const currentStepIndex = steps.findIndex(s => s.id === step);

    const renderStepContent = () => {
        switch(step) {
            case 'info':
                return <PassengerInfoForm passengers={passengers} setPassengers={updatePassengers} />;
            case 'payment':
                return <PaymentForm />;
            case 'confirmation':
                return (
                    <div className="text-center p-8 bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark rounded-lg">
                        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4"/>
                        <h2 className="text-2xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Booking Confirmed!</h2>
                        <p className="mt-2 text-gyn-text-primary-light dark:text-gyn-text-primary-dark">A confirmation has been sent to your email. Thank you for booking with us.</p>
                    </div>
                );
        }
    }

    return (
        <div className="p-4 md:p-8">
            <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold mb-4 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark hover:text-gyn-accent-light dark:hover:text-gyn-accent-dark">
                <ArrowUturnLeftIcon className="w-5 h-5"/>
                Back
            </button>
            <div className="bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark p-6 rounded-lg shadow-lg">
                
                {/* Stepper */}
                <div className="mb-8">
                    <ol className="flex items-center w-full">
                        {steps.map((s, index) => (
                             <li key={s.id} className={`flex w-full items-center ${index < steps.length - 1 ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block" : ""} ${index <= currentStepIndex ? 'text-gyn-accent-light dark:text-gyn-accent-dark after:border-gyn-accent-light dark:after:border-gyn-accent-dark' : 'text-gyn-text-primary-light/50 dark:text-gyn-text-primary-dark/50 after:border-gyn-border-primary-light dark:after:border-gyn-border-primary-dark'}`}>
                                <span className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${index <= currentStepIndex ? 'bg-gyn-accent-light dark:bg-gyn-accent-dark text-gyn-blue-dark' : 'bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark'}`}>
                                    {index < currentStepIndex ? <CheckCircleIcon className="w-6 h-6"/> : <span className="font-bold">{index + 1}</span>}
                                </span>
                            </li>
                        ))}
                    </ol>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {renderStepContent()}
                    </div>
                    <div className="lg:col-span-1">
                        <BookingSummary item={item} passengersCount={passengers.length} />
                    </div>
                </div>

                <div className="flex justify-end mt-8 border-t border-gyn-border-primary-light dark:border-gyn-border-primary-dark pt-4">
                    {step === 'confirmation' ? (
                        <button onClick={onComplete} className="px-6 py-2 bg-gyn-sidebar-light dark:bg-gyn-sidebar-dark text-gyn-sidebar-text-light dark:text-gyn-sidebar-text-dark font-bold rounded-md hover:bg-gyn-sidebar-interactive-light dark:hover:bg-gyn-sidebar-interactive-dark transition-colors">
                            Finish
                        </button>
                    ) : (
                        <button onClick={handleNext} className="px-6 py-2 bg-gyn-accent-light dark:bg-gyn-accent-dark text-gyn-blue-dark font-bold rounded-md hover:opacity-90 transition-opacity">
                            {step === 'info' ? 'Proceed to Payment' : 'Confirm & Pay'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckoutView;