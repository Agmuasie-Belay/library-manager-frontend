import { useEffect, useState } from "react";
import Modal from "../core/Modal";
import Button from "../core/Button";
import { useBookStore } from "@/store/useBookStore";
import toast from "react-hot-toast";

export default function EditBookModal({ show, onClose, editingBook }) {
  const { editBook, genres } = useBookStore();

  const [book, setBook] = useState(editingBook || null);

  useEffect(() => {
    if (editingBook && show) {
      setBook(editingBook);
    }
  }, [editingBook, show]);

  useEffect(() => {
    if (!show) setBook(null);
  }, [show]);

  const handleUpdate = async () => {
    if (!book) return;
    await editBook(book.id, {
      title: book.title,
      author: book.author,
      published_year: Number(book.published_year),
      available_copies: Number(book.available_copies),
      genre_id: Number(book.genre_id),
    });
    onClose();
  };

  if (!show || !book) return null;

  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Edit Book"
      description="Update the book details"
      footer={
        <div className="flex justify-end gap-2">
          <Button action="cancel" text="Cancel" onClick={onClose} />
          <Button action="submit" text="Update Book" onClick={handleUpdate} />
        </div>
      }
    >
      <div className="space-y-3">
        <div>
          <label className="block mb-1 text-left font-medium">Title</label>
          <input
            type="text"
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-left font-medium">Author</label>
          <input
            type="text"
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-left font-medium">
            Published Year
          </label>
          <input
            type="number"
            min="1800"
            max="2025"
            value={book.published_year}
            onChange={(e) =>
              setBook({ ...book, published_year: e.target.value })
            }
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-left font-medium">
            Available Copies
          </label>
          <input
            type="number"
            value={book.available_copies}
            onChange={(e) =>
              setBook({ ...book, available_copies: e.target.value })
            }
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-left font-medium">Genre</label>
          <select
            value={Number(book.genre.id)}
            onChange={(e) => {
              const selectedId = Number(e.target.value);
              const selectedGenre = genres.find((g) => g.id === selectedId);
              setBook({
                ...book,
                genre_id: selectedGenre.id,
                genre: selectedGenre || { id: "", name: "" }, // fallback if not found
              });
            }}
            className="w-full text-left border border-gray-300 p-2 rounded"
          >
            <option value="">Select Genre</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Modal>
  );
}
