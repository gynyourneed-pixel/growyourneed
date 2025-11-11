
import React, { useEffect, useRef } from 'react';

interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ isOpen, onClose, children }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 w-48 bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark rounded-md shadow-lg border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark z-50 animate-fadeInUp"
      style={{ animationDuration: '200ms' }}
    >
      <div className="py-1">
        {children}
      </div>
    </div>
  );
};

export default DropdownMenu;
