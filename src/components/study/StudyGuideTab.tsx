"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { aiService, StudyGuideData } from "@/services/ai.service";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  RefreshCw,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  Loader2,
} from "lucide-react";

interface StudyGuideTabProps {
  topicId: string;
  topicTitle: string;
  difficulty: string;
  /** Study guide data lifted from parent — persists across tab switches */
  studyGuide: StudyGuideData | null;
  /** Callback to update the parent when a new guide is generated */
  onStudyGuideGenerated: (guide: StudyGuideData) => void;
}

export default function StudyGuideTab({
  topicId,
  topicTitle,
  difficulty,
  studyGuide,
  onStudyGuideGenerated,
}: StudyGuideTabProps) {
  const [generationsUsed, setGenerationsUsed] = useState<number>(0);
  const [limit, setLimit] = useState<number | string>("...");

  const {
    mutate: generateGuide,
    isPending,
    error,
  } = useMutation({
    mutationFn: () => aiService.generateStudyGuide(topicId, difficulty),
    onSuccess: (data) => {
      onStudyGuideGenerated(data.guide);
      setGenerationsUsed(data.usage.generationsUsed);
      setLimit(data.usage.limit);
    },
  });

  // Error message extraction
  const errorMessage =
    error instanceof Error ? error.message : "Failed to generate study guide.";

  // ─── Empty State ─────────────────────────────────────────────────
  if (!studyGuide && !isPending && !error) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 md:p-8 min-h-100">
        <div className="text-center py-16">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
            <BookOpen className="relative w-16 h-16 text-blue-500/60" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            AI Study Guide
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Generate a comprehensive, AI-powered study guide for{" "}
            <span className="font-medium text-foreground">{topicTitle}</span>{" "}
            tailored to {difficulty.toLowerCase()} level.
          </p>
          <button
            onClick={() => generateGuide()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 inline mr-2" />
            Generate Study Guide
          </button>
        </div>
      </div>
    );
  }

  // ─── Loading State ───────────────────────────────────────────────
  if (isPending) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 md:p-8 min-h-100">
        <div className="space-y-6 animate-pulse">
          {/* Skeleton header */}
          <div className="flex items-center justify-between">
            <div className="h-7 bg-muted rounded-lg w-48" />
            <div className="h-8 bg-muted rounded-full w-36" />
          </div>
          {/* Skeleton overview */}
          <div className="space-y-3">
            <div className="h-5 bg-muted rounded w-32" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-5/6" />
            <div className="h-4 bg-muted rounded w-4/6" />
          </div>
          {/* Skeleton key concepts */}
          <div className="space-y-3">
            <div className="h-5 bg-muted rounded w-40" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="h-3 bg-muted rounded w-full" />
                <div className="h-3 bg-muted rounded w-4/5" />
              </div>
            ))}
          </div>
          {/* Skeleton facts */}
          <div className="space-y-3">
            <div className="h-5 bg-muted rounded w-44" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 bg-muted rounded w-full" />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-8 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">Generating your study guide...</span>
        </div>
      </div>
    );
  }

  // ─── Error State ─────────────────────────────────────────────────
  if (error && !studyGuide) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 md:p-8 min-h-100">
        <div className="text-center py-16">
          <AlertTriangle className="w-16 h-16 mx-auto text-red-500/60 mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Generation Failed
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {errorMessage}
          </p>
          <button
            onClick={() => generateGuide()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-colors"
          >
            <RefreshCw className="w-4 h-4 inline mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ─── Guide Content ───────────────────────────────────────────────
  if (!studyGuide) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-6 md:p-8"
    >
      {/* Header with regenerate + counter */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-500" />
          Study Guide
        </h2>
        <div className="flex items-center gap-3">
          {typeof limit === "number" && (
            <span className="text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-full">
              {generationsUsed} of {limit} daily generations used
            </span>
          )}
          <button
            onClick={() => generateGuide()}
            disabled={isPending}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isPending ? "animate-spin" : ""}`}
            />
            Regenerate
          </button>
        </div>
      </div>

      {/* Overview Section */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
            📖
          </span>
          Overview
        </h3>
        <div className="text-muted-foreground leading-relaxed whitespace-pre-line pl-10">
          {studyGuide.overview}
        </div>
      </section>

      {/* Key Concepts Section */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-purple-500" />
          </span>
          Key Concepts
        </h3>
        <div className="grid gap-3 pl-10">
          {studyGuide.keyConcepts.map((concept, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-muted/30 border border-border/50 rounded-xl p-4 hover:bg-muted/50 transition-colors"
            >
              <h4 className="font-semibold text-foreground mb-1">
                {concept.term}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {concept.explanation}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Important Facts Section */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </span>
          Important Facts
        </h3>
        <ul className="space-y-2 pl-10">
          {studyGuide.importantFacts.map((fact, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-start gap-3 text-muted-foreground"
            >
              <span className="mt-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
              <span className="leading-relaxed">{fact}</span>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Common Misconceptions Section */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </span>
          Common Misconceptions
        </h3>
        <div className="space-y-3 pl-10">
          {studyGuide.commonMisconceptions.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-muted/30 border border-border/50 rounded-xl p-4"
            >
              <div className="flex items-start gap-2 mb-2">
                <span className="text-red-500 font-semibold text-sm shrink-0 mt-0.5">
                  ✗ Myth:
                </span>
                <span className="text-muted-foreground text-sm">
                  {item.myth}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-500 font-semibold text-sm shrink-0 mt-0.5">
                  ✓ Reality:
                </span>
                <span className="text-muted-foreground text-sm">
                  {item.reality}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Summary Section */}
      <section>
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
            📝
          </span>
          Summary
        </h3>
        <div className="bg-linear-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/10 rounded-xl p-5 pl-10">
          <p className="text-muted-foreground leading-relaxed">
            {studyGuide.summary}
          </p>
        </div>
      </section>
    </motion.div>
  );
}
