"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { topicService } from "@/services/topic.service";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BookOpen,
  Star,
  Trophy,
  ArrowLeft,
  Clock,
  Sparkles,
  Users,
  GraduationCap,
  List,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const difficultyColors: Record<string, string> = {
  Beginner:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
  Intermediate:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
  Advanced: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
};

const tabs = ["Overview", "Key Concepts", "Reviews"] as const;

export default function TopicDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Overview");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["topic", slug],
    queryFn: () => topicService.getTopicBySlug(slug),
    enabled: !!slug,
  });

  const topic = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-6" />
          <div className="h-12 bg-muted rounded w-2/3 mb-4" />
          <div className="flex gap-3 mb-8">
            <div className="h-7 bg-muted rounded-full w-20" />
            <div className="h-7 bg-muted rounded-full w-24" />
          </div>
          <div className="h-48 bg-muted rounded-xl mb-8" />
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-5/6" />
            <div className="h-4 bg-muted rounded w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !topic) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-2">Topic not found</h2>
          <p className="text-muted-foreground mb-6">
            The topic you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild>
            <Link href="/explore">Back to Explore</Link>
          </Button>
        </div>
      </div>
    );
  }

  const avgRating =
    topic.reviews && topic.reviews.length > 0
      ? (
          topic.reviews.reduce((sum, r) => sum + r.rating, 0) /
          topic.reviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        {/* Back button */}
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Explore
        </Link>

        {/* Topic Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full ${
                difficultyColors[topic.difficulty] ||
                "bg-muted text-muted-foreground"
              }`}
            >
              {topic.difficulty}
            </span>
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">
              {topic.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {topic.title}
          </h1>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              {topic.studyCount.toLocaleString()} students
            </span>
            {topic._count?.quizResults !== undefined && (
              <span className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4" />
                {topic._count.quizResults} quizzes taken
              </span>
            )}
            {avgRating && (
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400" />
                {avgRating} ({topic._count?.reviews} reviews)
              </span>
            )}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-6 md:p-8 mb-8 text-white"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                <GraduationCap className="w-6 h-6" />
                Ready to study this topic?
              </h2>
              <p className="text-white/80">
                Get an AI-generated study guide, take a quiz, and track your
                progress.
              </p>
            </div>
            <Button
              asChild
              className="bg-white text-blue-600 hover:bg-white/90 font-semibold px-6 py-5 rounded-xl shadow-lg whitespace-nowrap"
            >
              <Link
                href={`/study/${topic.slug}`}
                className="flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Start Studying
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="border-b border-border mb-6">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="topic-tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "Overview" && (
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  About This Topic
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {topic.description}
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <List className="w-5 h-5 text-blue-500" />
                  What You&apos;ll Learn
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Comprehensive overview and key concepts
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Important facts, dates, and figures
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Common misconceptions debunked
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Interactive quiz to test your understanding
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    AI-powered doubt solver for follow-up questions
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "Key Concepts" && (
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-500" />
                Key Concepts
              </h3>
              <p className="text-muted-foreground">
                Key concepts will be generated when you start a study session.
                Our AI creates a personalized study guide tailored to the{" "}
                <strong>{topic.difficulty.toLowerCase()}</strong> difficulty
                level.
              </p>
              <Button
                asChild
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                <Link href={`/study/${topic.slug}`}>
                  Start Session to See Key Concepts
                </Link>
              </Button>
            </div>
          )}

          {activeTab === "Reviews" && (
            <div className="space-y-4">
              {topic.reviews && topic.reviews.length > 0 ? (
                topic.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-card border border-border rounded-xl p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-sm shrink-0">
                        {review.user.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-foreground">
                            {review.user.name}
                          </p>
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-muted-foreground/30"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        {review.comment && (
                          <p className="text-sm text-muted-foreground">
                            {review.comment}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground/60 mt-2">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-card border border-border rounded-xl">
                  <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
                  <p className="text-muted-foreground">
                    No reviews yet. Be the first to study this topic and leave a
                    review!
                  </p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
