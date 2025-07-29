import Modal from "../core/Modal";
import { useRef, useState, useEffect } from "react";
import Button from "../core/Button";
import { Calendar } from "lucide-react";
import Select, { components } from "react-select";
import { useBorrowStore } from "@/store/useBorrowStore";
import { useAuthStore } from "@/store/useAuthStore";
import toast from "react-hot-toast";
import CustomOption from "../core/CustomOption";
import { format } from 'date-fns';
import { format as ordinal } from 'date-fns/format';
export default function BorrowBookModal({ showForm, handleClose }) {
  const modalRef = useRef();
  const [selectedBookId, setSelectedBookId] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const { openBorrowModal, books, members, borrowBook } = useBorrowStore();
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  const today_disp = format(new Date(), "MMMM do, yyyy") ;
  const today_payload = new Date().toISOString().split('T')[0];
  const dueDate_disp = format(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), "MMMM do, yyyy");
  const dueDate_payload = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const role = useAuthStore((state) => state.role);
  const user = useAuthStore((state) => state.user);
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
      due_date: dueDate_payload,
      
    });
    setSelectedBookId("");
    setSelectedMemberId("");
    handleClose();
  };

  const bookOptions = books.map((b) => ({
    value: b.id,
    label: b.title,
    sublabel: b.available_copies,
    opt: "borrow-book",
  }));

  const memberOptions = members.map((m) => ({
    value: m.id,
    label: m.name,
    sublabel: m.email,
    opt: "borrow-member"
  }));

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
            <label className="block text-sm text-left font-medium">
              Select Book
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

          <div>
            <label className="block text-left text-sm font-medium">
              Select Member
            </label>
            <Select
              options={memberOptions}
              value={memberOptions.find(
                (opt) => opt.value === Number(selectedMemberId)
              )}
              onChange={(selected) => setSelectedMemberId(selected?.value || "")}
              placeholder="Choose a member"
              components={{ Option: CustomOption }}
              className={`react-select-container text-left `}
              classNamePrefix="react-select"
              styles={customStyles}
            />
          </div>
              <hr className="text-gray-300"/>
          <div className="flex text-left  justify-between text-sm px-6 text-gray-600 mt-2">
            <div className="flex gap-2" >
              <Calendar size={18} className="mt-3"/>
              <div>
              Borrow Date:<br/> <strong>{today_disp}</strong>
            </div>
            </div>
            <div className="flex gap-2" >
              <Calendar size={18} className="mt-3"/>
              <div>
              Due Date:<br/> <strong>{dueDate_disp}</strong>
            </div>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
