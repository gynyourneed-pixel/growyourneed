
import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, disabled = false }) => {
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from bubbling up to parent elements
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={handleToggle}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gyn-accent-light dark:focus:ring-gyn-accent-dark focus:ring-offset-2 focus:ring-offset-gyn-bg-secondary-light dark:focus:ring-offset-gyn-bg-secondary-dark
        ${checked ? 'bg-gyn-accent-light dark:bg-gyn-accent-dark' : 'bg-gyn-border-primary-light dark:bg-gyn-border-primary-dark'}
        ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      <span
        aria-hidden="true"
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
          ${checked ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  );
};

export default Toggle;
