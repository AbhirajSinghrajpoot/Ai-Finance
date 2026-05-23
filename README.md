# 🤖 AI-Finance 

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Welcome to **AI-Finance**, a next-generation, intelligent financial management platform. 

This application moves beyond basic expense tracking by integrating modern web architecture with robust database management and automated workflows, providing users with a smarter way to manage their finances.

---

## 🌟 Core Features & Tech Stack

This project is built using a modern, scalable full-stack architecture:

* **⚡ Framework:** Next.js (App Router) for blazing fast server-side rendering and static generation.
* **🛡️ Type Safety:** Built progressively with **TypeScript** and JavaScript to ensure reliable, bug-free code.
* **🗄️ Database ORM:** Powered by **Prisma**, providing a highly structured and type-safe database schema.
* **⚙️ Serverless Mutations:** Next.js Server Actions (`/actions`) for handling secure data mutations without exposing API endpoints.
* **📧 Automated Workflows:** Integrated email services (`/emails`) for transactional alerts, reports, or user onboarding.

---

## 📂 Repository Architecture

Here is a look under the hood at how the application is structured:

```text
📦 Ai-Finance
 ┣ 📂 actions/           # Next.js Server Actions (Backend logic & DB calls)
 ┣ 📂 app/               # Next.js App Router (Pages, Layouts, API endpoints)
 ┣ 📂 components/        # Reusable UI components (Buttons, Modals, Charts)
 ┣ 📂 data/              # Static data, constants, or mock data for testing
 ┣ 📂 emails/            # Email templates (e.g., React Email/Resend integrations)
 ┣ 📂 lib/               # Utility functions, database instances, and helpers
 ┣ 📂 prisma/            # Prisma schema (schema.prisma) and migrations
 ┣ 📂 public/            # Static assets (Images, icons)
 ┗ 📜 .env               # Environment variables (DB URL, API Keys)

```
## 🚀 Getting Started (Local Development)
To run this project on your local machine, follow these steps:
**1. Clone the repository:**
```bash
git clone [https://github.com/AbhirajSinghrajpoot/Ai-Finance.git](https://github.com/AbhirajSinghrajpoot/Ai-Finance.git)
cd Ai-Finance

```
**2. Install dependencies:**
```bash
npm install

```
**3. Setup Environment Variables:**
Create a .env file in the root directory and add your necessary keys (especially the Prisma Database URL):
```env
DATABASE_URL="your_postgresql_or_mongodb_connection_string"
# Add your AI or Email provider API keys here

```
**4. Initialize the Database:**
Sync the Prisma schema with your database:
```bash
npx prisma generate
npx prisma db push

```
**5. Start the Development Server:**
```bash
npm run dev

```
Navigate to http://localhost:3000 to view the application.
## 👨‍💻 About the Developer
**Abhiraj Singh Rajpoot** | *Software Engineer & Full-Stack Developer*
I build applications that bridge the gap between complex backend logic and clean frontend design. This project demonstrates my proficiency in building production-ready SaaS architectures utilizing the Next.js ecosystem, Prisma ORM, and modern type-safe development practices.
📫 **Let's Connect:**
 * **Portfolio:** wizards-portfolio.vercel.app
 * **LinkedIn:** Abhiraj Singh Rajpoot
 * **GitHub:** @AbhirajSinghrajpoot
