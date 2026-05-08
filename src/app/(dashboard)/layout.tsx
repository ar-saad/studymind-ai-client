"use client";

import {
  DashboardSidebar,
  userDashboardLinks,
} from "@/components/dashboard/DashboardSidebar";
import { useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();

  // Show loading state while checking auth
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect("/login");
  }

  // Redirect admins to admin dashboard
  if ((session.user as any).role?.toLowerCase() === "admin") {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar
        links={userDashboardLinks}
        title="Dashboard"
        user={{
          name: session.user.name || "User",
          email: session.user.email,
          plan: (session.user as any).plan || "FREE",
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
