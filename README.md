# 🌌 Krish Bavariya — AI/ML Developer & Intelligent Systems Architect Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.2.7-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-emerald?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Framer Motion](https://img.shields.io/badge/Framer--Motion-Animation-purple?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://krishbavariya.vercel.app/)

Welcome to the source repository of **Krish Bavariya's Portfolio Website**. This project is a premium, highly interactive portfolio designed for an AI/ML developer. It bridges custom cinematic scroll animations, orbital interactive skill maps, and spotlight cards with a modern dark-mode aesthetic.

---

## 🎨 Interactive Features & Visual Highlights

- **🎬 Cinematic Canvas Scroller (`ScrollyCanvas.tsx`)**
  - Uses Framer Motion's `useScroll` and `useTransform` mapped to a 2D HTML5 canvas.
  - Dynamically preloads and renders 120 custom high-quality animation frames.
  - Implements smart aspect ratio math (Cover sizing) and retina resolution optimization (`window.devicePixelRatio`).
  - Includes a smooth screen-entry loader featuring percentage-progress tracking.

- **🌐 SVG Skills Orbit Matrix (`Skills.tsx`)**
  - Fully interactive, custom-designed SVG orbital representation mapping skill trees.
  - Hover glow matrices, category filtering triggers, and spring-animated detail blocks.
  - Grouped into:
    - **AI / ML Core**: PyTorch, Hugging Face Transformers, Scikit-learn, Deep Learning, NLP & Computer Vision, ML Models.
    - **Backend & DB**: Python, SQL, PostgreSQL, MongoDB, Java, PHP.
    - **Frontend & Web**: HTML, CSS, JavaScript, Angular.
    - **Active Frontiers (Learning)**: QLoRA Fine Tuning, Agentic AI, LangChain.

- **💡 Cursor Spotlight Project Cards (`Projects.tsx`)**
  - Features dynamic radial spotlight lighting that tracks cursor coordinates over glassmorphic card containers.
  - Showcases key projects with direct case study actions and tech tags.
  - Interactive highlights:
    - **NeuralForge LLM** (Generative AI / NLP) — Fine-tuned LLaMA-7B model using QLoRA/PEFT.
    - **VisionCore CV Pipeline** (Computer Vision) — End-to-end real-time YOLOv9 and SAM2 segmentation.
    - **ContextRAG Engine** (RAG / Search) — Hybrid dense-sparse retrieval system with cross-encoder re-ranking.
    - **AgentMesh Framework** (Multi-Agent Systems) — Autonomous agent orchestration using LangGraph.

- **✉ Contact Modal & Serverless API (`ContactModal.tsx` & `/api/contact/route.ts`)**
  - Real-time client-side validator and modal triggered via URL hashes (`#contact`).
  - Next.js serverless route that validates and inserts user queries directly into a **Supabase (PostgreSQL)** database.
  - Elegant animations for successful submits, errors, and loading states.

---

## 🛠 Tech Stack & Dependencies

### Core Framework
- **Next.js 16** (App Router Architecture)
- **React 19**
- **TypeScript**

### Styling & Animation
- **Tailwind CSS v4** (Utility-first styling with `@tailwindcss/postcss`)
- **Framer Motion v12** (Hardware-accelerated layout and scroll animations)
- **Lenis Smooth Scroll** & **Studio Freight Lenis** (Smooth kinematic scroll experiences)
- **Lucide React** (Minimalist clean iconography)

### Backend & Integrations
- **Supabase JS Client** (Postgres DB wrapper)
- **Firebase Web SDK** (Integrated environment for other serverless logic)
- **Nodemailer / EmailJS** (Configured mailers for communications)

---

## 📂 Project Structure

```
├── public/                # Static assets, fonts, preloaded frames, and CV downloads
├── src/
│   ├── app/
│   │   ├── api/contact/   # Serverless POST route for storing contact entries
│   │   ├── globals.css    # Core design tokens, gradients, and custom utility classes
│   │   ├── layout.tsx     # Site structure, fonts (Geist/Outfit), metadata, and custom cursor hook
│   │   └── page.tsx       # Landing portfolio container, layouts, and sections
│   ├── components/
│   │   ├── ContactModal.tsx # Contact form popup with states and validation
│   │   ├── CustomCursor.tsx # Smooth spring-based custom mouse cursor dot
│   │   ├── Overlay.tsx      # Text-fading sections layered over ScrollyCanvas
│   │   ├── Projects.tsx     # Spotlight mouse hover case study list
│   │   ├── ScrollyCanvas.tsx# 120-frame scroll-linked canvas system
│   │   ├── Skills.tsx       # Interactive orbital skill SVG
│   │   └── SmoothScroll.tsx # Lenis wrapper initialization
│   ├── hooks/             # Custom hook for image preloading/fetching
│   └── lib/               # Database client initializers (firebase.ts, supabase.ts)
```

---

## 🚀 Setup & Installation

Follow these steps to run the project locally on your machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18.x or newer recommended).

### 1. Clone the Repository

```bash
git clone https://github.com/Krish-Bavariya/KRISH_BAVARIYA-Portfolio-.git
cd KRISH_BAVARIYA-Portfolio-
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables Configuration

Create a `.env.local` file in the root of the project with the following structure:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Firebase Configuration (optional/if used)
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
```

### 4. Database Setup

To capture messages from the contact form, ensure your Supabase database has a `messages` table with the following schema:

```sql
create table public.messages (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  message text not null
);

-- Enable Row Level Security (RLS) or add insert policy for anonymous users
alter table public.messages enable row level security;

create policy "Allow public inserts" on public.messages
  for insert with check (true);
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the portfolio in action.

---

## 📦 Production Build & Deployment

To compile the application for production:

```bash
npm run build
```

This optimizes code bundles, pre-renders routes, and generates a static output optimized for hosting. You can easily deploy this directly on **Vercel** or **Netlify**.

---

## 🤝 Let's Connect

- **GitHub**: [github.com/Krish-Bavariya](https://github.com/Krish-Bavariya)
- **LinkedIn**: [linkedin.com/in/bavariyakrishp](https://www.linkedin.com/in/bavariyakrishp/)
- **Portfolio**: [Live Link](https://krishbavariya.vercel.app/)
