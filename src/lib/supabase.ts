import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client with TypeScript types
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Helper functions for common operations

/**
 * Get current user from Supabase (synced from Clerk via webhook)
 */
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

/**
 * Get user profile from database
 */
export async function getUserProfile(clerkUserId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_id', clerkUserId)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get user's organizations (schools/tenants)
 */
export async function getUserOrganizations(userId: string) {
  const { data, error } = await supabase
    .from('organization_members')
    .select(`
      *,
      organization:organizations(*)
    `)
    .eq('user_id', userId);
  
  if (error) throw error;
  return data;
}

/**
 * Check if user has permission in organization
 */
export async function hasPermission(
  userId: string,
  organizationId: string,
  permission: string
) {
  const { data, error } = await supabase
    .from('organization_members')
    .select('role')
    .eq('user_id', userId)
    .eq('organization_id', organizationId)
    .single();
  
  if (error) return false;
  
  // Define role permissions (customize as needed)
  const rolePermissions: Record<string, string[]> = {
    owner: ['*'], // All permissions
    admin: ['read', 'write', 'delete', 'manage_users'],
    teacher: ['read', 'write', 'grade'],
    parent: ['read'],
    student: ['read'],
  };
  
  const userPermissions = rolePermissions[data.role] || [];
  return userPermissions.includes('*') || userPermissions.includes(permission);
}

/**
 * Real-time subscription helper
 */
export function subscribeToTable<T = any>(
  table: string,
  callback: (payload: any) => void,
  filter?: { column: string; value: string }
) {
  const channel = supabase
    .channel(`${table}-changes`)
    .on(
      'postgres_changes' as any,
      {
        event: '*',
        schema: 'public',
        table,
        filter: filter ? `${filter.column}=eq.${filter.value}` : undefined,
      },
      callback
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
