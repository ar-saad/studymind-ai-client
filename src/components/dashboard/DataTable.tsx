"use client";

import { useState, useMemo } from "react";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Search,
  X,
} from "lucide-react";

// ────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────
export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchable?: boolean;
  searchPlaceholder?: string;
  /** External filter controls rendered above the table */
  filterSlot?: React.ReactNode;
  /** If true, sorting and filtering are done locally (client-side) */
  clientSide?: boolean;
  /** Server-side sort callback */
  onSort?: (key: string, direction: "asc" | "desc") => void;
  /** Server-side search callback */
  onSearch?: (query: string) => void;
  /** Loading state */
  isLoading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
}

type SortDirection = "asc" | "desc" | null;

// ────────────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────────────
export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  searchable = false,
  searchPlaceholder = "Search...",
  filterSlot,
  clientSide = false,
  onSort,
  onSearch,
  isLoading = false,
  emptyMessage = "No data found.",
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle column header click for sorting
  const handleSort = (key: string) => {
    let newDir: SortDirection;
    if (sortKey === key) {
      newDir = sortDir === "asc" ? "desc" : sortDir === "desc" ? null : "asc";
    } else {
      newDir = "asc";
    }

    setSortKey(newDir ? key : null);
    setSortDir(newDir);

    if (!clientSide && onSort && newDir) {
      onSort(key, newDir);
    }
  };

  // Handle search
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (!clientSide && onSearch) {
      onSearch(value);
    }
  };

  // Client-side filtering & sorting
  const processedData = useMemo(() => {
    if (!clientSide) return data;

    let result = [...data];

    // Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((row) =>
        columns.some((col) => {
          const val = row[col.key];
          return val && String(val).toLowerCase().includes(q);
        })
      );
    }

    // Sort
    if (sortKey && sortDir) {
      result.sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        if (aVal == null && bVal == null) return 0;
        if (aVal == null) return 1;
        if (bVal == null) return -1;

        const comparison =
          typeof aVal === "number"
            ? aVal - bVal
            : String(aVal).localeCompare(String(bVal));

        return sortDir === "asc" ? comparison : -comparison;
      });
    }

    return result;
  }, [data, searchQuery, sortKey, sortDir, clientSide, columns]);

  const getSortIcon = (key: string) => {
    if (sortKey !== key)
      return <ChevronsUpDown className="w-4 h-4 text-muted-foreground/50" />;
    if (sortDir === "asc")
      return <ChevronUp className="w-4 h-4 text-blue-500" />;
    return <ChevronDown className="w-4 h-4 text-blue-500" />;
  };

  return (
    <div className="space-y-4">
      {/* Search + Filters Row */}
      {(searchable || filterSlot) && (
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {searchable && (
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-9 pr-8 py-2 text-sm bg-muted/40 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-muted"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              )}
            </div>
          )}
          {filterSlot}
        </div>
      )}

      {/* Table */}
      <div className="border border-border rounded-xl overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-4 py-3 text-left font-semibold text-muted-foreground ${
                      col.sortable ? "cursor-pointer select-none hover:text-foreground transition-colors" : ""
                    } ${col.className || ""}`}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    <div className="flex items-center gap-1.5">
                      {col.header}
                      {col.sortable && getSortIcon(col.key)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                // Skeleton rows
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3">
                        <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : processedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                processedData.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`px-4 py-3 ${col.className || ""}`}
                      >
                        {col.render
                          ? col.render(row)
                          : (row[col.key] ?? "—")}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
