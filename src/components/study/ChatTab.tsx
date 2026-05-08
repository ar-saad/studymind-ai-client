"use client";

import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { aiService, ChatMessage } from "@/services/ai.service";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Send,
  AlertTriangle,
  Bot,
  User,
  Loader2,
  Lock,
} from "lucide-react";

interface ChatTabProps {
  topicId: string;
  topicTitle: string;
  difficulty: string;
}

export default function ChatTab({ topicId, topicTitle, difficulty }: ChatTabProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [limitReached, setLimitReached] = useState(false);
  const [generationsUsed, setGenerationsUsed] = useState(0);
  const [limit, setLimit] = useState<number | string>("...");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch initial usage stats
  const { data: usageData } = useQuery({
    queryKey: ["ai-usage"],
    queryFn: () => aiService.getUsageStats(),
    staleTime: 30000,
  });

  useEffect(() => {
    if (usageData) {
      setGenerationsUsed(usageData.dailyGenerations);
      setLimit(usageData.dailyLimit);
      if (
        usageData.plan === "FREE" &&
        typeof usageData.dailyLimit === "number" &&
        usageData.dailyGenerations >= usageData.dailyLimit
      ) {
        setLimitReached(true);
      }
    }
  }, [usageData]);

  // Send message mutation
  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: (newMessages: ChatMessage[]) =>
      aiService.chat(topicId, difficulty, newMessages),
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        { role: "model", content: data.message },
      ]);
      setGenerationsUsed(data.usage.generationsUsed);
      setLimit(data.usage.limit);
    },
    onError: (error) => {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: `⚠️ ${error instanceof Error ? error.message : "Failed to get a response. Please try again."}`,
        },
      ]);
      // Check if the error was a rate limit
      if (error instanceof Error && (error as any).status === 429) {
        setLimitReached(true);
      }
    },
  });

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isPending]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed || isPending || limitReached) return;

    const userMessage: ChatMessage = { role: "user", content: trimmed };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue("");
    sendMessage(newMessages);
  };

  // ─── Empty State ─────────────────────────────────────────────────
  if (messages.length === 0 && !isPending) {
    return (
      <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col" style={{ minHeight: "500px" }}>
        {/* Chat header */}
        <div className="px-6 py-4 border-b border-border bg-muted/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">AI Doubt Solver</h3>
                <p className="text-xs text-muted-foreground">
                  Ask questions about {topicTitle}
                </p>
              </div>
            </div>
            {typeof limit === "number" && (
              <span className="text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full">
                {generationsUsed}/{limit} messages used
              </span>
            )}
          </div>
        </div>

        {/* Welcome message */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
              <MessageCircle className="relative w-16 h-16 text-emerald-500/60" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Ask anything about {topicTitle}
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              I&apos;m your study assistant specialized in this topic. Ask me to explain
              concepts, clarify doubts, or give examples.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                `Explain the basics of ${topicTitle}`,
                "Give me an example",
                "What are common mistakes?",
              ].map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputValue(suggestion);
                    inputRef.current?.focus();
                  }}
                  className="text-xs bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full transition-colors border border-border/50"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-border bg-muted/10">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Ask about ${topicTitle}...`}
              disabled={limitReached}
              className="flex-1 bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isPending || limitReached}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2.5 rounded-xl transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── Chat View ───────────────────────────────────────────────────
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col" style={{ minHeight: "500px", maxHeight: "700px" }}>
      {/* Chat header */}
      <div className="px-6 py-4 border-b border-border bg-muted/20 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Bot className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">AI Doubt Solver</h3>
              <p className="text-xs text-muted-foreground">
                Discussing {topicTitle} • {difficulty}
              </p>
            </div>
          </div>
          {typeof limit === "number" && (
            <span className="text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full">
              {generationsUsed}/{limit} messages used
            </span>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "model" && (
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-emerald-500" />
                </div>
              )}

              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-md"
                    : "bg-muted/50 text-foreground border border-border/50 rounded-bl-md"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>

              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4 text-blue-500" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isPending && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 justify-start"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-1">
              <Bot className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="bg-muted/50 border border-border/50 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-border bg-muted/10 shrink-0">
        {limitReached ? (
          <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3">
            <Lock className="w-4 h-4 shrink-0" />
            <span>
              Daily message limit reached. Upgrade to Pro for unlimited messages.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Ask about ${topicTitle}...`}
              disabled={isPending}
              className="flex-1 bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isPending}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2.5 rounded-xl transition-colors"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
