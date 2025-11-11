# 🧪 E2E Testing Command Cheatsheet

## 🚀 Essential Commands

```bash
# Quick start - Run all tests
pnpm test:e2e

# RECOMMENDED: Interactive UI mode
pnpm test:e2e:ui

# View test report
pnpm test:report
```

---

## 📋 Full Command List

| Command | What It Does |
|---------|--------------|
| `pnpm test:e2e` | Run all tests (all browsers) |
| `pnpm test:e2e:ui` | **Interactive UI mode - BEST for dev** |
| `pnpm test:e2e:headed` | See browser windows during tests |
| `pnpm test:e2e:debug` | Step-by-step debugging |
| `pnpm test:e2e:chromium` | Run Chromium tests only |
| `pnpm test:e2e:firefox` | Run Firefox tests only |
| `pnpm test:e2e:webkit` | Run WebKit/Safari tests only |
| `pnpm test:e2e:mobile` | Run mobile viewport tests |
| `pnpm test:report` | Open HTML test report |

---

## 🎯 Specific Test Runs

```bash
# Run single test file
pnpm exec playwright test e2e/tests/login.spec.ts

# Run test by name
pnpm exec playwright test -g "should successfully login"

# Run tests matching pattern
pnpm exec playwright test -g "login"

# Run in specific browser
pnpm exec playwright test --project=chromium

# Run with 4 parallel workers
pnpm exec playwright test --workers=4
```

---

## 🐛 Debugging Commands

```bash
# Open Playwright Inspector
pnpm test:e2e:debug

# Run with trace recording
pnpm exec playwright test --trace on

# Generate and view report
pnpm exec playwright test && pnpm test:report

# Run single test in headed mode
pnpm exec playwright test -g "login" --headed
```

---

## 📁 Test Files Location

```
e2e/tests/
├── login.spec.ts              # Login flows
├── signup.spec.ts             # Signup flows  
├── logout.spec.ts             # Logout flows
├── registration.spec.ts       # Registration flows
└── password-reset.spec.ts     # Password reset flows
```

---

## ✅ Before Running Tests

1. **Install browsers** (one-time):
   ```bash
   pnpm exec playwright install
   ```

2. **Create test accounts** in Clerk Dashboard:
   - owner@gyn.com / 123456
   - admin@gyn.com / 123456
   - teacher@gyn.com / 123456
   - parent@gyn.com / 123456
   - student@gyn.com / 123456
   - individual@gyn.com / 123456

3. **Start dev server** (if not auto-started):
   ```bash
   pnpm dev
   ```

---

## 🔍 Check Test Status

```bash
# List all tests
pnpm exec playwright test --list

# Show test results
pnpm test:report

# Check Playwright version
pnpm exec playwright --version
```

---

## 🌐 Browser-Specific

```bash
# Desktop browsers
pnpm test:e2e:chromium   # Chrome/Edge
pnpm test:e2e:firefox    # Firefox  
pnpm test:e2e:webkit     # Safari

# Mobile browsers
pnpm test:e2e:mobile     # Mobile Chrome + Safari
```

---

## ⚡ Quick Tips

- **First time?** Use `pnpm test:e2e:ui` to see tests visually
- **Debugging?** Add `await page.pause()` in test code
- **CI failing?** Check GitHub Actions tab for artifacts
- **Flaky tests?** Run with `--retries=2`

---

## 📚 Documentation

- **Full Guide**: [E2E_TESTING_GUIDE.md](./E2E_TESTING_GUIDE.md)
- **Quick Reference**: [E2E_TESTING_QUICKSTART.md](./E2E_TESTING_QUICKSTART.md)
- **Summary**: [E2E_TESTING_SUMMARY.md](./E2E_TESTING_SUMMARY.md)
- **Test Accounts**: [TEST_ACCOUNTS_SETUP.md](./TEST_ACCOUNTS_SETUP.md)

---

## 🆘 Troubleshooting

```bash
# Reinstall browsers
pnpm exec playwright install --with-deps

# Clear test cache
rm -rf test-results/ playwright-report/

# Update snapshots
pnpm exec playwright test --update-snapshots

# Check for errors
pnpm exec playwright test --reporter=list
```

---

**80+ Tests | 5 Browsers | Desktop + Mobile | CI/CD Ready**

🎯 Run `pnpm test:e2e:ui` to get started!
