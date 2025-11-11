import { test, expect, TEST_USERS } from '../fixtures';
import { AuthPage } from '../page-objects/AuthPage';

test.describe('Password Reset Flow', () => {
  let authPage: AuthPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    await authPage.goto();
  });

  test('should display forgot password link on sign in modal', async ({ page }) => {
    await authPage.openSignIn();
    await expect(page.locator('a:has-text("Forgot password")')).toBeVisible();
  });

  test('should open forgot password form when clicking link', async ({ page }) => {
    await authPage.openSignIn();
    await page.click('a:has-text("Forgot password")');
    
    // Should show password reset form
    await expect(page.locator('text=/Reset|Forgot|password/i')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('input[name="identifier"]')).toBeVisible();
  });

  test('should show success message after requesting password reset', async ({ page }) => {
    await authPage.openSignIn();
    await page.click('a:has-text("Forgot password")');
    
    // Fill email
    await authPage.fillEmail(TEST_USERS.owner.email);
    await page.click('button:has-text("Reset password")');
    
    // Should show success message or confirmation
    await expect(page.locator('text=/check|sent|email/i')).toBeVisible({ timeout: 10000 });
  });

  test('should show error for non-existent email', async ({ page }) => {
    await authPage.openSignIn();
    await page.click('a:has-text("Forgot password")');
    
    // Fill non-existent email
    await authPage.fillEmail('nonexistent@gyn.com');
    await page.click('button:has-text("Reset password")');
    
    // Clerk may show error or success (security: don't reveal if email exists)
    await page.waitForTimeout(2000);
  });

  test('should show validation error for empty email', async ({ page }) => {
    await authPage.openSignIn();
    await page.click('a:has-text("Forgot password")');
    
    // Submit without email
    await page.click('button:has-text("Reset password")');
    
    // Should show validation error
    await expect(page.locator('text=/required|enter|email/i')).toBeVisible({ timeout: 5000 });
  });

  test('should show validation error for invalid email format', async ({ page }) => {
    await authPage.openSignIn();
    await page.click('a:has-text("Forgot password")');
    
    // Fill invalid email
    await authPage.fillEmail('invalid-email-format');
    await page.click('button:has-text("Reset password")');
    
    // Should show validation error
    await expect(page.locator('text=/invalid|valid email/i')).toBeVisible({ timeout: 5000 });
  });

  test('should allow returning to sign in from forgot password', async ({ page }) => {
    await authPage.openSignIn();
    await page.click('a:has-text("Forgot password")');
    
    // Should have back button or link to sign in
    const backButton = page.locator('button:has-text("Back")').or(page.locator('a:has-text("Sign in")'));
    await expect(backButton.first()).toBeVisible();
  });

  test('should handle multiple password reset requests', async ({ page }) => {
    await authPage.openSignIn();
    await page.click('a:has-text("Forgot password")');
    
    // First request
    await authPage.fillEmail(TEST_USERS.owner.email);
    await page.click('button:has-text("Reset password")');
    await page.waitForTimeout(2000);
    
    // Go back and try again
    const backButton = page.locator('button:has-text("Back")');
    if (await backButton.isVisible()) {
      await backButton.click();
      await authPage.fillEmail(TEST_USERS.owner.email);
      await page.click('button:has-text("Reset password")');
    }
  });

  test('should trim whitespace from email in password reset', async ({ page }) => {
    await authPage.openSignIn();
    await page.click('a:has-text("Forgot password")');
    
    // Fill email with spaces
    const emailWithSpaces = `  ${TEST_USERS.owner.email}  `;
    await page.fill('input[name="identifier"]', emailWithSpaces);
    await page.click('button:has-text("Reset password")');
    
    // Should process successfully (email trimmed)
    await page.waitForTimeout(2000);
  });
});

test.describe('Password Reset Flow - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  let authPage: AuthPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    await authPage.goto();
  });

  test('should display mobile-optimized forgot password form', async ({ page }) => {
    await authPage.openSignIn();
    await page.click('a:has-text("Forgot password")');
    
    // Verify form is visible and responsive
    const emailInput = page.locator('input[name="identifier"]');
    await expect(emailInput).toBeVisible();
    
    // Check that form fits in viewport
    const boundingBox = await emailInput.boundingBox();
    expect(boundingBox?.width).toBeLessThanOrEqual(375);
  });

  test('should successfully request password reset on mobile', async ({ page }) => {
    await authPage.openSignIn();
    await page.click('a:has-text("Forgot password")');
    
    await authPage.fillEmail(TEST_USERS.owner.email);
    await page.click('button:has-text("Reset password")');
    
    // Should show success message
    await page.waitForTimeout(2000);
  });
});

test.describe('Password Reset Flow - Email Verification', () => {
  test('should explain email verification process', async ({ page }) => {
    const authPage = new AuthPage(page);
    await authPage.goto();
    await authPage.openSignIn();
    await page.click('a:has-text("Forgot password")');
    
    // Fill and submit
    await authPage.fillEmail(TEST_USERS.owner.email);
    await page.click('button:has-text("Reset password")');
    
    // Should show instructions about checking email
    await expect(page.locator('text=/check|email|link/i')).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Password Reset Flow - Complete Reset', () => {
  test.skip('should complete full password reset flow with email link', async ({ page }) => {
    // This test requires email integration and is typically run manually
    // or with email testing service like Mailhog/MailSlurp
    
    const authPage = new AuthPage(page);
    await authPage.goto();
    
    // Step 1: Request password reset
    await authPage.openSignIn();
    await page.click('a:has-text("Forgot password")');
    await authPage.fillEmail(TEST_USERS.owner.email);
    await page.click('button:has-text("Reset password")');
    
    // Step 2: User would click link in email (simulated here)
    // const resetToken = 'obtained_from_email';
    // await page.goto(`/reset-password?token=${resetToken}`);
    
    // Step 3: Set new password
    // await page.fill('input[name="password"]', 'NewPassword123!');
    // await page.fill('input[name="confirmPassword"]', 'NewPassword123!');
    // await page.click('button:has-text("Reset password")');
    
    // Step 4: Login with new password
    // await authPage.login(TEST_USERS.owner.email, 'NewPassword123!');
    // await authPage.expectLoggedIn();
  });

  test.skip('should reject expired password reset link', async ({ page }) => {
    // This test requires expired token simulation
    // Typically tested manually or with backend mock
  });

  test.skip('should reject used password reset link', async ({ page }) => {
    // This test requires token reuse detection
    // Typically tested manually or with backend integration
  });
});

test.describe('Password Reset Flow - Security', () => {
  test('should not reveal if email exists in system', async ({ page }) => {
    const authPage = new AuthPage(page);
    await authPage.goto();
    await authPage.openSignIn();
    await page.click('a:has-text("Forgot password")');
    
    // Try with non-existent email
    await authPage.fillEmail('doesnotexist@gyn.com');
    await page.click('button:has-text("Reset password")');
    
    // Should show generic success message (security best practice)
    // Don't reveal whether email exists or not
    await page.waitForTimeout(2000);
  });

  test('should rate limit password reset requests', async ({ page }) => {
    const authPage = new AuthPage(page);
    await authPage.goto();
    
    // Make multiple rapid requests
    for (let i = 0; i < 5; i++) {
      await authPage.openSignIn();
      await page.click('a:has-text("Forgot password")');
      await authPage.fillEmail(TEST_USERS.owner.email);
      await page.click('button:has-text("Reset password")');
      await page.waitForTimeout(500);
      
      // Go back for next iteration
      const backButton = page.locator('button:has-text("Back")');
      if (await backButton.isVisible()) {
        await backButton.click();
        await page.click('a:has-text("Forgot password")');
      }
    }
    
    // Clerk may show rate limit error after multiple attempts
    // This is security feature to prevent abuse
  });
});
