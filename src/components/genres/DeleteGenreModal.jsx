import React from "react";
import Modal from "../core/Modal";
import Button from "../core/Button";
import { useGenreStore } from "@/store/useGenreStore";
export default function DeleteGenreModal({ show, genre, onClose, onConfirm }) {
  if (!genre) return null;
  const { deleteGenre } = useGenreStore();
  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Confirm Deletion"
      description={`Are you sure you want to delete the genre "${genre.name}"?`}
      footer={
        <div className="flex gap-2 justify-end">
          <Button action="cancel" text="Cancel" onClick={onClose} />
          <Button
            action="delete"
            text="Delete"
            type="submit"
            onClick={() => {
              deleteGenre(genre.id);
              //onConfirm(genre.id);
              onClose();
            }}
          />
        </div>
      }
    />
  );
}
