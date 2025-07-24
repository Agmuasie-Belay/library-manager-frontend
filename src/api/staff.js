import axiosInstance from "./axiosInstance";

export const getStaff = async () => {
  const response = await axiosInstance.get("/staff");
  return response.data;
};

export const createStaff = async (memberData) => {
  const response = await axiosInstance.post("/staff", memberData);
  return response.data;
};

export const updateStaff = async (id, updatedData) => {
  const response = await axiosInstance.patch(`/staff/${id}`, updatedData);
  return response.data;
};

export const deleteStaff = async (id) => {
  const response = await axiosInstance.delete(`/staff/${id}`);
  return response.data;
};
