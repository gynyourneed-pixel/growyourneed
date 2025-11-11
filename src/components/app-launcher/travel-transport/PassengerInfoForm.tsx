import React from 'react';
import { PlusIcon, XMarkIcon } from '../../../icons';

interface Passenger {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

interface PassengerInfoFormProps {
    passengers: Passenger[];
    setPassengers: React.Dispatch<React.SetStateAction<Passenger[]>>;
}

const PassengerInfoForm: React.FC<PassengerInfoFormProps> = ({ passengers, setPassengers }) => {

    const handleAddPassenger = () => {
        const newId = passengers.length > 0 ? Math.max(...passengers.map(p => p.id)) + 1 : 1;
        setPassengers([...passengers, { id: newId, firstName: '', lastName: '', email: '' }]);
    };

    const handleRemovePassenger = (id: number) => {
        setPassengers(passengers.filter(p => p.id !== id));
    };

    const handleChange = (id: number, field: keyof Omit<Passenger, 'id'>, value: string) => {
        setPassengers(passengers.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Passenger Information</h2>
            {passengers.map((passenger, index) => (
                <div key={passenger.id} className="p-4 rounded-lg bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark border border-gyn-border-primary-light dark:border-gyn-border-primary-dark">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Passenger {index + 1}</h3>
                        {passengers.length > 1 && (
                            <button onClick={() => handleRemovePassenger(passenger.id)} className="text-red-500 hover:text-red-700">
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm">First Name</label>
                            <input type="text" value={passenger.firstName} onChange={(e) => handleChange(passenger.id, 'firstName', e.target.value)} className="w-full p-2 mt-1 rounded-md bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark border border-gyn-border-primary-light dark:border-gyn-border-primary-dark"/>
                        </div>
                        <div>
                            <label className="text-sm">Last Name</label>
                            <input type="text" value={passenger.lastName} onChange={(e) => handleChange(passenger.id, 'lastName', e.target.value)} className="w-full p-2 mt-1 rounded-md bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark border border-gyn-border-primary-light dark:border-gyn-border-primary-dark"/>
                        </div>
                        <div className="md:col-span-2">
                             <label className="text-sm">Email</label>
                            <input type="email" value={passenger.email} onChange={(e) => handleChange(passenger.id, 'email', e.target.value)} className="w-full p-2 mt-1 rounded-md bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark border border-gyn-border-primary-light dark:border-gyn-border-primary-dark"/>
                        </div>
                    </div>
                </div>
            ))}
             <button onClick={handleAddPassenger} className="flex items-center gap-2 text-sm font-semibold text-gyn-accent-light dark:text-gyn-accent-dark">
                <PlusIcon className="w-5 h-5" />
                Add Another Passenger
            </button>
        </div>
    );
};

export default PassengerInfoForm;
