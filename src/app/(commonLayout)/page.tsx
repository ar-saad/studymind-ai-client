import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { Stats } from "@/components/landing/Stats";
import { Testimonials } from "@/components/landing/Testimonials";
import { Newsletter } from "@/components/landing/Newsletter";

export const metadata = {
  title: "StudyMind AI — Learn anything, master it faster.",
  description:
    "StudyMind AI is an AI-powered learning platform that helps you master any topic with structured study guides and interactive quizzes.",
};

export default function HomePage() {
  return (
    <main className="flex-1">
      <Hero />
      <Stats />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Newsletter />
    </main>
  );
}
