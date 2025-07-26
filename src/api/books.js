import axios from "./axiosInstance";
export const getBooks = async () => {
  const res = await axios.get("/books");
  return res.data;
};

export const getGenres = async () => {
  const res = await axios.get("/genres");
  return res.data;
};

export const deleteBook = async (bookId) => {
  await axios.delete(`/books/${bookId}`);
};

export const createBook = async (bookData) => {
  const payload = {
    ...bookData,
    published_year: Number(bookData.published_year),
    available_copies: Number(bookData.available_copies),
    genre_id: Number(bookData.genre_id),
  };
  const res = await axios.post("/books", payload);
  return res.data;
};

export const updateBook = async (bookId, updatedData) => {
  const res = await axios.patch(`/books/${bookId}`, updatedData);
  return res.data;
};
