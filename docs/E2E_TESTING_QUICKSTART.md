# E2E Testing Quick Reference

## 🚀 Quick Start

### 1. Prerequisites

Ensure test accounts exist in Clerk Dashboard (see [TEST_ACCOUNTS_SETUP.md](./TEST_ACCOUNTS_SETUP.md)):
- ✅ owner@gyn.com
- ✅ admin@gyn.com  
- ✅ teacher@gyn.com
- ✅ parent@gyn.com
- ✅ student@gyn.com
- ✅ individual@gyn.com

### 2. Run Tests

```bash
# All tests (all browsers)
pnpm test:e2e

# With UI (best for development)
pnpm test:e2e:ui

# Watch mode
pnpm test:e2e --headed

# Specific browser
pnpm test:e2e:chromium
pnpm test:e2e:firefox
pnpm test:e2e:webkit

# Mobile tests
pnpm test:e2e:mobile
```

### 3. View Results

```bash
pnpm test:report
```

## 📋 Common Commands

| Command | Description |
|---------|-------------|
| `pnpm test:e2e` | Run all tests |
| `pnpm test:e2e:ui` | Interactive UI mode |
| `pnpm test:e2e:headed` | See browser windows |
| `pnpm test:e2e:debug` | Step-by-step debugging |
| `pnpm test:report` | Open test report |

## 🧪 Test Suites

| File | Tests | Focus |
|------|-------|-------|
| `login.spec.ts` | 20+ | Login flows, validation, errors |
| `signup.spec.ts` | 15+ | Account creation, duplicates |
| `logout.spec.ts` | 12+ | Session cleanup, multi-tab |
| `registration.spec.ts` | 18+ | Full registration, accessibility |
| `password-reset.spec.ts` | 15+ | Forgot password, email verification |

**Total**: 80+ E2E tests

## 🎯 Test Specific Flow

```bash
# Run single test file
pnpm exec playwright test e2e/tests/login.spec.ts

# Run single test by name
pnpm exec playwright test -g "should successfully login with owner"

# Run tests matching pattern
pnpm exec playwright test -g "login"
```

## 🐛 Debugging

```bash
# Debug mode (Playwright Inspector)
pnpm test:e2e:debug

# Add breakpoint in test code
await page.pause();

# Enable trace recording
# Edit playwright.config.ts: trace: 'on'
```

## 📱 Device Testing

```bash
# Desktop browsers
pnpm test:e2e:chromium   # Chrome/Edge
pnpm test:e2e:firefox    # Firefox
pnpm test:e2e:webkit     # Safari

# Mobile browsers
pnpm test:e2e:mobile     # Mobile Chrome + Safari
```

## ⚡ Performance Tips

```bash
# Run tests in parallel (4 workers)
pnpm exec playwright test --workers=4

# Run only chromium during development
pnpm test:e2e:chromium

# Skip slow tests
# Add test.skip() to slow tests
```

## 🔧 Troubleshooting

### Tests fail with "Test accounts not found"
➡️ Create test accounts in Clerk Dashboard ([TEST_ACCOUNTS_SETUP.md](./TEST_ACCOUNTS_SETUP.md))

### "Element not found" errors
➡️ Update selectors in `e2e/page-objects/AuthPage.ts`

### Tests timeout
➡️ Increase timeout in `playwright.config.ts`

### Flaky tests
➡️ Add `waitForSelector` or `waitForLoadState('networkidle')`

### Browser installation fails
```bash
pnpm exec playwright install --with-deps
```

## 📚 Full Documentation

See [E2E_TESTING_GUIDE.md](./E2E_TESTING_GUIDE.md) for comprehensive guide.

## 🏗️ Test Structure

```
e2e/
├── fixtures.ts                 # Test data (TEST_USERS, NEW_USER)
├── page-objects/
│   └── AuthPage.ts            # Reusable page methods
└── tests/
    ├── login.spec.ts          # Login tests
    ├── signup.spec.ts         # Signup tests
    ├── logout.spec.ts         # Logout tests
    ├── registration.spec.ts   # Registration tests
    └── password-reset.spec.ts # Password reset tests
```

## ✅ Test Coverage

- ✅ Login (successful, failed, validation)
- ✅ Signup (creation, duplicates, validation)
- ✅ Logout (session cleanup, multi-tab)
- ✅ Registration (full flow, accessibility)
- ⚠️ Password Reset (partial - email verification skipped)

## 🚦 CI/CD

Tests run automatically on:
- Push to `master`/`main`/`develop`
- Pull requests
- Manual trigger (GitHub Actions)

View results:
1. Go to GitHub repository
2. Click **Actions** tab
3. Select workflow run
4. Download artifacts (test reports, videos)

## 📊 Test Reports

After running tests:

```bash
pnpm test:report
```

Includes:
- ✅ Pass/fail summary
- 📸 Screenshots on failure
- 🎥 Video recordings
- 🔍 Execution traces

## 🎓 Writing New Tests

```typescript
import { test, expect, TEST_USERS } from '../fixtures';
import { AuthPage } from '../page-objects/AuthPage';

test('should do something', async ({ page }) => {
  const authPage = new AuthPage(page);
  await authPage.goto();
  await authPage.login(TEST_USERS.owner.email, TEST_USERS.owner.password);
  await authPage.expectLoggedIn();
});
```

---

**Quick Help**:
- Full guide: [E2E_TESTING_GUIDE.md](./E2E_TESTING_GUIDE.md)
- Test accounts: [TEST_ACCOUNTS_SETUP.md](./TEST_ACCOUNTS_SETUP.md)
- Playwright docs: https://playwright.dev
