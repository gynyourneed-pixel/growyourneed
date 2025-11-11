import { test as base } from '@playwright/test';

/**
 * Test user credentials for E2E testing
 * These should match the test accounts created in Clerk Dashboard
 * See docs/TEST_ACCOUNTS_SETUP.md for setup instructions
 */
export const TEST_USERS = {
  owner: {
    email: 'owner@gyn.com',
    username: 'owner',
    password: '123456',
    role: 'owner',
    displayName: 'Platform Owner',
  },
  admin: {
    email: 'admin@gyn.com',
    username: 'admin',
    password: '123456',
    role: 'admin',
    displayName: 'School Admin',
  },
  teacher: {
    email: 'teacher@gyn.com',
    username: 'teacher',
    password: '123456',
    role: 'teacher',
    displayName: 'Test Teacher',
  },
  parent: {
    email: 'parent@gyn.com',
    username: 'parent',
    password: '123456',
    role: 'parent',
    displayName: 'Test Parent',
  },
  student: {
    email: 'student@gyn.com',
    username: 'student',
    password: '123456',
    role: 'student',
    displayName: 'Test Student',
  },
  individual: {
    email: 'individual@gyn.com',
    username: 'individual',
    password: '123456',
    role: 'individual',
    displayName: 'Test Creator',
  },
} as const;

/**
 * Test user for new signups (should NOT exist in Clerk)
 */
export const NEW_USER = {
  email: `test.${Date.now()}@gyn.com`,
  password: 'Test@123456',
  firstName: 'Test',
  lastName: 'User',
};

/**
 * Extended test fixtures with authenticated contexts
 */
type TestFixtures = {
  authenticatedPage: any;
};

/**
 * Extend base test with custom fixtures
 */
export const test = base.extend<TestFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // This fixture can be used for tests that need pre-authenticated state
    await use(page);
  },
});

export { expect } from '@playwright/test';
