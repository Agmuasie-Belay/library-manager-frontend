import { useBorrowStore } from "@/store/useBorrowStore";
import { useBookStore } from "@/store/useBookStore";
import Modal from "../core/Modal";

import Button from "../core/Button";
import { useRef, useState, useEffect } from "react";
import Select, { components } from "react-select";
import CustomOption from "../core/CustomOption";
import { format } from "date-fns";
import { format as ordinal } from "date-fns/format";
import { Calendar } from "lucide-react";
export default function ReturnBookModal({ showForm, handleClose }) {
  const modalRef = useRef();
  const { borrows, selectedBorrowId, setSelectedBorrowId, returnBook } =
    useBorrowStore();
    const {books, loadBooks} = useBookStore();
  const [selectedBookId, setSelectedBookId] = useState("");
  const style =
    "w-full border border-gray-300 p-2 rounded  focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black";
  useEffect(()=>{
    loadBooks()
  }, [])
    const customStyles = {
    control: (provided, state) => ({
      ...provided,
      outline: "none",
      boxShadow: state.isFocused
        ? "0 0 0 2px black, 0 0 0 4px white" // ring-2 + ring-offset-1 + ring-black
        : "none",
      borderColor: state.isFocused ? "black" : provided.borderColor,
      "&:hover": {
        borderColor: "none",
      },
    }),
  };
  

  const today = format(new Date(), "MMMM do, yyyy");
  const dueDate = format(
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    "MMMM do, yyyy"
  );

  const borrowsWithAuthors = borrows.map((borrow) => {
    const book = books.find((b) => b.id === borrow.book_id);
    return {
      ...borrow,
      author: book?.author || "Unknown",
    };
  });

  const bookOptions = borrowsWithAuthors.map((b) => ({
    value: b.id,
    label: b.book_title,
    sublabel: b.member_name,
    duedate: b.due_date,
    author: b.author,
    opt: "return-book",
  }));
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
            <Select
              options={bookOptions}
              value={bookOptions.find(
                (opt) => opt.value === Number(selectedBookId)
              )}
              onChange={(selected) => setSelectedBookId(selected?.value || "")}
              placeholder="Choose a book to borrow"
              components={{ Option: CustomOption }}
              className={`react-select-container text-left `}
              classNamePrefix="react-select"
              styles={customStyles}
            />
          </div>
          <hr className="text-gray-300" />
          <div className=" text-sm text-left  text-gray-600 mt-2">
            <div>Return Date:</div>
            <div className="flex gap-2">
              <Calendar size={18} />
              <strong>{today}</strong>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
