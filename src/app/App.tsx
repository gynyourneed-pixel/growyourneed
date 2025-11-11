import React from 'react';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import SidebarRight from '../components/SidebarRight';
import SidebarLeft from '../components/SubnavLeft';
import Footer from '../components/Footer';
import MainContent from '../components/MainContent';
import { LogoIcon, MagnifyingGlassIcon, EnvelopeIcon, XMarkIcon } from '../icons';
import SearchBar from '../components/SearchBar';
import NotificationBell from '../components/NotificationBell';
import ProfileDropdown from '../components/ProfileBadge';
import useMediaQuery from '../hooks/useMediaQuery';
import useNavigationState from '../hooks/useNavigationState';
import { user } from '../lib/data';
import AppManager from './app-launcher/AppManager';
import { AppLauncherProvider, useAppLauncher } from '../context/AppLauncherContext';
// FIX: Import NAVIGATION_MAP to resolve reference error.
import { NAVIGATION_MAP } from '../lib/constants';

const AppContent: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const {
    navigation,
    setNavigation,
    sidebars,
    setSidebars,
    isMobileSearchVisible,
    setIsMobileSearchVisible,
  } = useNavigationState(isMobile);
  const { activeAppId, minimizedApps } = useAppLauncher();
  
  // Check if any app is currently open and not minimized
  const isAppOverlayVisible = activeAppId !== null && !minimizedApps.includes(activeAppId);

  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center bg-aurora-gradient bg-[length:200%_200%] animate-aurora">
      <div className="h-full w-full bg-gyn-bg-secondary-light/70 dark:bg-gyn-bg-primary-dark/70 backdrop-blur-xl p-1.5 flex flex-col relative shadow-2xl rounded-lg border border-gyn-border-primary-light/20 dark:border-gyn-border-primary-dark/20">
        
        <div className="relative flex-1 flex flex-col min-h-0">
            {/* Top Header Bar */}
            <div className="h-20 shrink-0 flex items-center justify-between px-6 bg-transparent border-b border-gyn-border-primary-light/50 dark:border-gyn-border-primary-dark/50 rounded-t-md relative">
                
                {/* Mobile Search Overlay */}
                {isMobile && isMobileSearchVisible && (
                    <div className="absolute top-0 left-0 w-full h-full bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark flex items-center px-4 gap-2 z-20 animate-fadeInUp" style={{animationDuration: '300ms'}}>
                        <div className="flex-1 h-10">
                            <SearchBar />
                        </div>
                        <button onClick={() => setIsMobileSearchVisible(false)} className="flex w-10 h-10 items-center justify-center rounded-md border-2 border-gyn-accent-light dark:border-gyn-accent-dark text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark bg-gyn-tan">
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>
                )}

                {/* LEFT SECTION */}
                <div className="flex-1 flex justify-start">
                    <div className="flex items-center gap-2 md:gap-4">
                        <LogoIcon className="h-10 w-10 md:h-12 md:w-12" />
                        <div className="w-px h-8 bg-gyn-accent-light/50 dark:bg-gyn-accent-dark/50 relative">
                            <div className="absolute inset-0 bg-gyn-accent-light dark:bg-gyn-accent-dark blur-sm"></div>
                        </div>
                        <div className="px-2 flex items-center h-10">
                            <span className="font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark text-sm md:text-base tracking-normal md:tracking-wide whitespace-nowrap">GROW Your NEED</span>
                        </div>
                    </div>
                </div>

                {/* CENTER SECTION - Subnav Header for Desktop */}
                <div className="flex-none">
                    {!isMobile && navigation.headerItems.length > 0 && !isAppOverlayVisible && (
                        <Header 
                            items={navigation.headerItems} 
                            activeTab={navigation.activeHeaderNav} 
                            setActiveTab={(id) => setNavigation({ ...navigation, activeHeaderNav: id })}
                            isInTopBar={true}
                        />
                    )}
                </div>

                {/* RIGHT SECTION */}
                <div className="flex-1 flex justify-end">
                    {/* Desktop controls */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className="w-48 h-10">
                            <SearchBar />
                        </div>
                        <button className="flex w-10 h-10 items-center justify-center rounded-md border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark bg-gyn-bg-tertiary-light dark:bg-gyn-bg-tertiary-dark">
                            <EnvelopeIcon className="w-6 h-6" />
                        </button>
                        <NotificationBell />
                        <ProfileDropdown size="medium" user={user} />
                    </div>
                    {/* Mobile controls */}
                    <div className="flex md:hidden items-center gap-3">
                        <button onClick={() => setIsMobileSearchVisible(true)} className="flex w-9 h-9 items-center justify-center rounded-md border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark bg-gyn-bg-tertiary-light dark:bg-gyn-bg-tertiary-dark">
                            <MagnifyingGlassIcon className="w-5 h-5" />
                        </button>
                        <NotificationBell size="small" />
                        <ProfileDropdown size="small" user={user} />
                    </div>
                </div>
            </div>
            
            {/* Main Content Area */}
            <div className="flex-1 flex flex-row min-h-0 border-2 border-t-0 border-gyn-border-primary-light/50 dark:border-gyn-border-primary-dark/50 rounded-b-md">
                
                <div className="flex-1 flex flex-col min-w-0">
                    {isMobile && !isAppOverlayVisible && (
                        <Header 
                            items={navigation.headerItems} 
                            activeTab={navigation.activeHeaderNav} 
                            setActiveTab={(id) => setNavigation({ ...navigation, activeHeaderNav: id })}
                            isMobile={isMobile}
                        />
                    )}
                    <div className="flex-1 flex flex-row min-h-0">
                        {navigation.subnavItems.length > 0 && (
                        <SidebarLeft 
                            items={navigation.subnavItems}
                            activeItem={navigation.activeSubnav} 
                            setActiveItem={(id) => setNavigation({ ...navigation, activeSubnav: id })}
                            isCollapsed={sidebars.isLeftSidebarCollapsed}
                            toggleSidebar={() => setSidebars({ ...sidebars, isLeftSidebarCollapsed: !sidebars.isLeftSidebarCollapsed })}
                            isMobile={isMobile}
                        />
                        )}
                        <MainContent 
                            activeRightNav={navigation.activeRightNav}
                            activeHeaderNav={navigation.activeHeaderNav}
                        />
                    </div>
                </div>
                
                <SidebarRight 
                    activeItem={navigation.activeRightNav}
                    setActiveItem={(id) => setNavigation({ ...navigation, activeRightNav: id, activeHeaderNav: NAVIGATION_MAP[id]?.header[0]?.id || '' })}
                    isCollapsed={sidebars.isRightSidebarCollapsed}
                    toggleSidebar={() => setSidebars({ ...sidebars, isRightSidebarCollapsed: !sidebars.isRightSidebarCollapsed })}
                    isMobile={isMobile}
                    user={user}
                />

                {/* Main container with decorative corner cut-outs */}
                <div className="absolute -bottom-1.5 -left-1.5 w-10 h-10 bg-aurora-gradient bg-[length:200%_200%] animate-aurora" style={{clipPath: 'polygon(0 100%, 100% 100%, 0 0)'}}></div>
                <div className="absolute -bottom-1.5 -right-1.5 w-10 h-10 bg-aurora-gradient bg-[length:200%_200%] animate-aurora" style={{clipPath: 'polygon(100% 100%, 0 100%, 100% 0)'}}></div>
                
            </div>
             <AppManager />
        </div>


        <Footer 
            isMobile={isMobile}
            isRightSidebarCollapsed={sidebars.isRightSidebarCollapsed}
            toggleRightSidebar={() => setSidebars(prev => ({ ...prev, isRightSidebarCollapsed: !prev.isRightSidebarCollapsed }))}
        />
      </div>
    </div>
  );
};


// Welcome screen for unauthenticated users
const WelcomeScreen: React.FC = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-aurora-gradient bg-[length:200%_200%] animate-aurora">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="mb-8">
          <LogoIcon className="w-24 h-24 mx-auto mb-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">GrowYour Need</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Your complete digital operating system for education and personal growth.
        </p>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-12">
          Sign in to access your personalized dashboard with powerful tools for learning, creating, and collaborating.
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Multi-Tenant Platform</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Role-Based Access</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span>AI-Powered Tools</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Layout>
      <SignedOut>
        <WelcomeScreen />
      </SignedOut>
      <SignedIn>
        <AppLauncherProvider>
          <AppContent />
        </AppLauncherProvider>
      </SignedIn>
    </Layout>
  );
};

export default App;