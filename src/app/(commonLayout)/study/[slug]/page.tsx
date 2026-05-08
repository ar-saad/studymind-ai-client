"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { topicService } from "@/services/topic.service";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Brain,
  MessageCircle,
  Route,
  Lock,
} from "lucide-react";

const tabs = [
  {
    key: "guide",
    label: "Study Guide",
    icon: <BookOpen className="w-4 h-4" />,
  },
  { key: "quiz", label: "Quiz", icon: <Brain className="w-4 h-4" /> },
  {
    key: "chat",
    label: "Doubt Solver",
    icon: <MessageCircle className="w-4 h-4" />,
  },
  { key: "path", label: "Learning Path", icon: <Route className="w-4 h-4" /> },
] as const;

export default function StudySessionPage() {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState<string>("guide");

  const { data, isLoading } = useQuery({
    queryKey: ["topic", slug],
    queryFn: () => topicService.getTopicBySlug(slug),
    enabled: !!slug,
  });

  const topic = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl animate-pulse">
          <div className="h-8 bg-muted rounded w-40 mb-4" />
          <div className="h-10 bg-muted rounded w-2/3 mb-6" />
          <div className="h-12 bg-muted rounded-lg mb-8" />
          <div className="h-96 bg-muted rounded-xl" />
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-2">Topic not found</h2>
          <Link href="/explore" className="text-blue-600 hover:underline">
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        {/* Back + Title */}
        <Link
          href={`/explore/${topic.slug}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to topic
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {topic.title}
        </h1>
        <p className="text-muted-foreground mb-6">
          {topic.category} • {topic.difficulty}
        </p>

        {/* Tab Navigation */}
        <div className="flex gap-1 bg-muted/50 p-1 rounded-xl mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.key === "path" && (
                <Lock className="w-3 h-3 text-amber-500" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "guide" && (
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 min-h-100">
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 mx-auto text-blue-500/30 mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  AI Study Guide
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Click the button below to generate an AI-powered study guide
                  tailored to your level.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-colors">
                  Generate Study Guide
                </button>
              </div>
            </div>
          )}

          {activeTab === "quiz" && (
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 min-h-100">
              <div className="text-center py-16">
                <Brain className="w-16 h-16 mx-auto text-purple-500/30 mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Interactive Quiz
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Test your knowledge with 10 AI-generated multiple-choice
                  questions.
                </p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-xl transition-colors">
                  Generate Quiz
                </button>
              </div>
            </div>
          )}

          {activeTab === "chat" && (
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 min-h-100">
              <div className="text-center py-16">
                <MessageCircle className="w-16 h-16 mx-auto text-emerald-500/30 mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  AI Doubt Solver
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Ask any question about {topic.title} and get AI-powered
                  answers. Chat feature coming in Day 3.
                </p>
              </div>
            </div>
          )}

          {activeTab === "path" && (
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 min-h-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-card/80 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="text-center">
                  <Lock className="w-12 h-12 mx-auto text-amber-500 mb-3" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Pro Feature
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Upgrade to Pro to access AI-generated learning paths.
                  </p>
                  <button className="bg-linear-to-r from-blue-600 to-purple-600 text-white font-medium px-6 py-3 rounded-xl transition-colors hover:opacity-90">
                    Upgrade to Pro — £9.99/month
                  </button>
                </div>
              </div>
              <div className="opacity-20">
                <Route className="w-16 h-16 mx-auto text-blue-500/30 mb-4 mt-16" />
                <h3 className="text-xl font-semibold text-center">
                  Learning Path
                </h3>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
