import React from 'react';
import { MagnifyingGlassIcon, AirplaneIcon } from '../../../../icons';

const FlightStatusView: React.FC = () => {
    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark mb-6">Check Flight Status</h2>
            
            <div className="max-w-xl mx-auto bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark p-6 rounded-lg shadow-lg">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm">Airline</label>
                        <input type="text" placeholder="e.g., American Airlines" className="w-full p-2 mt-1 rounded-md bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark border border-gyn-border-primary-light dark:border-gyn-border-primary-dark"/>
                    </div>
                    <div>
                        <label className="text-sm">Flight Number</label>
                        <input type="text" placeholder="e.g., AA123" className="w-full p-2 mt-1 rounded-md bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark border border-gyn-border-primary-light dark:border-gyn-border-primary-dark"/>
                    </div>
                </div>
                <button className="w-full mt-4 flex items-center justify-center gap-2 p-2 h-10 bg-gyn-accent-light dark:bg-gyn-accent-dark text-gyn-blue-dark font-bold rounded-md hover:opacity-90 transition-opacity">
                    <MagnifyingGlassIcon className="w-5 h-5"/>
                    Check Status
                </button>
            </div>

            <div className="max-w-xl mx-auto mt-6 text-center text-gyn-text-primary-light dark:text-gyn-text-primary-dark">
                <AirplaneIcon className="w-12 h-12 mx-auto text-gyn-text-primary-light/50 dark:text-gyn-text-primary-dark/50"/>
                <p className="mt-2">Enter flight details above to see real-time status.</p>
            </div>
        </div>
    );
};

export default FlightStatusView;