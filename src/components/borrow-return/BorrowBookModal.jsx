import Modal from "../core/Modal";
import { useRef, useState, useEffect } from "react";
import Button from "../core/Button";
import { useBookStore } from "@/store/useBookStore";
import { useBorrowStore } from "@/store/useBorrowStore";
import { useAuthStore } from "@/store/useAuthStore";
import toast from "react-hot-toast";
export default function BorrowBookModal({ showForm, handleClose }) {
  const modalRef = useRef();
  const [selectedBookId, setSelectedBookId] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const { openBorrowModal, books, members, borrowBook } = useBorrowStore();

  const today = new Date().toISOString().split("T")[0];
  const dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const style =
    "w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 pr-8 focus:ring-offset-1 focus:ring-blue-500";
  const role = useAuthStore((state) => state.role);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    openBorrowModal();
   
 }, []);

  const handleBorrow = async (e) => {
    e.preventDefault();

    const book = books.find((b) => b.id === Number(selectedBookId));
    if (!book || book.available_copies < 1) {
      toast.error("No copies available for the selected book.");
      return;
    }

    await borrowBook({
      book_id: Number(selectedBookId),
      member_id: Number(selectedMemberId),
      due_date: dueDate,
    });
    setSelectedBookId("");
    setSelectedMemberId("");
    handleClose();
  };

  return (
    <Modal
      show={showForm}
      onClose={handleClose}
      title="Borrow Book"
      description="Select a book and member to create a new borrow record."
      modalRef={modalRef}
      footer={
        <div className="flex gap-2 justify-end">
          <Button action="cancel" text="Cancel" onClick={handleClose} />
          <Button
            action="submit"
            text="Borrow Book"
            type="submit"
            form="borrow-book-form"
            onClick={handleBorrow}
          />
        </div>
      }
    >
      <form id="borrow-book-form" onSubmit={handleBorrow}>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text- font-medium">
              Select Book
            </label>
            <select
              value={selectedBookId}
              onChange={(e) => setSelectedBookId(e.target.value)}
              className={style}
            >
              <option value="">Choose a book to borrow</option>
              {books.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.title} ({b.available_copies} copies)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-left text-sm font-medium">
              Select Member
            </label>
            <select
              value={selectedMemberId}
              onChange={(e) => setSelectedMemberId(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="">Choose a member</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <div>
              Borrow Date: <strong>{today}</strong>
            </div>
            <div>
              Due Date: <strong>{dueDate}</strong>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
