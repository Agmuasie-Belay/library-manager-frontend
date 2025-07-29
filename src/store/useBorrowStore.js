import { create } from "zustand";
import {
  getOverdueRecords,
  getBorrowRecords,
  getMembers,
  borrowBook,
  returnBook,
} from "@/api/borrow";
import toast from "react-hot-toast";

import { getBooks } from "@/api/books";

export const useBorrowStore = create((set, get) => ({
  borrows: [],
  books: [],
  members: [],
  selectedBookId: "",
  selectedMemberId: "",
  selectedBorrowId: "",
  showModal: false,
  showReturnModal: false,
  isLoading: false,
  error: null,

  loadBorrowRecords: async () => {
    set({ isLoading: true });
    try {
      const raw = await getBorrowRecords();
      const overdue = await getOverdueRecords();

      const today = new Date();
      const borrows = raw.map((b) => {
        const due = new Date(b.due_date);
        const returned = b.return_date !== null;
        let status = "ACTIVE";
        if (returned) status = "RETURNED";
        else if (due < today) status = "OVERDUE";

        return {
          id: b.id,
          book_id: b.book?.id,
          book_title: b.book?.title || "Unknown Title",
          member_name: b.member?.name || "Unknown Member",
          borrow_date: b.borrow_date,
          due_date: b.due_date,
          returned_date: b.return_date,
          status,
        };
      });

      borrows.sort((a, b) => b.id - a.id);

      set({ borrows, isLoading:false });
    } catch (err) {
      console.error("Failed to load borrow records:", err);
      set({ error: err.message, isLoading: false });
    }
  },

  openBorrowModal: async () => {
    set({ showModal: true });
    try {
      const [books, members] = await Promise.all([getBooks(), getMembers()]);
      set({ books, members });
    } catch (err) {
      console.error("Failed to fetch books/members:", err);
    }
  },

  borrowBook: async (payload) => {
    try {
      await borrowBook(payload);
      set({ showModal: false, selectedBookId: "", selectedMemberId: "" });
      toast.success("Book borrowed successfully");
    } catch (err) {
      console.error("Failed to borrow book:", err);
      toast.error("Failed to borrow book:");
    }
    await get().loadBorrowRecords();
  },

  returnBook: async () => {
    const id = get().selectedBorrowId;
    try {
      console.log(id)
      await returnBook(Number(id));
      set({ showReturnModal: false, selectedBorrowId: "" });
      toast.success("Book retured successfully");
    } catch (err) {
      console.error("Failed to return book:", err);
      toast.error("Failed to return book");
    }
    await get().loadBorrowRecords();
    
  },

  setSelectedBookId: (id) => set({ selectedBookId: id }),
  setSelectedMemberId: (id) => set({ selectedMemberId: id }),
  setSelectedBorrowId: (id) => set({ selectedBorrowId: id }),
  setShowReturnModal: (val) => set({ showReturnModal: val }),
}));
