# Injaazh Enterprise ERP 🚀

**Injaazh Enterprise ERP** is a state-of-the-art, AI-powered Enterprise Resource Planning (ERP) solution designed for modern businesses. Built with high-performance technologies, it integrates core business processes into a single, unified platform with intelligent insights provided by Google Gemini AI.

---

## 🌟 Key Features

### 🧠 AI Hub
- **AI Chat**: Interact with your business data using natural language.
- **AI Insights**: Predictive analytics and automated business recommendations.
- **Automation Builder**: Create workflows powered by AI to streamline operations.

### 💼 Core Modules
- **Human Resource Management (HRM)**: Employee lifecycle, payroll, attendance, and leave management.
- **Customer Relationship Management (CRM)**: Lead tracking, pipeline management, and contact history.
- **Finance & Accounting**: Chart of accounts, invoicing, payments, and real-time financial reporting (P&L).
- **Inventory & Warehouse**: Stock tracking, automated reordering, and movement logs.
- **Project Management**: Task tracking, Gantt charts, and resource allocation.
- **Manufacturing & SCM**: Bill of Materials (BOM), work orders, and supply chain optimization.
- **Procurement**: Vendor management and Goods Received Notes (GRN).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [Auth.js v5 (NextAuth)](https://authjs.dev/)
- **API**: [tRPC](https://trpc.io/) for end-to-end typesafety
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
- **AI Engine**: [Google Gemini AI API](https://ai.google.dev/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide Icons](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mamunaio/full-phase-erp-software.git
   cd injaazh-erp-software
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Copy `.env.example` to `.env` and fill in your credentials.
   ```bash
   cp .env.example .env
   ```

4. **Database Setup**:
   Generate Prisma client and push the schema to your database.
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Seed the database** (Optional):
   ```bash
   npm run seed
   ```

6. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🔐 Environment Variables

Ensure the following variables are set in your `.env` file:

| Variable | Description |
| :--- | :--- |
| `DATABASE_URL` | Your PostgreSQL connection string. |
| `AUTH_SECRET` | Secret key for Auth.js (generate with `openssl rand -base64 32`). |
| `NEXTAUTH_URL` | The base URL of your application. |
| `GEMINI_API_KEY` | Your Google Gemini API key. |

---

## 📁 Project Structure

```text
├── app/               # Next.js App Router (Pages & API)
├── components/        # Reusable UI & Layout components
├── hooks/             # Custom React hooks
├── lib/               # Shared libraries (Prisma, AI clients, etc.)
├── prisma/            # Database schema & migrations
├── store/             # State management (Zustand)
├── styles/            # Global styles
├── types/             # TypeScript type definitions
└── public/            # Static assets
```

---

## 📝 License

This project is proprietary and confidential. All rights reserved by **Injaazh Enterprise**.

---

## 🤝 Support

For support or inquiries, please contact the development team at [mamunaio@github.com](mailto:mamunaio@github.com).
