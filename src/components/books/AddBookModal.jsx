import Modal from "../core/Modal";
import { useRef, useState, useEffect } from "react";
import Button from "../core/Button";
import { useBookStore } from "@/store/useBookStore";

export default function AddBookModal({ showForm, handleClose, onSubmit }) {
  const {
    loadGenres,
    genres,
  } = useBookStore();
  const modalRef = useRef();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published_year, setPublishedYear] = useState("");
  const [available_copies, setAvailableCopies] = useState("");
  const [genreId, setGenreId] = useState("");
  const style =
    "w-full border border-gray-300 p-2 rounded  focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500";
  const bookData = {
    title,
    author,
    published_year: published_year,
    available_copies: available_copies,
    genre_id: genreId,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(bookData);
    handleClose();
  };
  useEffect(() => {
    const loadData = async () => {
      const data = await loadGenres();
    };

    loadData();
  }, []);

  return (
    <Modal
      show={showForm}
      onClose={handleClose}
      title="Add New Book"
      description="Enter the details for the new book"
      modalRef={modalRef}
      footer={
        <div className="flex gap-2 justify-end">
          <Button action="cancel" text="Cancel" onClick={handleClose} />
          <Button
            action="submit"
            text="Create Book"
            type="submit"
            form="add-book-form"
          />
        </div>
      }
    >
      <form id="add-book-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-left font-medium mb-1 ">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={style}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-left font-medium mb-1">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className={style}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-left font-medium mb-1">
            Published Year
          </label>
          <input
            type="number"
            value={published_year}
            onChange={(e) => setPublishedYear(e.target.value)}
            className={style}
            placeholder="Year (min 1800)"
            min="1800"
            max="2025"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-left font-medium mb-1">
            Available Copies
          </label>
          <input
            type="number"
            value={available_copies}
            onChange={(e) => setAvailableCopies(e.target.value)}
            className={style}
            min="1"
            placeholder="Copies (min 1)"
            required
          />
        </div>
        <label className="block text-left font-medium mb-1">Genre</label>
        <select
          value={genreId}
          onChange={(e) => setGenreId(e.target.value)}
          className={style}
          required
        >
          <option value="">Select a genre</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </form>
    </Modal>
  );
}
