import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '../../../icons';

type FieldType = 'from' | 'to' | 'location' | 'date' | 'passengers' | 'guests';

interface SearchFormProps {
  fields: FieldType[];
  onSearch: (params: any) => void;
}

const fieldLabels: Record<FieldType, string> = {
    from: 'From',
    to: 'To',
    location: 'Location',
    date: 'Date',
    passengers: 'Passengers',
    guests: 'Guests'
};

const SearchForm: React.FC<SearchFormProps> = ({ fields, onSearch }) => {
    const [params, setParams] = useState<{[key: string]: string}>({});

    const handleChange = (field: FieldType, value: string) => {
        setParams(prev => ({...prev, [field]: value}));
    };

    const handleSearch = () => {
        onSearch(params);
    };

  return (
    <div className="bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {fields.map(field => (
          <div key={field}>
            <label className="block text-sm font-medium text-gyn-text-primary-light dark:text-gyn-text-primary-dark mb-1">
              {fieldLabels[field]}
            </label>
            <input
              type={field === 'date' ? 'date' : field === 'passengers' || field === 'guests' ? 'number' : 'text'}
              className="w-full p-2 rounded-md bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark focus:ring-gyn-accent-light dark:focus:ring-gyn-accent-dark focus:border-gyn-accent-light dark:focus:border-gyn-accent-dark text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark"
              value={params[field] || (field === 'date' ? new Date().toISOString().split('T')[0] : '')}
              onChange={(e) => handleChange(field, e.target.value)}
              min={field.includes('passengers') || field.includes('guests') ? 1 : undefined}
            />
          </div>
        ))}
        <div className="flex items-end">
          <button
            onClick={handleSearch}
            className="w-full flex items-center justify-center gap-2 p-2 h-10 bg-gyn-accent-light dark:bg-gyn-accent-dark text-gyn-blue-dark font-bold rounded-md hover:opacity-90 transition-opacity"
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;