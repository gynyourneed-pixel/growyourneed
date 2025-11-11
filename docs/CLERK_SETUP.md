# Clerk Authentication Setup Guide

## ✅ Installation Complete!

Clerk authentication has been successfully integrated into your GrowYour Need platform.

---

## 🔑 Environment Variables

Your `.env.local` file contains:

```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_Y2xhc3NpYy1yZWRiaXJkLTM3LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_UiafB3tgXDCrt8yGJ9M5K6zgTzBPiG4K3O4WPhWlQf
```

**⚠️ IMPORTANT:** Never commit `.env.local` to Git (already in `.gitignore`)

---

## 🎯 What's Been Implemented

### 1. **Layout.tsx** - Authentication UI
- ✅ ClerkProvider wrapping entire app
- ✅ Sign In / Sign Up buttons (top-right corner when logged out)
- ✅ User Button with profile dropdown (when logged in)
- ✅ Beautiful styled buttons matching your design system

### 2. **App.tsx** - Protected Routes
- ✅ WelcomeScreen for unauthenticated users
- ✅ Dashboard only visible when signed in
- ✅ Role-based access ready

### 3. **useUserRole.ts** Hook
- ✅ Custom hook for accessing user roles
- ✅ Support for 6 role types: owner, admin, teacher, parent, student, individual

---

## 🚀 How to Test

1. **Start the dev server** (already running):
   ```bash
   pnpm dev
   ```

2. **Open browser**: http://localhost:3040

3. **You'll see**:
   - Welcome screen with "Sign In" / "Sign Up" buttons in top-right
   - Click "Sign Up" to create a test account
   - After sign up, you'll see the Owner Dashboard

---

## 👥 Setting Up User Roles in Clerk

### Method 1: Via Clerk Dashboard (Recommended for initial setup)

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Select your application: "classic-redbird-37"
3. Navigate to **Users** in sidebar
4. Click on a user to edit
5. Scroll to **Public metadata** section
6. Add this JSON:
   ```json
   {
     "role": "owner"
   }
   ```
7. Save changes

**Available roles:**
- `"owner"` - Platform Owner (full access)
- `"admin"` - School Administrator
- `"teacher"` - Teacher/Instructor
- `"parent"` - Parent/Guardian
- `"student"` - Student
- `"individual"` - Individual Creator/Learner (default)

### Method 2: Set Role During Sign-Up (Programmatic)

Update your sign-up flow to include role selection:

```tsx
import { useSignUp } from '@clerk/clerk-react';

const { signUp } = useSignUp();

await signUp.create({
  emailAddress: 'user@example.com',
  password: 'SecurePassword123!',
  unsafeMetadata: {
    role: 'student' // Set role during registration
  }
});
```

---

## 🔐 Using Roles in Your App

### Example: Conditional Rendering Based on Role

```tsx
import { useUserRole } from '../hooks/useUserRole';

function MyComponent() {
  const { role, isOwner, isTeacher } = useUserRole();
  
  return (
    <div>
      {isOwner && <OwnerOnlyContent />}
      {isTeacher && <TeacherContent />}
      <p>Your role: {role}</p>
    </div>
  );
}
```

### Example: Dashboard Router

```tsx
import { useUserRole } from '../hooks/useUserRole';

function DashboardRouter() {
  const { role, isLoaded } = useUserRole();
  
  if (!isLoaded) return <LoadingSpinner />;
  
  switch (role) {
    case 'owner':
      return <OwnerDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'parent':
      return <ParentDashboard />;
    case 'student':
      return <StudentDashboard />;
    case 'individual':
      return <IndividualDashboard />;
    default:
      return <DefaultDashboard />;
  }
}
```

---

## 🎨 Customizing Clerk Components

The sign-in modal and user button are already styled to match your design system. To further customize:

```tsx
<UserButton 
  appearance={{
    elements: {
      avatarBox: "w-10 h-10 rounded-full border-2 border-blue-600",
      userButtonPopoverCard: "bg-gray-900 text-white",
      userButtonPopoverActionButton: "hover:bg-gray-800"
    }
  }}
/>
```

---

## 🔒 Multi-Tenancy Setup (Schools)

For school-based tenants, use Clerk's **Organizations** feature:

### 1. Enable Organizations in Clerk Dashboard
1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Navigate to **Organizations** → Enable
3. Configure organization settings

### 2. Use Organizations in Code

```tsx
import { useOrganization } from '@clerk/clerk-react';

function SchoolDashboard() {
  const { organization } = useOrganization();
  
  return (
    <div>
      <h1>Welcome to {organization?.name}</h1>
      <p>School ID: {organization?.id}</p>
    </div>
  );
}
```

---

## 📚 Next Steps

1. **Set user role in Clerk Dashboard** to test role-based routing
2. **Implement role-specific dashboards** (Admin, Teacher, Parent, Student, Individual)
3. **Add organization support** for school tenants
4. **Configure social login providers** (Google, Microsoft, etc.) in Clerk Dashboard
5. **Set up webhooks** to sync user data to your database

---

## 🆘 Troubleshooting

### Issue: "Missing Clerk Publishable Key" error
**Solution:** Ensure `.env.local` exists and contains `VITE_CLERK_PUBLISHABLE_KEY`

### Issue: Sign-up/Sign-in modal not appearing
**Solution:** Check browser console for errors, ensure Clerk keys are valid

### Issue: User role not working
**Solution:** Add `role` to user's `publicMetadata` in Clerk Dashboard

---

## 📖 Resources

- [Clerk React Docs](https://clerk.com/docs/react/getting-started/quickstart)
- [Clerk Organizations](https://clerk.com/docs/guides/organizations/overview)
- [Clerk Customization](https://clerk.com/docs/guides/customizing-clerk/appearance-prop/overview)
- [useUser Hook](https://clerk.com/docs/reference/react/use-user)
- [useOrganization Hook](https://clerk.com/docs/reference/react/use-organization)

---

## 🎉 You're All Set!

Your authentication system is now live. Users can:
- ✅ Sign up with email/password
- ✅ Sign in to access dashboard
- ✅ View their profile via UserButton
- ✅ Sign out securely

Test it now at: **http://localhost:3040**
