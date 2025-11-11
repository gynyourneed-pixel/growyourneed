import React, { useState } from 'react';
import DropdownMenu from './DropdownMenu';
import { UserIcon, Cog6ToothIcon, ArrowLeftStartOnRectangleIcon } from '../icons';
import ThemeToggle from './ThemeToggle';
import { UserData } from '../types';

interface ProfileDropdownProps {
  size?: 'small' | 'medium';
  user: UserData;
}

const DropdownButton: React.FC<{ children: React.ReactNode; icon: React.ReactNode; onClick?: () => void }> = ({ children, icon, onClick }) => (
    <button onClick={onClick} className="w-full text-left px-4 py-2 text-sm text-gyn-text-primary-light dark:text-gyn-text-primary-dark hover:bg-gyn-bg-tertiary-light dark:hover:bg-gyn-bg-tertiary-dark flex items-center gap-3 transition-colors">
      {icon}
      {children}
    </button>
);

const DropdownContent: React.FC<{ children: React.ReactNode; icon: React.ReactNode }> = ({ children, icon }) => (
    <div className="flex items-center gap-3 px-4 py-2 text-sm text-gyn-text-primary-light dark:text-gyn-text-primary-dark">
    {icon}
    {children}
    </div>
);

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ size = 'medium', user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sizeClasses = {
    small: 'w-9 h-9',
    medium: 'w-10 h-10',
  }[size];

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`block rounded-full border-2 border-gyn-accent-light dark:border-gyn-accent-dark overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gyn-accent-light dark:focus:ring-gyn-accent-dark ${sizeClasses}`}
      >
        <img src={user.avatarUrl[size]} alt="Admin User" className="w-full h-full object-cover" />
      </button>

      <DropdownMenu isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)}>
        <DropdownButton icon={<UserIcon className="w-5 h-5" />}>
            My Account
        </DropdownButton>
        <DropdownButton icon={<Cog6ToothIcon className="w-5 h-5" />}>
            Settings
        </DropdownButton>
        <div className="border-t border-gyn-border-primary-light dark:border-gyn-border-primary-dark my-1"></div>
        <DropdownContent icon={<span className="w-5 h-5" />}>
            <ThemeToggle />
        </DropdownContent>
        <div className="border-t border-gyn-border-primary-light dark:border-gyn-border-primary-dark my-1"></div>
        <DropdownButton icon={<ArrowLeftStartOnRectangleIcon className="w-5 h-5" />}>
            Logout
        </DropdownButton>
      </DropdownMenu>
    </div>
  );
};

export default ProfileDropdown;