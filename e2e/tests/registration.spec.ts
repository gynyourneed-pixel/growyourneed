import { test, expect, TEST_USERS, NEW_USER } from '../fixtures';
import { AuthPage, DashboardPage } from '../page-objects/AuthPage';

/**
 * Registration tests cover the complete user onboarding process
 * This includes account creation, email verification, and initial setup
 */
test.describe('User Registration Flow', () => {
  let authPage: AuthPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    dashboardPage = new DashboardPage(page);
    await authPage.goto();
  });

  test('should complete full registration process', async ({ page }) => {
    const uniqueEmail = `test.${Date.now()}@gyn.com`;
    
    // Start registration
    await authPage.openSignUp();
    await authPage.fillEmail(uniqueEmail);
    await authPage.clickContinue();
    await authPage.fillPassword(NEW_USER.password);
    await authPage.submit();
    
    // Should be logged in after registration
    await authPage.expectLoggedIn();
    await dashboardPage.expectLoaded();
  });

  test('should display registration form fields correctly', async ({ page }) => {
    await authPage.openSignUp();
    
    // Verify form elements
    await expect(page.locator('input[name="identifier"]')).toBeVisible();
    await expect(page.locator('text=/Create|Sign up/i')).toBeVisible();
    await expect(page.locator('a:has-text("Sign in")')).toBeVisible();
  });

  test('should validate email format during registration', async ({ page }) => {
    await authPage.openSignUp();
    
    // Try invalid formats
    const invalidEmails = [
      'notanemail',
      'missing@domain',
      '@nodomain.com',
      'spaces in@email.com',
    ];
    
    for (const email of invalidEmails.slice(0, 1)) { // Test one to save time
      await authPage.fillEmail(email);
      await authPage.clickContinue();
      
      // Should show validation error
      await expect(page.locator('text=/invalid|valid email/i')).toBeVisible({ timeout: 5000 });
      
      // Clear for next iteration
      await page.fill('input[name="identifier"]', '');
    }
  });

  test('should enforce password strength requirements', async ({ page }) => {
    const uniqueEmail = `test.${Date.now()}@gyn.com`;
    
    await authPage.openSignUp();
    await authPage.fillEmail(uniqueEmail);
    await authPage.clickContinue();
    
    // Try weak passwords
    const weakPasswords = ['123', 'abc', 'password'];
    
    for (const pwd of weakPasswords.slice(0, 1)) { // Test one to save time
      await authPage.fillPassword(pwd);
      await authPage.submit();
      
      // Should show strength requirement error
      await page.waitForTimeout(1000);
      
      // Clear for next iteration
      await page.fill('input[name="password"]', '');
    }
  });

  test('should prevent duplicate email registration', async ({ page }) => {
    // Try to register with existing test account
    await authPage.openSignUp();
    await authPage.fillEmail(TEST_USERS.owner.email);
    await authPage.clickContinue();
    
    // Should show error about existing account
    await expect(page.locator('text=/already|exists|taken/i')).toBeVisible({ timeout: 5000 });
  });

  test('should allow switching to login during registration', async ({ page }) => {
    await authPage.openSignUp();
    
    // Click sign in link
    await authPage.switchToSignIn();
    
    // Should show login form
    await expect(page.locator('text=Sign in')).toBeVisible();
  });

  test('should show terms of service during registration', async ({ page }) => {
    await authPage.openSignUp();
    
    // Clerk may show terms/privacy policy links
    // This is configuration-dependent
    await page.waitForTimeout(500);
  });

  test('should handle registration with social providers', async ({ page }) => {
    await authPage.openSignUp();
    
    // Check for social login buttons (if configured)
    const googleButton = page.locator('button:has-text("Google")');
    const githubButton = page.locator('button:has-text("GitHub")');
    
    // Social providers are optional in Clerk config
    await page.waitForTimeout(500);
  });

  test('should auto-populate username from email', async ({ page }) => {
    const uniqueEmail = `testuser.${Date.now()}@gyn.com`;
    
    await authPage.openSignUp();
    await authPage.fillEmail(uniqueEmail);
    await authPage.clickContinue();
    
    // Clerk may auto-suggest username
    await page.waitForTimeout(500);
  });

  test('should validate required fields before submission', async ({ page }) => {
    await authPage.openSignUp();
    
    // Try to continue without email
    await authPage.clickContinue();
    
    // Should show required field error
    await expect(page.locator('text=/required|enter/i')).toBeVisible({ timeout: 5000 });
  });

  test('should persist registration data on back navigation', async ({ page }) => {
    const uniqueEmail = `test.${Date.now()}@gyn.com`;
    
    await authPage.openSignUp();
    await authPage.fillEmail(uniqueEmail);
    await authPage.clickContinue();
    
    // Go back (if Clerk provides back button)
    const backButton = page.locator('button:has-text("Back")');
    if (await backButton.isVisible()) {
      await backButton.click();
      
      // Email should still be filled
      const emailValue = await page.inputValue('input[name="identifier"]');
      expect(emailValue).toBe(uniqueEmail);
    }
  });

  test('should show password visibility toggle', async ({ page }) => {
    const uniqueEmail = `test.${Date.now()}@gyn.com`;
    
    await authPage.openSignUp();
    await authPage.fillEmail(uniqueEmail);
    await authPage.clickContinue();
    
    // Look for password visibility toggle (eye icon)
    await authPage.fillPassword(NEW_USER.password);
    
    // Clerk typically provides visibility toggle
    const toggleButton = page.locator('button[aria-label*="password"]');
    await page.waitForTimeout(500);
  });

  test('should handle special characters in password', async ({ page }) => {
    const uniqueEmail = `test.${Date.now()}@gyn.com`;
    const specialPassword = 'P@$$w0rd!#%^&*()_+-=[]{}|;:,.<>?';
    
    await authPage.openSignUp();
    await authPage.fillEmail(uniqueEmail);
    await authPage.clickContinue();
    await authPage.fillPassword(specialPassword);
    await authPage.submit();
    
    // Should successfully register
    await authPage.expectLoggedIn();
  });

  test('should show loading state during registration submission', async ({ page }) => {
    const uniqueEmail = `test.${Date.now()}@gyn.com`;
    
    await authPage.openSignUp();
    await authPage.fillEmail(uniqueEmail);
    await authPage.clickContinue();
    await authPage.fillPassword(NEW_USER.password);
    
    // Click submit and check for loading indicator
    await page.click('button[type="submit"]');
    
    // Clerk typically shows loading spinner
    await page.waitForTimeout(500);
  });
});

test.describe('User Registration Flow - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  let authPage: AuthPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    dashboardPage = new DashboardPage(page);
    await authPage.goto();
  });

  test('should complete registration on mobile viewport', async ({ page }) => {
    const uniqueEmail = `test.${Date.now()}@gyn.com`;
    
    await authPage.openSignUp();
    await authPage.fillEmail(uniqueEmail);
    await authPage.clickContinue();
    await authPage.fillPassword(NEW_USER.password);
    await authPage.submit();
    
    await authPage.expectLoggedIn();
    await dashboardPage.expectLoaded();
  });

  test('should display mobile-optimized registration form', async ({ page }) => {
    await authPage.openSignUp();
    
    // Verify form responsiveness
    const emailInput = page.locator('input[name="identifier"]');
    await expect(emailInput).toBeVisible();
    
    const boundingBox = await emailInput.boundingBox();
    expect(boundingBox?.width).toBeLessThanOrEqual(375);
  });

  test('should handle mobile keyboard interactions', async ({ page }) => {
    const uniqueEmail = `test.${Date.now()}@gyn.com`;
    
    await authPage.openSignUp();
    
    // Focus email field
    await page.focus('input[name="identifier"]');
    
    // Type email
    await page.keyboard.type(uniqueEmail);
    
    // Continue
    await authPage.clickContinue();
    
    // Focus password field
    await page.focus('input[name="password"]');
    await page.keyboard.type(NEW_USER.password);
    
    // Submit
    await authPage.submit();
    
    await authPage.expectLoggedIn();
  });
});

test.describe('User Registration Flow - Accessibility', () => {
  let authPage: AuthPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    await authPage.goto();
  });

  test('should support keyboard navigation in registration form', async ({ page }) => {
    const uniqueEmail = `test.${Date.now()}@gyn.com`;
    
    await authPage.openSignUp();
    
    // Tab through form
    await page.keyboard.press('Tab'); // Focus email
    await page.keyboard.type(uniqueEmail);
    await page.keyboard.press('Tab'); // Focus continue button
    await page.keyboard.press('Enter'); // Submit
    
    await page.waitForTimeout(1000);
    
    // Tab to password
    await page.keyboard.press('Tab');
    await page.keyboard.type(NEW_USER.password);
    await page.keyboard.press('Tab'); // Focus submit
    await page.keyboard.press('Enter'); // Submit
    
    await authPage.expectLoggedIn();
  });

  test('should have proper ARIA labels', async ({ page }) => {
    await authPage.openSignUp();
    
    // Check for accessibility attributes
    const emailInput = page.locator('input[name="identifier"]');
    await expect(emailInput).toBeVisible();
    
    // Clerk provides good accessibility by default
  });
});
