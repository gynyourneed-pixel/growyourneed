# 🔗 Clerk Webhook Setup Guide for GrowYour Need

## 📋 Overview

Webhooks allow Clerk to notify your backend whenever user events occur (sign-up, profile update, deletion, etc.). This enables you to keep your database in sync with Clerk's user data.

---

## 🎯 What You Need to Do

### **Step 1: Choose Your Webhook Solution**

Since you're using **Vite + React** (frontend only), you need a backend to receive webhooks. Choose one option:

#### **Option A: Use a Serverless Function (Easiest - Recommended)**

Deploy a simple webhook endpoint using:
- **Vercel Serverless Functions** (Free, easiest)
- **Netlify Functions** (Free)
- **AWS Lambda** (Requires AWS account)
- **Cloudflare Workers** (Free tier)

#### **Option B: Add Express Backend to Your Project**

Add a simple Express server to handle webhooks alongside your Vite frontend.

#### **Option C: Use a Webhook Relay Service (Testing Only)**

For development/testing:
- **ngrok** - Exposes local server to internet
- **LocalTunnel** - Free alternative to ngrok

---

## 🚀 Quick Setup: Option A (Vercel Serverless - Recommended)

### 1. Create Vercel Account (if you don't have one)
👉 https://vercel.com/signup

### 2. Install Vercel CLI
```bash
pnpm add -g vercel
```

### 3. Create API Endpoint

Create this file in your project:

**File: `api/webhooks/clerk.ts`**

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Webhook } from 'svix';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get Svix headers
  const svix_id = req.headers['svix-id'] as string;
  const svix_timestamp = req.headers['svix-timestamp'] as string;
  const svix_signature = req.headers['svix-signature'] as string;

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ error: 'Missing svix headers' });
  }

  // Get webhook secret from environment
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    return res.status(500).json({ error: 'Webhook secret not configured' });
  }

  // Verify webhook signature
  const wh = new Webhook(WEBHOOK_SECRET);
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

  // Handle the webhook event
  const eventType = evt.type;
  console.log(`Webhook received: ${eventType}`);

  switch (eventType) {
    case 'user.created':
      console.log('New user:', evt.data.id, evt.data.email_addresses[0]?.email_address);
      // TODO: Add to your database
      break;

    case 'user.updated':
      console.log('User updated:', evt.data.id);
      // TODO: Update in your database
      break;

    case 'user.deleted':
      console.log('User deleted:', evt.data.id);
      // TODO: Remove from your database
      break;

    case 'organization.created':
      console.log('Organization created:', evt.data.name);
      // TODO: Add school/organization to database
      break;
  }

  return res.status(200).json({ success: true });
}
```

### 4. Deploy to Vercel
```bash
vercel
```

After deployment, you'll get a URL like:
```
https://your-app-name.vercel.app
```

Your webhook endpoint will be:
```
https://your-app-name.vercel.app/api/webhooks/clerk
```

---

## 🔐 Configure Clerk Dashboard

### Step 1: Get Webhook Endpoint URL

**Your webhook URL will be:**
```
https://YOUR-VERCEL-APP.vercel.app/api/webhooks/clerk
```

*(Replace with your actual Vercel app URL after deployment)*

---

### Step 2: Add Webhook in Clerk Dashboard

1. **Go to Clerk Dashboard:**
   👉 https://dashboard.clerk.com/

2. **Select Your Application:**
   - Click on "classic-redbird-37"

3. **Navigate to Webhooks:**
   - In the left sidebar, click **"Webhooks"**
   - Click **"Add Endpoint"** button

4. **Enter Your Webhook URL:**
   ```
   https://YOUR-VERCEL-APP.vercel.app/api/webhooks/clerk
   ```

5. **Select Events to Subscribe:**
   Check these boxes:
   - ✅ `user.created` - When a new user signs up
   - ✅ `user.updated` - When user profile is updated
   - ✅ `user.deleted` - When a user is deleted
   - ✅ `organization.created` - When a school is created
   - ✅ `organization.updated` - When school is updated
   - ✅ `organizationMembership.created` - When user joins school
   - ✅ `organizationMembership.updated` - When membership changes
   - ✅ `organizationMembership.deleted` - When user leaves school

6. **Copy the Webhook Secret:**
   - After creating the endpoint, Clerk shows a **Signing Secret**
   - Copy this secret (looks like: `whsec_xxxxxxxxxxxxx`)

7. **Add Secret to Your Environment:**
   
   In Vercel Dashboard:
   - Go to your project → **Settings** → **Environment Variables**
   - Add:
     ```
     CLERK_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
     ```
   - Redeploy your app

---

## 🧪 Test Your Webhook

### 1. Sign Up a Test User
- Go to http://localhost:3040
- Click "Sign Up"
- Create a test account

### 2. Check Webhook Logs

**In Clerk Dashboard:**
- Go to **Webhooks** → Click your endpoint
- View **Recent Attempts** tab
- You should see successful `user.created` event

**In Vercel Dashboard:**
- Go to your project → **Deployments** → Select latest
- Click **Functions** tab → Select `clerk` function
- View logs to see console output

---

## 📦 Alternative: Express Backend Setup

If you prefer to add Express to your Vite project:

### 1. Install Dependencies
```bash
pnpm add express svix @types/express
pnpm add -D tsx nodemon
```

### 2. Create Express Server

**File: `server/index.ts`**

```typescript
import express from 'express';
import { Webhook } from 'svix';

const app = express();
app.use(express.json());

app.post('/api/webhooks/clerk', async (req, res) => {
  const svix_id = req.headers['svix-id'] as string;
  const svix_timestamp = req.headers['svix-timestamp'] as string;
  const svix_signature = req.headers['svix-signature'] as string;

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ error: 'Missing headers' });
  }

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET!;
  const wh = new Webhook(WEBHOOK_SECRET);

  try {
    const evt = wh.verify(JSON.stringify(req.body), {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });

    console.log('Webhook event:', evt.type);
    // Handle events here
    
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(400).json({ error: 'Invalid signature' });
  }
});

app.listen(3001, () => {
  console.log('Webhook server running on http://localhost:3001');
});
```

### 3. Expose Local Server with ngrok

```bash
# Install ngrok
pnpm add -g ngrok

# Expose port 3001
ngrok http 3001
```

Use the ngrok URL in Clerk Dashboard:
```
https://abc123.ngrok.io/api/webhooks/clerk
```

---

## 🎯 What to Do with Webhook Data

Once webhooks are working, sync data to your database:

### Example: Save User to Database

```typescript
// In your webhook handler
case 'user.created':
  await prisma.user.create({
    data: {
      clerkId: evt.data.id,
      email: evt.data.email_addresses[0]?.email_address,
      firstName: evt.data.first_name,
      lastName: evt.data.last_name,
      role: evt.data.public_metadata?.role || 'individual',
      createdAt: new Date(evt.data.created_at),
    },
  });
  break;
```

---

## 📝 Summary - Your Action Items

1. **Deploy Webhook Endpoint:**
   - ✅ Use Vercel (easiest): Deploy `/api/webhooks/clerk.ts`
   - ⏹️ Or use Express + ngrok for local testing

2. **Get Your Webhook URL:**
   - After deployment: `https://YOUR-APP.vercel.app/api/webhooks/clerk`

3. **Add to Clerk Dashboard:**
   - 👉 https://dashboard.clerk.com/ → Webhooks → Add Endpoint
   - Paste your webhook URL
   - Select events: `user.*`, `organization.*`
   - Copy the signing secret

4. **Add Secret to Environment:**
   - In Vercel: Settings → Environment Variables
   - Add: `CLERK_WEBHOOK_SECRET=whsec_xxxxx`

5. **Test:**
   - Sign up a new user
   - Check Clerk Dashboard → Webhooks → Recent Attempts
   - Should show ✅ successful delivery

---

## 🔗 Quick Links

- **Clerk Dashboard Webhooks:** https://dashboard.clerk.com/apps/app_2sq5IYLqLCGKOh8DhYsL5Fc1BrJ/webhooks
- **Vercel Deploy:** https://vercel.com/new
- **Clerk Webhook Docs:** https://clerk.com/docs/integrations/webhooks/overview

---

## ❓ Need Help?

If you get stuck:
1. Test with a simple webhook tool first: https://webhook.site/
2. Check Clerk Dashboard → Webhooks → Recent Attempts for errors
3. Review Vercel function logs for debugging

---

## 🎉 Once Set Up, You'll Have:

- ✅ Real-time user sync to your database
- ✅ Automatic school/organization tracking
- ✅ User role management via metadata
- ✅ Complete audit trail of user events

**Start with Vercel - it's the easiest option!** 🚀
