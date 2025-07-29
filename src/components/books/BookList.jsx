import { useEffect, useState } from "react";
import InfoCard from "../core/InfoCard";
import { Edit, Eye, Trash2Icon } from "lucide-react";
import ActionButton from "../core/ActionButton";
import Button from "../core/Button";
import InfoCardAction from "../core/InfoCardAction";
import InfoCardBody from "../core/InfoCardBody";
import InfoCardHeader from "../core/InfoCardHeader";
import SearchBar from "../core/SearchBar";
import Header from "../core/Header";
import AddBookModal from "./AddBookModal";
import ViewBookDetailsModal from "./ViewBookDetailsModal";
import EditBookModal from "./EditBookModal";
import ConfirmModal from "../core/ConfirmModal";
import { useBookStore } from "@/store/useBookStore";
import { useAuthStore } from "@/store/useAuthStore";

export default function BookList() {
  const {
    books,
    loadBooks,
    loadGenres,
    addBook,
    removeBook,
    isLoading,
    error,
  } = useBookStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editingBook, setEditingBook] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);

  useEffect(() => {
    if (user) {
      document.title = "Books | Library Manager"
      loadBooks();
      loadGenres();
    }
  }, [role]);

  const handleClose = () => {
    setShowForm(false);
  };
  const handleEditClose = async () => {
    setShowEditModal(false);
    setEditingBook(null);
    await loadBooks();
  };
  const handleSubmit = async (bookData) => {
    await addBook(bookData);
    await loadBooks();
    await loadGenres();
    setShowForm(false);
  };

  const handleDeleteConfirmed = async () => {
    if (bookToDelete) {
      await removeBook(bookToDelete.id);
      setShowConfirmModal(false);
      setBookToDelete(null);
    }
  };

  const filteredBooks = books.filter((book) => {
    const term = searchTerm.toLowerCase().trim();
    return (
      book.title?.toLowerCase().includes(term) ||
      book.author?.toLowerCase().includes(term) ||
      book.genre.name?.toLowerCase().includes(term)
    );
  });
 
  return (
    <div>
      <div className="flex flex-row justify-between ">
        <Header
          title="Books"
          description="Manage your library's book collection"
        />
        <Button
          text="+ Add Book"
          action="generic"
          onClick={() => setShowForm(true)}
          className=" h-10"
        />
      </div>
      <SearchBar
        searchTerm={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search books by title, author, genre..."
      />
      {!error ? (
        isLoading ? (
          <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, i) => (
                <InfoCard key={i}>
                  <InfoCardHeader
                    key={book.id}
                    title={book.title}
                    subtitle={book.author}
                    subtitlePrefix="By: "
                    status={[
                      {
                        text:
                          book.available_copies > 0
                            ? "Available"
                            : "Out of Stock",
                        className:
                          book.available_copies > 0
                            ? "bg-black text-white"
                            : "bg-red-600 text-white",
                      },
                    ]}
                  />
                  <InfoCardBody
                    metaRows={[
                      { label: "Genre", value: book.genre.name },
                      { label: "Published", value: book.published_year },
                      {
                        label: "Available Copies",
                        value: book.available_copies,
                      },
                    ]}
                  />
                  <InfoCardAction
                    actions={[
                      <ActionButton
                        action="view"
                        onClick={() => setSelectedBook(book)}
                        icon={<Eye size={18} />}
                      />,
                      <ActionButton
                        action="edit"
                        icon={<Edit size={18} />}
                        onClick={() => {
                          setEditingBook(book);
                          setShowEditModal(true);
                        }}
                      />,
                      <ActionButton
                        action="delete"
                        icon={<Trash2Icon size={18} />}
                        onClick={() => {
                          setBookToDelete(book); // set the book to delete
                          setShowConfirmModal(true);
                        }}
                      />,
                    ]}
                  />
                </InfoCard>
              ))
            ) : (
              <>
                {searchTerm && (
                  <div className="grid col-span-full justify-center align-middle text-gray-500 py-8 mx-auto p-3 rounded my-4">
                    No books match your search.
                  </div>
                )}
              </>
            )}
          </div>
        )
      ) : (
        <div className="bg-red-100 text-red-800 p-3 rounded my-4">
          Failed to load books. Please refresh or try again later.
        </div>
      )}
      <AddBookModal
        showForm={showForm}
        handleClose={handleClose}
        onSubmit={handleSubmit}
      />

      <ViewBookDetailsModal
        show={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        book={selectedBook}
      />

      <EditBookModal
        bookId={editingBook?.id}
        editingBook={editingBook}
        show={showEditModal}
        onClose={handleEditClose}
      />

      <ConfirmModal
        show={showConfirmModal}
        title="Delete Book"
        message={`Are you sure you want to delete "${bookToDelete?.title}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirmed}
        onCancel={() => {
          setShowConfirmModal(false);
          setBookToDelete(null);
        }}
      />
    </div>
  );
}
