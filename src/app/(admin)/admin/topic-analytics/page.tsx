"use client";

import { useQuery } from "@tanstack/react-query";
import { adminService, type TopicAnalytics } from "@/services/admin.service";
import { DataTable, type Column } from "@/components/dashboard/DataTable";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const columns: Column<TopicAnalytics>[] = [
  { key: "title", header: "Topic", sortable: true, render: (row) => (
    <div>
      <p className="font-medium text-foreground text-sm">{row.title}</p>
      <p className="text-xs text-muted-foreground">{row.category}</p>
    </div>
  )},
  { key: "difficulty", header: "Difficulty", render: (row) => (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
      row.difficulty === "Beginner" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" :
      row.difficulty === "Intermediate" ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400" :
      "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
    }`}>{row.difficulty}</span>
  )},
  { key: "studyCount", header: "Study Count", sortable: true },
  { key: "totalSessions", header: "Sessions", sortable: true },
  { key: "totalQuizzes", header: "Quizzes", sortable: true },
  { key: "averageQuizScore", header: "Avg Score", sortable: true, render: (row) => (
    <span className="text-sm">{row.averageQuizScore !== null ? `${row.averageQuizScore}%` : "—"}</span>
  )},
];

export default function TopicAnalyticsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-topic-analytics"],
    queryFn: () => adminService.getTopicAnalytics(),
  });

  const top10 = (data || []).slice(0, 10);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Topic Analytics</h1>
        <p className="text-muted-foreground mt-1">View topic usage statistics</p>
      </div>

      {/* Top 10 chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4">Top 10 Most Studied Topics</h3>
        {top10.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={top10} layout="vertical" margin={{ left: 100 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
              <YAxis dataKey="title" type="category" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" width={100} />
              <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Bar dataKey="studyCount" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-muted-foreground py-12">No data yet</p>
        )}
      </motion.div>

      <DataTable columns={columns} data={data || []} searchable searchPlaceholder="Search topics..."
        clientSide isLoading={isLoading} emptyMessage="No topic data." />
    </div>
  );
}
