"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, CheckCircle, GraduationCap } from "lucide-react";

const stats = [
  { label: "Topics Generated", value: "124,500+", icon: BookOpen },
  { label: "Active Users", value: "50,000+", icon: Users },
  { label: "Quizzes Taken", value: "340,000+", icon: CheckCircle },
  { label: "Success Rate", value: "98.5%", icon: GraduationCap },
];

export const Stats = () => {
  return (
    <section className="py-20 bg-blue-600">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center text-white"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <stat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">
                {stat.value}
              </h3>
              <p className="text-blue-100 text-sm font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
