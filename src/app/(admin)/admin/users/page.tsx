"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService, type AdminUser } from "@/services/admin.service";
import { DataTable, type Column } from "@/components/dashboard/DataTable";
import { Pagination } from "@/components/dashboard/Pagination";
import { Button } from "@/components/ui/button";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";

export default function AdminUsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("");
  
  // Confirmation state
  const [confirmData, setConfirmData] = useState<{
    userId: string;
    userName: string;
    action: "UPGRADE" | "DOWNGRADE" | "DELETE";
  } | null>(null);

  const limit = 20;
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-users", page, search, planFilter],
    queryFn: () => adminService.getUsers({ page, limit, search: search || undefined, plan: planFilter || undefined }),
  });

  const planMutation = useMutation({
    mutationFn: ({ userId, plan }: { userId: string; plan: "FREE" | "PRO" }) =>
      adminService.updateUserPlan(userId, plan),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: adminService.deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
  });

  const columns: Column<AdminUser>[] = [
    { key: "name", header: "Name", sortable: true, render: (row) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-xs shrink-0">
          {row.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-medium text-foreground text-sm">{row.name}</p>
          <p className="text-xs text-muted-foreground">{row.email}</p>
        </div>
      </div>
    )},
    { key: "plan", header: "Plan", sortable: true, render: (row) => (
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${row.plan === "PRO" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-slate-50 text-slate-600 dark:bg-slate-500/10 dark:text-slate-400"}`}>{row.plan}</span>
    )},
    { key: "role", header: "Role", render: (row) => (
      <span className="text-sm text-muted-foreground">{row.role}</span>
    )},
    { key: "dailyGenerations", header: "Generations", sortable: true },
    { key: "createdAt", header: "Joined", sortable: true, render: (row) => (
      <span className="text-sm text-muted-foreground">{new Date(row.createdAt).toLocaleDateString()}</span>
    )},
    { key: "actions", header: "Actions", render: (row) => (
      <div className="flex items-center gap-2">
        <Button 
          size="xs" 
          variant={row.plan === "PRO" ? "outline" : "default"}
          loading={planMutation.isPending && planMutation.variables?.userId === row.id}
          onClick={() => setConfirmData({ 
            userId: row.id, 
            userName: row.name || "User", 
            action: row.plan === "PRO" ? "DOWNGRADE" : "UPGRADE" 
          })}
          className={row.plan === "PRO" ? "" : "bg-blue-600 text-white hover:bg-blue-700"}>
          {row.plan === "PRO" ? "Downgrade" : "Upgrade"}
        </Button>
        <Button 
          size="xs" 
          variant="destructive" 
          loading={deleteMutation.isPending && deleteMutation.variables === row.id}
          onClick={() => setConfirmData({ 
            userId: row.id, 
            userName: row.name || "User", 
            action: "DELETE" 
          })}
        >
          Delete
        </Button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">User Management</h1>
        <p className="text-muted-foreground mt-1">Manage platform users</p>
      </div>
      <DataTable columns={columns} data={data?.data || []} searchable searchPlaceholder="Search by name or email..."
        isLoading={isLoading} emptyMessage="No users found."
        onSearch={(q) => { setSearch(q); setPage(1); }}
        filterSlot={
          <select value={planFilter} onChange={(e) => { setPlanFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 text-sm bg-card border border-border rounded-lg focus:outline-none">
            <option value="">All Plans</option>
            <option value="FREE">Free</option>
            <option value="PRO">Pro</option>
          </select>
        }
      />
      {data?.meta && (
        <Pagination currentPage={data.meta.page} totalPages={data.meta.totalPages} totalItems={data.meta.total} pageSize={limit} onPageChange={setPage} />
      )}

      <ConfirmationDialog
        isOpen={!!confirmData}
        onClose={() => setConfirmData(null)}
        onConfirm={() => {
          if (!confirmData) return;
          if (confirmData.action === "DELETE") {
            deleteMutation.mutate(confirmData.userId, {
              onSuccess: () => setConfirmData(null)
            });
          } else {
            planMutation.mutate({ 
              userId: confirmData.userId, 
              plan: confirmData.action === "UPGRADE" ? "PRO" : "FREE" 
            }, {
              onSuccess: () => setConfirmData(null)
            });
          }
        }}
        title={
          confirmData?.action === "DELETE" ? "Delete User" :
          confirmData?.action === "UPGRADE" ? "Upgrade to Pro" : "Downgrade to Free"
        }
        description={
          confirmData?.action === "DELETE" ? `Are you sure you want to delete ${confirmData.userName}? This action cannot be undone.` :
          confirmData?.action === "UPGRADE" ? `Are you sure you want to upgrade ${confirmData.userName} to Pro?` :
          `Are you sure you want to downgrade ${confirmData?.userName} to Free?`
        }
        confirmText={
          confirmData?.action === "DELETE" ? "Delete" :
          confirmData?.action === "UPGRADE" ? "Upgrade" : "Downgrade"
        }
        variant={confirmData?.action === "DELETE" ? "destructive" : "default"}
        isLoading={planMutation.isPending || deleteMutation.isPending}
      />
    </div>
  );
}
