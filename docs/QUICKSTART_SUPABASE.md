# 🚀 Quick Start Guide - Supabase Integration

## ✅ What's Already Done

1. **Supabase Client**: `src/lib/supabase.ts` - Ready to use
2. **Database Schema**: `supabase/schema.sql` - Complete SQL for 9 tables
3. **TypeScript Types**: `src/types/database.ts` - Type-safe database queries
4. **Documentation**: `docs/SUPABASE_SETUP.md` - Complete setup guide
5. **Environment Variables**: `.env.local` - Configured with your Supabase credentials

---

## 🎯 Next Steps (Do These Now!)

### Step 1: Create Database Tables (5 minutes)

1. **Open Supabase SQL Editor**:  
   👉 https://supabase.com/dashboard/project/lvsxoluyogtzfmdhhvnl/editor

2. **Click "New Query"**

3. **Copy & Paste** entire content from `supabase/schema.sql`

4. **Click "Run"** (or press `Ctrl+Enter`)

5. **Verify**: Go to Table Editor - you should see 9 tables

---

### Step 2: Get Service Role Key (2 minutes)

1. **Go to API Settings**:  
   👉 https://supabase.com/dashboard/project/lvsxoluyogtzfmdhhvnl/settings/api

2. **Copy `service_role` key** (NOT the anon key)

3. **Add to `.env.local`**:
   ```bash
   SUPABASE_SERVICE_ROLE_KEY=eyJhbG...your-service-role-key
   ```

---

### Step 3: Test Database Connection (1 minute)

Add this to any component:

```typescript
import { supabase } from '@/lib/supabase';

// Test query
const { data, error } = await supabase
  .from('users')
  .select('count');

console.log('Database connected:', data);
```

---

### Step 4: Set Up Clerk Webhook (Optional - for user sync)

Follow the detailed guide in `docs/SUPABASE_SETUP.md` → Section 2

**Quick version**:
1. Deploy webhook to Vercel
2. Add webhook URL to Clerk Dashboard
3. Users auto-sync to Supabase on signup

---

## 💻 Usage Examples

### Get Current User Profile

```typescript
import { useUser } from '@clerk/clerk-react';
import { supabase } from '@/lib/supabase';

const { user } = useUser();

const { data: profile } = await supabase
  .from('users')
  .select('*')
  .eq('clerk_id', user.id)
  .single();
```

### Get User's Organizations

```typescript
const { data: orgs } = await supabase
  .from('organization_members')
  .select(`
    role,
    organization:organizations(*)
  `)
  .eq('user_id', userId);
```

### Create a School

```typescript
const { data: school } = await supabase
  .from('organizations')
  .insert({
    name: 'Lincoln High School',
    slug: 'lincoln-high',
    type: 'school'
  })
  .select()
  .single();
```

---

## 📚 Full Documentation

See `docs/SUPABASE_SETUP.md` for:
- Complete webhook setup
- All database tables explained
- Security & RLS policies
- Advanced usage examples
- Troubleshooting guide

---

## 🎉 You're Ready!

Your platform now has:
- ✅ Clerk authentication
- ✅ Supabase PostgreSQL database
- ✅ Type-safe queries
- ✅ Multi-tenant architecture
- ✅ Real-time subscriptions
- ✅ Row Level Security

**Start building your features!** 🚀
