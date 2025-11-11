import React from 'react';
import { LAUNCHER_APPS } from '../../lib/constants';
import { useAppLauncher } from '../../context/AppLauncherContext';
import { AppItem } from '../../types';
import { XMarkIcon } from '../../icons';

// App Button Component
const AppButton: React.FC<{item: AppItem, index: number}> = ({item, index}) => {
    const { openApp } = useAppLauncher();
    return (
        <div
            className="group relative flex flex-col items-center gap-3 animate-fadeInUp cursor-pointer"
            style={{ animationDelay: `${index * 50}ms`, opacity: 0, animationFillMode: 'forwards' }}
            onClick={() => openApp(item)}
        >
            <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-gyn-accent-dark group-hover:shadow-[0_0_20px_0_rgba(245,166,35,0.5)]">
                <item.icon className="w-12 h-12 text-white transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="text-center max-w-[150px]">
                <span className="text-sm text-white font-semibold transition-all duration-300 group-hover:text-gyn-accent-dark" style={{ textShadow: '0 0 8px rgba(255,255,255,0.3)' }}>{item.name}</span>
                <p className="text-[11px] text-white/70 mt-1 leading-tight">{item.description}</p>
            </div>
        </div>
    );
}

// Main Launcher Grid Component
interface LauncherGridProps {
  onClose: () => void;
}

const LauncherGrid: React.FC<LauncherGridProps> = ({ onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-slate-900 z-50 flex flex-col items-center justify-center p-4 animate-scaleIn overflow-hidden" 
            style={{animationDuration: '300ms'}}
            onClick={onClose}
        >
            {/* Animated Background */}
            <div 
                className="absolute -z-10 top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500 via-purple-800 to-slate-900 opacity-40 animate-aurora"
                style={{ backgroundSize: '400% 400%' }}
            />
             <div 
                className="absolute -z-10 top-0 left-0 w-full h-full bg-gradient-to-tr from-pink-500 via-transparent to-transparent opacity-30 animate-aurora"
                style={{ backgroundSize: '300% 300%', animationDelay: '3s', animationDirection: 'reverse' }}
            />

            <button 
                onClick={onClose}
                className="group absolute top-6 right-6 w-14 h-14 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center z-20 transition-all duration-300 hover:shadow-[0_0_20px_0_rgba(255,255,255,0.4)] hover:bg-white/20"
                aria-label="Close app launcher"
            >
                <XMarkIcon className="w-8 h-8 transition-transform duration-300 group-hover:rotate-90"/>
            </button>
            
            <div 
                className="w-full h-full flex items-center justify-center z-10"
                onClick={e => e.stopPropagation()} 
            >
                <div 
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12 max-h-[80vh] overflow-y-auto p-8 rounded-lg no-scrollbar"
                >
                    {LAUNCHER_APPS.map((app, index) => (
                        <AppButton key={app.id} item={app} index={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LauncherGrid;