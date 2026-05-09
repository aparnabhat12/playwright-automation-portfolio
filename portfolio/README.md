# 🎭 Playwright Automation Portfolio

![Playwright Tests CI](https://github.com/YOUR_USERNAME/playwright-automation-portfolio/actions/workflows/playwright.yml/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Playwright](https://img.shields.io/badge/Playwright-1.44-green?logo=playwright)
![Node.js](https://img.shields.io/badge/Node.js-20.x-brightgreen?logo=node.js)

A production-ready end-to-end automation framework built with **Playwright** and **TypeScript**, demonstrating UI automation, API testing, and CI/CD integration using GitHub Actions.

---

## 📁 Project Structure

```
playwright-automation-portfolio/
├── .github/
│   └── workflows/
│       └── playwright.yml        # GitHub Actions CI pipeline
├── pages/                        # Page Object Model (POM)
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/
│   ├── ui/                       # UI end-to-end tests
│   │   ├── login.spec.ts
│   │   ├── inventory.spec.ts
│   │   └── checkout.spec.ts
│   └── api/                      # API tests
│       ├── users.spec.ts
│       └── posts.spec.ts
├── utils/
│   └── apiHelper.ts              # Reusable API request helpers
├── playwright.config.ts          # Framework configuration
├── tsconfig.json
├── package.json
└── README.md
```

---

## ✅ What This Framework Covers

### UI Tests (SauceDemo)
| Test Suite | Test Cases |
|---|---|
| Login | Valid login, invalid credentials, locked user, empty fields |
| Inventory | Product count, sorting (A-Z, Z-A, price low-high, high-low), add to cart |
| Checkout | Full purchase flow, cart persistence, form validation |

### API Tests (JSONPlaceholder)
| Endpoint | Scenarios |
|---|---|
| `/users` | GET all, GET by ID, POST create, PUT update, DELETE, schema validation |
| `/posts` | GET all, filter by userId, GET single, POST create, GET comments, DELETE, response time |

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev) | Browser automation & API testing |
| [TypeScript](https://typescriptlang.org) | Type-safe test code |
| Page Object Model | Maintainable UI test structure |
| GitHub Actions | CI/CD — auto-runs on every push |
| HTML Reporter | Rich test reports with screenshots |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Git installed

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/playwright-automation-portfolio.git
cd playwright-automation-portfolio

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Run Tests

```bash
# Run all tests
npm test

# Run only UI tests
npm run test:ui

# Run only API tests
npm run test:api

# Run tests in headed (visible browser) mode
npm run test:headed

# View HTML report
npm run report
```

---

## 📊 Test Reports

After running tests, an HTML report is generated automatically:

```bash
npm run report
```

Reports include:
- ✅ Pass/Fail status per test
- 📸 Screenshots on failure
- 🎥 Video recordings on failure
- 🔍 Trace viewer for debugging

---

## ⚙️ CI/CD — GitHub Actions

Tests run automatically on every **push** and **pull request** to `main`. The HTML report is uploaded as a build artifact and retained for 30 days.

To view CI results → Go to **Actions** tab in this repository.

---

## 📌 Test Sites Used

- **UI Tests**: [SauceDemo](https://www.saucedemo.com) — a purpose-built demo app for testing login, inventory, and checkout flows.
- **API Tests**: [JSONPlaceholder](https://jsonplaceholder.typicode.com) — a free REST API for testing and prototyping.

---

## 👤 Author

**Your Name**
- LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- GitHub: [github.com/YOUR_USERNAME](https://github.com/YOUR_USERNAME)

---

## 📄 License

MIT License — feel free to use this as a base for your own portfolio.
