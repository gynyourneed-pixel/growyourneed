import React from 'react';
import ResultCard from './ResultCard';
import { Flight, Hotel, Car, Transport, Deal } from '../../../app/app-launcher/travel-transport/types';

// FIX: Removed 'Deal' from ItemType as ResultCard does not handle it.
type ItemType = Flight | Hotel | Car | Transport;
// FIX: Removed 'deal' from ResultType as ResultCard does not handle it.
type ResultType = 'flight' | 'hotel' | 'car' | 'transport';

interface ResultsListProps<T extends ItemType> {
  items: T[];
  type: ResultType;
  onSelect: (item: T) => void;
}

const ResultsList = <T extends ItemType>({ items, type, onSelect }: ResultsListProps<T>) => {
  if (items.length === 0) {
    return (
      <div className="text-center p-8 bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark rounded-lg">
        <p className="text-gyn-text-primary-light dark:text-gyn-text-primary-dark">No results found for the current filter.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* FIX: Passed 'onSelect' as 'onBook' to match the ResultCard's prop interface. */}
      {items.map(item => (
        <ResultCard key={item.id} item={item} type={type} onBook={() => onSelect(item)} />
      ))}
    </div>
  );
};

export default ResultsList;
