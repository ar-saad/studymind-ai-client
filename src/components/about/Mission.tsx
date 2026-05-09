"use client";

import { motion } from "framer-motion";
import { Target, Eye, Zap, Shield, Heart, Users } from "lucide-react";
import { topicService } from "@/services/topic.service";
import { useQuery } from "@tanstack/react-query";

const values = [
  {
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    title: "Instant Mastery",
    description:
      "We believe in making complex topics understandable in minutes, not hours.",
  },
  {
    icon: <Shield className="w-6 h-6 text-blue-500" />,
    title: "Quality First",
    description:
      "Our AI is tuned for accuracy and pedagogical soundness in every generation.",
  },
  {
    icon: <Users className="w-6 h-6 text-indigo-500" />,
    title: "User Centric",
    description:
      "Every feature we build is designed to solve real learner pain points.",
  },
  {
    icon: <Heart className="w-6 h-6 text-red-500" />,
    title: "Passionate Learning",
    description:
      "We are a team of lifelong learners dedicated to empowering others.",
  },
];

export const Mission = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["public-stats"],
    queryFn: topicService.getPublicStats,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  const statsList = [
    {
      number: isLoading ? "..." : `${data?.totalTopics ?? 24}`,
      label: "Topics Generated",
      desc: "Dynamic study modules created",
    },
    {
      number: isLoading ? "..." : `${data?.totalUsers ?? 3}`,
      label: "Active Users",
      desc: "Lifelong learners on our platform",
    },
    {
      number: isLoading ? "..." : `${data?.totalQuizzes ?? 5}`,
      label: "Quizzes Taken",
      desc: "Testing and reinforcing knowledge",
    },
    {
      number: isLoading ? "..." : `${data?.successRate ?? 98.5}%`,
      label: "Success Rate",
      desc: "High-satisfaction learning mastery",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Our Mission
              </h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              To democratize deep learning by providing every person on the
              planet with a personal, AI-powered tutor that understands their
              level and helps them master any topic instantly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <Eye className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Our Vision
              </h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              A world where the barrier to entry for any field of knowledge is
              just a single prompt away, and where anyone can become an expert
              in whatever they choose to study.
            </p>
          </motion.div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Our Core Values
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            The principles that guide us in building the future of education.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-6">{value.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {value.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-32 pt-20 border-t border-slate-100 dark:border-slate-800">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-900/30 rounded-full">
              Our Impact
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              StudyMind AI by the Numbers
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We are empowering thousands of students and lifelong learners
              worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statsList.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group p-8 bg-white dark:bg-slate-800/40 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs hover:border-blue-500/20 dark:hover:border-blue-500/20 hover:shadow-xl hover:shadow-blue-500/5 transition-all text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-4xl md:text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-2 tracking-tight">
                  {stat.number}
                </h3>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                  {stat.label}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
