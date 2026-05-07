"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin } from "react-icons/fa6";

const team = [
  {
    name: "Alex Rivera",
    role: "Founder & CEO",
    bio: "Ex-Google Engineer with a passion for educational technology.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    name: "Sarah Chen",
    role: "Head of AI",
    bio: "PhD in NLP and 10 years of experience in generative models.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    name: "Marcus Thorne",
    role: "Lead Designer",
    bio: "Award-winning UI/UX designer obsessed with learning experiences.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
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
                Meet the Minds Behind the{" "}
                <span className="text-blue-600">Innovation</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                We're a small but mighty team of engineers, designers, and
                educators based in San Francisco, working remotely across 3
                continents. We're united by our love for learning and our belief
                in AI's potential to transform education.
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
                    "Building the future of learning together."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 w-full">
            <div className="grid gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
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
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                        {member.name}
                      </h3>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <FaLinkedin className="w-4 h-4 text-slate-400 hover:text-blue-600 cursor-pointer" />
                        <FaTwitter className="w-4 h-4 text-slate-400 hover:text-blue-400 cursor-pointer" />
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
