"use client";

import { Send } from "lucide-react";
import { Button } from "../ui/button";

export const Newsletter = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="bg-linear-to-br from-blue-600 to-indigo-800 rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-500/30">
          {/* Background circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Master Your Learning Journey
            </h2>
            <p className="text-blue-100 text-lg mb-10 opacity-90">
              Join 5,000+ learners getting weekly study tips, AI prompts, and
              platform updates.
            </p>

            <form
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-14 px-6 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
              />
              <Button className="h-14 px-8 rounded-full bg-white text-blue-700 hover:bg-blue-50 font-bold transition-transform active:scale-95">
                Subscribe Now
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
            <p className="mt-4 text-xs text-blue-200/60 uppercase tracking-widest font-medium">
              No spam, only value. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
