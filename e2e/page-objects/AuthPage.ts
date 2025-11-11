import { Page, expect } from '@playwright/test';

/**
 * Page Object Model for Authentication flows
 * Handles Clerk's modal-based authentication UI
 */
export class AuthPage {
  constructor(public page: Page) {}

  // Clerk Sign In Modal Selectors
  private signInButton = 'button:has-text("Sign in")';
  private signUpButton = 'button:has-text("Sign up")';
  private emailInput = 'input[name="identifier"]';
  private passwordInput = 'input[name="password"]';
  private continueButton = 'button:has-text("Continue")';
  private submitButton = 'button[type="submit"]';
  private forgotPasswordLink = 'a:has-text("Forgot password")';
  private resetPasswordButton = 'button:has-text("Reset password")';
  private userButton = '[data-clerk-user-button]';
  private signOutButton = 'button:has-text("Sign out")';

  /**
   * Navigate to home page (welcome screen for unauthenticated)
   */
  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click Sign In button to open Clerk modal
   */
  async openSignIn() {
    await this.page.click(this.signInButton);
    await this.page.waitForSelector(this.emailInput, { state: 'visible' });
  }

  /**
   * Click Sign Up button to open Clerk modal
   */
  async openSignUp() {
    await this.page.click(this.signUpButton);
    await this.page.waitForSelector(this.emailInput, { state: 'visible' });
  }

  /**
   * Fill email/username in authentication form
   */
  async fillEmail(email: string) {
    await this.page.fill(this.emailInput, email);
  }

  /**
   * Fill password in authentication form
   */
  async fillPassword(password: string) {
    await this.page.fill(this.passwordInput, password);
  }

  /**
   * Click Continue button (used in multi-step forms)
   */
  async clickContinue() {
    await this.page.click(this.continueButton);
    await this.page.waitForTimeout(1000); // Wait for next step to load
  }

  /**
   * Submit authentication form
   */
  async submit() {
    await this.page.click(this.submitButton);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Complete login flow
   * @param email - User email or username
   * @param password - User password
   */
  async login(email: string, password: string) {
    await this.openSignIn();
    await this.fillEmail(email);
    await this.clickContinue();
    await this.fillPassword(password);
    await this.submit();
  }

  /**
   * Complete signup flow
   * @param email - New user email
   * @param password - New user password
   */
  async signup(email: string, password: string) {
    await this.openSignUp();
    await this.fillEmail(email);
    await this.clickContinue();
    await this.fillPassword(password);
    await this.submit();
  }

  /**
   * Logout current user
   */
  async logout() {
    await this.page.click(this.userButton);
    await this.page.waitForSelector(this.signOutButton, { state: 'visible' });
    await this.page.click(this.signOutButton);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Initiate forgot password flow
   * @param email - Email address to send reset link
   */
  async forgotPassword(email: string) {
    await this.openSignIn();
    await this.page.click(this.forgotPasswordLink);
    await this.page.waitForSelector(this.emailInput, { state: 'visible' });
    await this.fillEmail(email);
    await this.page.click(this.resetPasswordButton);
  }

  /**
   * Verify user is logged in by checking for user button
   */
  async expectLoggedIn() {
    await expect(this.page.locator(this.userButton)).toBeVisible({ timeout: 10000 });
  }

  /**
   * Verify user is logged out by checking for sign in button
   */
  async expectLoggedOut() {
    await expect(this.page.locator(this.signInButton)).toBeVisible({ timeout: 10000 });
  }

  /**
   * Verify error message is displayed
   * @param message - Expected error message text
   */
  async expectError(message: string) {
    await expect(this.page.locator(`text=${message}`)).toBeVisible();
  }

  /**
   * Verify current URL matches expected path
   * @param path - Expected path (e.g., '/dashboard')
   */
  async expectUrl(path: string) {
    await expect(this.page).toHaveURL(new RegExp(path));
  }

  /**
   * Wait for dashboard to load after login
   */
  async waitForDashboard() {
    await this.page.waitForSelector('[data-testid="dashboard"]', { state: 'visible', timeout: 10000 });
  }

  /**
   * Switch to Sign Up from Sign In modal
   */
  async switchToSignUp() {
    await this.page.click('a:has-text("Sign up")');
    await this.page.waitForSelector(this.emailInput, { state: 'visible' });
  }

  /**
   * Switch to Sign In from Sign Up modal
   */
  async switchToSignIn() {
    await this.page.click('a:has-text("Sign in")');
    await this.page.waitForSelector(this.emailInput, { state: 'visible' });
  }
}

/**
 * Page Object Model for Dashboard
 */
export class DashboardPage {
  constructor(public page: Page) {}

  /**
   * Verify dashboard is loaded and visible
   */
  async expectLoaded() {
    await expect(this.page.locator('[data-testid="dashboard"]')).toBeVisible({ timeout: 10000 });
  }

  /**
   * Get current role from UI
   */
  async getRole(): Promise<string | null> {
    const roleElement = await this.page.locator('[data-testid="user-role"]').textContent();
    return roleElement;
  }

  /**
   * Verify specific role dashboard is displayed
   * @param role - Expected role (owner, admin, teacher, etc.)
   */
  async expectRole(role: string) {
    const currentRole = await this.getRole();
    expect(currentRole?.toLowerCase()).toBe(role.toLowerCase());
  }

  /**
   * Open app launcher
   */
  async openAppLauncher() {
    await this.page.click('[data-testid="app-launcher-button"]');
    await this.page.waitForSelector('[data-testid="app-launcher-grid"]', { state: 'visible' });
  }

  /**
   * Verify right sidebar navigation is visible
   */
  async expectRightSidebarVisible() {
    await expect(this.page.locator('[data-testid="right-sidebar"]')).toBeVisible();
  }

  /**
   * Verify header is visible
   */
  async expectHeaderVisible() {
    await expect(this.page.locator('[data-testid="header"]')).toBeVisible();
  }
}
