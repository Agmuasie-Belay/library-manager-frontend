import axiosInstance from "./axiosInstance";

export const getMembers = async () => {
  const response = await axiosInstance.get("/members");
  return response.data;
};

export const createMember = async (memberData) => {
  const response = await axiosInstance.post("/members", memberData);
  return response.data;
};

export const updateMember = async (id, updatedData) => {
  const response = await axiosInstance.patch(`/members/${id}`, updatedData);
  return response.data;
};

export const deleteMember = async (id) => {
  const response = await axiosInstance.delete(`/members/${id}`);
  return response.data;
};
