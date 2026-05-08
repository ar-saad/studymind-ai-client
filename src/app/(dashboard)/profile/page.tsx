"use client";

import { useState } from "react";
import { useUser } from "@/providers/UserProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { User, Upload, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { user } = useUser();
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setMessage({ text: "Image must be less than 2MB", type: "error" });
        return;
      }
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ text: "", type: "" });

    try {
      const { data, error } = await authClient.updateUser({
        name,
        image: image || undefined,
      });

      if (error) {
        setMessage({
          text: error.message || "Failed to update profile",
          type: "error",
        });
      } else {
        setMessage({ text: "Profile updated successfully!", type: "success" });
        // Reload to update context
        window.location.reload();
      }
    } catch (err: any) {
      setMessage({ text: err.message || "An error occurred", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Profile Settings
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Update your personal information and profile picture.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-slate-400" />
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                </div>
              )}
            </div>
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                Profile Picture
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                JPEG, PNG or GIF. Max size 2MB.
              </p>
              <div className="pt-2">
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    document.getElementById("imageUpload")?.click()
                  }
                  className="gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload New Picture
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={user.email}
                disabled
                className="bg-slate-50 dark:bg-slate-800 text-slate-500"
              />
              <p className="text-xs text-slate-500">
                Your email address cannot be changed.
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          {message.text && (
            <div
              className={`p-3 rounded-lg text-sm ${
                message.type === "error"
                  ? "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                  : "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <Button
              type="submit"
              disabled={isSaving || isUploading}
              className="min-w-30"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
