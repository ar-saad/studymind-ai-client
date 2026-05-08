import apiClient from "@/lib/axios";

// ─── Types ───────────────────────────────────────────────────────────

export interface StudyGuideData {
  overview: string;
  keyConcepts: { term: string; explanation: string }[];
  importantFacts: string[];
  commonMisconceptions: { myth: string; reality: string }[];
  summary: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizData {
  questions: QuizQuestion[];
}

export interface UsageInfo {
  plan: string;
  generationsUsed: number;
  limit: number | string;
}

export interface UsageStats {
  plan: string;
  dailyGenerations: number;
  dailyLimit: number | string;
  topicsCreatedToday: number;
  topicCreationLimit: number | string;
}

export interface ChatMessage {
  role: "user" | "model";
  content: string;
}

// ─── Service ─────────────────────────────────────────────────────────

export const aiService = {
  /**
   * Generate a study guide for a topic.
   */
  generateStudyGuide: async (topicId: string, difficulty: string) => {
    const { data } = await apiClient.post<{
      success: boolean;
      data: { guide: StudyGuideData; usage: UsageInfo };
    }>("/ai/study-guide", { topicId, difficulty });
    return data.data;
  },

  /**
   * Generate a quiz for a topic.
   */
  generateQuiz: async (topicId: string, difficulty: string, questionCount = 10) => {
    const { data } = await apiClient.post<{
      success: boolean;
      data: { quiz: QuizData; usage: UsageInfo };
    }>("/ai/quiz", { topicId, difficulty, questionCount });
    return data.data;
  },

  /**
   * Send a chat message to the AI doubt solver.
   */
  chat: async (topicId: string, difficulty: string, messages: ChatMessage[]) => {
    const { data } = await apiClient.post<{
      success: boolean;
      data: { message: string; usage: UsageInfo };
    }>("/ai/chat", { topicId, difficulty, messages });
    return data.data;
  },

  /**
   * Create a new topic via AI.
   */
  createTopic: async (description: string, difficulty: string) => {
    const { data } = await apiClient.post<{
      success: boolean;
      message: string;
      data: { slug: string; topic: any };
    }>("/topics/create", { description, difficulty });
    return data;
  },

  /**
   * Save quiz results.
   */
  saveQuizResult: async (input: {
    topicId: string;
    score: number;
    totalQuestions: number;
    timeTaken: number;
    passed: boolean;
    answers: {
      questionIndex: number;
      selectedIndex: number;
      correctIndex: number;
      correct: boolean;
    }[];
  }) => {
    const { data } = await apiClient.post("/ai/quiz-result", input);
    return data;
  },

  /**
   * Create a new study session.
   */
  createStudySession: async (topicId: string) => {
    const { data } = await apiClient.post("/ai/study-session", { topicId });
    return data;
  },

  /**
   * Get current usage stats.
   */
  getUsageStats: async () => {
    const { data } = await apiClient.get<{ data: UsageStats }>("/ai/usage");
    return data.data;
  },
};
