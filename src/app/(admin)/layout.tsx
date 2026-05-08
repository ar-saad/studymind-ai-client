"use client";

import {
  DashboardSidebar,
  adminDashboardLinks,
} from "@/components/dashboard/DashboardSidebar";
import { useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session?.user) {
    redirect("/login");
  }

  // Check admin role
  if (
    (session.user as any).role !== "ADMIN" &&
    (session.user as any).role !== "admin"
  ) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar
        links={adminDashboardLinks}
        title="Admin"
        user={{
          name: session.user.name || "Admin",
          email: session.user.email,
          plan: "PRO",
          image: session.user.image,
        }}
      />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <DashboardNavbar />
        <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}
