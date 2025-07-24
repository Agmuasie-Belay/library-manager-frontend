import { useBorrowStore } from "@/store/useBorrowStore";
import Modal from "../core/Modal";
import Button from "../core/Button";
import { useRef } from "react";

export default function ReturnBookModal({showForm, handleClose}) {
    const modalRef = useRef();
  const {
    borrows,
    selectedBorrowId,
    setSelectedBorrowId,
    returnBook,
  } = useBorrowStore();

  const today = new Date().toLocaleDateString();

return (
    <Modal
      show={showForm}
      onClose={handleClose}
      title="Return Book"
      description="Select a borrowed book to mark as returned."
      modalRef={modalRef}
      footer={
        <div className="flex gap-2 justify-end">
          <Button action="cancel" text="Cancel" onClick={handleClose} />
          <Button
            action="submit"
            text="Return Book"
            type="submit"
            form="borrow-book-form"
           onClick={returnBook}
          />
        </div>
      }
    >
      <form id="borrow-book-form"> 
      
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium">
              Select Book to Return
            </label>
            <select
              value={selectedBorrowId}
              onChange={(e) => setSelectedBorrowId(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="">Choose a book to return</option>
              {borrows
                .filter((b) => b.status === "ACTIVE" || b.status === "OVERDUE")
                .map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.book_title} (Borrowed by: {b.member_name})
                  </option>
                ))}
            </select>
          </div>

        
          <div className="text-sm text-gray-600 mt-2">
            Return Date: <strong>{today}</strong>
          </div>
        </div>

      
      </form>
    </Modal>
  );
}



