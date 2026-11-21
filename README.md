# HaloPesa Web Application

A modern, responsive financial web portal inspired by the HaloPesa (Halotel Tanzania) mobile financial platform.

Designed with flexible display modes (Full Web Portal and Interactive Mobile Frame), instant bilingual localization (English and Swahili), regulatory tariff calculations, and full Neon PostgreSQL integration.

## Key Features

- **Exact Brand Experience**: Authentic HaloPesa color palette, brand emblem, typography, floating coin animations, and cultural artwork.
- **Strict Zero-Emoji Design**: All visual icons are crisp vector SVGs (Lucide and custom inline SVG). Country flags (Tanzania and United Kingdom) are rendered in pure vector SVG.
- **Dual Display Modes**:
  - **Full Web Portal**: Desktop/tablet responsive experience with hero overview, real-time balance card, quick actions, statements, tariff tools, and agent directory.
  - **Mobile Frame Mode**: Interactive smartphone bezel with status bar, signal/battery indicators, and realistic mobile viewport.
- **Bilingual (English / Kiswahili)**: Instant toggling of all interface copy, forms, receipt templates, and tariff breakdowns.
- **Interactive Financial Operations**:
  - Send Money (Tuma Pesa) with inter-network support (HaloPesa, M-Pesa, Airtel Money, Tigo Pesa).
  - Cash Out / Withdraw (Kutoa Pesa) via Wakala agent code or ATM cardless vouchers.
  - Pay Bills / Lipa (LUKU electricity token generation, DAWASA water, GePG government fees, merchant tills).
  - Bank Transfers (TIPS interoperability with CRDB, NMB, NBC, Stanbic, DTB, Exim).
  - Airtime & Bundles (Halotel recharge with bonus credits).
  - Personal Savings & HaloKikoba (Group ledger and fixed deposit growth).
- **Tariff Calculator**: Live calculations of transaction fees and statutory levies according to Bank of Tanzania (BOT) regulations.
- **Agent Finder**: Search verified HaloPesa agents and service centers across Dar es Salaam, Arusha, Mwanza, Dodoma, and Zanzibar.
- **Neon Database & Vercel Serverless**:
  - PostgreSQL integration using `@neondatabase/serverless`.
  - Vercel Serverless Functions in `/api` directory for live balance and transaction management.

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide Icons
- **Backend / Serverless**: Vercel Serverless Functions (`/api/transactions.js`, `/api/balance.js`, `/api/agents.js`)
- **Database**: Neon PostgreSQL Serverless (`@neondatabase/serverless`)
- **Deployment**: Vercel

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Neon Database
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your connection string from the [Neon Console](https://console.neon.tech):
```env
DATABASE_URL="postgresql://user:password@ep-sample-123456.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

Initialize database tables and initial seed data:
```bash
npm run db:init
```

Or execute `schema.sql` directly in your Neon SQL Editor.

### 3. Run Locally
```bash
npm run dev
```

The application will run at `http://127.0.0.1:5173`.

### 4. Build for Production
```bash
npm run build
```

## Deploying to Vercel

1. Push this repository to GitHub: `https://github.com/billgatesmalel/halopesa.git`.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import the `halopesa` repository.
4. In the **Environment Variables** section, add:
   - `DATABASE_URL`: Your Neon Postgres connection string.
5. Click **Deploy**. Vercel will automatically build the Vite frontend and deploy the serverless functions in `/api`.
