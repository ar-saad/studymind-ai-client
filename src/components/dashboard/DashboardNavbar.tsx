"use client";

import { usePathname } from "next/navigation";
import { ProfileDropdown } from "@/components/shared/ProfileDropdown";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { ChevronRight } from "lucide-react";

export const DashboardNavbar = () => {
  const pathname = usePathname();
  
  // Create breadcrumbs based on pathname
  const paths = pathname.split("/").filter(Boolean);
  const breadcrumbs = paths.map((path, index) => {
    const href = "/" + paths.slice(0, index + 1).join("/");
    // Format path to be readable (e.g. "study-history" -> "Study History")
    const label = path
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return { href, label };
  });

  return (
    <header className="h-16 border-b border-border bg-white/50 dark:bg-slate-950/50 backdrop-blur-md flex items-center justify-between px-6 lg:px-8 z-30 sticky top-0 pl-16 lg:pl-8">
      <div className="flex items-center gap-2 overflow-hidden">
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={breadcrumb.href} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="w-4 h-4 text-slate-400" />}
            <span
              className={`text-sm font-medium whitespace-nowrap ${
                index === breadcrumbs.length - 1
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-500 hidden sm:inline-block"
              }`}
            >
              {breadcrumb.label}
            </span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-4">
        <ModeToggle />
        <ProfileDropdown />
      </div>
    </header>
  );
};
