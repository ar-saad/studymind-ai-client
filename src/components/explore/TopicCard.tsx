"use client";

import Link from "next/link";
import { BookOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Topic } from "@/services/topic.service";

interface TopicCardProps {
  topic: Topic;
}

const difficultyColors: Record<string, string> = {
  Beginner:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
  Intermediate:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
  Advanced: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
};

const categoryColors: Record<string, string> = {
  Science: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
  History:
    "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400",
  Technology:
    "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400",
  Business: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-400",
  Arts: "bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-400",
  Health:
    "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
};

export function TopicCard({ topic }: TopicCardProps) {
  return (
    <div className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 flex flex-col h-full">
      {/* Top gradient accent */}
      <div className="h-1.5 bg-linear-to-r from-blue-500 to-purple-500" />

      <div className="p-5 flex flex-col flex-1">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              categoryColors[topic.category] || "bg-muted text-muted-foreground"
            }`}
          >
            {topic.category}
          </span>
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              difficultyColors[topic.difficulty] ||
              "bg-muted text-muted-foreground"
            }`}
          >
            {topic.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
          {topic.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
          {topic.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            {topic.studyCount.toLocaleString()} studied
          </span>
          {topic._count?.reviews !== undefined && topic._count.reviews > 0 && (
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400" />
              {topic._count.reviews} reviews
            </span>
          )}
        </div>

        {/* CTA */}
        <Button
          asChild
          variant="outline"
          className="w-full rounded-lg group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all"
        >
          <Link href={`/explore/${topic.slug}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
}

// Skeleton for loading state
export function TopicCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col h-full animate-pulse">
      <div className="h-1.5 bg-muted" />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex gap-2 mb-3">
          <div className="h-6 w-16 bg-muted rounded-full" />
          <div className="h-6 w-20 bg-muted rounded-full" />
        </div>
        <div className="h-6 bg-muted rounded w-3/4 mb-2" />
        <div className="space-y-2 mb-4 flex-1">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-5/6" />
          <div className="h-4 bg-muted rounded w-2/3" />
        </div>
        <div className="h-4 bg-muted rounded w-1/3 mb-4" />
        <div className="h-9 bg-muted rounded-lg w-full" />
      </div>
    </div>
  );
}
