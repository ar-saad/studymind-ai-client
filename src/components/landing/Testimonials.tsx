"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { reviewService } from "@/services/review.service";

interface TestimonialType {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

const defaultTestimonials: TestimonialType[] = [
  {
    name: "Sarah Johnson",
    role: "Reviewed JavaScript Fundamentals",
    content:
      "StudyMind AI has completely changed how I prep for exams. The AI-generated quizzes are spot on and help me identify my weak points instantly.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Reviewed Machine Learning",
    content:
      "I use it to quickly grasp new tech concepts. The structured guides save me hours of searching through documentation.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Reviewed Introduction to Psychology",
    content:
      "The doubt solver is like having a personal tutor available 24/7. It explains complex ideas in a way that just clicks.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    rating: 5,
  },
];

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<TestimonialType[]>(defaultTestimonials);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await reviewService.getReviews({ limit: 3 });
        if (response && response.data && response.data.length > 0) {
          const mappedReviews = response.data.map((rev: any) => ({
            name: rev.user?.name || "Anonymous Learner",
            role: rev.topic?.title ? `Reviewed ${rev.topic.title}` : "Verified Student",
            content: rev.comment || "Amazing platform, helped me master the topic easily!",
            avatar: rev.user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${rev.user?.name || 'User'}`,
            rating: rev.rating || 5,
          }));

          if (mappedReviews.length < 3) {
            setTestimonials([...mappedReviews, ...defaultTestimonials.slice(mappedReviews.length)]);
          } else {
            setTestimonials(mappedReviews);
          }
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Loved by Learners
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Join thousands of students and professionals who are mastering new
            topics every day.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={`${t.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-8 rounded-[2rem] bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm relative flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 text-yellow-500 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  {[...Array(5 - t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-slate-200 dark:text-slate-700" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-300 italic mb-8 leading-relaxed">
                  "{t.content}"
                </p>
              </div>
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-50 dark:border-slate-900">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full bg-slate-100 object-cover"
                />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    {t.name}
                  </h4>
                  <p className="text-sm text-slate-500 font-medium">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
