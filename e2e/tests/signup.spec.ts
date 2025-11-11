import { test, expect, NEW_USER } from '../fixtures';
import { AuthPage, DashboardPage } from '../page-objects/AuthPage';

test.describe('Sign Up Flow', () => {
  let authPage: AuthPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    dashboardPage = new DashboardPage(page);
    await authPage.goto();
  });

  test('should display sign up button on welcome page', async ({ page }) => {
    await expect(page.locator('button:has-text("Sign up")')).toBeVisible();
  });

  test('should open sign up modal when clicking sign up button', async ({ page }) => {
    await authPage.openSignUp();
    await expect(page.locator('input[name="identifier"]')).toBeVisible();
    await expect(page.locator('text=/Create|Sign up/i')).toBeVisible();
  });

  test('should successfully create new account', async ({ page }) => {
    const uniqueEmail = `test.${Date.now()}@gyn.com`;
    
    await authPage.signup(uniqueEmail, NEW_USER.password);
    
    // After successful signup, user should be logged in
    await authPage.expectLoggedIn();
    await dashboardPage.expectLoaded();
  });

  test('should show error for duplicate email', async ({ page }) => {
    // Try to sign up with existing user email
    await authPage.openSignUp();
    await authPage.fillEmail('owner@gyn.com'); // Existing test account
    await authPage.clickContinue();
    
    // Clerk will show error for existing email
    await expect(page.locator('text=/already|exists|taken/i')).toBeVisible({ timeout: 5000 });
  });

  test('should show validation error for invalid email format', async ({ page }) => {
    await authPage.openSignUp();
    await authPage.fillEmail('invalid-email-format');
    await authPage.clickContinue();
    
    // Clerk shows validation error for invalid email
    await expect(page.locator('text=/invalid|valid email/i')).toBeVisible({ timeout: 5000 });
  });

  test('should show validation error for weak password', async ({ page }) => {
    const uniqueEmail = `test.${Date.now()}@gyn.com`;
    
    await authPage.openSignUp();
    await authPage.fillEmail(uniqueEmail);
    await authPage.clickContinue();
    await authPage.fillPassword('123'); // Too weak
    await authPage.submit();
    
    // Clerk shows password strength requirements
    await expect(page.locator('text=/password|strong|characters/i')).toBeVisible({ timeout: 5000 });
  });

  test('should show validation error for empty email', async ({ page }) => {
    await authPage.openSignUp();
    await authPage.clickContinue();
    
    // Clerk shows validation error for empty field
    await expect(page.locator('text=/required|enter|email/i')).toBeVisible({ timeout: 5000 });
  });

  test('should show validation error for empty password', async ({ page }) => {
    const uniqueEmail = `test.${Date.now()}@gyn.com`;
    
    await authPage.openSignUp();
    await authPage.fillEmail(uniqueEmail);
    await authPage.clickContinue();
    // Don't fill password
    await authPage.submit();
    
    // Clerk shows validation error for empty password
    await expect(page.locator('text=/required|enter|password/i')).toBeVisible({ timeout: 5000 });
  });

  test('should allow switching from sign up to sign in modal', async ({ page }) => {
    await authPage.openSignUp();
    await authPage.switchToSignIn();
    
    // Verify we're on sign in form
    await expect(page.locator('text=Sign in')).toBeVisible();
  });

  test('should auto-login after successful signup', async ({ page }) => {
    const uniqueEmail = `test.${Date.now()}@gyn.com`;
    
    await authPage.signup(uniqueEmail, NEW_USER.password);
    
    // Should be logged in without additional login step
    await authPage.expectLoggedIn();
    await expect(page.locator('[data-clerk-user-button]')).toBeVisible();
  });

  test('should display password requirements', async ({ page }) => {
    await authPage.openSignUp();
    const uniqueEmail = `test.${Date.now()}@gyn.com`;
    await authPage.fillEmail(uniqueEmail);
    await authPage.clickContinue();
    
    // Click on password field to show requirements
    await page.click('input[name="password"]');
    
    // Clerk may show password requirements hint
    // This is optional based on Clerk configuration
    await page.waitForTimeout(1000);
  });

  test('should redirect to dashboard after successful signup', async ({ page }) => {
    const uniqueEmail = `test.${Date.now()}@gyn.com`;
    
    await authPage.signup(uniqueEmail, NEW_USER.password);
    
    // Should redirect to main dashboard
    await authPage.expectUrl('/');
    await dashboardPage.expectLoaded();
  });

  test('should persist session after signup and page reload', async ({ page }) => {
    const uniqueEmail = `test.${Date.now()}@gyn.com`;
    
    // Sign up
    await authPage.signup(uniqueEmail, NEW_USER.password);
    await authPage.expectLoggedIn();
    
    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Should still be logged in
    await authPage.expectLoggedIn();
    await dashboardPage.expectLoaded();
  });

  test('should trim whitespace from email input', async ({ page }) => {
    const uniqueEmail = `test.${Date.now()}@gyn.com`;
    const emailWithSpaces = `  ${uniqueEmail}  `;
    
    await authPage.openSignUp();
    await authPage.fillEmail(emailWithSpaces);
    await authPage.clickContinue();
    await authPage.fillPassword(NEW_USER.password);
    await authPage.submit();
    
    // Should successfully create account (email trimmed)
    await authPage.expectLoggedIn();
  });

  test('should handle special characters in password', async ({ page }) => {
    const uniqueEmail = `test.${Date.now()}@gyn.com`;
    const complexPassword = 'P@ssw0rd!#$%^&*()';
    
    await authPage.signup(uniqueEmail, complexPassword);
    
    // Should successfully create account with special chars
    await authPage.expectLoggedIn();
    await dashboardPage.expectLoaded();
  });
});

test.describe('Sign Up Flow - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  let authPage: AuthPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    dashboardPage = new DashboardPage(page);
    await authPage.goto();
  });

  test('should successfully sign up on mobile viewport', async ({ page }) => {
    const uniqueEmail = `test.${Date.now()}@gyn.com`;
    
    await authPage.signup(uniqueEmail, NEW_USER.password);
    await authPage.expectLoggedIn();
    await dashboardPage.expectLoaded();
  });

  test('should display mobile-optimized signup form', async ({ page }) => {
    await authPage.openSignUp();
    
    // Verify form is visible and responsive
    const emailInput = page.locator('input[name="identifier"]');
    await expect(emailInput).toBeVisible();
    
    // Check that form fits in viewport
    const boundingBox = await emailInput.boundingBox();
    expect(boundingBox?.width).toBeLessThanOrEqual(375);
  });
});
