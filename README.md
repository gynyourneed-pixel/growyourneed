# 🚀 GrowYour Need - Digital Operating System

**A comprehensive multi-tenant SaaS platform providing an integrated "digital operating system" for educational institutions and individuals.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4.1-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.18-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

---

## 🎯 Overview

GrowYour Need eliminates digital fragmentation by providing a unified ecosystem for education and personal growth.

### Key Features

- ✅ **6 Role-Based Dashboards** (Owner, Admin, Teacher, Parent, Student, Individual)
- ✅ **14+ Integrated Applications** (Studio, Media, Market, Events, etc.)
- ✅ **Clerk Authentication** with social login & 2FA
- ✅ **Multi-Tenant Architecture** for schools and organizations
- ✅ **Modern UI/UX** with dark mode and responsive design
- ✅ **AI-Powered Tools** throughout the platform

---

## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- pnpm 9+ (`npm install -g pnpm`)

### Installation

```bash
# Clone repository
git clone https://github.com/gynyourneed-pixel/growyourneed.git
cd growyourneed

# Install dependencies
pnpm install

# Configure environment
cp .env.local.example .env.local
# Add your Clerk keys to .env.local

# Start dev server
pnpm dev
```

Open **http://localhost:3040**

---

## 🔐 Authentication Setup

1. Sign up at [Clerk.com](https://clerk.com/)
2. Get your API keys from dashboard
3. Add to `.env.local`:
   ```bash
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```
4. Set user roles in Clerk Dashboard (see [docs/CLERK_SETUP.md](docs/CLERK_SETUP.md))

---

## 🎮 Available Applications

| App | Description |
|-----|-------------|
| **Creator Studio** | Design, video, coding, office suite |
| **Media** | Netflix-like streaming platform |
| **Market** | E-commerce marketplace |
| **Events** | Event management |
| **Messaging** | Internal communication |
| **Settings** | Platform configuration |
| And 8 more... | See [docs/app-launcher.md](docs/app-launcher.md) |

---

## 👥 Role-Based Dashboards

- **Owner** - Platform-wide control
- **School Admin** - School management
- **Teacher** - Classroom & grading
- **Parent** - Child monitoring
- **Student** - Course hub & AI tools
- **Individual** - Creative workspace

📖 See `docs/` folder for detailed specifications

---

## 🛠️ Tech Stack

- **Frontend**: React 19.2, TypeScript 5.x
- **Build**: Vite 6.4.1
- **Styling**: Tailwind CSS 3.4.18
- **Auth**: Clerk
- **Package Manager**: pnpm

---

## 📚 Documentation

- [CLERK_SETUP.md](docs/CLERK_SETUP.md) - Authentication setup
- [CLERK_WEBHOOK_SETUP.md](docs/CLERK_WEBHOOK_SETUP.md) - Webhook config
- [app-launcher.md](docs/app-launcher.md) - All applications
- Dashboard specs in `docs/` folder

---

## 📧 Contact

**Email**: gynyourneed@gmail.com  
**GitHub**: [@gynyourneed-pixel](https://github.com/gynyourneed-pixel)

---

<div align="center">

**Built with ❤️ by the GrowYour Need Team**

[Report Bug](https://github.com/gynyourneed-pixel/growyourneed/issues) • [Request Feature](https://github.com/gynyourneed-pixel/growyourneed/issues)

</div>
