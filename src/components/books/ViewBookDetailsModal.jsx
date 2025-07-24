import Modal from "../core/Modal";
export default function ViewBookDetailsModal({ show, onClose, book }) {
  const style1 = "bg-green-600 text-white";
  const style2 = "bg-gray-700 text-white";

  if (!show || !book) return null;

  return (
    <Modal
      show={show}
      onClose={onClose}
      title={book.title}
      description="Book Details"
    >
      <div className="space-y-4 text-sm">
        <div className=" text-left ">
          <span className="font-semibold">Author:</span> {book.author}
        </div>
        <div className=" text-left ">
          <span className="font-semibold">Genre:</span> {book.genre.name}
        </div>
        <div className=" text-left ">
          <span className="font-semibold">Published:</span>{" "}
          {book.published_year}
        </div>
        <div className=" text-left ">
          <span className="font-semibold">Available:</span>{" "}
          {book.available_copies} Copies
        </div>
        <div className=" text-left mb-4 ">
          <span className="font-semibold">
            Status:{" "}
            {book.available_copies > 0 ? (
              <span className="bg-green-600 text-white rounded-full px-1 font-medium">
                Available
              </span>
            ) : (
              <span className="bg-red-600 text-white rounded-full px-1 font-medium">
                Out of Stock
              </span>
            )}
          </span>
        </div>
      </div>
    </Modal>
  );
}
