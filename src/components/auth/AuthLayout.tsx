"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

export function AuthLayout({
  children,
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden font-sans">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10 px-4"
      >
        <div className="bg-card/50 backdrop-blur-xl border border-border p-8 rounded-3xl shadow-2xl">
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">
                {title}
              </h1>
              <p className="text-muted-foreground text-lg">
                {subtitle}
              </p>
            </motion.div>
          </div>

          {children}

          <div className="mt-10 text-center">
            <p className="text-muted-foreground">
              {footerText}{" "}
              <Link 
                href={footerLinkHref} 
                className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-semibold transition-colors decoration-2 underline-offset-4 hover:underline"
              >
                {footerLinkText}
              </Link>
            </p>
          </div>
        </div>
        
        {/* Subtle branding or extra link */}
        <div className="mt-8 text-center">
           <Link href="/" className="text-muted-foreground/60 hover:text-foreground text-sm transition-colors flex items-center justify-center gap-2">
             <span>← Back to home</span>
           </Link>
        </div>
      </motion.div>
    </div>
  );
}
