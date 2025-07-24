import { create } from "zustand";
import {
  getOverdueBooks,
  getPopularGenres,
  getSummary,
} from "@/api/report";

export const useReportStore = create((set) => ({
  overdueBooks: [],
  popularGenres: [],
  summary: null,
  isLoading: false,
  error: null,

  getReportData: async () => {
    set({
      isLoading:true,
    });

    try {
      const [overdueRes, genresRes, summaryRes] = await Promise.all([
        getOverdueBooks(),
        getPopularGenres(),
        getSummary(),
      ]);

      set({
        overdueBooks: overdueRes.data,
        popularGenres: genresRes.data,
        summary: summaryRes.data,
        isLoading: false,
      });
    } catch (err) {
      console.error("Error fetching report data:", err);
      set({ error: err.message, isLoading:false });
    }
  },
}));
