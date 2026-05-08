import apiClient from "@/lib/axios";

export interface DashboardOverview {
  user: {
    name: string;
    email: string;
    plan: string;
    image?: string | null;
  };
  stats: {
    topicsStudied: number;
    quizzesTaken: number;
    averageScore: number;
    dailyGenerationsUsed: number;
    dailyLimit: number | string;
  };
  recentActivity: {
    id: string;
    startedAt: string;
    completedAt?: string | null;
    guideGenerated: boolean;
    topic: {
      title: string;
      slug: string;
      category: string;
    };
  }[];
}

export interface StudySession {
  id: string;
  startedAt: string;
  completedAt?: string | null;
  guideGenerated: boolean;
  topic: {
    title: string;
    slug: string;
    category: string;
    difficulty: string;
  };
}

export interface QuizResult {
  id: string;
  score: number;
  totalQuestions: number;
  timeTaken: number;
  passed: boolean;
  completedAt: string;
  topic: {
    title: string;
    slug: string;
    category: string;
  };
  answers: {
    id: string;
    questionIndex: number;
    selectedIndex: number;
    correct: boolean;
  }[];
}

export interface ProgressData {
  quizScoresOverTime: {
    date: string;
    score: number;
    topic: string;
    category: string;
  }[];
  topicsByCategory: {
    category: string;
    count: number;
  }[];
  accuracyByCategory: {
    category: string;
    accuracy: number;
  }[];
  streak: number;
}

export const userService = {
  getDashboard: async () => {
    const { data } = await apiClient.get<{ data: DashboardOverview }>("/user/dashboard");
    return data.data;
  },

  getStudyHistory: async (params: Record<string, any> = {}) => {
    const { data } = await apiClient.get("/user/study-history", { params });
    return data;
  },

  getQuizResults: async (params: Record<string, any> = {}) => {
    const { data } = await apiClient.get("/user/quiz-results", { params });
    return data;
  },

  getProgress: async () => {
    const { data } = await apiClient.get<{ data: ProgressData }>("/user/progress");
    return data.data;
  },

  updateProfile: async (input: { name?: string; image?: string | null }) => {
    const { data } = await apiClient.put("/user/profile", input);
    return data;
  },

  deleteAccount: async () => {
    const { data } = await apiClient.delete("/user/account");
    return data;
  },
};
