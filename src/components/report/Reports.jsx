import React, { useEffect } from "react";
import {
  BarChart2,
  Calendar,
  TrendingUp,
  User,
  AlertTriangleIcon,
  LineChart,
} from "lucide-react";

import { useReportStore } from "@/store/useReportStore";
import GenreBarChart from "./GenerateBarChart";
export default function Reports() {
  const {
    overdueBooks,
    popularGenres,
    summary,
    loading,
    error,
    getReportData,
  } = useReportStore();
  useEffect(() => {
    getReportData();
  }, []);
  const getDaysOverdue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today - due;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };
  const popularGen = popularGenres.slice(0, 5);

  return (
    <div className="flex flex-col w-full space-y-8">
      <div className="flex flex-col text-left ">
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-gray-600">Library analytics and reports</p>
      </div>
      {!error ? (
        loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-60 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-gray-200 bg-white rounded-lg shadow shadow-gray-200 p-6">
                <div className="flex items-center ">
                  <AlertTriangleIcon className="text-red-500 mr-2" size={20} />
                  <h2 className="text-xl font-semibold">Overdue Books</h2>
                </div>
                <p className="text-gray-500 text-left mb-4">
                  Books that are past their due date
                </p>

                {overdueBooks.length > 0 ? (
                  <div className="space-y-2 h-52 overflow-y-scroll">
                    {overdueBooks.map((book) => (
                      <div
                        key={book.id}
                        className="flex justify-between bg-red-50 rounded-md p-4 last:border-b-0"
                      >
                        <div>
                          <div className="text-left font-medium">
                            {book.book.title}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <User className="mr-1" size={14} />
                            <span>Member: {book.member.name}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Calendar className="mr-1" size={14} />
                            <span>
                              Due:{" "}
                              {new Date(book.due_date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className=" bg-red-800 h-fit px-2 rounded-2xl text-white text-sm mt-1">
                          {getDaysOverdue(book.due_date)} days overdue
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between bg-red-50 rounded-md p-4 last:border-b-0">
                      <div>No overdue books found.</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <BarChart2 className="text-blue-500 mr-2" size={20} />
                  <h2 className="text-xl font-semibold">Popular Genres</h2>
                </div>
                <p className="text-gray-500 text-left mb-2">
                  Most borrowed book genres
                </p>

                {popularGen.length && (
                  <div className="space-y-0">
                    <GenreBarChart data={popularGen} />;
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 ">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between mb-4">
                  <h2 className="text-md font-semibold">
                    Total Borrows This Month
                  </h2>
                  <LineChart className=" mr-2" size={20} />
                </div>

                {summary && (
                  <>
                    <div className="text-2xl text-left font-bold mb-2">
                      {summary.totalBorrowsThisMonth}
                    </div>
                    <div className="flex items-center ">
                      <TrendingUp className="mr-1" size={16} />
                      <span>
                        +{summary.borrows_change_percentage}% from last month
                      </span>
                    </div>
                  </>
                )}
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between mb-4">
                  <h2 className="text-md font-semibold">
                    Average Borrow Duration
                  </h2>
                  <LineChart className=" mr-2" size={20} />
                </div>

                {summary && (
                  <>
                    <div className="text-2xl text-left font-bold mb-2">
                      {summary.averageBorrowDuration} days
                    </div>
                    <div className="flex items-center ">
                      <TrendingUp
                        className="mr-1 transform rotate-180"
                        size={16}
                      />
                      <span>
                        {summary.averageBorrowDuration} days from last month
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between mb-4">
                  <h2 className="text-md font-semibold">Return Rate</h2>
                  <LineChart className=" mr-2" size={20} />
                </div>

                {summary && (
                  <>
                    <div className="text-2xl text-left font-bold mb-2">
                      {summary.returnRate}%
                    </div>
                    <div className="flex items-center ">
                      <TrendingUp className="mr-1" size={16} />
                      <span>
                        +{summary.return_rate_change_percentage}% from last
                        month
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )
      ) : (
        <div className="bg-red-100 text-red-800 p-3 rounded my-4">
          Failed to load reports. Please refresh or try again later.
        </div>
      )}
    </div>
  );
}
