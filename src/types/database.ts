/**
 * Database Schema Types for GrowYour Need Platform
 * Generated from Supabase schema
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          clerk_id: string
          email: string
          first_name: string | null
          last_name: string | null
          role: 'owner' | 'admin' | 'teacher' | 'parent' | 'student' | 'individual'
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          clerk_id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          role?: 'owner' | 'admin' | 'teacher' | 'parent' | 'student' | 'individual'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          clerk_id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          role?: 'owner' | 'admin' | 'teacher' | 'parent' | 'student' | 'individual'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      organizations: {
        Row: {
          id: string
          clerk_org_id: string | null
          name: string
          slug: string
          type: 'school' | 'business' | 'personal'
          logo_url: string | null
          settings: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          clerk_org_id?: string | null
          name: string
          slug: string
          type?: 'school' | 'business' | 'personal'
          logo_url?: string | null
          settings?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          clerk_org_id?: string | null
          name?: string
          slug?: string
          type?: 'school' | 'business' | 'personal'
          logo_url?: string | null
          settings?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      organization_members: {
        Row: {
          id: string
          organization_id: string
          user_id: string
          role: 'owner' | 'admin' | 'teacher' | 'parent' | 'student'
          joined_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          user_id: string
          role: 'owner' | 'admin' | 'teacher' | 'parent' | 'student'
          joined_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          user_id?: string
          role?: 'owner' | 'admin' | 'teacher' | 'parent' | 'student'
          joined_at?: string
        }
      }
      students: {
        Row: {
          id: string
          user_id: string
          organization_id: string
          student_id: string
          grade_level: number | null
          parent_ids: string[]
          enrollment_date: string
          status: 'active' | 'inactive' | 'graduated'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          organization_id: string
          student_id: string
          grade_level?: number | null
          parent_ids?: string[]
          enrollment_date?: string
          status?: 'active' | 'inactive' | 'graduated'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          organization_id?: string
          student_id?: string
          grade_level?: number | null
          parent_ids?: string[]
          enrollment_date?: string
          status?: 'active' | 'inactive' | 'graduated'
          created_at?: string
        }
      }
      teachers: {
        Row: {
          id: string
          user_id: string
          organization_id: string
          employee_id: string
          department: string | null
          subjects: string[]
          hire_date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          organization_id: string
          employee_id: string
          department?: string | null
          subjects?: string[]
          hire_date?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          organization_id?: string
          employee_id?: string
          department?: string | null
          subjects?: string[]
          hire_date?: string
          created_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          organization_id: string
          name: string
          code: string
          description: string | null
          teacher_id: string
          grade_level: number | null
          academic_year: string
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          name: string
          code: string
          description?: string | null
          teacher_id: string
          grade_level?: number | null
          academic_year: string
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          name?: string
          code?: string
          description?: string | null
          teacher_id?: string
          grade_level?: number | null
          academic_year?: string
          created_at?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          course_id: string
          student_id: string
          enrolled_at: string
          status: 'active' | 'completed' | 'dropped'
        }
        Insert: {
          id?: string
          course_id: string
          student_id: string
          enrolled_at?: string
          status?: 'active' | 'completed' | 'dropped'
        }
        Update: {
          id?: string
          course_id?: string
          student_id?: string
          enrolled_at?: string
          status?: 'active' | 'completed' | 'dropped'
        }
      }
      assignments: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string | null
          due_date: string | null
          max_points: number
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          description?: string | null
          due_date?: string | null
          max_points?: number
          created_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          description?: string | null
          due_date?: string | null
          max_points?: number
          created_at?: string
        }
      }
      grades: {
        Row: {
          id: string
          assignment_id: string
          student_id: string
          points_earned: number | null
          feedback: string | null
          graded_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          assignment_id: string
          student_id: string
          points_earned?: number | null
          feedback?: string | null
          graded_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          assignment_id?: string
          student_id?: string
          points_earned?: number | null
          feedback?: string | null
          graded_at?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'owner' | 'admin' | 'teacher' | 'parent' | 'student' | 'individual'
      org_type: 'school' | 'business' | 'personal'
      student_status: 'active' | 'inactive' | 'graduated'
      enrollment_status: 'active' | 'completed' | 'dropped'
    }
  }
}
