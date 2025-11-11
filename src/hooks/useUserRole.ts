import { useUser } from '@clerk/clerk-react';

/**
 * Custom hook to get user role from Clerk metadata
 * Role should be stored in user.publicMetadata.role
 * 
 * Supported roles:
 * - 'owner': Platform Owner (God-mode access)
 * - 'admin': School Administrator
 * - 'teacher': Teacher/Instructor
 * - 'parent': Parent/Guardian
 * - 'student': Student
 * - 'individual': Individual Creator/Learner
 */
export type UserRole = 'owner' | 'admin' | 'teacher' | 'parent' | 'student' | 'individual';

export function useUserRole() {
  const { user, isLoaded } = useUser();
  
  // Get role from public metadata (can be set in Clerk Dashboard)
  const role = user?.publicMetadata?.role as UserRole | undefined;
  
  return {
    user,
    isLoaded,
    role: role || 'individual', // Default to individual if no role set
    isOwner: role === 'owner',
    isAdmin: role === 'admin',
    isTeacher: role === 'teacher',
    isParent: role === 'parent',
    isStudent: role === 'student',
    isIndividual: role === 'individual',
  };
}
