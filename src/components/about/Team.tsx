"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TbWorldWww } from "react-icons/tb";
import { FaTwitter } from "react-icons/fa6";
import Link from "next/link";

const team = [
  {
    name: "Abdur Rahman",
    role: "Founder & Lead Developer",
    bio: "Passionate full-stack engineer and creator of StudyMind AI, dedicated to building intelligent solutions that make high-quality learning accessible to everyone.",
    image: "/images/profile_picture.png",
  },
  {
    name: "Abdur Rahman Saad",
    role: "Head of AI & Algorithms",
    bio: "Designing and fine-tuning advanced prompt systems and LLM workflows to deliver incredibly accurate, pedagogical, and context-aware study resources.",
    image: "/images/profile_picture.png",
  },
  {
    name: "Abdur Rahman Ibne Mijan",
    role: "Lead UI/UX Designer",
    bio: "Crafting beautiful, intuitive, and modern educational interfaces. Obsessed with micro-animations, layout harmony, and premium design aesthetics.",
    image: "/images/profile_picture.png",
  },
];

export const Team = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Meet the Mind Behind the{" "}
                <span className="text-blue-600">Innovation</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                StudyMind AI is a solo project designed and built with passion.
                From core server systems and AI architectures to the interactive
                user experience, every detail has been carefully engineered to
                transform how you learn.
              </p>
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800">
                <Image
                  src="/images/team.png"
                  alt="The Team"
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white text-sm font-medium italic">
                    "Building the future of learning, one prompt at a time."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 w-full">
            <div className="grid gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-start gap-6 hover:border-blue-200 dark:hover:border-blue-900 transition-colors group"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-700">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                        {member.name}
                      </h3>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href="https://ar-saad.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <TbWorldWww className="w-4 h-4 text-slate-400 hover:text-blue-600 cursor-pointer" />
                        </Link>
                        <Link
                          href="https://x.com/arsaad_dev"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaTwitter className="w-4 h-4 text-slate-400 hover:text-blue-400 cursor-pointer" />
                        </Link>
                      </div>
                    </div>
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-3 uppercase tracking-wider">
                      {member.role}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
