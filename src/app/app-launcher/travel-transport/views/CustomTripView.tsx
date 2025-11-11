import React from 'react';
import { MapPinIcon, SparklesIcon, PlusIcon } from '../../../../icons';

const CustomTripView: React.FC = () => {
    const interests = ['History', 'Food', 'Adventure', 'Relaxation', 'Nightlife', 'Nature', 'Art & Culture'];

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark mb-6">Build Your Custom Trip</h2>

            <div className="bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark p-6 rounded-lg shadow-lg space-y-6">
                <div>
                    <label className="block text-lg font-semibold mb-2">Destinations</label>
                    <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                             <MapPinIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gyn-text-primary-light dark:text-gyn-text-primary-dark"/>
                            <input type="text" placeholder="e.g., Paris, France" className="w-full p-2 pl-10 rounded-md bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark"/>
                        </div>
                         <button className="p-2 rounded-md bg-gyn-bg-tertiary-light dark:bg-gyn-bg-tertiary-dark"><PlusIcon className="w-5 h-5"/></button>
                    </div>
                </div>

                <div>
                    <label className="block text-lg font-semibold mb-2">What are your interests?</label>
                    <div className="flex flex-wrap gap-2">
                        {interests.map(interest => (
                            <button key={interest} className="px-4 py-2 rounded-full text-sm font-semibold bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark hover:border-gyn-accent-light dark:hover:border-gyn-accent-dark hover:text-gyn-accent-light dark:hover:text-gyn-accent-dark transition-colors">
                                {interest}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="border-t border-gyn-border-primary-light dark:border-gyn-border-primary-dark pt-6 text-center">
                    <button className="flex items-center justify-center gap-3 w-full md:w-auto px-8 py-3 bg-gyn-accent-light dark:bg-gyn-accent-dark text-gyn-blue-dark font-bold text-lg rounded-md hover:opacity-90 transition-opacity">
                        <SparklesIcon className="w-6 h-6"/>
                        Generate Itinerary
                    </button>
                    <p className="text-xs text-gyn-text-primary-light/70 dark:text-gyn-text-primary-dark/70 mt-2">(AI Itinerary generation is a feature coming soon)</p>
                </div>
            </div>
        </div>
    );
};

export default CustomTripView;