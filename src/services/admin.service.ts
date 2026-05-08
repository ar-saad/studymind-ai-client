import apiClient from "@/lib/axios";

export interface AdminStats {
  kpis: {
    totalUsers: number;
    proUsers: number;
    freeUsers: number;
    conversionRate: number;
    totalGenerationsToday: number;
    totalGenerationsMonth: number;
  };
  recentSignups: {
    id: string;
    name: string;
    email: string;
    plan: string;
    createdAt: string;
  }[];
  signupsByDay: { date: string; count: number }[];
  generationsByDay: { date: string; count: number }[];
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  plan: string;
  role: string;
  dailyGenerations: number;
  createdAt: string;
  image?: string | null;
}

export interface GenerationLog {
  id: string;
  type: string;
  estimatedTokens: number;
  status: string;
  createdAt: string;
  user: { name: string; email: string };
  topic?: { title: string } | null;
}

export interface TopicAnalytics {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  studyCount: number;
  totalSessions: number;
  totalQuizzes: number;
  averageQuizScore: number | null;
}

export const adminService = {
  getStats: async () => {
    const { data } = await apiClient.get<{ data: AdminStats }>("/admin/stats");
    return data.data;
  },

  getUsers: async (params: Record<string, any> = {}) => {
    const { data } = await apiClient.get("/admin/users", { params });
    return data;
  },

  updateUserPlan: async (userId: string, plan: "FREE" | "PRO") => {
    const { data } = await apiClient.put(`/admin/users/${userId}/plan`, { plan });
    return data;
  },

  deleteUser: async (userId: string) => {
    const { data } = await apiClient.delete(`/admin/users/${userId}`);
    return data;
  },

  getGenerationLogs: async (params: Record<string, any> = {}) => {
    const { data } = await apiClient.get("/admin/generation-logs", { params });
    return data;
  },

  getTopicAnalytics: async (params: Record<string, any> = {}) => {
    const { data } = await apiClient.get<{ data: TopicAnalytics[] }>("/admin/topic-analytics", { params });
    return data.data;
  },
};
