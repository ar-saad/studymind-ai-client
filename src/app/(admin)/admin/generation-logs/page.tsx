"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { adminService, type GenerationLog } from "@/services/admin.service";
import { DataTable, type Column } from "@/components/dashboard/DataTable";
import { Pagination } from "@/components/dashboard/Pagination";

const columns: Column<GenerationLog>[] = [
  { key: "user", header: "User", render: (row) => (
    <div>
      <p className="font-medium text-foreground text-sm">{row.user.name}</p>
      <p className="text-xs text-muted-foreground">{row.user.email}</p>
    </div>
  )},
  { key: "topic", header: "Topic", render: (row) => (
    <span className="text-sm">{row.topic?.title || "—"}</span>
  )},
  { key: "type", header: "Type", sortable: true, render: (row) => {
    const colors: Record<string, string> = {
      GUIDE: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
      QUIZ: "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
      CHAT: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
      PATH: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    };
    return <span className={`text-xs font-medium px-2 py-1 rounded-full ${colors[row.type] || ""}`}>{row.type}</span>;
  }},
  { key: "estimatedTokens", header: "Tokens", sortable: true },
  { key: "status", header: "Status", render: (row) => (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${row.status === "SUCCESS" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"}`}>{row.status}</span>
  )},
  { key: "createdAt", header: "Date", sortable: true, render: (row) => (
    <span className="text-sm text-muted-foreground">{new Date(row.createdAt).toLocaleString()}</span>
  )},
];

export default function GenerationLogsPage() {
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("");
  const limit = 20;

  const { data, isLoading } = useQuery({
    queryKey: ["admin-generation-logs", page, typeFilter],
    queryFn: () => adminService.getGenerationLogs({ page, limit, type: typeFilter || undefined }),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Generation Logs</h1>
        <p className="text-muted-foreground mt-1">Monitor AI generation events</p>
      </div>
      <DataTable columns={columns} data={data?.data || []} searchable searchPlaceholder="Search..." clientSide
        isLoading={isLoading} emptyMessage="No generation logs found."
        filterSlot={
          <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 text-sm bg-card border border-border rounded-lg focus:outline-none">
            <option value="">All Types</option>
            <option value="GUIDE">Guide</option>
            <option value="QUIZ">Quiz</option>
            <option value="CHAT">Chat</option>
            <option value="PATH">Path</option>
          </select>
        }
      />
      {data?.meta && (
        <Pagination currentPage={data.meta.page} totalPages={data.meta.totalPages} totalItems={data.meta.total} pageSize={limit} onPageChange={setPage} />
      )}
    </div>
  );
}
