import apiClient from "@/lib/axios";

export interface Topic {
  id: string;
  title: string;
  slug: string;
  category: string;
  difficulty: string;
  description: string;
  imageUrl?: string | null;
  studyCount: number;
  createdAt: string;
  _count?: {
    reviews?: number;
    quizResults?: number;
    studySessions?: number;
  };
  reviews?: Review[];
}

export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  user: {
    id: string;
    name: string;
    image?: string | null;
  };
}

export interface TopicsResponse {
  success: boolean;
  message: string;
  data: Topic[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface TopicDetailResponse {
  success: boolean;
  message: string;
  data: Topic;
}

export interface GetTopicsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  difficulty?: string;
  sort?: "popular" | "newest" | "alphabetical";
}

export interface PublicStats {
  totalTopics: number;
  totalUsers: number;
  totalQuizzes: number;
  successRate: number;
  averageQuizScore: number;
  newestTopic: { title: string; slug: string };
  popularTopics: { title: string; slug: string }[];
}

export const topicService = {
  getTopics: async (params: GetTopicsParams = {}) => {
    const { data } = await apiClient.get<TopicsResponse>("/topics", { params });
    return data;
  },

  getTopicBySlug: async (slug: string) => {
    const { data } = await apiClient.get<TopicDetailResponse>(`/topics/${slug}`);
    return data;
  },

  getPopularTopics: async () => {
    const { data } = await apiClient.get<{ data: Topic[] }>("/topics/popular");
    return data.data;
  },

  getCategories: async () => {
    const { data } = await apiClient.get<{ data: string[] }>("/topics/categories");
    return data.data;
  },

  getPublicStats: async () => {
    const { data } = await apiClient.get<{ data: PublicStats }>("/topics/stats/public");
    return data.data;
  },

  submitReview: async (topicId: string, review: { rating: number; comment?: string }) => {
    const { data } = await apiClient.post(`/topics/${topicId}/review`, review);
    return data;
  },
};
