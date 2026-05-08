"use client";

import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { BookOpen, Trophy, TrendingUp, Zap, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: userService.getDashboard,
  });

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 bg-muted rounded w-1/3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 bg-muted rounded-xl" />
          ))}
        </div>
        <div className="h-64 bg-muted rounded-xl" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Welcome back, {data.user.name?.split(" ")[0]}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Here&apos;s an overview of your learning journey
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                data.user.plan === "PRO"
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                  : "bg-slate-100 text-slate-600 dark:bg-slate-500/20 dark:text-slate-400"
              }`}
            >
              {data.user.plan === "PRO" ? "✨ Pro Plan" : "Free Plan"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatsCard
          title="Topics Studied"
          value={data.stats.topicsStudied}
          icon={<BookOpen className="w-5 h-5" />}
        />
        <StatsCard
          title="Quizzes Taken"
          value={data.stats.quizzesTaken}
          icon={<Trophy className="w-5 h-5" />}
        />
        <StatsCard
          title="Average Score"
          value={`${data.stats.averageScore}%`}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <StatsCard
          title="Daily Generations"
          value={`${data.stats.dailyGenerationsUsed} / ${data.stats.dailyLimit}`}
          icon={<Zap className="w-5 h-5" />}
          subtitle="Resets daily at midnight"
        />
      </motion.div>

      {/* Quick Actions + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Button
              asChild
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg justify-start h-11"
            >
              <Link href="/explore" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Start New Topic
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full rounded-lg justify-start h-11"
            >
              <Link href="/dashboard/progress" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                View Progress
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full rounded-lg justify-start h-11"
            >
              <Link href="/dashboard/quiz-results" className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Quiz Results
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Recent Activity
            </h2>
            <Link
              href="/dashboard/study-history"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {data.recentActivity.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>No study sessions yet. Start exploring topics!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {data.recentActivity.map((activity) => (
                <Link
                  key={activity.id}
                  href={`/explore/${activity.topic.slug}`}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {activity.topic.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.topic.category} •{" "}
                      {new Date(activity.startedAt).toLocaleDateString()}
                    </p>
                  </div>
                  {activity.guideGenerated && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">
                      Guide ✓
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
