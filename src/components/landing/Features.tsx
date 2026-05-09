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
} from "lucide-react";

const steps = [
  {
    title: "Type Your Topic",
    description:
      "Tell us what you want to learn, from 'Black Holes' to 'Budgeting'.",
    icon: Search,
    color: "bg-blue-500",
  },
  {
    title: "Get Study Guide",
    description:
      "Our AI generates a structured guide with key concepts and facts.",
    icon: BookOpen,
    color: "bg-indigo-500",
  },
  {
    title: "Test Yourself",
    description: "Take an interactive quiz and track your mastery level.",
    icon: PenTool,
    color: "bg-teal-500",
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

export const Features = () => {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* How it Works */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            How It Works
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Mastering a new subject has never been this simple. Follow our
            3-step process.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-32 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/3 left-1/4 right-1/4 h-0.5 bg-linear-to-r from-blue-200 via-indigo-200 to-teal-200 dark:from-blue-900 dark:via-indigo-900 dark:to-teal-900 -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              <div
                className={`w-20 h-20 rounded-3xl ${step.color} flex items-center justify-center text-white mb-8 shadow-2xl shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500`}
              >
                <step.icon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* AI Features Showcase */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Powerful AI Features
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Everything you need to go from zero to mastery in any topic.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
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
