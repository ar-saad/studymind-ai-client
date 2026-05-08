"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { DataTable, type Column } from "@/components/dashboard/DataTable";
import { Pagination } from "@/components/dashboard/Pagination";

interface StudySessionRow {
  id: string;
  topic: { title: string; slug: string; category: string; difficulty: string };
  startedAt: string;
  completedAt: string | null;
  guideGenerated: boolean;
}

const columns: Column<StudySessionRow>[] = [
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
    key: "difficulty",
    header: "Difficulty",
    sortable: true,
    render: (row) => {
      const colors: Record<string, string> = {
        Beginner: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400",
        Intermediate: "text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400",
        Advanced: "text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400",
      };
      return (
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${colors[row.topic.difficulty] || ""}`}>
          {row.topic.difficulty}
        </span>
      );
    },
  },
  {
    key: "startedAt",
    header: "Date",
    sortable: true,
    render: (row) => (
      <span className="text-sm text-muted-foreground">
        {new Date(row.startedAt).toLocaleDateString()}
      </span>
    ),
  },
  {
    key: "guideGenerated",
    header: "Guide",
    render: (row) => (
      <span className={`text-sm ${row.guideGenerated ? "text-emerald-500" : "text-muted-foreground"}`}>
        {row.guideGenerated ? "✓ Yes" : "No"}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <span
        className={`text-xs font-medium px-2 py-1 rounded-full ${
          row.completedAt
            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
            : "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
        }`}
      >
        {row.completedAt ? "Completed" : "In Progress"}
      </span>
    ),
  },
];

export default function StudyHistoryPage() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["study-history", page, category],
    queryFn: () =>
      userService.getStudyHistory({
        page,
        limit,
        ...(category && { category }),
      }),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Study History</h1>
        <p className="text-muted-foreground mt-1">
          Track all your study sessions
        </p>
      </div>

      <DataTable
        columns={columns}
        data={data?.data || []}
        searchable
        searchPlaceholder="Search by topic name..."
        clientSide
        isLoading={isLoading}
        emptyMessage="No study sessions found."
        filterSlot={
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">All Categories</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Arts">Arts</option>
            <option value="Health">Health</option>
          </select>
        }
      />

      {data?.meta && (
        <Pagination
          currentPage={data.meta.page}
          totalPages={data.meta.totalPages}
          totalItems={data.meta.total}
          pageSize={limit}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
