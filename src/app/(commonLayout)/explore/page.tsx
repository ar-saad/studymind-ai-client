"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { topicService, type GetTopicsParams } from "@/services/topic.service";
import { TopicCard, TopicCardSkeleton } from "@/components/explore/TopicCard";
import CreateTopicModal from "@/components/explore/CreateTopicModal";
import { Search, X, SlidersHorizontal, ChevronDown, Plus, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const difficulties = ["Beginner", "Intermediate", "Advanced"];
const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "alphabetical", label: "Alphabetical" },
] as const;

export default function ExploreTopicsPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [sort, setSort] = useState<GetTopicsParams["sort"]>("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ["topic-categories"],
    queryFn: topicService.getCategories,
  });

  // Infinite query for topics
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["topics", debouncedSearch, category, difficulty, sort],
    queryFn: ({ pageParam = 1 }) =>
      topicService.getTopics({
        page: pageParam,
        limit: 12,
        search: debouncedSearch || undefined,
        category: category || undefined,
        difficulty: difficulty || undefined,
        sort,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  // Intersection observer for infinite scroll
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  const allTopics = data?.pages.flatMap((page) => page.data) || [];
  const totalCount = data?.pages[0]?.meta?.total || 0;

  const hasActiveFilters = category || difficulty;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Explore Topics
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover what you can learn next with StudyMind AI. Browse{" "}
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              {totalCount}
            </span>{" "}
            topics across multiple categories.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search topics..."
                className="w-full pl-12 pr-10 py-3 text-base bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as GetTopicsParams["sort"])}
                className="appearance-none h-full px-4 pr-10 py-3 bg-card border border-border rounded-xl text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                hasActiveFilters
                  ? "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                  {(category ? 1 : 0) + (difficulty ? 1 : 0)}
                </span>
              )}
            </button>
          </div>

          {/* Expandable Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-card border border-border rounded-xl p-5 space-y-4">
                  {/* Category */}
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">
                      Category
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setCategory("")}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                          !category
                            ? "bg-blue-600 text-white"
                            : "bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        All
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setCategory(cat === category ? "" : cat)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                            category === cat
                              ? "bg-blue-600 text-white"
                              : "bg-muted text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Difficulty */}
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">
                      Difficulty
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setDifficulty("")}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                          !difficulty
                            ? "bg-blue-600 text-white"
                            : "bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        All
                      </button>
                      {difficulties.map((d) => (
                        <button
                          key={d}
                          onClick={() => setDifficulty(d === difficulty ? "" : d)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                            difficulty === d
                              ? "bg-blue-600 text-white"
                              : "bg-muted text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clear filters */}
                  {hasActiveFilters && (
                    <button
                      onClick={() => {
                        setCategory("");
                        setDifficulty("");
                      }}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Topic Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 12 }).map((_, i) => (
              <TopicCardSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              Failed to load topics. Please try again later.
            </p>
          </div>
        ) : allTopics.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl font-semibold text-foreground mb-2">
              No topics found
            </p>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filters, or create a new topic.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {allTopics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.05, 0.5) }}
                >
                  <TopicCard topic={topic} />
                </motion.div>
              ))}
            </div>

            {/* Infinite scroll trigger */}
            {hasNextPage && (
              <div
                ref={lastElementRef}
                className="flex justify-center py-10"
              >
                {isFetchingNextPage && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm">Loading more topics...</span>
                  </div>
                )}
              </div>
            )}

            {!hasNextPage && allTopics.length > 0 && (
              <p className="text-center text-muted-foreground text-sm py-8">
                You&apos;ve reached the end — {totalCount} topics total
              </p>
            )}
          </>
        )}

        {/* Create New Topic Card — always visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <div className="bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 border border-dashed border-blue-500/30 rounded-2xl p-8 text-center hover:border-blue-500/50 transition-all">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
              <Plus className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              Can&apos;t find what you&apos;re looking for?
            </h3>
            <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">
              Create a new topic and the AI will build a study guide, quiz, and
              more for it.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4" />
              Create New Topic
            </button>
          </div>
        </motion.div>

        {/* Create Topic Modal */}
        <CreateTopicModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      </div>
    </div>
  );
}

