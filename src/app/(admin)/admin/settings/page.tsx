"use client";

import { Settings } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Platform Settings</h1>
        <p className="text-muted-foreground mt-1">Configure platform-wide settings</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-500" />
          General Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-1.5">Free Plan Daily Limit</label>
            <input type="number" defaultValue={5} className="w-full px-4 py-2.5 bg-muted/40 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-1.5">Free Plan Chat Limit</label>
            <input type="number" defaultValue={5} className="w-full px-4 py-2.5 bg-muted/40 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-1.5">Default Quiz Questions</label>
            <input type="number" defaultValue={10} className="w-full px-4 py-2.5 bg-muted/40 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm" />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">AI Configuration</h2>
        <div>
          <label className="text-sm font-medium text-muted-foreground block mb-1.5">AI Model</label>
          <select className="w-full px-4 py-2.5 bg-muted/40 border border-border rounded-lg focus:outline-none text-sm">
            <option>gemini-1.5-flash</option>
            <option>gemini-1.5-pro</option>
          </select>
        </div>
      </div>
    </div>
  );
}
