import React, { useEffect, useState } from "react";
import BorrowReturnCard from "./BorrowReturnCard";
import { ArrowRightLeftIcon, X } from "lucide-react";
import Header from "../core/Header";
import BorrowBookModal from "./BorrowBookModal";
import { useBorrowStore } from "@/store/useBorrowStore";
import ReturnBookModal from "./ReturnBookModal";

export default function BorrowReturn() {
  const borrows = useBorrowStore((s) => s.borrows);
  const setSelectedBorrowId = useBorrowStore((s) => s.setSelectedBorrowId);
  const { loadBorrowRecords, openBorrowModal, isLoading, error } =
    useBorrowStore();

  const [showModal, setShowModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  useEffect(() => {
    loadBorrowRecords();
  }, []);
  const handleCloseReturnModal = () => {
    setShowReturnModal(false);
  };

  const handleCloseBorrowModal = async () => {
    setShowModal(false);
    await loadBorrowRecords(); //updates the rendering
    await openBorrowModal(); //updates stats
  };
  return (
    <div>
      <div className="flex flex-row justify-between ">
        <Header
          title="Borrow & Return"
          description="Manage book borrowing and return operations"
        />
        <div className="flex flex-col md:flex-row gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="bg-black h-fit text-white p-2 pl-4 pr-4 mt-6 rounded-md hover:bg-gray-700"
          >
            <div className="flex flex-row gap-1 min-w-30">
              <ArrowRightLeftIcon size={20} /> <span>Borrow Book</span>
            </div>
          </button>
          <button
            onClick={() => setShowReturnModal(true)}
            className="bg-white md:ml-2 h-fit p-2 pl-4 pr-4 md:mt-6 rounded-md hover:bg-gray-200 border border-gray-200"
          >
            <div className="flex flex-row gap-1 min-w-30">
              <ArrowRightLeftIcon size={20} /> <span>Return Book</span>
            </div>
          </button>
        </div>
      </div>

      {!error ? (
        isLoading ? (
          <div className="w-full flex flex-col gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-36 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <div className=" w-full flex flex-col gap-6">
            {borrows.map((br, i) => (
              <BorrowReturnCard
                key={i}
                title={br.book_title}
                status={br.status}
                member={br.member_name}
                borrow_date={br.borrow_date}
                due_date={br.due_date}
                return_date={br.returned_date}
                onReturnClick={() => {
                  setSelectedBorrowId(br.id);
                  setShowReturnModal(true);
                }}
              />
            ))}
          </div>
        )
      ) : (
        <div className="bg-red-100 text-red-800 p-3 rounded my-4">
          Failed to load data. Please refresh or try again later.
        </div>
      )}

      <BorrowBookModal
        showForm={showModal}
        handleClose={handleCloseBorrowModal}
      />
      <ReturnBookModal
        showForm={showReturnModal}
        handleClose={handleCloseReturnModal}
      />
    </div>
  );
}
