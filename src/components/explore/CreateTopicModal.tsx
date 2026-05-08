"use client";

import { useState, useEffect, useCallback } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { aiService } from "@/services/ai.service";
import { topicService } from "@/services/topic.service";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  Loader2,
  AlertTriangle,
  Plus,
  Search,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface CreateTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const difficulties = ["Beginner", "Intermediate", "Advanced"] as const;

export default function CreateTopicModal({
  isOpen,
  onClose,
}: CreateTopicModalProps) {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState<string>("Beginner");
  const [validationErrors, setValidationErrors] = useState<{
    description?: string;
    difficulty?: string;
  }>({});
  const [debouncedDesc, setDebouncedDesc] = useState("");
  const [suggestedTopic, setSuggestedTopic] = useState<{
    title: string;
    slug: string;
  } | null>(null);

  // Debounce description for duplicate check
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedDesc(description);
    }, 500);
    return () => clearTimeout(timer);
  }, [description]);

  // Client-side duplicate check
  useEffect(() => {
    if (debouncedDesc.length < 20) {
      setSuggestedTopic(null);
      return;
    }

    // Extract keywords (min 3 chars, skip stop words)
    const stopWords = new Set([
      "the", "a", "an", "is", "are", "was", "were", "be", "been", "being",
      "have", "has", "had", "do", "does", "did", "will", "would", "shall",
      "should", "may", "might", "can", "could", "of", "in", "to", "for",
      "with", "on", "at", "by", "from", "and", "or", "but", "not", "this",
      "that", "it", "its", "i", "me", "my", "we", "our", "you", "your",
      "they", "them", "their", "what", "which", "who", "how", "about",
      "want", "understand", "learn", "study", "know",
    ]);

    const keywords = debouncedDesc
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length >= 3 && !stopWords.has(w))
      .slice(0, 5)
      .join(" ");

    if (keywords.length < 3) {
      setSuggestedTopic(null);
      return;
    }

    topicService
      .getTopics({ search: keywords, limit: 1 })
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const topic = res.data[0];
          // Simple word overlap check
          const descWords = new Set(debouncedDesc.toLowerCase().split(/\s+/));
          const titleWords = topic.title.toLowerCase().split(/\s+/);
          const overlap = titleWords.filter((w: string) => descWords.has(w)).length;
          const similarity = overlap / titleWords.length;

          if (similarity >= 0.5) {
            setSuggestedTopic({ title: topic.title, slug: topic.slug });
          } else {
            setSuggestedTopic(null);
          }
        } else {
          setSuggestedTopic(null);
        }
      })
      .catch(() => setSuggestedTopic(null));
  }, [debouncedDesc]);

  // Create topic mutation
  const {
    mutate: createTopic,
    isPending,
    error,
  } = useMutation({
    mutationFn: () => aiService.createTopic(description, difficulty),
    onSuccess: (data) => {
      onClose();
      setDescription("");
      setDifficulty("Beginner");
      router.push(`/explore/${data.data.slug}`);
    },
  });

  const errorMessage =
    error instanceof Error ? error.message : "Something went wrong.";
  const isRateLimited = error instanceof Error && (error as any).status === 429;

  const validate = (): boolean => {
    const errors: typeof validationErrors = {};
    if (description.length < 20) {
      errors.description = "Description must be at least 20 characters.";
    }
    if (description.length > 500) {
      errors.description = "Description must be at most 500 characters.";
    }
    if (!difficulty) {
      errors.difficulty = "Please select a difficulty level.";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    createTopic();
  };

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="bg-card border border-border rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">
                      Create New Topic
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      AI will generate a study guide, quiz, and more
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    What do you want to learn?
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setValidationErrors((prev) => ({
                        ...prev,
                        description: undefined,
                      }));
                    }}
                    placeholder="e.g. I want to understand how black holes form and what happens at the event horizon."
                    rows={4}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 resize-none transition-all"
                  />
                  <div className="flex items-center justify-between mt-1">
                    {validationErrors.description ? (
                      <p className="text-xs text-red-500">
                        {validationErrors.description}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span
                      className={`text-xs ${
                        description.length > 500
                          ? "text-red-500"
                          : "text-muted-foreground"
                      }`}
                    >
                      {description.length}/500
                    </span>
                  </div>

                  {/* Duplicate suggestion */}
                  {suggestedTopic && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 flex items-center gap-2 text-sm bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2"
                    >
                      <Search className="w-4 h-4 text-blue-500 shrink-0" />
                      <span className="text-muted-foreground">
                        Did you mean:{" "}
                        <Link
                          href={`/explore/${suggestedTopic.slug}`}
                          className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                          onClick={onClose}
                        >
                          {suggestedTopic.title}
                        </Link>
                        ?
                      </span>
                      <Link
                        href={`/explore/${suggestedTopic.slug}`}
                        onClick={onClose}
                        className="ml-auto"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
                      </Link>
                    </motion.div>
                  )}
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Preferred difficulty
                  </label>
                  <div className="flex gap-2">
                    {difficulties.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => {
                          setDifficulty(d);
                          setValidationErrors((prev) => ({
                            ...prev,
                            difficulty: undefined,
                          }));
                        }}
                        className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                          difficulty === d
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-muted/30 text-muted-foreground border-border hover:border-blue-500/30 hover:text-foreground"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                  {validationErrors.difficulty && (
                    <p className="text-xs text-red-500 mt-1">
                      {validationErrors.difficulty}
                    </p>
                  )}
                </div>

                {/* Error Display */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-2 text-sm rounded-xl px-4 py-3 border ${
                      isRateLimited
                        ? "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400"
                        : "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400"
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 text-white font-medium py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/20"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating Topic...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate Topic
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
