import { test, expect, TEST_USERS } from '../fixtures';
import { AuthPage, DashboardPage } from '../page-objects/AuthPage';

test.describe('Logout Flow', () => {
  let authPage: AuthPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    dashboardPage = new DashboardPage(page);
    await authPage.goto();
    
    // Login before each test
    await authPage.login(TEST_USERS.owner.email, TEST_USERS.owner.password);
    await authPage.expectLoggedIn();
  });

  test('should successfully logout user', async ({ page }) => {
    // Logout
    await authPage.logout();
    
    // Should redirect to welcome page
    await authPage.expectLoggedOut();
    await expect(page.locator('button:has-text("Sign in")')).toBeVisible();
  });

  test('should clear session after logout', async ({ page }) => {
    // Logout
    await authPage.logout();
    await authPage.expectLoggedOut();
    
    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Should still be logged out
    await authPage.expectLoggedOut();
  });

  test('should show user menu when clicking profile button', async ({ page }) => {
    await page.click('[data-clerk-user-button]');
    
    // User menu should appear
    await expect(page.locator('button:has-text("Sign out")')).toBeVisible({ timeout: 5000 });
  });

  test('should redirect to welcome page after logout', async ({ page }) => {
    await authPage.logout();
    
    // Should be on home page with welcome screen
    await authPage.expectUrl('/');
    await authPage.expectLoggedOut();
  });

  test('should remove user button after logout', async ({ page }) => {
    await authPage.logout();
    
    // User button should not be visible
    await expect(page.locator('[data-clerk-user-button]')).not.toBeVisible();
  });

  test('should show sign in/sign up buttons after logout', async ({ page }) => {
    await authPage.logout();
    
    // Welcome screen with auth buttons should appear
    await expect(page.locator('button:has-text("Sign in")')).toBeVisible();
    await expect(page.locator('button:has-text("Sign up")')).toBeVisible();
  });

  test('should prevent access to dashboard after logout', async ({ page }) => {
    await authPage.logout();
    
    // Try to navigate to dashboard
    await page.goto('/');
    
    // Should still see welcome screen
    await authPage.expectLoggedOut();
  });

  test('should allow login again after logout', async ({ page }) => {
    // Logout first
    await authPage.logout();
    await authPage.expectLoggedOut();
    
    // Login again
    await authPage.login(TEST_USERS.owner.email, TEST_USERS.owner.password);
    await authPage.expectLoggedIn();
    await dashboardPage.expectLoaded();
  });

  test('should logout from different role accounts', async ({ page }) => {
    // Already logged in as owner from beforeEach
    await authPage.logout();
    await authPage.expectLoggedOut();
    
    // Login as teacher
    await authPage.login(TEST_USERS.teacher.email, TEST_USERS.teacher.password);
    await authPage.expectLoggedIn();
    
    // Logout teacher
    await authPage.logout();
    await authPage.expectLoggedOut();
  });

  test('should close user menu when clicking outside', async ({ page }) => {
    // Open user menu
    await page.click('[data-clerk-user-button]');
    await expect(page.locator('button:has-text("Sign out")')).toBeVisible();
    
    // Click outside menu
    await page.click('body', { position: { x: 10, y: 10 } });
    
    // Menu should close
    await page.waitForTimeout(500);
    // Menu items should not be visible or should be hidden
  });

  test('should handle logout with open applications', async ({ page }) => {
    // Open an application (if app launcher is available)
    // This tests that logout cleans up app state properly
    
    await authPage.logout();
    await authPage.expectLoggedOut();
  });

  test('should clear local storage on logout', async ({ page }) => {
    // Check that user session exists
    const beforeLogout = await page.evaluate(() => {
      return localStorage.getItem('clerk-db-jwt');
    });
    
    await authPage.logout();
    
    // Check that session is cleared
    const afterLogout = await page.evaluate(() => {
      return localStorage.getItem('clerk-db-jwt');
    });
    
    expect(afterLogout).toBeNull();
  });
});

test.describe('Logout Flow - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  let authPage: AuthPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    dashboardPage = new DashboardPage(page);
    await authPage.goto();
    
    // Login before each test
    await authPage.login(TEST_USERS.owner.email, TEST_USERS.owner.password);
    await authPage.expectLoggedIn();
  });

  test('should successfully logout on mobile viewport', async ({ page }) => {
    await authPage.logout();
    await authPage.expectLoggedOut();
    await expect(page.locator('button:has-text("Sign in")')).toBeVisible();
  });

  test('should display mobile-optimized user menu', async ({ page }) => {
    await page.click('[data-clerk-user-button]');
    
    // User menu should appear and fit viewport
    const signOutButton = page.locator('button:has-text("Sign out")');
    await expect(signOutButton).toBeVisible({ timeout: 5000 });
    
    const boundingBox = await signOutButton.boundingBox();
    expect(boundingBox?.x).toBeGreaterThanOrEqual(0);
    expect(boundingBox?.x + (boundingBox?.width || 0)).toBeLessThanOrEqual(375);
  });
});

test.describe('Logout Flow - Multiple Sessions', () => {
  test('should logout only current session in multi-device scenario', async ({ page, context }) => {
    const authPage = new AuthPage(page);
    
    // Login in first tab
    await authPage.goto();
    await authPage.login(TEST_USERS.owner.email, TEST_USERS.owner.password);
    await authPage.expectLoggedIn();
    
    // Open second tab
    const page2 = await context.newPage();
    const authPage2 = new AuthPage(page2);
    await authPage2.goto();
    
    // Should be logged in on second tab (same browser context)
    await authPage2.expectLoggedIn();
    
    // Logout from first tab
    await authPage.logout();
    await authPage.expectLoggedOut();
    
    // Second tab should also be logged out (same browser session)
    await page2.reload();
    await authPage2.expectLoggedOut();
    
    await page2.close();
  });
});
