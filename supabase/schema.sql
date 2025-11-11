-- GrowYour Need Database Schema for Supabase PostgreSQL
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/lvsxoluyogtzfmdhhvnl/editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ENUMS
-- =====================================================

CREATE TYPE user_role AS ENUM ('owner', 'admin', 'teacher', 'parent', 'student', 'individual');
CREATE TYPE org_type AS ENUM ('school', 'business', 'personal');
CREATE TYPE student_status AS ENUM ('active', 'inactive', 'graduated');
CREATE TYPE enrollment_status AS ENUM ('active', 'completed', 'dropped');

-- =====================================================
-- USERS TABLE
-- =====================================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  role user_role NOT NULL DEFAULT 'individual',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for faster clerk_id lookups
CREATE INDEX idx_users_clerk_id ON users(clerk_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- =====================================================
-- ORGANIZATIONS TABLE (Schools/Tenants)
-- =====================================================

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_org_id TEXT UNIQUE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type org_type NOT NULL DEFAULT 'school',
  logo_url TEXT,
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_organizations_slug ON organizations(slug);
CREATE INDEX idx_organizations_clerk_org_id ON organizations(clerk_org_id);

-- =====================================================
-- ORGANIZATION MEMBERS (User-Organization Relationship)
-- =====================================================

CREATE TABLE organization_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role user_role NOT NULL,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);

CREATE INDEX idx_org_members_org_id ON organization_members(organization_id);
CREATE INDEX idx_org_members_user_id ON organization_members(user_id);

-- =====================================================
-- STUDENTS TABLE
-- =====================================================

CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  student_id TEXT NOT NULL,
  grade_level INTEGER CHECK (grade_level >= 1 AND grade_level <= 12),
  parent_ids UUID[] DEFAULT ARRAY[]::UUID[],
  enrollment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status student_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(organization_id, student_id)
);

CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_students_org_id ON students(organization_id);
CREATE INDEX idx_students_status ON students(status);

-- =====================================================
-- TEACHERS TABLE
-- =====================================================

CREATE TABLE teachers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  employee_id TEXT NOT NULL,
  department TEXT,
  subjects TEXT[] DEFAULT ARRAY[]::TEXT[],
  hire_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(organization_id, employee_id)
);

CREATE INDEX idx_teachers_user_id ON teachers(user_id);
CREATE INDEX idx_teachers_org_id ON teachers(organization_id);

-- =====================================================
-- COURSES TABLE
-- =====================================================

CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  description TEXT,
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE RESTRICT,
  grade_level INTEGER CHECK (grade_level >= 1 AND grade_level <= 12),
  academic_year TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(organization_id, code, academic_year)
);

CREATE INDEX idx_courses_org_id ON courses(organization_id);
CREATE INDEX idx_courses_teacher_id ON courses(teacher_id);
CREATE INDEX idx_courses_academic_year ON courses(academic_year);

-- =====================================================
-- ENROLLMENTS TABLE (Student-Course Relationship)
-- =====================================================

CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status enrollment_status NOT NULL DEFAULT 'active',
  UNIQUE(course_id, student_id)
);

CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_enrollments_student_id ON enrollments(student_id);

-- =====================================================
-- ASSIGNMENTS TABLE
-- =====================================================

CREATE TABLE assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ,
  max_points INTEGER NOT NULL DEFAULT 100,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_assignments_course_id ON assignments(course_id);
CREATE INDEX idx_assignments_due_date ON assignments(due_date);

-- =====================================================
-- GRADES TABLE
-- =====================================================

CREATE TABLE grades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  points_earned INTEGER,
  feedback TEXT,
  graded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(assignment_id, student_id)
);

CREATE INDEX idx_grades_assignment_id ON grades(assignment_id);
CREATE INDEX idx_grades_student_id ON grades(student_id);

-- =====================================================
-- TRIGGERS FOR updated_at
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;

-- Users: Can read own profile, admins can read all
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (clerk_id = auth.jwt() ->> 'sub');

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (clerk_id = auth.jwt() ->> 'sub');

-- Organizations: Members can view their organizations
CREATE POLICY "Members can view their organizations"
  ON organizations FOR SELECT
  USING (
    id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id IN (SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub')
    )
  );

-- Organization Members: Can view members in same organization
CREATE POLICY "View organization members"
  ON organization_members FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id IN (SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub')
    )
  );

-- Students: Teachers and parents can view students
CREATE POLICY "View students in organization"
  ON students FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id IN (SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub')
    )
  );

-- Teachers: Can view teachers in same organization
CREATE POLICY "View teachers in organization"
  ON teachers FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id IN (SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub')
    )
  );

-- Courses: Members can view courses in their organization
CREATE POLICY "View courses in organization"
  ON courses FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id IN (SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub')
    )
  );

-- Enrollments: Students and teachers can view enrollments
CREATE POLICY "View enrollments"
  ON enrollments FOR SELECT
  USING (
    course_id IN (
      SELECT id FROM courses WHERE organization_id IN (
        SELECT organization_id FROM organization_members
        WHERE user_id IN (SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub')
      )
    )
  );

-- Assignments: Students and teachers can view assignments
CREATE POLICY "View assignments"
  ON assignments FOR SELECT
  USING (
    course_id IN (
      SELECT id FROM courses WHERE organization_id IN (
        SELECT organization_id FROM organization_members
        WHERE user_id IN (SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub')
      )
    )
  );

-- Grades: Students can view own grades, teachers can view all
CREATE POLICY "View grades"
  ON grades FOR SELECT
  USING (
    student_id IN (
      SELECT id FROM students WHERE user_id IN (
        SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub')
    )
    OR
    assignment_id IN (
      SELECT id FROM assignments WHERE course_id IN (
        SELECT id FROM courses WHERE teacher_id IN (
          SELECT id FROM teachers WHERE user_id IN (
            SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub')
        )
      )
    )
  );

-- =====================================================
-- SEED DATA (Optional - for testing)
-- =====================================================

-- Insert a test owner user (replace with actual Clerk user ID)
-- INSERT INTO users (clerk_id, email, first_name, last_name, role)
-- VALUES ('user_xxxxxxxxx', 'owner@growyourneed.com', 'Platform', 'Owner', 'owner');

-- =====================================================
-- HELPFUL QUERIES
-- =====================================================

-- Get user with their organizations
-- SELECT u.*, om.role, o.name as org_name
-- FROM users u
-- LEFT JOIN organization_members om ON u.id = om.user_id
-- LEFT JOIN organizations o ON om.organization_id = o.id
-- WHERE u.clerk_id = 'YOUR_CLERK_USER_ID';

-- Get all students in an organization
-- SELECT s.*, u.email, u.first_name, u.last_name
-- FROM students s
-- JOIN users u ON s.user_id = u.id
-- WHERE s.organization_id = 'YOUR_ORG_ID';

-- Get all courses taught by a teacher
-- SELECT c.*, t.employee_id
-- FROM courses c
-- JOIN teachers t ON c.teacher_id = t.id
-- WHERE t.user_id = 'YOUR_USER_ID';
