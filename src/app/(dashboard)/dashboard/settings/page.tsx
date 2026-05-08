"use client";

import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { User, Mail, Shield, Crown } from "lucide-react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Account Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your profile and preferences
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-5">
        <h2 className="text-lg font-semibold text-foreground">Profile</h2>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <p className="font-semibold text-foreground">{user?.name}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                defaultValue={user?.name || ""}
                className="w-full pl-10 pr-4 py-2.5 bg-muted/40 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all text-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                defaultValue={user?.email || ""}
                disabled
                className="w-full pl-10 pr-4 py-2.5 bg-muted/20 border border-border rounded-lg text-sm text-muted-foreground cursor-not-allowed"
              />
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Save Changes
          </Button>
        </div>
      </div>

      {/* Plan Section */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Crown className="w-5 h-5 text-amber-500" />
          Subscription Plan
        </h2>
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              (user as any)?.plan === "PRO"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                : "bg-slate-100 text-slate-600 dark:bg-slate-500/20 dark:text-slate-400"
            }`}
          >
            {(user as any)?.plan === "PRO" ? "Pro Plan" : "Free Plan"}
          </span>
        </div>
        {(user as any)?.plan !== "PRO" && (
          <Button className="bg-linear-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 rounded-lg">
            Upgrade to Pro — £9.99/month
          </Button>
        )}
      </div>

      {/* Danger Zone */}
      <div className="bg-card border border-red-200 dark:border-red-500/20 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-red-600 dark:text-red-400">
          Danger Zone
        </h2>
        <p className="text-sm text-muted-foreground">
          Once you delete your account, all your data will be permanently
          removed.
        </p>
        <Button variant="destructive" className="rounded-lg">
          Delete Account
        </Button>
      </div>
    </div>
  );
}
