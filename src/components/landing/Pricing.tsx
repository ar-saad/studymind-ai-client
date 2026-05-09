"use client";

import { motion } from "framer-motion";
import { Brain, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for casual learners and curious minds.",
    features: [
      { text: "5 Generations / day", included: true },
      { text: "Structured Study Guides", included: true },
      { text: "Interactive Quizzes", included: true },
      { text: "Contextual Doubt Solver", included: true },
      { text: "Full Progress Analytics", included: true },
      { text: "Unlimited Generations", included: false },
      { text: "Priority AI Response", included: false },
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "9.99",
    description: "The ultimate power for students and professionals.",
    features: [
      { text: "Unlimited Generations", included: true },
      { text: "Structured Study Guides", included: true },
      { text: "Interactive Quizzes", included: true },
      { text: "Contextual Doubt Solver", included: true },
      { text: "Full Progress Analytics", included: true },
      { text: "Priority AI Response", included: true },
    ],
    cta: "Go Pro Now",
    popular: true,
  },
];

export const Pricing = () => {
  return (
    <section className="py-24" id="pricing">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Choose the plan that fits your learning goals. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative p-8 md:p-12 rounded-[2.5rem] border ${
                plan.popular
                  ? "bg-slate-900 text-white border-blue-500 shadow-2xl shadow-blue-500/20"
                  : "bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p
                  className={plan.popular ? "text-slate-400" : "text-slate-500"}
                >
                  {plan.description}
                </p>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl md:text-6xl font-bold">
                  £{plan.price}
                </span>
                <span
                  className={plan.popular ? "text-slate-400" : "text-slate-500"}
                >
                  /month
                </span>
              </div>

              <div className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <div key={feature.text} className="flex items-center gap-3">
                    {feature.included ? (
                      <div className="shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                        <Check className="w-3.5 h-3.5 stroke-3" />
                      </div>
                    ) : (
                      <div className="shrink-0 w-5 h-5 rounded-full bg-slate-500/20 flex items-center justify-center text-slate-400">
                        <X className="w-3.5 h-3.5 stroke-3" />
                      </div>
                    )}
                    <span
                      className={`text-sm md:text-base ${!feature.included && "opacity-50"}`}
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                className={`w-full h-14 rounded-full text-lg font-bold transition-transform active:scale-95 ${
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25"
                    : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white"
                }`}
              >
                <Link href="/register">{plan.cta}</Link>
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-8 rounded-3xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 text-center max-w-4xl mx-auto">
          <p className="text-slate-700 dark:text-slate-300 font-medium">
            <span className="font-bold text-blue-600 dark:text-blue-400">
              Team or School?
            </span>{" "}
            Contact us for custom volume discounts and institutional access.
          </p>
        </div>
      </div>
    </section>
  );
};
