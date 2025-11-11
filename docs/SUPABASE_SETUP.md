# 🗄️ Supabase + Clerk Integration Guide

Complete guide for integrating Supabase PostgreSQL with Clerk authentication for the GrowYour Need platform.

---

## 📋 Table of Contents

1. [Database Setup](#1-database-setup)
2. [Clerk Webhook Configuration](#2-clerk-webhook-configuration)
3. [User Sync Implementation](#3-user-sync-implementation)
4. [Testing the Integration](#4-testing-the-integration)
5. [Usage Examples](#5-usage-examples)

---

## 1. 🗄️ Database Setup

### Step 1: Access Supabase SQL Editor

1. Go to: https://supabase.com/dashboard/project/lvsxoluyogtzfmdhhvnl/editor
2. Click **"New Query"**

### Step 2: Run the Schema

1. Open `supabase/schema.sql` from your project
2. Copy the entire SQL content
3. Paste into Supabase SQL Editor
4. Click **"Run"** (or press `Ctrl+Enter`)

This will create:
- ✅ 9 tables (users, organizations, students, teachers, courses, etc.)
- ✅ Row Level Security (RLS) policies for multi-tenancy
- ✅ Indexes for performance
- ✅ Triggers for automatic timestamp updates

### Step 3: Verify Tables

Go to: https://supabase.com/dashboard/project/lvsxoluyogtzfmdhhvnl/editor

You should see these tables:
- `users`
- `organizations`
- `organization_members`
- `students`
- `teachers`
- `courses`
- `enrollments`
- `assignments`
- `grades`

---

## 2. 🔗 Clerk Webhook Configuration

### What Webhooks Do

Webhooks automatically sync user data from Clerk to your Supabase database when:
- New user signs up
- User updates their profile
- User is deleted
- Organization is created/updated

### Step 1: Deploy Webhook Endpoint

**Option A: Vercel (Recommended)**

1. Install Vercel CLI:
   ```bash
   pnpm add -g vercel
   ```

2. Create `api/webhooks/clerk.ts`:
   ```typescript
   import type { VercelRequest, VercelResponse } from '@vercel/node';
   import { Webhook } from 'svix';
   import { createClient } from '@supabase/supabase-js';

   const supabase = createClient(
     process.env.SUPABASE_URL!,
     process.env.SUPABASE_SERVICE_ROLE_KEY!
   );

   export default async function handler(req: VercelRequest, res: VercelResponse) {
     if (req.method !== 'POST') {
       return res.status(405).json({ error: 'Method not allowed' });
     }

     // Verify webhook signature
     const svix_id = req.headers['svix-id'] as string;
     const svix_timestamp = req.headers['svix-timestamp'] as string;
     const svix_signature = req.headers['svix-signature'] as string;

     if (!svix_id || !svix_timestamp || !svix_signature) {
       return res.status(400).json({ error: 'Missing svix headers' });
     }

     const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
     let evt: any;

     try {
       evt = wh.verify(JSON.stringify(req.body), {
         'svix-id': svix_id,
         'svix-timestamp': svix_timestamp,
         'svix-signature': svix_signature,
       });
     } catch (err) {
       console.error('Webhook verification failed:', err);
       return res.status(400).json({ error: 'Invalid signature' });
     }

     const eventType = evt.type;
     console.log(`Webhook event: ${eventType}`);

     try {
       switch (eventType) {
         case 'user.created':
           await handleUserCreated(evt.data);
           break;
         case 'user.updated':
           await handleUserUpdated(evt.data);
           break;
         case 'user.deleted':
           await handleUserDeleted(evt.data);
           break;
         case 'organization.created':
           await handleOrganizationCreated(evt.data);
           break;
         case 'organization.updated':
           await handleOrganizationUpdated(evt.data);
           break;
       }
       return res.status(200).json({ success: true });
     } catch (error) {
       console.error('Webhook error:', error);
       return res.status(500).json({ error: 'Internal server error' });
     }
   }

   async function handleUserCreated(data: any) {
     const { error } = await supabase.from('users').insert({
       clerk_id: data.id,
       email: data.email_addresses[0]?.email_address,
       first_name: data.first_name,
       last_name: data.last_name,
       role: data.public_metadata?.role || 'individual',
       avatar_url: data.image_url,
     });

     if (error) throw error;
     console.log('User created:', data.id);
   }

   async function handleUserUpdated(data: any) {
     const { error } = await supabase
       .from('users')
       .update({
         email: data.email_addresses[0]?.email_address,
         first_name: data.first_name,
         last_name: data.last_name,
         role: data.public_metadata?.role || 'individual',
         avatar_url: data.image_url,
       })
       .eq('clerk_id', data.id);

     if (error) throw error;
     console.log('User updated:', data.id);
   }

   async function handleUserDeleted(data: any) {
     const { error } = await supabase
       .from('users')
       .delete()
       .eq('clerk_id', data.id);

     if (error) throw error;
     console.log('User deleted:', data.id);
   }

   async function handleOrganizationCreated(data: any) {
     const { error } = await supabase.from('organizations').insert({
       clerk_org_id: data.id,
       name: data.name,
       slug: data.slug,
       type: 'school',
       logo_url: data.image_url,
     });

     if (error) throw error;
     console.log('Organization created:', data.id);
   }

   async function handleOrganizationUpdated(data: any) {
     const { error } = await supabase
       .from('organizations')
       .update({
         name: data.name,
         slug: data.slug,
         logo_url: data.image_url,
       })
       .eq('clerk_org_id', data.id);

     if (error) throw error;
     console.log('Organization updated:', data.id);
   }
   ```

3. Deploy to Vercel:
   ```bash
   vercel
   ```

4. Add environment variables in Vercel Dashboard:
   - `SUPABASE_URL`: `https://lvsxoluyogtzfmdhhvnl.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY`: Get from Supabase Settings → API
   - `CLERK_WEBHOOK_SECRET`: Will get from Clerk after creating webhook

### Step 2: Add Webhook in Clerk

1. Go to: https://dashboard.clerk.com/apps/app_2sq5IYLqLCGKOh8DhYsL5Fc1BrJ/webhooks
2. Click **"Add Endpoint"**
3. Enter your Vercel URL: `https://your-app.vercel.app/api/webhooks/clerk`
4. Subscribe to events:
   - ✅ `user.created`
   - ✅ `user.updated`
   - ✅ `user.deleted`
   - ✅ `organization.created`
   - ✅ `organization.updated`
5. Click **"Create"**
6. Copy the **Signing Secret** (starts with `whsec_`)
7. Add to Vercel: `CLERK_WEBHOOK_SECRET=whsec_xxxxx`

---

## 3. 👤 User Sync Implementation

### Get Supabase Service Role Key

1. Go to: https://supabase.com/dashboard/project/lvsxoluyogtzfmdhhvnl/settings/api
2. Copy **`service_role`** key (NOT the anon key)
3. Add to `.env.local`:
   ```bash
   SUPABASE_SERVICE_ROLE_KEY=eyJhbG...your-service-role-key
   ```

⚠️ **IMPORTANT**: Service role key bypasses RLS - only use server-side!

---

## 4. 🧪 Testing the Integration

### Test 1: Create a New User

1. Go to your app: http://localhost:3040
2. Click **"Sign Up"**
3. Create a test account

**Expected Result**:
- User created in Clerk
- Webhook fires to Vercel
- User inserted into Supabase `users` table

**Verify**:
1. Check Clerk Dashboard → Users
2. Check Supabase Dashboard → Table Editor → users
3. Check Vercel → Functions → Logs

### Test 2: Update User Role

1. Go to Clerk Dashboard → Users → Select user
2. Scroll to **Public metadata**
3. Add:
   ```json
   {
     "role": "teacher"
   }
   ```
4. Save

**Expected Result**:
- Webhook fires
- User's role updated in Supabase

**Verify**:
```sql
SELECT clerk_id, email, role FROM users WHERE clerk_id = 'user_xxxxx';
```

### Test 3: Query from Frontend

Add to your component:
```typescript
import { supabase } from '@/lib/supabase';
import { useUser } from '@clerk/clerk-react';

function MyComponent() {
  const { user } = useUser();
  
  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
  }, [user]);
  
  async function loadUserProfile() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_id', user.id)
      .single();
    
    console.log('User profile:', data);
  }
}
```

---

## 5. 💻 Usage Examples

### Example 1: Get User's Organizations

```typescript
import { getUserOrganizations } from '@/lib/supabase';
import { useUser } from '@clerk/clerk-react';

function OrganizationList() {
  const { user } = useUser();
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    if (user) {
      loadOrganizations();
    }
  }, [user]);

  async function loadOrganizations() {
    const { data } = await supabase
      .from('organization_members')
      .select(`
        role,
        organization:organizations(*)
      `)
      .eq('user_id', user.id);
    
    setOrgs(data);
  }

  return (
    <div>
      {orgs.map(org => (
        <div key={org.organization.id}>
          <h3>{org.organization.name}</h3>
          <p>Role: {org.role}</p>
        </div>
      ))}
    </div>
  );
}
```

### Example 2: Create a School Organization

```typescript
async function createSchool(name: string, slug: string) {
  const { data, error } = await supabase
    .from('organizations')
    .insert({
      name,
      slug,
      type: 'school',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

### Example 3: Enroll Student in Course

```typescript
async function enrollStudent(courseId: string, studentId: string) {
  const { error } = await supabase
    .from('enrollments')
    .insert({
      course_id: courseId,
      student_id: studentId,
      status: 'active',
    });

  if (error) throw error;
}
```

### Example 4: Get Student Grades

```typescript
async function getStudentGrades(studentId: string) {
  const { data, error } = await supabase
    .from('grades')
    .select(`
      *,
      assignment:assignments(
        title,
        max_points,
        course:courses(name)
      )
    `)
    .eq('student_id', studentId);

  if (error) throw error;
  return data;
}
```

### Example 5: Real-time Grade Updates

```typescript
import { subscribeToTable } from '@/lib/supabase';

useEffect(() => {
  const unsubscribe = subscribeToTable(
    'grades',
    (payload) => {
      console.log('Grade updated:', payload);
      // Update UI
    },
    { column: 'student_id', value: studentId }
  );

  return unsubscribe;
}, [studentId]);
```

---

## 🔒 Security Best Practices

1. **Never expose service_role key** client-side
2. **Always use RLS policies** for data access control
3. **Validate webhook signatures** in webhook handler
4. **Use Clerk's built-in security** for authentication
5. **Encrypt sensitive data** at rest

---

## 📚 Additional Resources

- **Supabase Dashboard**: https://supabase.com/dashboard/project/lvsxoluyogtzfmdhhvnl
- **Clerk Dashboard**: https://dashboard.clerk.com/
- **Supabase Docs**: https://supabase.com/docs
- **Clerk Webhooks Guide**: https://clerk.com/docs/integrations/webhooks/overview

---

## 🆘 Troubleshooting

### Issue: Webhook not firing
**Solution**: Check Clerk Dashboard → Webhooks → Recent Attempts for errors

### Issue: RLS blocking queries
**Solution**: Ensure user is authenticated and has proper permissions

### Issue: User not found in Supabase
**Solution**: Check webhook logs, ensure webhook fired successfully

---

## ✅ Checklist

- [ ] Run `schema.sql` in Supabase SQL Editor
- [ ] Deploy webhook endpoint to Vercel
- [ ] Add webhook URL to Clerk Dashboard
- [ ] Copy webhook secret to Vercel environment
- [ ] Test user signup flow
- [ ] Verify user appears in Supabase
- [ ] Test role assignment
- [ ] Test frontend queries

---

**Your database and authentication are now fully integrated! 🎉**
