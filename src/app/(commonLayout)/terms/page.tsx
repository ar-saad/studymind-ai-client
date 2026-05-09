"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  UserCheck,
  BrainCircuit,
  CreditCard,
  Scale,
  Ban,
  RefreshCw,
  Search,
  Printer,
  Download,
  ChevronDown,
  ChevronUp,
  Mail,
  Clock,
  ArrowRight,
} from "lucide-react";

// Types for sections
interface TermsSection {
  id: string;
  icon: React.ComponentType<any>;
  title: string;
  badge: string;
  summary: string;
  content: React.ReactNode;
}

export default function TermsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("acceptance");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Sections data
  const sections: TermsSection[] = useMemo(
    () => [
      {
        id: "acceptance",
        icon: FileText,
        title: "1. Acceptance of Terms",
        badge: "The Agreement",
        summary:
          "By creating an account or using StudyMind AI, you agree to these legal terms. Please read them carefully before using our platform.",
        content: (
          <div className="space-y-4">
            <p>
              Welcome to <strong>StudyMind AI</strong> (referred to as "we",
              "us", "our", or the "Platform"). These Terms and Conditions govern
              your access to and use of our website, AI study assistants,
              generated study guides, practice quizzes, and all other services
              we offer.
            </p>
            <p>
              By creating an account, subscribing to our plans, or using any
              part of StudyMind AI, you represent that you are at least 13 years
              of age (or have explicit parental/guardian consent) and that you
              agree to be bound by these Terms.
            </p>
            <p>
              If you do not agree to these Terms, you are prohibited from using
              or accessing our platform, and must immediately cease all use of
              our services.
            </p>
          </div>
        ),
      },
      {
        id: "accounts",
        icon: UserCheck,
        title: "2. Accounts & Responsibilities",
        badge: "Your Account",
        summary:
          "You are responsible for keeping your login credentials safe and ensuring your account activity complies with academic integrity guidelines.",
        content: (
          <div className="space-y-4">
            <p>
              To access full platform features (including saving study guides,
              tracking quiz scores, and using the AI doubt solver), you must
              sign up via our secure authorization flow.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Account Security:</strong> You are solely responsible
                for maintaining the confidentiality of your session tokens and
                credentials. You agree to notify us immediately of any
                unauthorized use.
              </li>
              <li>
                <strong>Academic Integrity:</strong> StudyMind AI is designed to
                assist and enhance your learning, not to replace original
                thought or enable cheating. We expect all students and
                self-learners to use our guides, doubt solver, and quizzes in
                accordance with their respective school's honor codes.
              </li>
              <li>
                <strong>Account Termination:</strong> We reserve the right to
                suspend or terminate accounts that engage in fraudulent
                behavior, automated scraping, or malicious attempts to bypass
                system limits.
              </li>
            </ul>
          </div>
        ),
      },
      {
        id: "ai-services",
        icon: BrainCircuit,
        title: "3. AI Content & Generation",
        badge: "AI Generations",
        summary:
          "You own the custom study guides and quiz inputs you create, but please be aware that AI-generated information can occasionally contain errors.",
        content: (
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mt-2">
              A. Ownership of Output
            </h4>
            <p>
              You retain all ownership rights to the source materials, notes,
              and topics you upload or input. We do not claim any proprietary
              rights over the personalized study guides, flashcards, or quizzes
              generated for you by StudyMind AI. You are free to export, print,
              and study them as you wish.
            </p>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mt-2">
              B. The Nature of AI (Accuracy Disclaimer)
            </h4>
            <p>
              Our services utilize Google Gemini API models to deliver custom
              explanations and answer study questions. While we employ
              state-of-the-art prompt filtering, AI models are subject to
              "hallucinations" and can occasionally generate inaccurate or
              outdated information.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 border-l-2 border-amber-500 pl-3">
              Always double-check critical formulas, definitions, and facts
              against your textbook or verified course curriculum. StudyMind AI
              is an educational study aid, not a certified textbook.
            </p>
          </div>
        ),
      },
      {
        id: "billing",
        icon: CreditCard,
        title: "4. Subscription & Billing",
        badge: "Payments",
        summary:
          "Paid subscriptions renew automatically. You can cancel easily at any time directly through your billing settings page.",
        content: (
          <div className="space-y-4">
            <p>
              We offer both free tiers and premium subscription levels. If you
              opt for a premium plan:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Automatic Renewal:</strong> Subscription fees are
                charged on a recurring basis (monthly or annually) depending on
                your selected tier. Your card will be billed automatically until
                you cancel.
              </li>
              <li>
                <strong>Cancellations:</strong> You can cancel your subscription
                at any time. Your premium benefits will continue until the end
                of your current billing cycle, and no further charges will be
                made.
              </li>
              <li>
                <strong>Refunds:</strong> Refund requests are evaluated on a
                case-by-case basis. If you believe you were charged in error,
                please reach out to our support team within 14 days of the
                charge.
              </li>
            </ul>
          </div>
        ),
      },
      {
        id: "intellectual-property",
        icon: Scale,
        title: "5. Intellectual Property Rights",
        badge: "Our Brand",
        summary:
          "We own the StudyMind AI brand, platform code, interface design, and logo. Please don't copy or reverse engineer our service.",
        content: (
          <div className="space-y-4">
            <p>
              The StudyMind AI name, brand assets, custom user interface, logos,
              graphics, website design, database structures, and proprietary
              algorithms are protected by copyright, trademark, and other
              intellectual property laws.
            </p>
            <p>
              These Terms grant you a limited, non-exclusive, non-transferable
              license to access and use the platform for your own personal,
              educational studying. You may not:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Copy, modify, or reverse-engineer our source code or platform
                files.
              </li>
              <li>
                Use automated bots or crawlers to harvest user content or scrape
                our structured database.
              </li>
              <li>
                Repackage, white-label, or sell our AI-powered study guides as a
                separate commercial platform.
              </li>
            </ul>
          </div>
        ),
      },
      {
        id: "liability",
        icon: Ban,
        title: "6. Limitation of Liability",
        badge: "Legal Limits",
        summary:
          "We provide our study tools 'as-is' and do not guarantee specific academic results, test grades, or school admission outcomes.",
        content: (
          <div className="space-y-4">
            <p>
              STUDYMIND AI IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS.
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, WE DISCLAIM ALL
              WARRANTIES, EXPRESS OR IMPLIED.
            </p>
            <p>
              In no event shall StudyMind AI, its developers, or its affiliates
              be liable for any academic failures, low test grades, exam
              disqualifications, missed assignments, or secondary losses arising
              from the use of our educational tools.
            </p>
            <p>
              We do not guarantee 100% uninterrupted platform uptime, as
              external API interruptions (such as Google Gemini, Vercel hosting,
              or database services) may occasionally affect server availability.
            </p>
          </div>
        ),
      },
      {
        id: "modifications",
        icon: RefreshCw,
        title: "7. Modifications of Terms",
        badge: "Updates",
        summary:
          "We may update these terms occasionally as we add new features. Continued use of our app means you agree to the updated terms.",
        content: (
          <div className="space-y-4">
            <p>
              We reserve the right to revise or modify these Terms and
              Conditions at any time. When we make changes, we will update the
              "Last Updated" date at the top of this page.
            </p>
            <p>
              For substantial changes, we will make reasonable efforts to notify
              you (e.g., via a dashboard notification or email). Your continued
              use of StudyMind AI after any changes take effect constitutes your
              acceptance of the newly revised Terms.
            </p>
          </div>
        ),
      },
    ],
    [],
  );

  // Filter sections based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery) return sections;
    return sections.filter(
      (sec) =>
        sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sec.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sec.id.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, sections]);

  // Handle section click (smooth scroll)
  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120; // accounting for navbar
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Handle printing
  const handlePrint = () => {
    window.print();
  };

  // Handle download
  const handleDownload = () => {
    const textContent = sections
      .map((sec) => `=== ${sec.title} ===\nSummary: ${sec.summary}\n\n`)
      .join("\n");
    const element = document.createElement("a");
    const file = new Blob([textContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "StudyMind_AI_Terms_and_Conditions.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Frequently Asked Questions
  const faqs = [
    {
      q: "Do I legally own the study materials generated on StudyMind AI?",
      a: "Yes. You own the content generated specifically for you, and you are free to download, study, print, or share them. However, since they are generated by AI, they are not copyrighted under your name as unique human creative expressions.",
    },
    {
      q: "Can I cancel my premium subscription at any time?",
      a: "Absolutely. You can cancel your subscription via your billing settings in one click. There are no hidden termination fees, and your premium perks remain active until the end of your billing period.",
    },
    {
      q: "Does using this service violate my school's honor code?",
      a: "StudyMind AI is an interactive tutoring and self-assessment tool designed to help you understand tough topics. However, copying answers directly into active school exams or homework assignments may violate your school's code. We urge users to practice responsible study habits.",
    },
    {
      q: "What is your refund policy?",
      a: "If you were billed in error or experienced technical issues that prevented you from using your plan, please contact our support team within 14 days for a full refund review.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 selection:bg-blue-500 selection:text-white pb-24">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-150 -z-10 overflow-hidden opacity-30 dark:opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-150 h-150 bg-blue-500/10 dark:bg-blue-600/20 blur-[180px] rounded-full" />
        <div className="absolute top-[20%] left-[-15%] w-125 h-125 bg-indigo-500/10 dark:bg-indigo-600/20 blur-[150px] rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 border-b border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-500/10 rounded-full border border-blue-100 dark:border-blue-500/20">
                <FileText className="w-3.5 h-3.5" /> Terms of Service
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
                Terms &amp;{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  Conditions
                </span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                Welcome to StudyMind AI. By using our platform, you agree to
                these transparent terms that safeguard your rights and academic
                journey.
              </p>

              {/* Utility Info bar */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-900 pt-6">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" /> Last Updated: May
                  9, 2026
                </span>
                <span className="hidden md:inline text-slate-300 dark:text-slate-800">
                  •
                </span>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium cursor-pointer"
                >
                  <Printer className="w-4 h-4" /> Print Terms
                </button>
                <span className="hidden md:inline text-slate-300 dark:text-slate-800">
                  •
                </span>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Download Text
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="container mx-auto px-4 md:px-8 max-w-7xl pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sticky Left Sidebar Navigation */}
          <aside className="lg:sticky lg:top-28 col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-slate-900 dark:text-slate-500 text-sm mb-4 uppercase tracking-wider">
                On this Page
              </h3>
              <nav className="space-y-1">
                {sections.map((sec) => {
                  const Icon = sec.icon;
                  const isAct = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => handleScrollTo(sec.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-all cursor-pointer group ${
                        isAct
                          ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-transform ${isAct ? "scale-110 text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300"}`}
                      />
                      <span className="truncate">{sec.title.substring(3)}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Contact Card */}
            <div className="bg-linear-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-md relative overflow-hidden group">
              <div className="absolute top-[-20%] right-[-20%] w-30 h-30 bg-white/10 blur-[20px] rounded-full group-hover:scale-125 transition-transform duration-500" />
              <Mail className="w-8 h-8 mb-4 text-blue-200" />
              <h4 className="font-bold text-lg mb-2">Need Help?</h4>
              <p className="text-sm text-blue-100 leading-relaxed mb-4">
                Have compliance questions, payment inquiries, or feedback
                regarding our legal terms?
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-1 text-sm font-semibold text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl transition-all"
              >
                Contact Legal Support <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </aside>

          {/* Right Main Content */}
          <div className="col-span-1 lg:col-span-3 space-y-8">
            {/* Search Bar with Instant Filter Feedback */}
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-slate-400 dark:text-slate-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search legal terms (e.g., 'ownership', 'billing', 'accuracy')..."
                className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 focus:border-blue-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* List of Policy Cards */}
            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {filteredSections.length > 0 ? (
                  filteredSections.map((sec) => {
                    const Icon = sec.icon;
                    return (
                      <motion.div
                        id={sec.id}
                        key={sec.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 relative scroll-mt-28"
                      >
                        {/* Section Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800/80">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                              <Icon className="w-6 h-6" />
                            </div>
                            <div>
                              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                                {sec.title}
                              </h2>
                            </div>
                          </div>
                          <div>
                            <span className="inline-block px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full border border-slate-200 dark:border-slate-700">
                              {sec.badge}
                            </span>
                          </div>
                        </div>

                        {/* Human Friendly Summary Box */}
                        <div className="mb-6 p-4 rounded-xl bg-blue-50/40 dark:bg-blue-500/5 border border-blue-100/40 dark:border-blue-500/10 text-sm italic text-slate-600 dark:text-slate-400 leading-relaxed">
                          <strong className="text-blue-600 dark:text-blue-400 font-bold not-italic block mb-1">
                            💡 Simple Summary
                          </strong>
                          {sec.summary}
                        </div>

                        {/* Core Content */}
                        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed space-y-4 text-sm md:text-base">
                          {sec.content}
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm"
                  >
                    <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                      No matches found
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-sm">
                      We couldn't find any legal sections matching "
                      {searchQuery}". Try searching for ownership, billing,
                      liability, or updates.
                    </p>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      Clear Search
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick FAQs section */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Frequently Asked Questions
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                Fast, straightforward answers to key terms of service.
              </p>
              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/30 dark:bg-slate-900/10"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between gap-4 p-4 text-left font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer"
                      >
                        <span className="text-sm md:text-base">{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                        )}
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 leading-relaxed">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
