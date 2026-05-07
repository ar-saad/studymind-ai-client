"use client";

import { motion } from "framer-motion";

export const ContactHero = () => {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden bg-slate-900 text-white">
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden opacity-50">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-blue-400 uppercase bg-blue-500/10 rounded-full border border-blue-500/20">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            We're Here to <span className="text-blue-400 text-glow-blue">Help You</span> Learn
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Have a question, feedback, or just want to say hello? Our team is ready to assist you.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
