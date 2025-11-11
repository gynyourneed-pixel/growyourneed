import React from 'react';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/clerk-react';

interface LayoutProps {
  children: React.ReactNode;
}

// Get Clerk publishable key from environment variable
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error('Missing Clerk Publishable Key');
}

/**
 * Layout Component - Main wrapper for the entire application
 * Provides consistent styling, theme support, and structural foundation
 * Includes Clerk authentication provider and auth UI components
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <div className="w-full h-screen overflow-hidden bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark">
        {/* Authentication Header */}
        <header className="absolute top-4 right-4 z-50 flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-lg">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg transition-all duration-200 shadow-lg">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 rounded-full border-2 border-white shadow-lg hover:scale-105 transition-transform duration-200"
                }
              }}
            />
          </SignedIn>
        </header>
        
        {/* Main Content */}
        {children}
      </div>
    </ClerkProvider>
  );
};

export default Layout;
