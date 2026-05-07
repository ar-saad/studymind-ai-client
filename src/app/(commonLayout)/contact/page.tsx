import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact Us | StudyMind AI",
  description: "Get in touch with the StudyMind AI team for support or inquiries.",
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <ContactHero />
      <ContactForm />
    </main>
  );
}
