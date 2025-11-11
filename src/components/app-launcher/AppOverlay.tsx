
import React from 'react';
import { AppState, AppHeaderItem } from '../../types';
import { XMarkIcon, MinusIcon, WindowIcon } from '../../icons';

interface AppOverlayProps {
  app: AppState;
  isActive: boolean;
  onClose: () => void;
  onMinimize: () => void;
  children: React.ReactNode;
  headerItems?: AppHeaderItem[];
  activeHeaderTab?: string;
  onHeaderTabChange?: (id: string) => void;
}

const AppOverlay: React.FC<AppOverlayProps> = ({ app, isActive, onClose, onMinimize, children, headerItems, activeHeaderTab, onHeaderTabChange }) => {
  return (
    <div
      className={`absolute inset-0 bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark rounded-lg shadow-2xl flex flex-col border-2 transition-all duration-300 overflow-hidden ${
        isActive
          ? 'z-10 border-gyn-accent-light dark:border-gyn-accent-dark scale-100 opacity-100'
          : 'z-0 border-gyn-border-primary-light dark:border-gyn-border-primary-dark scale-95 opacity-80'
      }`}
    >
      {/* Header - Skeuomorphic Design */}
      <header className="h-14 shrink-0 flex items-center justify-between px-6 bg-gradient-to-b from-gray-100 via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 rounded-t-md border-b-2 border-gray-300 dark:border-gray-700 cursor-grab shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),inset_0_-1px_0_0_rgba(0,0,0,0.1)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),inset_0_-1px_0_0_rgba(0,0,0,0.3)]">
        {/* Left: App Title with Neumorphism - Royal Blue */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-blue-600 dark:bg-blue-700 shadow-[8px_8px_16px_rgba(0,0,0,0.25),-8px_-8px_16px_rgba(96,165,250,0.3)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.5),-8px_-8px_16px_rgba(59,130,246,0.15)]">
          <app.icon className="w-6 h-6 text-white drop-shadow-md" />
          <h2 className="font-bold text-white drop-shadow-md tracking-wide">{app.name}</h2>
        </div>
        
        {/* Center: Header Tabs - Neumorphism Background */}
        {headerItems && headerItems.length > 0 && onHeaderTabChange && (
          <nav className="relative flex items-center gap-1 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 shadow-[8px_8px_16px_rgba(0,0,0,0.15),-8px_-8px_16px_rgba(255,255,255,0.7)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.4),-8px_-8px_16px_rgba(255,255,255,0.05)]">{/* Neumorphism background */}
            
            {/* Tab Buttons with 3D Dividers */}
            {headerItems.map((tab, index) => (
              <React.Fragment key={tab.id}>
                <button
                  onClick={() => onHeaderTabChange(tab.id)}
                  className={`relative z-10 py-2 px-5 rounded-lg font-bold text-xs transition-all duration-300 whitespace-nowrap ${
                    activeHeaderTab === tab.id 
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md scale-105' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-102'
                  }`}
                >
                  {tab.label}
                </button>
                
                {/* 3D SVG Divider - Only between buttons, not after last one */}
                {index < headerItems.length - 1 && (
                  <div className="relative z-10 flex items-center justify-center w-6 h-8">
                    <svg 
                      width="24" 
                      height="32" 
                      viewBox="0 0 24 32" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="drop-shadow-sm"
                    >
                      {/* 3D Divider with depth effect */}
                      <defs>
                        <linearGradient id={`divider-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(148, 163, 184, 0.4)" />
                          <stop offset="50%" stopColor="rgba(203, 213, 225, 0.6)" />
                          <stop offset="100%" stopColor="rgba(148, 163, 184, 0.4)" />
                        </linearGradient>
                        <filter id={`shadow-${index}`}>
                          <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
                          <feOffset dx="1" dy="1" result="offsetblur" />
                          <feComponentTransfer>
                            <feFuncA type="linear" slope="0.3" />
                          </feComponentTransfer>
                          <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                      
                      {/* Back shadow layer for 3D depth */}
                      <path
                        d="M 13 6 Q 14 8, 13 10 L 13 22 Q 14 24, 13 26"
                        stroke="rgba(0, 0, 0, 0.1)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                      />
                      
                      {/* Main divider line with gradient */}
                      <path
                        d="M 12 6 Q 13 8, 12 10 L 12 22 Q 13 24, 12 26"
                        stroke={`url(#divider-gradient-${index})`}
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                        filter={`url(#shadow-${index})`}
                      />
                      
                      {/* Highlight edge for 3D effect */}
                      <path
                        d="M 11 6 Q 12 8, 11 10 L 11 22 Q 12 24, 11 26"
                        stroke="rgba(255, 255, 255, 0.5)"
                        strokeWidth="0.5"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        
        {/* Right: Control Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onMinimize}
            className="w-9 h-9 flex items-center justify-center rounded-lg backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 hover:bg-yellow-500/20 dark:hover:bg-yellow-500/30 hover:border-yellow-500/50 dark:hover:border-yellow-500/40 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]"
            aria-label={`Minimize ${app.name}`}
          >
            <MinusIcon className="w-5 h-5 text-gyn-text-secondary-light dark:text-white" />
          </button>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-lg backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 hover:bg-red-500/20 dark:hover:bg-red-500/30 hover:border-red-500/50 dark:hover:border-red-500/40 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
            aria-label={`Close ${app.name}`}
          >
            <XMarkIcon className="w-5 h-5 text-gyn-text-secondary-light dark:text-white" />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-hidden bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark rounded-b-md">
        {children}
      </div>
    </div>
  );
};

export default AppOverlay;
