"use client";

import { Suspense, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Mail, Lock, User, AlertCircle, Eye, EyeOff } from "lucide-react";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof registerSchema>) => {
      const { data, error } = await signUp.email({
        email: values.email,
        password: values.password,
        name: values.name,
        callbackURL: "/explore",
      });

      if (error) {
        throw new Error(error.message || "Failed to create account");
      }

      return data;
    },
    onSuccess: (data) => {
      if (callbackUrl) {
        router.push(callbackUrl);
      } else if ((data?.user as { role?: string })?.role?.toLowerCase() === "admin") {
        router.push("/admin");
      } else {
        router.push("/explore");
      }
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },

    validators: {
      onChange: registerSchema,
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value);
    },
  });

  return (
    <>
      <AnimatePresence mode="wait">
        {mutation.isError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-2xl flex items-center gap-3 text-destructive text-sm"
          >
            <AlertCircle className="size-4 shrink-0" />
            <p>
              {mutation.error instanceof Error
                ? mutation.error.message
                : "An error occurred"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-5"
      >
        <form.Field
          name="name"
          children={(field) => (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80 ml-1">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-blue-500 transition-colors">
                  <User className="size-5" />
                </div>
                <input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-muted/40 border border-border rounded-2xl pl-11 pr-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all backdrop-blur-sm"
                />
              </div>
              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-destructive mt-1 ml-1">
                    {field.state.meta.errors
                      .map((error: any) =>
                        typeof error === "string"
                          ? error
                          : error?.message || "Invalid input",
                      )
                      .join(", ")}
                  </p>
                )}
            </div>
          )}
        />

        <form.Field
          name="email"
          children={(field) => (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-blue-500 transition-colors">
                  <Mail className="size-5" />
                </div>
                <input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-muted/40 border border-border rounded-2xl pl-11 pr-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all backdrop-blur-sm"
                />
              </div>
              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-destructive mt-1 ml-1">
                    {field.state.meta.errors
                      .map((error: any) =>
                        typeof error === "string"
                          ? error
                          : error?.message || "Invalid input",
                      )
                      .join(", ")}
                  </p>
                )}
            </div>
          )}
        />

        <form.Field
          name="password"
          children={(field) => (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-blue-500 transition-colors">
                  <Lock className="size-5" />
                </div>
                <input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-muted/40 border border-border rounded-2xl pl-11 pr-12 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all backdrop-blur-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-destructive mt-1 ml-1">
                    {field.state.meta.errors
                      .map((error: any) =>
                        typeof error === "string"
                          ? error
                          : error?.message || "Invalid input",
                      )
                      .join(", ")}
                  </p>
                )}
            </div>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit || mutation.isPending}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold h-14 rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] mt-2 group"
            >
              {mutation.isPending ? (
                <Loader2 className="size-5 animate-spin mr-2" />
              ) : null}
              {mutation.isPending ? "Creating account..." : "Sign Up"}
            </Button>
          )}
        />
      </form>
    </>
  );
}

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create account"
      subtitle="Start your mastery today"
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/login"
    >
      <Suspense fallback={<div className="flex justify-center py-8"><Loader2 className="animate-spin text-blue-500" /></div>}>
        <RegisterForm />
      </Suspense>
    </AuthLayout>
  );
}
