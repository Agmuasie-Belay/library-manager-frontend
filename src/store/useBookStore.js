import { create } from "zustand";
import toast from "react-hot-toast";

import {
  getBooks,
  getGenres,
  deleteBook,
  createBook,
  updateBook,
} from "@/api/books";

export const useBookStore = create((set, get) => ({
  books: [],
  genres: [],
  isLoading: false,
  error: null,
  
  loadBooks: async () => {
    set({ isLoading: true });
    try {
      const data = await getBooks();
      set({ books: data, isLoading: false });
    } catch (err) {
      console.error(err);
      set({ error: err.message, isLoading: false });
    }
  },

  loadGenres: async () => {
    try {
      const genres = await getGenres();
      set({ genres });
    } catch (err) {
      console.error(err);
    }
  },

  addBook: async (bookData) => {
    try {
      await createBook(bookData);
      await get().loadBooks();
      toast.success("Book added successfully");
    } catch (err) {
      console.error("Add book error:", err);
      toast.error("Failed to add book" );
    }
  },

  removeBook: async (bookId) => {
    try {
      await deleteBook(bookId);
      set((state) => ({
        books: state.books.filter((b) => b.id !== bookId),
      }));
      toast.success("Book deleted successfully");
    } catch (err) {
      console.error("Delete book error:", err);
      toast.error("Failed to delete book");
    }
  },

  editBook: async (bookId, updatedData) => {
    try {
      const updatedBook = await updateBook(bookId, updatedData); 

      set((state) => ({
        books: state.books.map((book) =>
          book.id === bookId ? updatedBook : book
        ),
      }));
      toast.success("Book updated successfully")
      await get().loadBooks();
    } catch (err) {
      console.error("Update book error:", err);
      toast.error( "Failed to update book");
    }
  },
}));
