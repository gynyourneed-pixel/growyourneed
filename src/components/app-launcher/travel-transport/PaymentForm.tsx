import React from 'react';
import { CreditCardIcon, LockClosedIcon } from '../../../icons';

const PaymentForm: React.FC = () => {
    return (
        <div className="space-y-6">
             <h2 className="text-xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Payment Details</h2>
            <div className="p-4 rounded-lg bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark border border-gyn-border-primary-light dark:border-gyn-border-primary-dark space-y-4">
                <div className="flex items-center gap-2 text-sm text-gyn-text-primary-light dark:text-gyn-text-primary-dark">
                    <CreditCardIcon className="w-5 h-5"/>
                    <span>Pay with Credit Card</span>
                </div>
                 <div>
                    <label className="text-sm">Card Number</label>
                    <input type="text" placeholder="**** **** **** 1234" className="w-full p-2 mt-1 rounded-md bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark border border-gyn-border-primary-light dark:border-gyn-border-primary-dark"/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm">Expiration (MM/YY)</label>
                        <input type="text" placeholder="MM/YY" className="w-full p-2 mt-1 rounded-md bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark border border-gyn-border-primary-light dark:border-gyn-border-primary-dark"/>
                    </div>
                    <div>
                        <label className="text-sm">CVC</label>
                        <input type="text" placeholder="123" className="w-full p-2 mt-1 rounded-md bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark border border-gyn-border-primary-light dark:border-gyn-border-primary-dark"/>
                    </div>
                </div>
                <div>
                    <label className="text-sm">Name on Card</label>
                    <input type="text" placeholder="John Doe" className="w-full p-2 mt-1 rounded-md bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark border border-gyn-border-primary-light dark:border-gyn-border-primary-dark"/>
                </div>
            </div>
             <div className="flex items-center justify-center gap-2 text-xs text-gyn-text-primary-light/70 dark:text-gyn-text-primary-dark/70">
                <LockClosedIcon className="w-4 h-4"/>
                <span>This is a secure, simulated payment. No real card details are required.</span>
             </div>
        </div>
    );
};

export default PaymentForm;
