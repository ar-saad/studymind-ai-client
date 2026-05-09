"use client";

import { motion } from "framer-motion";
import {
  Search,
  BookOpen,
  PenTool,
  MessageSquare,
  BarChart3,
  Zap,
  Shield,
  Rocket,
  Target,
  Check,
  Sparkles,
  Trophy,
} from "lucide-react";

const steps = [
  {
    step: "01",
    badge: "Step 1: Choose a Topic",
    title: "Type Any Subject You Want to Learn",
    description:
      "Simply type in any topic you're curious about—like 'How Rockets Fly', 'World War II', or 'Personal Budgeting'. Select your difficulty level (Easy, Medium, or Hard) so the study guides fit your knowledge level perfectly.",
    tip: "💡 Perfect for students, career changers, or anyone who wants a simple, direct breakdown of complex topics!",
    color: "from-blue-500 to-cyan-500",
  },
  {
    step: "02",
    badge: "Step 2: Read & Learn",
    title: "Read Your Custom Study Guide",
    description:
      "Our advanced AI instantly creates a beautiful, structured study guide just for you. No more heavy, boring textbooks! It breaks everything down into simple concepts. If something feels tricky, just ask our friendly AI Doubt Solver right next to your guide.",
    tip: "💬 Stuck? Ask 'Explain like I'm 10' or 'Give me an everyday example' to instantly understand tough terms!",
    color: "from-indigo-500 to-purple-500",
  },
  {
    step: "03",
    badge: "Step 3: Play & Master",
    title: "Take Fun Quizzes & Track Scores",
    description:
      "Test your understanding with friendly multiple-choice questions made specifically from your guide. You get instant results and friendly, clear explanations for every answer. See your mastery score increase and save it to your profile.",
    tip: "🏆 Learn by doing! Keep practicing, earn points, and watch your skills grow every single day.",
    color: "from-teal-500 to-emerald-500",
  },
];

const mainFeatures = [
  {
    title: "Smart Topic Builder",
    description:
      "Generate fully customized learning topics on-demand using advanced AI models.",
    icon: Shield,
  },
  {
    title: "Structured Study Guides",
    description:
      "Structured breakdowns of complex topics tailored to your selected difficulty level.",
    icon: Zap,
  },
  {
    title: "Interactive Quizzes",
    description:
      "Dynamic multiple-choice questions with instant feedback and AI-powered explanations.",
    icon: Rocket,
  },
  {
    title: "Contextual Doubt Solver",
    description:
      "A built-in AI assistant ready to answer your follow-up questions about any topic.",
    icon: MessageSquare,
  },
  {
    title: "Progress Analytics",
    description:
      "Visualize your learning journey with charts and score histories.",
    icon: BarChart3,
  },
  {
    title: "Custom Difficulty",
    description:
      "Whether you're a beginner or a pro, we adjust the content complexity for you.",
    icon: Target,
  },
];

// Mockup Component for Step 1
const MockupStepOne = () => {
  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-4 md:p-5 shadow-sm text-left font-sans">
      <div className="flex items-center gap-1.5 mb-3.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="text-[10px] text-slate-400 ml-1.5 font-mono">
          studymind.ai/new-topic
        </span>
      </div>

      <div className="space-y-3.5">
        <div>
          <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
            What do you want to learn?
          </label>
          <div className="relative flex items-center bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 shadow-xs">
            <Search className="w-3.5 h-3.5 text-blue-500 mr-2 shrink-0" />
            <div className="flex items-center text-xs text-slate-800 dark:text-slate-100 font-medium">
              <span>How do Black Holes form</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-0.5 h-3.5 bg-blue-500 ml-0.5"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
            Select Your Learning Level
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            <div className="flex items-center justify-center gap-1 py-1 px-2 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold shadow-xs">
              <span className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
              Easy
            </div>
            <div className="flex items-center justify-center py-1 px-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 text-[10px] font-medium">
              Medium
            </div>
            <div className="flex items-center justify-center py-1 px-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 text-[10px] font-medium">
              Expert
            </div>
          </div>
        </div>

        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="w-full py-2 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-center text-[11px] font-bold shadow-md shadow-blue-500/10 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-3 h-3" />
          Generate Study Guide
        </motion.div>
      </div>
    </div>
  );
};

// Mockup Component for Step 2
const MockupStepTwo = () => {
  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-4 md:p-5 shadow-sm text-left font-sans flex flex-col gap-2.5 h-52.5 overflow-hidden relative">
      <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/80 pb-2 shrink-0">
        <div className="flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
          <span className="text-[10px] font-bold text-slate-800 dark:text-slate-100">
            Study Guide: Space Basics
          </span>
        </div>
        <div className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[8px] font-bold uppercase">
          Easy Level
        </div>
      </div>

      <div className="flex gap-2.5 grow overflow-hidden">
        {/* Left Side: Study Guide */}
        <div className="w-[55%] space-y-2 text-[10px] leading-normal text-slate-600 dark:text-slate-300">
          <h4 className="font-bold text-slate-800 dark:text-white text-[11px]">
            🌌 Star Death & Collapse
          </h4>
          <p className="bg-white dark:bg-slate-950 p-2 rounded-lg border border-slate-200/60 dark:border-slate-800/80 shadow-2xs font-medium">
            When an extremely heavy star runs out of fuel, it collapses. Its
            matter gets packed into an incredibly tiny space.
          </p>
          <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded w-5/6 animate-pulse" />
          <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded w-4/5 animate-pulse" />
        </div>

        {/* Right Side: Doubt Solver Bubbles */}
        <div className="w-[45%] flex flex-col justify-end gap-1.5 text-[9px] pb-1">
          <div className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 p-1.5 rounded-lg rounded-tr-none self-end max-w-full shadow-2xs">
            Explain like I am 5?
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="bg-indigo-500 text-white p-2 rounded-lg rounded-tl-none self-start max-w-full shadow-xs shadow-indigo-500/10 font-medium leading-relaxed"
          >
            <div className="flex items-center gap-0.5 mb-0.5 font-bold">
              <span>🤖 AI Doubt Solver</span>
            </div>
            Imagine squeezing an elephant into a tiny grain of sand! That is how
            packed it is.
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Mockup Component for Step 3
const MockupStepThree = () => {
  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-4 md:p-5 shadow-sm text-left font-sans flex flex-col gap-2.5">
      <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/80 pb-2">
        <div className="flex items-center gap-1.5">
          <PenTool className="w-3.5 h-3.5 text-teal-500" />
          <span className="text-[10px] font-bold text-slate-800 dark:text-slate-100">
            Practice Quiz
          </span>
        </div>
        <div className="flex items-center gap-0.5 text-teal-500 font-bold text-[10px]">
          <Trophy className="w-3 h-3 animate-bounce" />
          <span>+10 XP</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-[11px] font-bold text-slate-800 dark:text-white leading-tight">
          What happens when a massive star collapses?
        </div>

        <div className="space-y-1.5">
          {/* Option A - Inactive */}
          <div className="w-full py-1.5 px-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-[10px] text-slate-500 dark:text-slate-400 font-medium flex justify-between items-center">
            <span>A. It gets brighter</span>
            <div className="w-3 h-3 rounded-full border border-slate-200 dark:border-slate-800 shrink-0" />
          </div>

          {/* Option B - Active & Correct */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
            className="w-full py-1.5 px-2 border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg text-[10px] font-bold flex justify-between items-center shadow-xs"
          >
            <span>B. It forms a Black Hole</span>
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
              <Check className="w-2.5 h-2.5 stroke-4" />
            </div>
          </motion.div>
        </div>

        {/* Mastery Score Progress */}
        <div className="pt-1">
          <div className="flex justify-between text-[9px] font-bold text-slate-500 dark:text-slate-400 mb-0.5">
            <span>Your Mastery Level</span>
            <span className="text-teal-500 font-bold flex items-center gap-0.5">
              92% 🔥
            </span>
          </div>
          <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "20%" }}
              animate={{ width: "92%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-linear-to-r from-teal-500 to-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Features = () => {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-slate-50 dark:bg-slate-900/50"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* How it Works Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            How It Works
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Mastering any subject has never been this simple. Our platform
            translates complex academic files and ideas into fun, structured
            daily steps.
          </p>
        </div>

        {/* Dynamic Premium Step Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-32 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="flex flex-col bg-white dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-900 p-6 md:p-8 hover:shadow-[0_20px_50px_rgba(59,130,246,0.06)] dark:hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)] hover:border-blue-500/20 dark:hover:border-blue-500/30 transition-all duration-500 group relative overflow-hidden"
            >
              {/* Card Top Border Accent */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r ${step.color}`}
              />

              {/* Step Badge & Large Number */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className={`text-xs font-bold tracking-widest uppercase bg-linear-to-r ${step.color} bg-clip-text text-transparent`}
                >
                  {step.badge}
                </span>
                <span className="text-3xl font-black opacity-10 group-hover:opacity-35 dark:group-hover:opacity-45 transition-opacity duration-300 font-mono text-slate-500">
                  {step.step}
                </span>
              </div>

              {/* Step Description */}
              <h3 className="text-xl md:text-2xl font-bold mb-3.5 text-slate-900 dark:text-white tracking-tight">
                {step.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base mb-5">
                {step.description}
              </p>

              {/* Easy-to-understand Tip block */}
              <div className="p-3.5 bg-slate-50/80 dark:bg-slate-900/60 rounded-2xl border border-slate-100/80 dark:border-slate-800/60 mb-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
                {step.tip}
              </div>

              {/* Animated Interactive Mock UI */}
              <div className="w-full mt-auto pt-2">
                {index === 0 && <MockupStepOne />}
                {index === 1 && <MockupStepTwo />}
                {index === 2 && <MockupStepThree />}
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Features Showcase Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Powerful AI Features
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Everything you need to go from zero to mastery in any topic.
          </p>
        </div>

        {/* AI Features Showcase Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
