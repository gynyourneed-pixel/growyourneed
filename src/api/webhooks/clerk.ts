import { Webhook } from 'svix';
import type { WebhookEvent } from '@clerk/clerk-react';

/**
 * Clerk Webhook Handler
 * 
 * This endpoint receives webhook events from Clerk when users are created, updated, or deleted.
 * Use this to sync user data to your database.
 * 
 * IMPORTANT: This is a server-side endpoint. You need to set this up with Express, Next.js API routes,
 * or another backend framework.
 */

// For Vite + Express example
export async function handleClerkWebhook(req: any, res: any) {
  // Get the Svix headers for verification
  const svix_id = req.headers['svix-id'];
  const svix_timestamp = req.headers['svix-timestamp'];
  const svix_signature = req.headers['svix-signature'];

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ error: 'Missing svix headers' });
  }

  // Get the webhook secret from environment variables
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Missing CLERK_WEBHOOK_SECRET environment variable');
  }

  // Get the body
  const payload = req.body;
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the webhook signature
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  // Handle the webhook event
  const eventType = evt.type;

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
    case 'organizationMembership.created':
      await handleMembershipCreated(evt.data);
      break;
    default:
      console.log(`Unhandled webhook event type: ${eventType}`);
  }

  return res.status(200).json({ message: 'Webhook received' });
}

// Handler functions - implement these to sync with your database
async function handleUserCreated(data: any) {
  console.log('User created:', data.id);
  console.log('Email:', data.email_addresses[0]?.email_address);
  console.log('Name:', data.first_name, data.last_name);
  console.log('Role:', data.public_metadata?.role || 'individual');
  
  // TODO: Add to your database
  // Example:
  // await db.users.create({
  //   id: data.id,
  //   email: data.email_addresses[0]?.email_address,
  //   firstName: data.first_name,
  //   lastName: data.last_name,
  //   role: data.public_metadata?.role || 'individual',
  //   createdAt: new Date(data.created_at),
  // });
}

async function handleUserUpdated(data: any) {
  console.log('User updated:', data.id);
  console.log('Updated role:', data.public_metadata?.role);
  
  // TODO: Update in your database
  // await db.users.update({
  //   where: { id: data.id },
  //   data: {
  //     firstName: data.first_name,
  //     lastName: data.last_name,
  //     role: data.public_metadata?.role,
  //   },
  // });
}

async function handleUserDeleted(data: any) {
  console.log('User deleted:', data.id);
  
  // TODO: Delete from your database or mark as deleted
  // await db.users.delete({
  //   where: { id: data.id },
  // });
}

async function handleOrganizationCreated(data: any) {
  console.log('Organization (School) created:', data.id);
  console.log('Name:', data.name);
  
  // TODO: Add school/organization to your database
  // await db.organizations.create({
  //   id: data.id,
  //   name: data.name,
  //   slug: data.slug,
  //   createdAt: new Date(data.created_at),
  // });
}

async function handleOrganizationUpdated(data: any) {
  console.log('Organization (School) updated:', data.id);
  
  // TODO: Update organization in your database
}

async function handleMembershipCreated(data: any) {
  console.log('User added to organization:', data.public_user_data?.user_id);
  console.log('Organization:', data.organization.id);
  console.log('Role in org:', data.role);
  
  // TODO: Add membership record to your database
  // await db.organizationMembers.create({
  //   userId: data.public_user_data?.user_id,
  //   organizationId: data.organization.id,
  //   role: data.role,
  // });
}
