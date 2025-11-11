-- GrowYour Need - Seed Data for Testing
-- Creates default users for each role with credentials
-- Run this AFTER running schema.sql

-- =====================================================
-- IMPORTANT: User Creation Instructions
-- =====================================================
-- These are the test accounts you need to create in Clerk Dashboard FIRST:
-- 
-- 1. Go to: https://dashboard.clerk.com/apps/app_2sq5IYLqLCGKOh8DhYsL5Fc1BrJ/users
-- 2. Click "Create user" for each account below
-- 3. After creating in Clerk, their IDs will auto-sync to Supabase via webhooks
-- 
-- Alternatively, users can self-register and you can update their roles via webhook
-- =====================================================

-- =====================================================
-- DEFAULT TEST ACCOUNTS
-- =====================================================

-- Account 1: Platform Owner
-- Email: owner@gyn.com
-- Username: owner
-- Password: 123456
-- Role: owner
-- After creating this user in Clerk, set their public_metadata:
-- { "role": "owner" }

-- Account 2: School Admin
-- Email: admin@gyn.com
-- Username: admin
-- Password: 123456
-- Role: admin
-- After creating this user in Clerk, set their public_metadata:
-- { "role": "admin" }

-- Account 3: Teacher
-- Email: teacher@gyn.com
-- Username: teacher
-- Password: 123456
-- Role: teacher
-- After creating this user in Clerk, set their public_metadata:
-- { "role": "teacher" }

-- Account 4: Parent
-- Email: parent@gyn.com
-- Username: parent
-- Password: 123456
-- Role: parent
-- After creating this user in Clerk, set their public_metadata:
-- { "role": "parent" }

-- Account 5: Student
-- Email: student@gyn.com
-- Username: student
-- Password: 123456
-- Role: student
-- After creating this user in Clerk, set their public_metadata:
-- { "role": "student" }

-- Account 6: Individual Creator
-- Email: individual@gyn.com
-- Username: individual
-- Password: 123456
-- Role: individual
-- After creating this user in Clerk, set their public_metadata:
-- { "role": "individual" }

-- =====================================================
-- MANUAL USER INSERTION (If not using Clerk webhooks)
-- =====================================================
-- Only use this if you're NOT using Clerk webhooks
-- Replace 'clerk_user_xxxxx' with actual Clerk user IDs

-- INSERT INTO users (clerk_id, email, first_name, last_name, role) VALUES
-- ('clerk_owner_id', 'owner@gyn.com', 'Platform', 'Owner', 'owner'),
-- ('clerk_admin_id', 'admin@gyn.com', 'School', 'Admin', 'admin'),
-- ('clerk_teacher_id', 'teacher@gyn.com', 'Test', 'Teacher', 'teacher'),
-- ('clerk_parent_id', 'parent@gyn.com', 'Test', 'Parent', 'parent'),
-- ('clerk_student_id', 'student@gyn.com', 'Test', 'Student', 'student'),
-- ('clerk_individual_id', 'individual@gyn.com', 'Test', 'Creator', 'individual');

-- =====================================================
-- TEST ORGANIZATION (Sample School)
-- =====================================================

INSERT INTO organizations (name, slug, type) VALUES
('Lincoln High School', 'lincoln-high', 'school'),
('Creative Studio Inc', 'creative-studio', 'business'),
('Personal Workspace', 'personal-workspace', 'personal');

-- Get organization IDs for use in following inserts
-- You'll need to replace these with actual UUIDs after organizations are created

-- =====================================================
-- SAMPLE ORGANIZATION MEMBERSHIPS
-- =====================================================
-- Run this after users are synced from Clerk and organizations are created

-- Example (replace with actual IDs):
-- INSERT INTO organization_members (organization_id, user_id, role)
-- SELECT 
--   (SELECT id FROM organizations WHERE slug = 'lincoln-high'),
--   (SELECT id FROM users WHERE email = 'admin@growyourneed.com'),
--   'admin';

-- INSERT INTO organization_members (organization_id, user_id, role)
-- SELECT 
--   (SELECT id FROM organizations WHERE slug = 'lincoln-high'),
--   (SELECT id FROM users WHERE email = 'teacher@growyourneed.com'),
--   'teacher';

-- INSERT INTO organization_members (organization_id, user_id, role)
-- SELECT 
--   (SELECT id FROM organizations WHERE slug = 'lincoln-high'),
--   (SELECT id FROM users WHERE email = 'student@growyourneed.com'),
--   'student';

-- INSERT INTO organization_members (organization_id, user_id, role)
-- SELECT 
--   (SELECT id FROM organizations WHERE slug = 'lincoln-high'),
--   (SELECT id FROM users WHERE email = 'parent@growyourneed.com'),
--   'parent';

-- =====================================================
-- SAMPLE TEACHERS DATA
-- =====================================================
-- Run after teacher users are in organization

-- INSERT INTO teachers (user_id, organization_id, employee_id, department, subjects)
-- SELECT 
--   (SELECT id FROM users WHERE email = 'teacher@growyourneed.com'),
--   (SELECT id FROM organizations WHERE slug = 'lincoln-high'),
--   'T001',
--   'Mathematics',
--   ARRAY['Algebra', 'Calculus', 'Statistics'];

-- =====================================================
-- SAMPLE STUDENTS DATA
-- =====================================================
-- Run after student users are in organization

-- INSERT INTO students (user_id, organization_id, student_id, grade_level, status)
-- SELECT 
--   (SELECT id FROM users WHERE email = 'student@growyourneed.com'),
--   (SELECT id FROM organizations WHERE slug = 'lincoln-high'),
--   'S001',
--   10,
--   'active';

-- =====================================================
-- SAMPLE COURSES
-- =====================================================
-- Run after teachers are created

-- INSERT INTO courses (organization_id, name, code, teacher_id, grade_level, academic_year)
-- SELECT 
--   (SELECT id FROM organizations WHERE slug = 'lincoln-high'),
--   'Algebra II',
--   'MATH201',
--   (SELECT id FROM teachers WHERE employee_id = 'T001'),
--   10,
--   '2024-2025';

-- INSERT INTO courses (organization_id, name, code, teacher_id, grade_level, academic_year)
-- SELECT 
--   (SELECT id FROM organizations WHERE slug = 'lincoln-high'),
--   'English Literature',
--   'ENG301',
--   (SELECT id FROM teachers WHERE employee_id = 'T001'),
--   10,
--   '2024-2025';

-- =====================================================
-- SAMPLE ENROLLMENTS
-- =====================================================
-- Enroll students in courses

-- INSERT INTO enrollments (course_id, student_id, status)
-- SELECT 
--   (SELECT id FROM courses WHERE code = 'MATH201'),
--   (SELECT id FROM students WHERE student_id = 'S001'),
--   'active';

-- INSERT INTO enrollments (course_id, student_id, status)
-- SELECT 
--   (SELECT id FROM courses WHERE code = 'ENG301'),
--   (SELECT id FROM students WHERE student_id = 'S001'),
--   'active';

-- =====================================================
-- SAMPLE ASSIGNMENTS
-- =====================================================
-- Create assignments for courses

-- INSERT INTO assignments (course_id, title, description, due_date, max_points)
-- SELECT 
--   (SELECT id FROM courses WHERE code = 'MATH201'),
--   'Quadratic Equations Homework',
--   'Solve problems 1-20 from Chapter 3',
--   NOW() + INTERVAL '7 days',
--   100;

-- INSERT INTO assignments (course_id, title, description, due_date, max_points)
-- SELECT 
--   (SELECT id FROM courses WHERE code = 'ENG301'),
--   'Shakespeare Essay',
--   'Write a 5-paragraph essay analyzing Macbeth',
--   NOW() + INTERVAL '14 days',
--   150;

-- =====================================================
-- SAMPLE GRADES
-- =====================================================
-- Grade some assignments

-- INSERT INTO grades (assignment_id, student_id, points_earned, feedback, graded_at)
-- SELECT 
--   (SELECT id FROM assignments WHERE title = 'Quadratic Equations Homework'),
--   (SELECT id FROM students WHERE student_id = 'S001'),
--   95,
--   'Excellent work! Keep it up.',
--   NOW();

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check all users
SELECT clerk_id, email, first_name, last_name, role FROM users;

-- Check organizations
SELECT id, name, slug, type FROM organizations;

-- Check organization memberships with user info
SELECT 
  o.name as organization_name,
  u.email,
  om.role
FROM organization_members om
JOIN organizations o ON om.organization_id = o.id
JOIN users u ON om.user_id = u.id;

-- Check students with their courses
SELECT 
  u.email,
  s.student_id,
  s.grade_level,
  c.name as course_name,
  e.status as enrollment_status
FROM students s
JOIN users u ON s.user_id = u.id
JOIN enrollments e ON s.id = e.student_id
JOIN courses c ON e.course_id = c.id;

-- Check teachers with their courses
SELECT 
  u.email,
  t.employee_id,
  t.department,
  c.name as course_name,
  c.code
FROM teachers t
JOIN users u ON t.user_id = u.id
JOIN courses c ON t.id = c.teacher_id;

-- Check student grades
SELECT 
  u.email as student_email,
  c.name as course_name,
  a.title as assignment_title,
  g.points_earned,
  a.max_points,
  ROUND((g.points_earned::numeric / a.max_points) * 100, 2) as percentage
FROM grades g
JOIN students s ON g.student_id = s.id
JOIN users u ON s.user_id = u.id
JOIN assignments a ON g.assignment_id = a.id
JOIN courses c ON a.course_id = c.id;
