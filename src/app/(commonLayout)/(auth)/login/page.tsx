"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Mail, Lock, AlertCircle } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof loginSchema>) => {
      const { data, error } = await signIn.email({
        email: values.email,
        password: values.password,
      });

      if (error) {
        throw new Error(error.message || "Failed to sign in");
      }

      return data;
    },
    onSuccess: (data) => {
      if ((data?.user as { role?: string })?.role?.toLowerCase() === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value);
    },
  });

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Master your learning journey"
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkHref="/register"
    >
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
        className="space-y-6"
      >
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
              <div className="flex justify-between items-center mb-1 px-1">
                <label className="text-sm font-medium text-foreground/80">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-blue-500 transition-colors">
                  <Lock className="size-5" />
                </div>
                <input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="password"
                  placeholder="••••••••"
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
              {mutation.isPending ? "Authenticating..." : "Sign In"}
            </Button>
          )}
        />

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or demo login
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-full text-xs"
            onClick={() => {
              form.setFieldValue("email", "user@studymind.ai");
              form.setFieldValue("password", "Demo1234!");
            }}
          >
            Free User
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full text-xs"
            onClick={() => {
              form.setFieldValue("email", "pro@studymind.ai");
              form.setFieldValue("password", "Demo1234!");
            }}
          >
            Pro User
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full text-xs"
            onClick={() => {
              form.setFieldValue("email", "admin@studymind.ai");
              form.setFieldValue("password", "Admin1234!");
            }}
          >
            Admin
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
