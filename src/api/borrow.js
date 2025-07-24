import axios from "./axiosInstance"; 

export const getBorrowRecords = async () => {
  const res = await axios.get("/borrow-records");
  return res.data;
};

export const getMembers = async () => {
  const res = await axios.get("/members");
  return res.data;
};

export const borrowBook = async (payload) => {
  await axios.post("/borrow-records/borrow", payload);
};

export const returnBook = async (borrowRecordId) => {
  await axios.post("/borrow-records/return", {
    borrow_record_id: borrowRecordId,
  });
};

export const getOverdueRecords = async () =>{
  const res = await axios.get("/borrow-records/reports/overdue");
  return res.data;
}

