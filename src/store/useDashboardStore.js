import { create } from "zustand";
import { getBooks } from "@/api/books";
import { getMembers } from "@/api/members";
import { getBorrowRecords, getOverdueRecords } from "@/api/borrow";

const useDashboardStore = create((set) => ({
  totalBooks: 0,
  totalMembers: 0,
  totalBorrows: 0,
  overdueBooks: 0,
  recentActivities: [],
  isLoading: false,
  error: null,

  fetchDashboardData: async (role) => {
    set({ isLoading: true, error: null });

    try {
      if (["admin", "librarian"].includes(role)) {
        const [booksRes, membersRes, overdueRes, borrowRes] = await Promise.all(
          [getBooks(), getMembers(), getOverdueRecords(), getBorrowRecords()]
        );

        const rawBorrows = await getBorrowRecords();
        const today = new Date();

        const borrows = rawBorrows.map((borrow) => {
          const due = new Date(borrow.due_date);
          const returned = borrow.return_date !== null;
          let status = "ACTIVE";
          if (returned) status = "RETURNED";
          else if (due < today) status = "OVERDUE";

          return {
            ...borrow,
            status,
          };
        });

        const activeCount = borrows.filter((borrow) => borrow.status === "ACTIVE").length;
        const overdueCount = borrows.filter(
          (borrow) => borrow.status === "OVERDUE"
        ).length;

        const recent = borrowRes.sort((a, b) => b.id - a.id).slice(0, 5);

        set({
          totalBooks: booksRes.length,
          totalMembers: membersRes.length,
          overdueBooks: overdueCount, 
          totalBorrows: activeCount, 
          recentActivities: recent,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Dashboard data fetch error:", error);
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useDashboardStore;
