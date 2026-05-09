import apiClient from "@/lib/axios";

export interface ReviewInput {
  topicId: string;
  rating: number;
  comment?: string;
}

export const reviewService = {
  createReview: async (review: ReviewInput) => {
    const { data } = await apiClient.post("/reviews", review);
    return data;
  },

  getReviews: async (params?: { page?: number; limit?: number; topicId?: string; userId?: string }) => {
    const { data } = await apiClient.get("/reviews", { params });
    return data;
  },

  getReviewById: async (id: string) => {
    const { data } = await apiClient.get(`/reviews/${id}`);
    return data;
  },

  updateReview: async (id: string, review: { rating: number; comment?: string }) => {
    const { data } = await apiClient.put(`/reviews/${id}`, review);
    return data;
  },

  deleteReview: async (id: string) => {
    const { data } = await apiClient.delete(`/reviews/${id}`);
    return data;
  },
};
