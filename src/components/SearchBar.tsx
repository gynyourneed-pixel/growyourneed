
import React from 'react';
import { MagnifyingGlassIcon } from '../icons';

const SearchBar: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      <input 
        type="text" 
        placeholder="Search"
        className="w-full h-full px-4 pr-10 rounded-md border-2 border-gyn-accent-light dark:border-gyn-accent-dark bg-gyn-bg-tertiary-light dark:bg-gyn-bg-tertiary-dark focus:outline-none focus:ring-2 focus:ring-gyn-accent-light dark:focus:ring-gyn-accent-dark text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark placeholder-gyn-text-primary-light/70 dark:placeholder-gyn-text-primary-dark/70"
      />
      <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark pointer-events-none"/>
    </div>
  );
};

export default SearchBar;
