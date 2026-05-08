"use client";

import { useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { topicService } from "@/services/topic.service";
import { aiService } from "@/services/ai.service";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Brain,
  MessageCircle,
  Users,
} from "lucide-react";

// Study tab components
import StudyGuideTab from "@/components/study/StudyGuideTab";
import QuizTab from "@/components/study/QuizTab";
import ChatTab from "@/components/study/ChatTab";

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
] as const;

export default function StudySessionPage() {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState<string>("guide");
  const [sessionCreated, setSessionCreated] = useState(false);

  // Fetch topic data
  const { data, isLoading } = useQuery({
    queryKey: ["topic", slug],
    queryFn: () => topicService.getTopicBySlug(slug),
    enabled: !!slug,
  });

  const topic = data?.data;

  // Create study session on page load
  const { mutate: createSession } = useMutation({
    mutationFn: (topicId: string) => aiService.createStudySession(topicId),
    onSuccess: () => setSessionCreated(true),
    onError: () => setSessionCreated(true), // Don't block the UI on error
  });

  useEffect(() => {
    if (topic?.id && !sessionCreated) {
      createSession(topic.id);
    }
  }, [topic?.id, sessionCreated, createSession]);

  // Fetch related topics ("What to Study Next")
  const { data: relatedData } = useQuery({
    queryKey: ["related-topics", topic?.id],
    queryFn: () =>
      topicService.getTopics({
        category: topic?.category,
        limit: 4,
        sort: "popular",
      }),
    enabled: !!topic?.id,
  });

  const relatedTopics = relatedData?.data?.filter(
    (t: any) => t.id !== topic?.id
  )?.slice(0, 4);

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
            <StudyGuideTab
              topicId={topic.id}
              topicTitle={topic.title}
              difficulty={topic.difficulty}
            />
          )}

          {activeTab === "quiz" && (
            <QuizTab
              topicId={topic.id}
              topicTitle={topic.title}
              difficulty={topic.difficulty}
            />
          )}

          {activeTab === "chat" && (
            <ChatTab
              topicId={topic.id}
              topicTitle={topic.title}
              difficulty={topic.difficulty}
            />
          )}
        </motion.div>

        {/* What to Study Next Section */}
        {relatedTopics && relatedTopics.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              What to Study Next
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedTopics.map((related: any) => (
                <Link
                  key={related.id}
                  href={`/explore/${related.slug}`}
                  className="group block"
                >
                  <div className="bg-card border border-border rounded-xl p-4 hover:shadow-lg hover:border-blue-500/30 transition-all h-full">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
                        {related.category}
                      </span>
                      <span className="text-xs font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                        {related.difficulty}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                      {related.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {related.studyCount} learners
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
