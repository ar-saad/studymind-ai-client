"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { DataTable, type Column } from "@/components/dashboard/DataTable";
import { Pagination } from "@/components/dashboard/Pagination";
import { Star } from "lucide-react";
import { ReviewDialog } from "@/components/study/ReviewDialog";

interface StudySessionRow {
  id: string;
  topic: {
    id: string;
    title: string;
    slug: string;
    category: string;
    difficulty: string;
    reviews?: Array<{ id: string; rating: number; comment?: string | null }>;
  };
  startedAt: string;
  completedAt: string | null;
  guideGenerated: boolean;
}

export default function StudyHistoryPage() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const limit = 10;

  const [selectedTopic, setSelectedTopic] = useState<{ id: string; title: string } | null>(null);
  const [existingReview, setExistingReview] = useState<{ id?: string; rating: number; comment?: string | null } | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["study-history", page, category],
    queryFn: () =>
      userService.getStudyHistory({
        page,
        limit,
        ...(category && { category }),
      }),
  });

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
    {
      key: "actions",
      header: "Actions",
      render: (row) => {
        const hasReview = row.topic.reviews && row.topic.reviews.length > 0;
        const review = hasReview ? row.topic.reviews![0] : null;

        return (
          <div className="flex items-center gap-2">
            {row.completedAt ? (
              <button
                onClick={() => {
                  setSelectedTopic({ id: row.topic.id, title: row.topic.title });
                  setExistingReview(review);
                  setIsReviewOpen(true);
                }}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors ${
                  hasReview
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20"
                    : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-sm"
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${hasReview ? "fill-current" : ""}`} />
                {hasReview ? `⭐ ${review!.rating}/5` : "Review"}
              </button>
            ) : (
              <span className="text-xs text-muted-foreground italic">In progress</span>
            )}
          </div>
        );
      },
    },
  ];

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

      {selectedTopic && (
        <ReviewDialog
          isOpen={isReviewOpen}
          onClose={() => {
            setIsReviewOpen(false);
            setSelectedTopic(null);
            setExistingReview(null);
          }}
          topicId={selectedTopic.id}
          topicTitle={selectedTopic.title}
          existingReview={existingReview}
          onSuccess={refetch}
        />
      )}
    </div>
  );
}
