"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Play, ArrowRight, Brain, Zap, Target } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const topics = [
  "Quantum Physics",
  "World War II",
  "Machine Learning",
  "Roman Empire",
  "Neuroscience",
  "Blockchain",
];

export const Hero = () => {
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTopicIndex((prev) => (prev + 1) % topics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800 text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Personal Learning Assistant</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 max-w-5xl"
          >
            Learn Anything. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-600 to-teal-500 animate-gradient">
              Master It Faster.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Type any topic, get an AI-generated study guide, quiz yourself, and
            track your progress. The ultimate companion for modern learners.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
          >
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-10 text-lg rounded-full shadow-lg shadow-blue-500/25 group"
            >
              <Link href="/register" className="flex items-center gap-2">
                Start Learning Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-10 text-lg rounded-full border-2 hover:bg-slate-50 dark:hover:bg-slate-900"
            >
              <Play className="w-5 h-5 mr-2 fill-current" />
              How It Works
            </Button>
          </motion.div>

          {/* Topic Cycling Decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full max-w-4xl pt-10 border-t border-slate-200 dark:border-slate-800"
          >
            <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-8">
              What do you want to learn today?
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {topics.map((topic, index) => (
                <motion.div
                  key={topic}
                  animate={{
                    scale: activeTopicIndex === index ? 1.05 : 1,
                    backgroundColor:
                      activeTopicIndex === index
                        ? "rgba(37, 99, 235, 0.1)"
                        : "transparent",
                    borderColor:
                      activeTopicIndex === index
                        ? "rgba(37, 99, 235, 0.5)"
                        : "rgba(226, 232, 240, 1)",
                  }}
                  className={`px-6 py-3 rounded-2xl border-2 transition-colors duration-500 text-sm md:text-base font-semibold ${
                    activeTopicIndex === index
                      ? "text-blue-600 border-blue-500/50 dark:text-blue-400 dark:border-blue-400/50"
                      : "text-slate-500 border-slate-200 dark:border-slate-800 dark:text-slate-500"
                  }`}
                >
                  {topic}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements for extra premium feel */}
      <div className="hidden lg:block">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Guide Generated</p>
            <p className="text-sm font-bold">Quantum Mechanics</p>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 right-10 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-600">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Quiz Score</p>
            <p className="text-sm font-bold">95% Mastery</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
