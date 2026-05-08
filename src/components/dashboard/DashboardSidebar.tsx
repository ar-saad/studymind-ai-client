"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  TrendingUp,
  Settings,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import logo from "../../../public/icon.png";

interface SidebarLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface DashboardSidebarProps {
  links: SidebarLink[];
  title: string;
  /** User info for the bottom of sidebar */
  user?: {
    name: string;
    email: string;
    plan: string;
    image?: string | null;
  };
}

export function DashboardSidebar({
  links,
  title,
  user,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard" || href === "/admin") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo / Title */}
      <div className="px-4 h-16 border-b border-border flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="StudyMind AI" className="w-7 h-7" />
          {!collapsed && (
            <span className="font-bold text-lg text-foreground">{title}</span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
        >
          <ChevronLeft
            className={`w-4 h-4 transition-transform ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative ${
                active
                  ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 dark:bg-blue-400 rounded-r-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="shrink-0">{link.icon}</span>
              {!collapsed && <span>{link.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      {user && !collapsed && (
        <div className="px-4 py-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-sm shrink-0">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                user.name?.charAt(0).toUpperCase()
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {user.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user.plan === "PRO" ? (
                  <span className="text-emerald-500 font-medium">Pro Plan</span>
                ) : (
                  "Free Plan"
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile menu trigger */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border shadow-sm"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 ${
          collapsed ? "w-17" : "w-62.5"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}

// Pre-configured sidebar link sets
export const userDashboardLinks: SidebarLink[] = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: "Study History",
    href: "/dashboard/study-history",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    name: "Quiz Results",
    href: "/dashboard/quiz-results",
    icon: <Trophy className="w-5 h-5" />,
  },
  {
    name: "My Progress",
    href: "/dashboard/progress",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

export const adminDashboardLinks: SidebarLink[] = [
  {
    name: "Overview",
    href: "/admin",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    name: "Topic Analytics",
    href: "/admin/topic-analytics",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    name: "Generation Logs",
    href: "/admin/generation-logs",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];
