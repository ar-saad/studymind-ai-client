"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How accurate is the AI-generated content?",
    answer:
      "We use the latest Google Gemini models which are highly accurate. However, as with all AI, we recommend cross-referencing for critical academic work. The system is designed to provide high-quality summaries and study aids.",
  },
  {
    question: "Can I use StudyMind AI for free?",
    answer:
      "Yes! Our Free plan allows for 5 AI generations per day, which is enough for most casual learners. You can upgrade to Pro anytime for unlimited access.",
  },
  {
    question: "What topics can I learn?",
    answer:
      "Almost anything! From science and history to coding, business, and philosophy. If there is information available about a topic online, our AI can structure a study guide for it.",
  },
  {
    question: "Does the quiz result save to my profile?",
    answer:
      "Yes, once you are logged in, all your study sessions and quiz results are saved so you can track your progress over time.",
  },
  {
    question: "How do I upgrade to Pro?",
    answer:
      "You can upgrade from your dashboard. For this contest, payment is simulated through a UI form - no real credit card is required.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Everything you need to know about StudyMind AI.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                className="w-full px-8 py-6 text-left flex items-center justify-between gap-4"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-lg text-slate-900 dark:text-white">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-blue-600" />
                ) : (
                  <Plus className="w-5 h-5 text-slate-400" />
                )}
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                  {faq.answer}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
