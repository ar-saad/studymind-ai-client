"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Eye,
  Database,
  Share2,
  Lock,
  UserCheck,
  Cookie,
  Search,
  Printer,
  Download,
  ChevronDown,
  ChevronUp,
  FileText,
  Mail,
  Clock,
  ArrowRight
} from "lucide-react";

// Types for sections
interface PolicySection {
  id: string;
  icon: React.ComponentType<any>;
  title: string;
  badge: string;
  summary: string;
  content: React.ReactNode;
}

export default function PrivacyPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("introduction");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Sections data
  const sections: PolicySection[] = useMemo(() => [
    {
      id: "introduction",
      icon: Shield,
      title: "1. Introduction & Overview",
      badge: "Our Commitment",
      summary: "We respect your privacy and are committed to protecting your personal data. This policy explains how we handle your information.",
      content: (
        <div className="space-y-4">
          <p>
            Welcome to <strong>StudyMind AI</strong>. We value your trust above all else, and we are dedicated to protecting your privacy, personal details, and the educational content you create or upload.
          </p>
          <p>
            This Privacy Policy explains how StudyMind AI collects, uses, processes, and protects your information when you access our website, use our AI-powered study aids, generate study guides, practice with quizzes, or interact with our dynamic doubt solver.
          </p>
          <p>
            By using StudyMind AI, you consent to the data practices described in this policy. If you do not agree with any part of this policy, please discontinue use of our platform.
          </p>
        </div>
      )
    },
    {
      id: "data-collection",
      icon: Eye,
      title: "2. Information We Collect",
      badge: "What We Collect",
      summary: "We collect only what is necessary to authenticate you, run our AI models, and deliver a personalized learning experience.",
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-800 dark:text-slate-200 mt-2">A. Information You Provide Directly</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Account Registration:</strong> Name, email address, password, and authentication metadata when you register via our secure login provider (Better Auth).
            </li>
            <li>
              <strong>User Content:</strong> Text inputs, study notes, topics of interest, and documents you upload to generate customized study guides, flashcards, or quizzes.
            </li>
            <li>
              <strong>Media Uploads:</strong> Files or images you upload (safely stored via our secure Cloudinary storage) to assist our visual or text-based doubt solver.
            </li>
          </ul>
          <h4 className="font-semibold text-slate-800 dark:text-slate-200 mt-2">B. Information Automatically Collected</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Usage Telemetry:</strong> Pages visited, duration of study sessions, features interacted with, and performance scores to tailor AI recommendations.
            </li>
            <li>
              <strong>Technical Data:</strong> IP address, device type, operating system, and browser preferences.
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "data-usage",
      icon: Database,
      title: "3. How We Use Your Data",
      badge: "How We Use It",
      summary: "Your data is used to customize your learning journey, process AI inquiries, and continuously improve our study tools.",
      content: (
        <div className="space-y-4">
          <p>We process your information for purposes based on legitimate educational business interests, fulfilling our services to you, and compliance with legal obligations. Specifically, we use your data to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Generate Personalized Content:</strong> Customize study guides, test questions, and conversational responses to fit your unique learning pace.
            </li>
            <li>
              <strong>Optimize AI Models:</strong> Improve our prompt engineering and service responses (inputs are isolated and never used to train public, open third-party models).
            </li>
            <li>
              <strong>Maintain Account State:</strong> Persist your generated study guides, quiz scores, and doubt solver chats across browser tabs and devices.
            </li>
            <li>
              <strong>Analyze Performance:</strong> Deliver analytics on your study dashboard, helping you visualize score progress and master topics.
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "third-parties",
      icon: Share2,
      title: "4. Sharing & Third-Party Integrations",
      badge: "Who Sees It",
      summary: "We do not sell your personal data. We only share data with essential AI, database, and auth partners required to run the application.",
      content: (
        <div className="space-y-4">
          <p>We share your data only with trusted third-party services that enable key elements of StudyMind AI:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
            <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
              <span className="font-bold text-slate-900 dark:text-white block mb-1 text-sm">AI Infrastructure</span>
              <p className="text-sm">We securely forward your prompts and uploaded files to Google Gemini API to generate response content. No personal credentials are sent.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
              <span className="font-bold text-slate-900 dark:text-white block mb-1 text-sm">Secure Storage</span>
              <p className="text-sm">We store database records on PostgreSQL via Prisma, and uploaded study materials safely on Cloudinary with full encryption.</p>
            </div>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Note: We do not permit third parties to use your personal information for marketing purposes, nor do we sell or monetize your study behavior or data.
          </p>
        </div>
      )
    },
    {
      id: "data-security",
      icon: Lock,
      title: "5. Security & Retention",
      badge: "How We Protect",
      summary: "We use advanced encryption and secure session cookies to safeguard your account. Data is kept as long as your account is active.",
      content: (
        <div className="space-y-4">
          <p>
            The security of your data is paramount to us. StudyMind AI utilizes robust security measures, including:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Encryption:</strong> SSL/TLS encryption for all data in transit and database-level encryption for critical fields.
            </li>
            <li>
              <strong>Secure Cookies:</strong> Session tokens are secured using browser-enforced cookie properties to prevent unauthorized cross-site hijacking.
            </li>
            <li>
              <strong>Retention Policy:</strong> We retain your study history and dashboard scores as long as your account is active. You can request full deletion of your account and all associated data at any time via your settings or by contacting us.
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "user-rights",
      icon: UserCheck,
      title: "6. Your Rights & Control",
      badge: "Your Control",
      summary: "You retain full control over your data, including the right to view, modify, export, or permanently delete your account information.",
      content: (
        <div className="space-y-4">
          <p>No matter where you reside globally, we recognize your fundamental rights over your data:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Access & Portability:</strong> Request an export of your created study guides, quiz history, and notes in a structured format.
            </li>
            <li>
              <strong>Correction & Modifications:</strong> Easily edit your profile details and study preferences directly on your user dashboard.
            </li>
            <li>
              <strong>Right to Erasure (Deletion):</strong> Permanently delete your account. Doing so triggers a cascade deletion across our databases, purging all related AI sessions and Cloudinary uploads.
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "cookies",
      icon: Cookie,
      title: "7. Cookies & Tracking Technologies",
      badge: "Cookies",
      summary: "We use only essential cookies for secure session authentication and saving your user preferences.",
      content: (
        <div className="space-y-4">
          <p>
            Cookies are small text files stored on your browser. StudyMind AI uses cookies responsibly and sparingly:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Essential Session Cookies:</strong> Set by Better Auth to identify you and keep you securely logged in as you study across various tools.
            </li>
            <li>
              <strong>Preference Cookies:</strong> Used to store your UI preferences, such as keeping track of whether you prefer Dark Mode or Light Mode.
            </li>
          </ul>
          <p>
            You can choose to disable cookies in your browser settings, but please note that doing so will disable secure sign-in features and break core application functionality.
          </p>
        </div>
      )
    }
  ], []);

  // Filter sections based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery) return sections;
    return sections.filter(
      (sec) =>
        sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sec.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sec.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, sections]);

  // Handle section click (smooth scroll)
  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120; // accounting for navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
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
      .map(
        (sec) =>
          `=== ${sec.title} ===\nSummary: ${sec.summary}\n\n`
      )
      .join("\n");
    const element = document.createElement("a");
    const file = new Blob([textContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "StudyMind_AI_Privacy_Policy.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Frequently Asked Questions
  const faqs = [
    {
      q: "Does StudyMind AI sell my study notes or personal data?",
      a: "Absolutely not. We never sell, trade, or monetize your personal details, uploaded study files, generated questions, or learning habits to anyone. Your data is strictly yours."
    },
    {
      q: "Is my payment information secure?",
      a: "Yes. Payment processing is handled by industry-standard third-party gateways (such as Stripe). We do not store or process raw credit card credentials on our servers."
    },
    {
      q: "Can I delete everything StudyMind AI has on me?",
      a: "Yes. In your settings, you can permanently delete your account. This instantly initiates a secure deletion process that wipes out your profile, dashboard metrics, generated guides, quizzes, and files."
    },
    {
      q: "Are my chat conversations with the AI Doubt Solver private?",
      a: "Yes. Conversations are strictly bound to your account and cannot be read or accessed by other users. They are used only to power your immediate study session."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 selection:bg-blue-500 selection:text-white pb-24">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-[600px] -z-10 overflow-hidden opacity-30 dark:opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-600/20 blur-[180px] rounded-full" />
        <div className="absolute top-[20%] left-[-15%] w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-600/20 blur-[150px] rounded-full" />
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
                <Shield className="w-3.5 h-3.5" /> Trust &amp; Safety
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
                Privacy <span className="text-blue-600 dark:text-blue-400">Policy</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                Your trust is our most valuable asset. Learn how we handle, safeguard, and secure your educational material and personal details.
              </p>

              {/* Utility Info bar */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-900 pt-6">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" /> Last Updated: May 9, 2026
                </span>
                <span className="hidden md:inline text-slate-300 dark:text-slate-800">•</span>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium cursor-pointer"
                >
                  <Printer className="w-4 h-4" /> Print Policy
                </button>
                <span className="hidden md:inline text-slate-300 dark:text-slate-800">•</span>
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
              <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-4 uppercase tracking-wider text-slate-400 dark:text-slate-500">
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
                      <Icon className={`w-4 h-4 shrink-0 transition-transform ${isAct ? "scale-110 text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300"}`} />
                      <span className="truncate">{sec.title.substring(3)}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Contact Card */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-md relative overflow-hidden group">
              <div className="absolute top-[-20%] right-[-20%] w-[120px] h-[120px] bg-white/10 blur-[20px] rounded-full group-hover:scale-125 transition-transform duration-500" />
              <Mail className="w-8 h-8 mb-4 text-blue-200" />
              <h4 className="font-bold text-lg mb-2">Have questions?</h4>
              <p className="text-sm text-blue-100 leading-relaxed mb-4">
                Our security and compliance team is always here to answer your concerns about privacy or encryption.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-1 text-sm font-semibold text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl transition-all"
              >
                Contact Privacy Team <ArrowRight className="w-4 h-4" />
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
                placeholder="Search privacy topics (e.g., 'cookies', 'AI storage', 'erasure')..."
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
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">No matches found</h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-sm">
                      We couldn't find any policy sections matching "{searchQuery}". Try searching for cookies, data, security, or contact.
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
                Fast, straightforward answers to key privacy questions.
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
