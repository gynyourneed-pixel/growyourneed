import { test, expect, TEST_USERS } from '../fixtures';
import { AuthPage, DashboardPage } from '../page-objects/AuthPage';

test.describe('Login Flow', () => {
  let authPage: AuthPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    dashboardPage = new DashboardPage(page);
    await authPage.goto();
  });

  test('should display sign in button on welcome page', async ({ page }) => {
    await authPage.expectLoggedOut();
    await expect(page.locator('button:has-text("Sign in")')).toBeVisible();
    await expect(page.locator('button:has-text("Sign up")')).toBeVisible();
  });

  test('should open sign in modal when clicking sign in button', async ({ page }) => {
    await authPage.openSignIn();
    await expect(page.locator('input[name="identifier"]')).toBeVisible();
    await expect(page.locator('text=Sign in')).toBeVisible();
  });

  test('should successfully login with owner credentials', async ({ page }) => {
    await authPage.login(TEST_USERS.owner.email, TEST_USERS.owner.password);
    await authPage.expectLoggedIn();
    await dashboardPage.expectLoaded();
  });

  test('should successfully login with admin credentials', async ({ page }) => {
    await authPage.login(TEST_USERS.admin.email, TEST_USERS.admin.password);
    await authPage.expectLoggedIn();
    await dashboardPage.expectLoaded();
  });

  test('should successfully login with teacher credentials', async ({ page }) => {
    await authPage.login(TEST_USERS.teacher.email, TEST_USERS.teacher.password);
    await authPage.expectLoggedIn();
    await dashboardPage.expectLoaded();
  });

  test('should successfully login with parent credentials', async ({ page }) => {
    await authPage.login(TEST_USERS.parent.email, TEST_USERS.parent.password);
    await authPage.expectLoggedIn();
    await dashboardPage.expectLoaded();
  });

  test('should successfully login with student credentials', async ({ page }) => {
    await authPage.login(TEST_USERS.student.email, TEST_USERS.student.password);
    await authPage.expectLoggedIn();
    await dashboardPage.expectLoaded();
  });

  test('should successfully login with individual credentials', async ({ page }) => {
    await authPage.login(TEST_USERS.individual.email, TEST_USERS.individual.password);
    await authPage.expectLoggedIn();
    await dashboardPage.expectLoaded();
  });

  test('should show error for invalid email', async ({ page }) => {
    await authPage.openSignIn();
    await authPage.fillEmail('invalid@email.com');
    await authPage.clickContinue();
    await authPage.fillPassword('wrongpassword');
    await authPage.submit();
    
    // Clerk will show error message for invalid credentials
    await expect(page.locator('text=/Invalid|Incorrect|not found/i')).toBeVisible({ timeout: 5000 });
  });

  test('should show error for wrong password', async ({ page }) => {
    await authPage.openSignIn();
    await authPage.fillEmail(TEST_USERS.owner.email);
    await authPage.clickContinue();
    await authPage.fillPassword('wrongpassword123');
    await authPage.submit();
    
    // Clerk will show error message for invalid credentials
    await expect(page.locator('text=/Invalid|Incorrect|Password/i')).toBeVisible({ timeout: 5000 });
  });

  test('should show validation error for empty email', async ({ page }) => {
    await authPage.openSignIn();
    await authPage.clickContinue();
    
    // Clerk shows validation error for empty field
    await expect(page.locator('text=/required|enter|email/i')).toBeVisible({ timeout: 5000 });
  });

  test('should show validation error for empty password', async ({ page }) => {
    await authPage.openSignIn();
    await authPage.fillEmail(TEST_USERS.owner.email);
    await authPage.clickContinue();
    // Don't fill password
    await authPage.submit();
    
    // Clerk shows validation error for empty password
    await expect(page.locator('text=/required|enter|password/i')).toBeVisible({ timeout: 5000 });
  });

  test('should persist session after page reload', async ({ page }) => {
    // Login first
    await authPage.login(TEST_USERS.owner.email, TEST_USERS.owner.password);
    await authPage.expectLoggedIn();
    
    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Should still be logged in
    await authPage.expectLoggedIn();
    await dashboardPage.expectLoaded();
  });

  test('should allow switching from sign in to sign up modal', async ({ page }) => {
    await authPage.openSignIn();
    await authPage.switchToSignUp();
    
    // Verify we're on sign up form
    await expect(page.locator('text=/Create|Sign up/i')).toBeVisible();
  });

  test('should display forgot password link', async ({ page }) => {
    await authPage.openSignIn();
    await expect(page.locator('a:has-text("Forgot password")')).toBeVisible();
  });

  test('should login with username instead of email', async ({ page }) => {
    await authPage.login(TEST_USERS.owner.username, TEST_USERS.owner.password);
    await authPage.expectLoggedIn();
    await dashboardPage.expectLoaded();
  });

  test('should redirect to dashboard after successful login', async ({ page }) => {
    await authPage.login(TEST_USERS.owner.email, TEST_USERS.owner.password);
    await authPage.expectUrl('/');
    await dashboardPage.expectLoaded();
  });

  test('should show user profile button after login', async ({ page }) => {
    await authPage.login(TEST_USERS.owner.email, TEST_USERS.owner.password);
    await expect(page.locator('[data-clerk-user-button]')).toBeVisible();
  });
});

test.describe('Login Flow - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  let authPage: AuthPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    dashboardPage = new DashboardPage(page);
    await authPage.goto();
  });

  test('should successfully login on mobile viewport', async ({ page }) => {
    await authPage.login(TEST_USERS.owner.email, TEST_USERS.owner.password);
    await authPage.expectLoggedIn();
    await dashboardPage.expectLoaded();
  });

  test('should display mobile-optimized login form', async ({ page }) => {
    await authPage.openSignIn();
    
    // Verify form is visible and responsive
    const emailInput = page.locator('input[name="identifier"]');
    await expect(emailInput).toBeVisible();
    
    // Check that form fits in viewport
    const boundingBox = await emailInput.boundingBox();
    expect(boundingBox?.width).toBeLessThanOrEqual(375);
  });
});
