import axiosInstance from "./axiosInstance"; 

export const getGenres = async () => {
  const response = await axiosInstance.get("/genres");
  return response.data;
};

export const createGenre = async (genre) => {
  return axiosInstance.post("/genres", genre);
};

export const updateGenre = async (id, genre) => {
  return axiosInstance.patch(`/genres/${id}`, genre);
};

export const deleteGenre = async (id) => {
  return axiosInstance.delete(`/genres/${id}`);
};
