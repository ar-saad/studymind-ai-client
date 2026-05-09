"use client";

import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { aiService, QuizQuestion, StudyGuideData } from "@/services/ai.service";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Loader2,
  CheckCircle,
  XCircle,
  ChevronRight,
  Trophy,
  Clock,
  Target,
  RotateCcw,
  ListChecks,
  AlertTriangle,
  Sparkles,
  BookOpen,
} from "lucide-react";

interface QuizTabProps {
  topicId: string;
  topicTitle: string;
  difficulty: string;
  /** Study guide data from parent — quiz can only be generated when this exists */
  studyGuide: StudyGuideData | null;
  /** Quiz questions lifted from parent — persists across tab switches */
  quizQuestions: QuizQuestion[];
  /** Callback to update the parent when a new quiz is generated */
  onQuizGenerated: (questions: QuizQuestion[]) => void;
}

type QuizState = "idle" | "playing" | "answered" | "results" | "review";

interface AnswerRecord {
  questionIndex: number;
  selectedIndex: number;
  correctIndex: number;
  correct: boolean;
}

export default function QuizTab({
  topicId,
  topicTitle,
  difficulty,
  studyGuide,
  quizQuestions,
  onQuizGenerated,
}: QuizTabProps) {
  // Determine initial state based on whether we already have quiz data
  const [quizState, setQuizState] = useState<QuizState>(
    quizQuestions.length > 0 ? "playing" : "idle",
  );
  const [questions, setQuestions] = useState<QuizQuestion[]>(quizQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [generationsUsed, setGenerationsUsed] = useState(0);
  const [limit, setLimit] = useState<number | string>("...");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate quiz mutation — pass study guide context to backend
  const {
    mutate: generateQuiz,
    isPending,
    error,
  } = useMutation({
    mutationFn: () =>
      aiService.generateQuiz(topicId, difficulty, 10, studyGuide),
    onSuccess: (data) => {
      setQuestions(data.quiz.questions);
      onQuizGenerated(data.quiz.questions);
      setCurrentIndex(0);
      setSelectedOption(null);
      setAnswers([]);
      setQuizState("playing");
      setStartTime(Date.now());
      setGenerationsUsed(data.usage.generationsUsed);
      setLimit(data.usage.limit);
    },
  });

  // Save quiz result mutation
  const { mutate: saveResult } = useMutation({
    mutationFn: (params: {
      score: number;
      timeTaken: number;
      passed: boolean;
      answers: AnswerRecord[];
    }) =>
      aiService.saveQuizResult({
        topicId,
        score: params.score,
        totalQuestions: questions.length,
        timeTaken: params.timeTaken,
        passed: params.passed,
        answers: params.answers,
      }),
  });

  // Timer
  useEffect(() => {
    if (quizState === "playing" || quizState === "answered") {
      timerRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizState, startTime]);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress =
    totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  // Handle answer selection (optimistic UI)
  const handleSelectOption = (optionIndex: number) => {
    if (quizState !== "playing") return;
    setSelectedOption(optionIndex);
    setQuizState("answered");

    const isCorrect = optionIndex === currentQuestion.correctIndex;
    setAnswers((prev) => [
      ...prev,
      {
        questionIndex: currentIndex,
        selectedIndex: optionIndex,
        correctIndex: currentQuestion.correctIndex,
        correct: isCorrect,
      },
    ]);
  };

  // Handle next question
  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setQuizState("playing");
    } else {
      // Quiz complete — show results
      if (timerRef.current) clearInterval(timerRef.current);
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);
      setElapsedTime(timeTaken);
      setQuizState("results");

      // Calculate score and save (fire and forget)
      const correctCount =
        [...answers].filter((a) => a.correct).length +
        (selectedOption === currentQuestion.correctIndex ? 1 : 0);
      // Actually answers already has the last answer since handleSelectOption runs first
      const finalAnswers = answers;
      const score = Math.round(
        (finalAnswers.filter((a) => a.correct).length / totalQuestions) * 100,
      );
      const passed = score >= 60;

      saveResult({ score, timeTaken, passed, answers: finalAnswers });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const errorMessage =
    error instanceof Error ? error.message : "Failed to generate quiz.";

  // ─── No Study Guide State ───────────────────────────────────────
  if (!studyGuide && quizState === "idle") {
    return (
      <div className="bg-card border border-border rounded-xl p-6 md:p-8 min-h-100">
        <div className="text-center py-16">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl animate-pulse" />
            <BookOpen className="relative w-16 h-16 text-amber-500/60" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Study Guide Required
          </h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            You need to generate a study guide first before taking a quiz. The
            quiz questions are created from the study guide content to ensure
            you&apos;re tested on what you&apos;ve studied.
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>
              Switch to the <strong>Study Guide</strong> tab to generate one
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ─── Idle State ──────────────────────────────────────────────────
  if (quizState === "idle" && !isPending && !error) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 md:p-8 min-h-100">
        <div className="text-center py-16">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse" />
            <Brain className="relative w-16 h-16 text-purple-500/60" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Interactive Quiz
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Test your knowledge of{" "}
            <span className="font-medium text-foreground">{topicTitle}</span>{" "}
            with 10 AI-generated multiple-choice questions based on your study
            guide.
          </p>
          <button
            onClick={() => generateQuiz()}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-purple-500/25 active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 inline mr-2" />
            Generate Quiz
          </button>
        </div>
      </div>
    );
  }

  // ─── Loading State ───────────────────────────────────────────────
  if (isPending) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 md:p-8 min-h-100">
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse" />
            <Loader2 className="relative w-12 h-12 text-purple-500 animate-spin" />
          </div>
          <p className="text-muted-foreground font-medium">
            Generating your quiz...
          </p>
          <p className="text-sm text-muted-foreground/60">
            This may take a few seconds
          </p>
        </div>
      </div>
    );
  }

  // ─── Error State ─────────────────────────────────────────────────
  if (error && quizState === "idle") {
    return (
      <div className="bg-card border border-border rounded-xl p-6 md:p-8 min-h-100">
        <div className="text-center py-16">
          <AlertTriangle className="w-16 h-16 mx-auto text-red-500/60 mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Generation Failed
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {errorMessage}
          </p>
          <button
            onClick={() => generateQuiz()}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-xl transition-colors"
          >
            <RotateCcw className="w-4 h-4 inline mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ─── Results Screen ──────────────────────────────────────────────
  if (quizState === "results") {
    const correctCount = answers.filter((a) => a.correct).length;
    const score = Math.round((correctCount / totalQuestions) * 100);
    const passed = score >= 60;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-xl p-6 md:p-8"
      >
        <div className="text-center py-8">
          {/* Trophy / Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
              passed
                ? "bg-emerald-500/10 border-2 border-emerald-500/30"
                : "bg-red-500/10 border-2 border-red-500/30"
            }`}
          >
            <Trophy
              className={`w-12 h-12 ${
                passed ? "text-emerald-500" : "text-red-400"
              }`}
            />
          </motion.div>

          {/* Score */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-foreground mb-2"
          >
            {score}%
          </motion.h2>

          {/* Pass/Fail Badge */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mb-6 ${
              passed
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-red-500/10 text-red-600 dark:text-red-400"
            }`}
          >
            {passed ? "PASSED ✓" : "NEEDS IMPROVEMENT"}
          </motion.span>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
            <div className="bg-muted/30 rounded-xl p-4">
              <Target className="w-5 h-5 text-blue-500 mx-auto mb-1" />
              <div className="text-lg font-bold text-foreground">
                {correctCount}/{totalQuestions}
              </div>
              <div className="text-xs text-muted-foreground">Correct</div>
            </div>
            <div className="bg-muted/30 rounded-xl p-4">
              <Clock className="w-5 h-5 text-amber-500 mx-auto mb-1" />
              <div className="text-lg font-bold text-foreground">
                {formatTime(elapsedTime)}
              </div>
              <div className="text-xs text-muted-foreground">Time</div>
            </div>
            <div className="bg-muted/30 rounded-xl p-4">
              <Brain className="w-5 h-5 text-purple-500 mx-auto mb-1" />
              <div className="text-lg font-bold text-foreground">
                {difficulty}
              </div>
              <div className="text-xs text-muted-foreground">Level</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setQuizState("review")}
              className="flex items-center gap-2 bg-muted/50 hover:bg-muted text-foreground font-medium px-5 py-2.5 rounded-xl transition-colors"
            >
              <ListChecks className="w-4 h-4" />
              Review All
            </button>
            <button
              onClick={() => {
                setQuizState("idle");
                setQuestions([]);
                setAnswers([]);
                onQuizGenerated([]);
              }}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2.5 rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              New Quiz
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // ─── Review All Screen ───────────────────────────────────────────
  if (quizState === "review") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-card border border-border rounded-xl p-6 md:p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-purple-500" />
            Review All Questions
          </h2>
          <button
            onClick={() => setQuizState("results")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to Results
          </button>
        </div>

        <div className="space-y-6">
          {questions.map((q, idx) => {
            const answer = answers[idx];
            const isCorrect = answer?.correct;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`border rounded-xl p-5 ${
                  isCorrect
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-red-500/30 bg-red-500/5"
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span
                    className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 ${
                      isCorrect
                        ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                        : "bg-red-500/20 text-red-600 dark:text-red-400"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <p className="text-foreground font-medium">{q.question}</p>
                </div>

                <div className="grid gap-2 ml-10 mb-3">
                  {q.options.map((opt, optIdx) => {
                    const isUserChoice = answer?.selectedIndex === optIdx;
                    const isCorrectOption = q.correctIndex === optIdx;
                    let optionClass =
                      "border border-border/50 bg-muted/20 text-muted-foreground";

                    if (isCorrectOption) {
                      optionClass =
                        "border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
                    } else if (isUserChoice && !isCorrect) {
                      optionClass =
                        "border-red-500/50 bg-red-500/10 text-red-700 dark:text-red-400";
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${optionClass}`}
                      >
                        {isCorrectOption ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : isUserChoice ? (
                          <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                        ) : (
                          <span className="w-4 h-4 shrink-0" />
                        )}
                        {opt}
                        {isUserChoice && (
                          <span className="text-xs ml-auto opacity-60">
                            Your answer
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="ml-10 text-sm text-muted-foreground bg-muted/30 rounded-lg p-3">
                  <span className="font-medium text-foreground">
                    Explanation:{" "}
                  </span>
                  {q.explanation}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => setQuizState("results")}
            className="flex items-center gap-2 bg-muted/50 hover:bg-muted text-foreground font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            Back to Results
          </button>
          <button
            onClick={() => {
              setQuizState("idle");
              setQuestions([]);
              setAnswers([]);
              onQuizGenerated([]);
            }}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            New Quiz
          </button>
        </div>
      </motion.div>
    );
  }

  // ─── Playing / Answered State ────────────────────────────────────
  if (!currentQuestion) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card border border-border rounded-xl p-6 md:p-8"
    >
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <div className="flex items-center gap-3">
            {typeof limit === "number" && (
              <span className="text-xs font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 px-2.5 py-1 rounded-full">
                {generationsUsed}/{limit} used
              </span>
            )}
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              {formatTime(elapsedTime)}
            </span>
          </div>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-linear-to-r from-purple-500 to-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-6">
            {currentQuestion.question}
          </h3>

          {/* Answer Options */}
          <div className="grid gap-3 mb-6">
            {currentQuestion.options.map((option, optIdx) => {
              let optionStyle =
                "border-border/50 bg-muted/20 hover:bg-muted/40 hover:border-purple-500/30 cursor-pointer";
              let iconEl = (
                <span className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center text-sm font-medium text-muted-foreground shrink-0">
                  {String.fromCharCode(65 + optIdx)}
                </span>
              );

              if (quizState === "answered") {
                if (optIdx === currentQuestion.correctIndex) {
                  optionStyle =
                    "border-emerald-500/50 bg-emerald-500/10 cursor-default";
                  iconEl = (
                    <CheckCircle className="w-8 h-8 text-emerald-500 shrink-0" />
                  );
                } else if (
                  optIdx === selectedOption &&
                  optIdx !== currentQuestion.correctIndex
                ) {
                  optionStyle =
                    "border-red-500/50 bg-red-500/10 cursor-default";
                  iconEl = (
                    <XCircle className="w-8 h-8 text-red-500 shrink-0" />
                  );
                } else {
                  optionStyle =
                    "border-border/30 bg-muted/10 opacity-50 cursor-default";
                }
              } else if (selectedOption === optIdx) {
                // Optimistic highlight before evaluation
                optionStyle =
                  "border-purple-500/50 bg-purple-500/10 cursor-default";
              }

              return (
                <motion.button
                  key={optIdx}
                  whileHover={quizState === "playing" ? { scale: 1.01 } : {}}
                  whileTap={quizState === "playing" ? { scale: 0.99 } : {}}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={quizState === "answered"}
                  className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${optionStyle}`}
                >
                  {iconEl}
                  <span className="text-foreground">{option}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Explanation (shown after answer) */}
          {quizState === "answered" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl p-4 mb-6 border ${
                selectedOption === currentQuestion.correctIndex
                  ? "bg-emerald-500/5 border-emerald-500/20"
                  : "bg-amber-500/5 border-amber-500/20"
              }`}
            >
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {selectedOption === currentQuestion.correctIndex
                    ? "✓ Correct! "
                    : "✗ Incorrect. "}
                </span>
                {currentQuestion.explanation}
              </p>
            </motion.div>
          )}

          {/* Next Button */}
          {quizState === "answered" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-end"
            >
              <button
                onClick={handleNext}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2.5 rounded-xl transition-colors"
              >
                {currentIndex < totalQuestions - 1 ? "Next" : "See Results"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
