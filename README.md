# 🌌 StudyMind AI — Learn Anything, Master It Faster!

🌐 **[Live Demo Website](https://studymind-ai-client.vercel.app/)** | 🖥️ **[Client Repository](https://github.com/ar-saad/studymind-ai-client)** | ⚙️ **[Server Repository](https://github.com/ar-saad/studymind-ai-server)**

Welcome to the client-side repository of **StudyMind AI**! This is the frontend interface for a sleek, modern, AI-powered learning platform that helps you break down any subject on demand into easy-to-understand study guides, interactive gamified quizzes, and a personalized chat tutor.

With a fully responsive, stunning dark/light interface and seamless animations, StudyMind AI is designed to make learning enjoyable, structured, and incredibly fast.

---

## ✨ Main Features Overview

StudyMind AI is packed with features designed to take you from a complete beginner to a master of any subject:

### 📖 Custom AI Study Guides

- **Structured Content**: Get high-quality, readable overviews of complex topics broken down into key concepts, important dates, and figures.
- **Myth vs. Reality**: Clear up common misunderstandings immediately with beautiful side-by-side comparison boxes.
- **Shimmer Skeletons**: Enjoy a premium loading experience while the AI constructs your guide.

### 🎮 Gamified Interactive Quizzes

- **Active Testing**: Test your knowledge with 10-question multiple-choice quizzes complete with a live timer and visual progress bar.
- **Instant Feedback**: Receive immediate visual confirmation of your answer—correct choices turn green with a checkmark, while wrong choices highlight in red.
- **Detailed Explanations**: Read a context-aware explanation for every correct answer immediately upon selection.
- **Quiz Review**: Look back at your entire attempt side-by-side with correct answers and reasoning on the final score screen.

### 💬 Scoped AI Doubt Solver (Personal Chat Tutor)

- **Personal Tutor**: Talk directly to an AI companion scoped specifically to your chosen topic. The tutor won't get distracted and keeps you focused on your goals!
- **Fluid Animations**: Chat bubbles slide and scale elegantly as you talk.

### 🛠️ On-Demand Topic Creation

- **Learn Anything**: Can't find a topic? Type in what you want to learn, select your preferred difficulty (Beginner, Intermediate, or Advanced), and watch the AI build a complete learning module for it in seconds!
- **Smart Duplicate Warning**: Suggests matching existing topics as you type to prevent redundant creations.

### 📊 Personal Progress Analytics & Dashboards

- **Study History**: Keep track of every guide generated and quiz taken.
- **Visual Insights**: View your progress over time with beautiful, responsive charts showing score trends, category distributions, and accuracy ratios.
- **Consecutive Streaks**: Keep your study momentum going with a built-in streak counter.

### 🛡️ Admin Dashboard (For Creators)

- **User & Content Management**: View platform-wide statistics, promote or ban users, edit and delete topics, and monitor live AI token usage logs.

---

## 🚀 Getting Started (How to Run)

Get the application running locally in just a few steps!

### Prerequisites

- Make sure the [StudyMind AI Server](file:///w:/personal-projects/studymind-ai/studymind-ai-server) is set up and running.
- Install [Node.js](https://nodejs.org/) (v20+ recommended).

### Installation Steps

1.  **Navigate to the client folder**:
    ```bash
    cd studymind-ai-client
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Configure environment variables**:
    Create a file named `.env` in the root of the `/studymind-ai-client` folder:
    ```env
    NEXT_PUBLIC_API_URL="http://localhost:5000"
    NEXT_PUBLIC_FORMSPREE_FORM_ID="https://formspree.io/f/abcdefg"
    ```
4.  **Start the development server**:
    ```bash
    npm run dev
    ```
5.  **Open in your browser**:
    Head over to [http://localhost:3000](http://localhost:3000) to see the application in action!

---

## 💻 Tech Stack & Developer Details

For developers curious about how this modern client-side application is engineered:

- **Framework**: [Next.js v16.2.5 (App Router)](https://nextjs.org/) & [React v19.2.4](https://react.dev/) using TypeScript.
- **AI Integration**: Powered by the state-of-the-art **Google Gemini 2.5 Flash** model for super-fast, highly accurate educational content generation.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom [ShadCN UI](https://ui.shadcn.com/) components for a beautiful, responsive dark/light visual system.
- **Data Fetching & Cache**: [@tanstack/react-query v5](https://tanstack.com/query) handles background syncing, loading states, and optimistic UI mutations.
- **Form Handling**: [@tanstack/react-form](https://tanstack.com/form) & [Zod](https://zod.dev/) manage robust validation and submission states.
- **Interactive Visuals**: [Recharts](https://recharts.org/) powers the responsive dashboard charts, while [Framer Motion v12](https://www.framer.com/motion/) drives fluid layout animations.

---

## 📁 Folder Structure Map

The repository is modularly compartmentalized for ease of development:

```
📁 src/
├── 📁 app/                           # Next.js App Router Pages & Layouts
│   ├── 📁 (admin)/                   # Admin panels (/admin/users, /admin/topics)
│   ├── 📁 (dashboard)/               # User dashboard screens (/dashboard/history, /dashboard/progress)
│   ├── 📁 (commonLayout)/            # Public & shared pages (Home, Explore, Pricing, Study Arena)
│   │   ├── 📁 explore/               # Searchable topic catalog page
│   │   └── 📁 study/[slug]/          # Dynamic study arena page with tabs
│   ├── 📄 globals.css                # Tailwind variables, base styles & dark mode setup
│   └── 📄 layout.tsx                 # Root layout and context providers
├── 📁 components/                    # UI Component library
│   ├── 📁 shared/                    # Layout items (Navbar, Footer, Skeleton loaders)
│   ├── 📁 study/                     # Study session sub-views (StudyGuideTab, QuizTab, ChatTab)
│   ├── 📁 dashboard/                 # Analytics charts and activity tables
│   ├── 📁 ui/                        # Reusable base elements (Buttons, Cards, Inputs)
│   └── 📁 auth/                      # Authentication form components
├── 📁 services/                      # Axios HTTP request services
│   ├── 📄 ai.service.ts              # Connects study guides, quizzes, and chat to the backend
│   ├── 📄 topic.service.ts           # Handles search, catalog, and topic creation
│   └── 📄 user.service.ts            # Pulls history, streak data, and analytics
└── 📁 providers/                     # Application-wide React Query and Theme contexts
```

---

## 📄 License

This frontend application is licensed under the ISC License.
