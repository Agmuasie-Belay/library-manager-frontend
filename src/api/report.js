import axiosInstance from "./axiosInstance";

export const getOverdueBooks = () =>
  axiosInstance.get("/borrow-records/reports/overdue");

export const getPopularGenres = () =>
  axiosInstance.get("/borrow-records/reports/popular-genres");

export const getSummary = () =>
  axiosInstance.get("/borrow-records/reports/summary");
