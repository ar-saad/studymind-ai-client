import { AboutHero } from "@/components/about/AboutHero";
import { Mission } from "@/components/about/Mission";
import { Team } from "@/components/about/Team";

export const metadata = {
  title: "About Us | StudyMind AI",
  description: "Learn about the mission, vision, and the team behind StudyMind AI.",
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <AboutHero />
      <Mission />
      <Team />
    </main>
  );
}
