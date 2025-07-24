import React, { useState, useEffect } from "react";
import Modal from "../core/Modal";
import Button from "../core/Button";
export default function AddGenreModal({ show, onClose, onSubmit }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (show) setName("");
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
      onSubmit({ name });
    }
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Add Genre"
      description="Enter the name for the new genre."
      footer={
        <div className="flex gap-2 justify-end">
          <Button action="cancel" text="Cancel" onClick={onClose} />
          <Button
            action="submit"
            text="Create Genre"
            type="submit"
            onClick={handleSubmit}
          />
        </div>
      }
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Genre name"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </Modal>
  );
}
