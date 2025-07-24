import { create } from "zustand";
import {
  getGenres,
  createGenre,
  updateGenre,
  deleteGenre,
} from "@/api/genre";
import toast from "react-hot-toast";
export const useGenreStore = create((set, get) => ({
  genres: [],
  loading: false,
  error: null,

  getGenres: async () => {
    try {
      set({ loading: true });
      const data = await getGenres();
      set({ genres: data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to fetch genres",
        loading: false,
      });
    }
  },

  createGenre: async (genre) => {
    await createGenre(genre);
    await get().getGenres();
    toast.success("New genre added successfully");
  },

  updateGenre: async (id, genre) => {
    await updateGenre(id, genre);
    await get().getGenres();
    toast.success("Genre updated successfully");
  },

  deleteGenre: async (id) => {
    await deleteGenre(id);
    await get().getGenres();
    toast.success("Genre deleted successfully");
  },
}));
