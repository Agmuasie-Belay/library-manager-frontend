import React, { useState, useEffect } from "react";
import Modal from "../core/Modal";
import Button from "../core/Button";
import { useGenreStore } from "@/store/useGenreStore";

export default function EditGenreModal({ show, genre, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const { updateGenre } = useGenreStore();
  useEffect(() => {
    if (genre) setName(genre.name || "");
  }, [genre]);
 const style =
    "w-full border border-gray-300 p-2 rounded  focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black";
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
      onSubmit({ name });
      updateGenre(genre.id, name);
    }
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Update Genre"
      description="Edit the name of the genre."
      footer={
        <div className="flex justify-end gap-2">
          <div className="flex gap-2 justify-end">
            <Button action="cancel" text="Cancel" onClick={onClose} />
            <Button
              action="submit"
              text="Update"
              type="submit"
              onClick={handleSubmit}
            />
          </div>
        </div>
      }
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Genre name"
        className= {style}
        required
      />
    </Modal>
  );
}
