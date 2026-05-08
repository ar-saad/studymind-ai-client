"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { DataTable, type Column } from "@/components/dashboard/DataTable";
import { Pagination } from "@/components/dashboard/Pagination";

interface QuizResultRow {
  id: string;
  score: number;
  totalQuestions: number;
  timeTaken: number;
  passed: boolean;
  completedAt: string;
  topic: { title: string; slug: string; category: string };
}

const columns: Column<QuizResultRow>[] = [
  {
    key: "topic",
    header: "Topic",
    sortable: true,
    render: (row) => (
      <div>
        <p className="font-medium text-foreground">{row.topic.title}</p>
        <p className="text-xs text-muted-foreground">{row.topic.category}</p>
      </div>
    ),
  },
  {
    key: "score",
    header: "Score",
    sortable: true,
    render: (row) => {
      const pct = Math.round((row.score / row.totalQuestions) * 100);
      return (
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${pct >= 70 ? "bg-emerald-500" : pct >= 40 ? "bg-amber-500" : "bg-red-500"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-sm font-medium">{pct}%</span>
        </div>
      );
    },
  },
  {
    key: "timeTaken",
    header: "Time",
    sortable: true,
    render: (row) => {
      const mins = Math.floor(row.timeTaken / 60);
      const secs = row.timeTaken % 60;
      return <span className="text-sm text-muted-foreground">{mins}m {secs}s</span>;
    },
  },
  {
    key: "passed",
    header: "Result",
    render: (row) => (
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${row.passed ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"}`}>
        {row.passed ? "Passed" : "Failed"}
      </span>
    ),
  },
  {
    key: "completedAt",
    header: "Date",
    sortable: true,
    render: (row) => <span className="text-sm text-muted-foreground">{new Date(row.completedAt).toLocaleDateString()}</span>,
  },
];

export default function QuizResultsPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["quiz-results", page],
    queryFn: () => userService.getQuizResults({ page, limit }),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Quiz Results</h1>
        <p className="text-muted-foreground mt-1">Review your quiz performance</p>
      </div>
      <DataTable columns={columns} data={data?.data || []} searchable searchPlaceholder="Search by topic..." clientSide isLoading={isLoading} emptyMessage="No quiz results yet." />
      {data?.meta && (
        <Pagination currentPage={data.meta.page} totalPages={data.meta.totalPages} totalItems={data.meta.total} pageSize={limit} onPageChange={setPage} />
      )}
    </div>
  );
}
