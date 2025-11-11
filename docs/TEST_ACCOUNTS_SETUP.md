# Test Accounts Setup Guide

This guide explains how to create test accounts for all 6 roles in the GrowYour platform.

## Quick Reference - Test Accounts

| Role | Email | Username | Password | Access Level |
|------|-------|----------|----------|--------------|
| Owner | owner@gyn.com | owner | 123456 | Platform-wide control |
| Admin | admin@gyn.com | admin | 123456 | School management |
| Teacher | teacher@gyn.com | teacher | 123456 | Classroom management |
| Parent | parent@gyn.com | parent | 123456 | Child monitoring |
| Student | student@gyn.com | student | 123456 | Student dashboard |
| Individual | individual@gyn.com | individual | 123456 | Personal workspace |

## Step 1: Create Users in Clerk Dashboard

### Option A: Manual Creation (Recommended for Testing)

1. **Go to Clerk Dashboard Users Page:**
   ```
   https://dashboard.clerk.com/apps/app_2sq5IYLqLCGKOh8DhYsL5Fc1BrJ/users
   ```

2. **For EACH user, click "Create user" and fill in:**

   **User 1: Platform Owner**
   - Email: `owner@gyn.com`
   - Username: `owner`
   - Password: `123456`
   - First name: `Platform`
   - Last name: `Owner`
   - After creation, go to user's Metadata tab and add to **public_metadata**:
     ```json
     {
       "role": "owner"
     }
     ```

   **User 2: School Admin**
   - Email: `admin@gyn.com`
   - Username: `admin`
   - Password: `123456`
   - First name: `School`
   - Last name: `Admin`
   - Public metadata:
     ```json
     {
       "role": "admin"
     }
     ```

   **User 3: Teacher**
   - Email: `teacher@gyn.com`
   - Username: `teacher`
   - Password: `123456`
   - First name: `Test`
   - Last name: `Teacher`
   - Public metadata:
     ```json
     {
       "role": "teacher"
     }
     ```

   **User 4: Parent**
   - Email: `parent@gyn.com`
   - Username: `parent`
   - Password: `123456`
   - First name: `Test`
   - Last name: `Parent`
   - Public metadata:
     ```json
     {
       "role": "parent"
     }
     ```

   **User 5: Student**
   - Email: `student@gyn.com`
   - Username: `student`
   - Password: `123456`
   - First name: `Test`
   - Last name: `Student`
   - Public metadata:
     ```json
     {
       "role": "student"
     }
     ```

   **User 6: Individual Creator**
   - Email: `individual@gyn.com`
   - Username: `individual`
   - Password: `123456`
   - First name: `Test`
   - Last name: `Creator`
   - Public metadata:
     ```json
     {
       "role": "individual"
     }
     ```

### Option B: Self-Registration + Role Assignment

Users can self-register through your app, then you manually assign roles in Clerk:

1. Have each user sign up normally through your app
2. Go to Clerk Dashboard → Users
3. Click on each user
4. Go to "Metadata" tab
5. Add the appropriate role to `public_metadata`

## Step 2: Sync Users to Supabase

### If You Have Webhooks Set Up:

Users will automatically sync to Supabase when created/updated in Clerk. ✨

### If You DON'T Have Webhooks:

Run this SQL in Supabase after creating users in Clerk:

```sql
-- Get Clerk user IDs from Clerk Dashboard for each user
-- Then insert them manually:

INSERT INTO users (clerk_id, email, first_name, last_name, role) VALUES
('user_xxxxxxxxxxxxx', 'owner@gyn.com', 'Platform', 'Owner', 'owner'),
('user_xxxxxxxxxxxxx', 'admin@gyn.com', 'School', 'Admin', 'admin'),
('user_xxxxxxxxxxxxx', 'teacher@gyn.com', 'Test', 'Teacher', 'teacher'),
('user_xxxxxxxxxxxxx', 'parent@gyn.com', 'Test', 'Parent', 'parent'),
('user_xxxxxxxxxxxxx', 'student@gyn.com', 'Test', 'Student', 'student'),
('user_xxxxxxxxxxxxx', 'individual@gyn.com', 'Test', 'Creator', 'individual');
```

**To find Clerk user IDs:**
1. Go to Clerk Dashboard → Users
2. Click on a user
3. Copy their User ID (starts with `user_`)

## Step 3: Create Sample Organizations

Run this in Supabase SQL Editor:

```sql
INSERT INTO organizations (name, slug, type) VALUES
('Lincoln High School', 'lincoln-high', 'school'),
('Creative Studio Inc', 'creative-studio', 'business'),
('Personal Workspace', 'personal-workspace', 'personal');
```

## Step 4: Add Users to Organizations

```sql
-- Add Admin to Lincoln High School
INSERT INTO organization_members (organization_id, user_id, role)
SELECT 
  (SELECT id FROM organizations WHERE slug = 'lincoln-high'),
  (SELECT id FROM users WHERE email = 'admin@gyn.com'),
  'admin';

-- Add Teacher to Lincoln High School
INSERT INTO organization_members (organization_id, user_id, role)
SELECT 
  (SELECT id FROM organizations WHERE slug = 'lincoln-high'),
  (SELECT id FROM users WHERE email = 'teacher@gyn.com'),
  'teacher';

-- Add Student to Lincoln High School
INSERT INTO organization_members (organization_id, user_id, role)
SELECT 
  (SELECT id FROM organizations WHERE slug = 'lincoln-high'),
  (SELECT id FROM users WHERE email = 'student@gyn.com'),
  'student';

-- Add Parent to Lincoln High School
INSERT INTO organization_members (organization_id, user_id, role)
SELECT 
  (SELECT id FROM organizations WHERE slug = 'lincoln-high'),
  (SELECT id FROM users WHERE email = 'parent@gyn.com'),
  'parent';
```

## Step 5: Create Sample Teacher Profile

```sql
INSERT INTO teachers (user_id, organization_id, employee_id, department, subjects)
SELECT 
  (SELECT id FROM users WHERE email = 'teacher@gyn.com'),
  (SELECT id FROM organizations WHERE slug = 'lincoln-high'),
  'T001',
  'Mathematics',
  ARRAY['Algebra', 'Calculus', 'Statistics'];
```

## Step 6: Create Sample Student Profile

```sql
INSERT INTO students (user_id, organization_id, student_id, grade_level, status)
SELECT 
  (SELECT id FROM users WHERE email = 'student@gyn.com'),
  (SELECT id FROM organizations WHERE slug = 'lincoln-high'),
  'S001',
  10,
  'active';
```

## Step 7: Create Sample Courses

```sql
INSERT INTO courses (organization_id, name, code, teacher_id, grade_level, academic_year)
SELECT 
  (SELECT id FROM organizations WHERE slug = 'lincoln-high'),
  'Algebra II',
  'MATH201',
  (SELECT id FROM teachers WHERE employee_id = 'T001'),
  10,
  '2024-2025';

INSERT INTO courses (organization_id, name, code, teacher_id, grade_level, academic_year)
SELECT 
  (SELECT id FROM organizations WHERE slug = 'lincoln-high'),
  'English Literature',
  'ENG301',
  (SELECT id FROM teachers WHERE employee_id = 'T001'),
  10,
  '2024-2025';
```

## Step 8: Enroll Student in Courses

```sql
INSERT INTO enrollments (course_id, student_id, status)
SELECT 
  (SELECT id FROM courses WHERE code = 'MATH201'),
  (SELECT id FROM students WHERE student_id = 'S001'),
  'active';

INSERT INTO enrollments (course_id, student_id, status)
SELECT 
  (SELECT id FROM courses WHERE code = 'ENG301'),
  (SELECT id FROM students WHERE student_id = 'S001'),
  'active';
```

## Testing the Accounts

### 1. Test Login for Each Role

Navigate to your app: `http://localhost:3040`

Try logging in with each account:
- `owner@gyn.com` / `123456` → Should see Owner Dashboard
- `admin@gyn.com` / `123456` → Should see School Admin Dashboard
- `teacher@gyn.com` / `123456` → Should see Teacher Dashboard
- `parent@gyn.com` / `123456` → Should see Parent Dashboard
- `student@gyn.com` / `123456` → Should see Student Dashboard
- `individual@gyn.com` / `123456` → Should see Individual Dashboard

### 2. Verify Role-Based Navigation

Each role should see different navigation items:

- **Owner**: Platform analytics, tenant management, system settings
- **Admin**: Students, Staff, Academics, Finance, Analytics
- **Teacher**: Classes, Students, Assignments, Gradebook, Reports
- **Parent**: Children, Grades, Attendance, Messages, Calendar
- **Student**: Courses, Assignments, Grades, Study Tools, Wellness
- **Individual**: Projects, Studio, Media, Market, Travel

### 3. Test App Launcher Access

All roles should be able to launch apps from the launcher:
- Studio, Media, Market, Events, etc.
- **Note**: Settings Backend app is ONLY visible to Owner role

### 4. Verify Data Isolation (RLS)

Test that users only see their organization's data:

```sql
-- As admin@gyn.com, should only see Lincoln High students
SELECT * FROM students WHERE organization_id = (
  SELECT id FROM organizations WHERE slug = 'lincoln-high'
);
```

## Verification Queries

Run these in Supabase to verify setup:

```sql
-- Check all users are created
SELECT clerk_id, email, first_name, last_name, role FROM users;

-- Check organization memberships
SELECT 
  o.name as organization,
  u.email,
  om.role
FROM organization_members om
JOIN organizations o ON om.organization_id = o.id
JOIN users u ON om.user_id = u.id;

-- Check teacher courses
SELECT 
  u.email as teacher_email,
  c.name as course_name,
  c.code,
  c.grade_level
FROM teachers t
JOIN users u ON t.user_id = u.id
JOIN courses c ON t.id = c.teacher_id;

-- Check student enrollments
SELECT 
  u.email as student_email,
  c.name as course_name,
  e.status
FROM students s
JOIN users u ON s.user_id = u.id
JOIN enrollments e ON s.id = e.student_id
JOIN courses c ON e.course_id = c.id;
```

## Troubleshooting

### Users Can't Log In

- Check if user exists in Clerk Dashboard
- Verify password is set correctly (123456)
- Check if email is verified (you can manually verify in Clerk)

### Wrong Dashboard Showing

- Check `public_metadata` in Clerk has correct `"role"` value
- Verify `useUserRole` hook is reading from `user.publicMetadata.role`
- Check console for role detection: `console.log(user.publicMetadata)`

### Users Not in Supabase

- If using webhooks: Check webhook logs in Clerk Dashboard
- If manual sync: Run the INSERT queries from Step 2
- Verify DATABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set

### Data Not Showing

- Check RLS policies allow users to see their data
- Verify user is member of correct organization
- Run verification queries above to check relationships

## Next Steps

After setting up test accounts:

1. ✅ Test authentication flow for each role
2. ✅ Verify role-based navigation works
3. ✅ Check data isolation between tenants
4. ✅ Test app launcher for each role
5. 🚀 Start building role-specific features!

## Security Notes

⚠️ **IMPORTANT**: These are TEST accounts only!

- **Change passwords** before production deployment
- **Use strong passwords** in production (min 12 characters)
- **Enable 2FA** for Owner and Admin roles
- **Never commit passwords** to version control
- Consider using password manager for production credentials

## Production User Management

For production:

1. **Owner**: Manually create the first owner account
2. **Admins**: Owner creates school admin accounts when schools subscribe
3. **Teachers/Parents/Students**: School admin creates these accounts
4. **Individuals**: Self-registration through marketing website

See `docs/SUPABASE_SETUP.md` for production webhook setup.
