"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { reviewService } from "@/services/review.service";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Star, Loader2 } from "lucide-react";

interface ReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  topicId: string;
  topicTitle: string;
  existingReview?: { id?: string; rating: number; comment?: string | null } | null;
  onSuccess?: () => void;
}

export function ReviewDialog({
  isOpen,
  onClose,
  topicId,
  topicTitle,
  existingReview,
  onSuccess,
}: ReviewDialogProps) {
  const [rating, setRating] = useState<number>(existingReview?.rating || 5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>(existingReview?.comment || "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setRating(existingReview?.rating || 5);
      setComment(existingReview?.comment || "");
      setError(null);
    }
  }, [isOpen, existingReview]);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const { mutate: submitReview, isPending } = useMutation({
    mutationFn: () => {
      if (existingReview?.id) {
        // Update review
        return reviewService.updateReview(existingReview.id, { rating, comment });
      } else {
        // Create review
        return reviewService.createReview({ topicId, rating, comment });
      }
    },
    onSuccess: () => {
      onSuccess?.();
      onClose();
    },
    onError: (err: any) => {
      setError(err?.response?.data?.message || err?.message || "Failed to submit review");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReview();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
          />

          {/* Dialog Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-2xl"
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center sm:text-left">
                  <h2 className="text-xl font-bold text-foreground">
                    {existingReview ? "Edit Your Review" : "How was this topic?"}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1.5">
                    Share your experience studying <strong className="text-foreground">{topicTitle}</strong>
                  </p>
                </div>

                {error && (
                  <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950/20 p-3 rounded-lg border border-red-500/20">
                    {error}
                  </div>
                )}

                {/* Star Rating Selector */}
                <div className="flex flex-col items-center py-2 bg-muted/20 rounded-xl border border-border/50">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Your Rating
                  </span>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((starValue) => {
                      const isActive = hoverRating !== null ? starValue <= hoverRating : starValue <= rating;
                      return (
                        <button
                          key={starValue}
                          type="button"
                          onClick={() => setRating(starValue)}
                          onMouseEnter={() => setHoverRating(starValue)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="p-1 hover:scale-110 transition-transform active:scale-95 focus:outline-none"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              isActive
                                ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.3)]"
                                : "text-muted-foreground/30"
                            } transition-colors duration-150`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground mt-2">
                    {rating === 1 && "Poor 😞"}
                    {rating === 2 && "Fair 😐"}
                    {rating === 3 && "Good 🙂"}
                    {rating === 4 && "Very Good 😊"}
                    {rating === 5 && "Excellent! 😍"}
                  </span>
                </div>

                {/* Comment Area */}
                <div className="space-y-2">
                  <label htmlFor="comment" className="text-sm font-semibold text-foreground">
                    Write a review (optional)
                  </label>
                  <textarea
                    id="comment"
                    placeholder="Tell us what you liked, or how we can improve..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    maxLength={1000}
                    rows={4}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 resize-none transition-all"
                  />
                  <div className="text-right text-xs text-muted-foreground">
                    {comment.length}/1000 characters
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={isPending}
                    className="sm:w-auto h-11 rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="sm:w-auto h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : existingReview ? (
                      "Update Review"
                    ) : (
                      "Submit Review"
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
