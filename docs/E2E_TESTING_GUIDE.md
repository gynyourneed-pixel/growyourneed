# E2E Testing Guide - GrowYour Need Platform

## Overview

This guide covers end-to-end testing for the GrowYour Need authentication system using Playwright. The test suite validates login, signup, logout, registration, and password reset flows across multiple browsers and devices.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Test Structure](#test-structure)
- [Running Tests](#running-tests)
- [Test Accounts](#test-accounts)
- [Writing New Tests](#writing-new-tests)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software

- Node.js 18+ or 20+
- pnpm 8+ (package manager)
- Git

### Test Accounts

Before running tests, you **MUST** create test accounts in Clerk Dashboard. See [docs/TEST_ACCOUNTS_SETUP.md](./TEST_ACCOUNTS_SETUP.md) for detailed instructions.

Required test accounts:
- `owner@gyn.com` / password: `123456` / role: `owner`
- `admin@gyn.com` / password: `123456` / role: `admin`
- `teacher@gyn.com` / password: `123456` / role: `teacher`
- `parent@gyn.com` / password: `123456` / role: `parent`
- `student@gyn.com` / password: `123456` / role: `student`
- `individual@gyn.com` / password: `123456` / role: `individual`

### Environment Setup

Ensure your `.env.local` file contains:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
VITE_SUPABASE_URL=https://...
VITE_SUPABASE_ANON_KEY=eyJhbG...
```

## Installation

### 1. Install Playwright

```bash
pnpm add -D @playwright/test
```

### 2. Install Browsers

```bash
pnpm exec playwright install
```

This downloads Chromium, Firefox, and WebKit browsers.

### 3. Verify Installation

```bash
pnpm exec playwright --version
```

Should output: `Version 1.56.1` or higher

## Test Structure

```
e2e/
├── fixtures.ts                    # Test data and custom fixtures
├── page-objects/
│   └── AuthPage.ts               # Page Object Model for auth flows
└── tests/
    ├── login.spec.ts             # Login flow tests (20+ tests)
    ├── signup.spec.ts            # Signup flow tests (15+ tests)
    ├── logout.spec.ts            # Logout flow tests (12+ tests)
    ├── registration.spec.ts      # Registration flow tests (18+ tests)
    └── password-reset.spec.ts    # Password reset tests (15+ tests)
```

### Test Files

#### `fixtures.ts`
- Defines test user credentials (`TEST_USERS`)
- Provides new user template (`NEW_USER`)
- Extends Playwright test with custom fixtures

#### `page-objects/AuthPage.ts`
- Page Object Model pattern for authentication
- Reusable methods: `login()`, `signup()`, `logout()`, `forgotPassword()`
- Assertion helpers: `expectLoggedIn()`, `expectLoggedOut()`

#### Test Specifications
- **login.spec.ts**: 20+ tests covering successful/failed login, validation, role-based access
- **signup.spec.ts**: 15+ tests covering account creation, duplicate handling, validation
- **logout.spec.ts**: 12+ tests covering session cleanup, multi-tab scenarios
- **registration.spec.ts**: 18+ tests covering full registration flow, accessibility
- **password-reset.spec.ts**: 15+ tests covering forgot password, email verification

## Running Tests

### Run All Tests

```bash
pnpm test:e2e
```

Or directly:

```bash
pnpm exec playwright test
```

### Run Specific Test File

```bash
pnpm exec playwright test e2e/tests/login.spec.ts
```

### Run Specific Test

```bash
pnpm exec playwright test -g "should successfully login with owner credentials"
```

### Run Tests in UI Mode (Recommended for Development)

```bash
pnpm exec playwright test --ui
```

Benefits:
- Watch tests run in real-time
- Inspect DOM at each step
- Time-travel debugging
- Rerun individual tests

### Run Tests in Headed Mode

```bash
pnpm exec playwright test --headed
```

See browser windows open during test execution.

### Run Tests on Specific Browser

```bash
# Chromium only
pnpm exec playwright test --project=chromium

# Firefox only
pnpm exec playwright test --project=firefox

# WebKit (Safari) only
pnpm exec playwright test --project=webkit

# Mobile Chrome
pnpm exec playwright test --project="Mobile Chrome"

# Mobile Safari
pnpm exec playwright test --project="Mobile Safari"
```

### Run Tests in Parallel

```bash
# 4 workers
pnpm exec playwright test --workers=4
```

### Debug Mode

```bash
pnpm exec playwright test --debug
```

Opens Playwright Inspector for step-by-step debugging.

### Update Snapshots (if using visual regression)

```bash
pnpm exec playwright test --update-snapshots
```

## Test Reports

### HTML Report (Default)

After running tests:

```bash
pnpm exec playwright show-report
```

Opens interactive HTML report with:
- Test results summary
- Screenshots on failure
- Video recordings
- Execution traces

### CI Reporter

For continuous integration (GitHub Actions, etc.):

```bash
pnpm exec playwright test --reporter=github
```

### JSON Reporter

For custom integrations:

```bash
pnpm exec playwright test --reporter=json
```

## Test Accounts

### Create Test Accounts

1. **Login to Clerk Dashboard**: https://dashboard.clerk.com
2. **Select your application**
3. **Navigate to Users** → Create user
4. **Create 6 test users** following [TEST_ACCOUNTS_SETUP.md](./TEST_ACCOUNTS_SETUP.md)

### Important Notes

- Test accounts should use `@gyn.com` domain
- All passwords should be `123456` for consistency
- Each user must have correct `role` in `publicMetadata`
- Verify accounts before running tests

### Cleanup Test Data

Some tests create new user accounts. To prevent accumulation:

1. **Manually delete** test users from Clerk Dashboard periodically
2. **Filter by email pattern**: `test.*@gyn.com`
3. **Delete in bulk** if your plan supports it

## Writing New Tests

### Test Template

```typescript
import { test, expect, TEST_USERS } from '../fixtures';
import { AuthPage, DashboardPage } from '../page-objects/AuthPage';

test.describe('Feature Name', () => {
  let authPage: AuthPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    await authPage.goto();
  });

  test('should do something', async ({ page }) => {
    // Arrange
    await authPage.openSignIn();
    
    // Act
    await authPage.login(TEST_USERS.owner.email, TEST_USERS.owner.password);
    
    // Assert
    await authPage.expectLoggedIn();
  });
});
```

### Best Practices

1. **Use Page Objects**: Don't repeat selectors across tests
2. **Descriptive Names**: `should successfully login with owner credentials`
3. **Arrange-Act-Assert**: Structure tests clearly
4. **Independent Tests**: Each test should run independently
5. **Clean State**: Use `beforeEach` to reset state
6. **Wait Properly**: Use `waitForSelector`, not `waitForTimeout` (except where necessary)
7. **Test Mobile**: Add mobile viewport tests for responsive features

### Adding New Selectors

Update `AuthPage.ts` with new selectors:

```typescript
private myNewButton = '[data-testid="my-button"]';

async clickMyButton() {
  await this.page.click(this.myNewButton);
}
```

### Custom Matchers

```typescript
// Check visibility
await expect(page.locator('button')).toBeVisible();

// Check text content
await expect(page.locator('h1')).toHaveText('Welcome');

// Check URL
await expect(page).toHaveURL('/dashboard');

// Check attribute
await expect(page.locator('input')).toHaveAttribute('type', 'email');
```

## CI/CD Integration

### GitHub Actions

Create `.github/workflows/e2e-tests.yml`:

```yaml
name: E2E Tests

on:
  push:
    branches: [master, main]
  pull_request:
    branches: [master, main]

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install pnpm
        run: npm install -g pnpm
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Install Playwright Browsers
        run: pnpm exec playwright install --with-deps
      
      - name: Run E2E tests
        run: pnpm exec playwright test
        env:
          VITE_CLERK_PUBLISHABLE_KEY: ${{ secrets.VITE_CLERK_PUBLISHABLE_KEY }}
          CLERK_SECRET_KEY: ${{ secrets.CLERK_SECRET_KEY }}
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

### Environment Variables in CI

Add secrets to your repository:
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add each environment variable as a secret
3. Reference them in workflow using `${{ secrets.SECRET_NAME }}`

### Test Parallelization

GitHub Actions supports matrix builds:

```yaml
strategy:
  matrix:
    browser: [chromium, firefox, webkit]

steps:
  - name: Run tests
    run: pnpm exec playwright test --project=${{ matrix.browser }}
```

## Troubleshooting

### Common Issues

#### 1. Tests Fail with "Test accounts not found"

**Problem**: Test accounts not created in Clerk Dashboard  
**Solution**: Follow [TEST_ACCOUNTS_SETUP.md](./TEST_ACCOUNTS_SETUP.md) to create accounts

#### 2. "Target closed" or "Navigation timeout"

**Problem**: Slow network or dev server not ready  
**Solution**: 
- Increase timeout in `playwright.config.ts`: `timeout: 60000`
- Ensure dev server is running: `pnpm dev`

#### 3. "Element not found" errors

**Problem**: Clerk UI updates changed selectors  
**Solution**: Update selectors in `AuthPage.ts` page object

#### 4. Flaky tests (pass sometimes, fail others)

**Problem**: Race conditions or timing issues  
**Solution**:
- Use `waitForSelector` instead of `waitForTimeout`
- Add `page.waitForLoadState('networkidle')`
- Increase retries in `playwright.config.ts`: `retries: 2`

#### 5. Browser installation fails

**Problem**: Missing system dependencies  
**Solution**:
```bash
pnpm exec playwright install --with-deps
```

#### 6. Tests pass locally but fail in CI

**Problem**: Environment differences  
**Solution**:
- Verify environment variables in CI
- Check browser versions match
- Enable `screenshot: 'on'` in CI to debug visually

### Debug Strategies

#### 1. Run in UI Mode

```bash
pnpm exec playwright test --ui
```

Watch tests execute and inspect failures.

#### 2. Enable Trace Recording

In `playwright.config.ts`:

```typescript
use: {
  trace: 'on', // Always record traces
}
```

View traces:
```bash
pnpm exec playwright show-report
```

#### 3. Pause Test Execution

Add `await page.pause()` in test:

```typescript
test('debug test', async ({ page }) => {
  await authPage.goto();
  await page.pause(); // Inspector opens here
  await authPage.login(TEST_USERS.owner.email, TEST_USERS.owner.password);
});
```

#### 4. Console Logs

```typescript
page.on('console', msg => console.log(msg.text()));
```

#### 5. Take Screenshots

```typescript
await page.screenshot({ path: 'debug.png' });
```

### Performance Tips

1. **Run fewer browsers** during development:
   ```bash
   pnpm exec playwright test --project=chromium
   ```

2. **Run tests in parallel**:
   ```bash
   pnpm exec playwright test --workers=4
   ```

3. **Use `test.describe.parallel()`** for independent tests

4. **Skip slow tests** during development:
   ```typescript
   test.skip('slow test', async () => { ... });
   ```

## Test Coverage

Current test coverage:

| Feature | Test Count | Coverage |
|---------|-----------|----------|
| Login | 20+ tests | ✅ Complete |
| Signup | 15+ tests | ✅ Complete |
| Logout | 12+ tests | ✅ Complete |
| Registration | 18+ tests | ✅ Complete |
| Password Reset | 15+ tests | ⚠️ Partial (email verification skipped) |

**Total**: 80+ end-to-end tests

### Areas for Expansion

- [ ] Email verification flow (requires email testing service)
- [ ] 2FA authentication tests
- [ ] Social login (Google, GitHub)
- [ ] Account settings modification
- [ ] Role switching scenarios
- [ ] Multi-tenant isolation tests

## Additional Resources

- **Playwright Documentation**: https://playwright.dev
- **Clerk Documentation**: https://clerk.com/docs
- **Test Accounts Setup**: [docs/TEST_ACCOUNTS_SETUP.md](./TEST_ACCOUNTS_SETUP.md)
- **Authentication Setup**: [docs/CLERK_SETUP.md](./CLERK_SETUP.md)

## Support

For issues or questions:
1. Check this documentation
2. Review Playwright docs: https://playwright.dev/docs/intro
3. Check Clerk docs: https://clerk.com/docs
4. Open issue in repository

---

**Last Updated**: November 11, 2025  
**Playwright Version**: 1.56.1  
**Node Version**: 20.x
