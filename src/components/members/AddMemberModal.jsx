import Modal from "../core/Modal";
import { useState } from "react";
import Button from "../core/Button";

export default function AddMemberModal({ showForm, handleClose, onSubmit }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [joinDate, setJoinDate] = useState("");

  const inputStyle =
    "w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500";

  const handleSubmit = (e) => {
    e.preventDefault();
    const memberData = {
      name,
      email,
      phone,
      join_date: joinDate,
    };
    onSubmit(memberData);
    resetForm();
    handleClose();
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setJoinDate("");
  };

  return (
    <Modal
      show={showForm}
      onClose={handleClose}
      title="Add New Member"
      description="Enter the details for the new member"
      //modalRef={modalRef}
      footer={
        <div className="flex gap-2 justify-end">
          <Button action="cancel" text="Cancel" onClick={handleClose} />
          <Button
            action="submit"
            text="Create Member"
            type="submit"
            form="add-member-form"
          />
        </div>
      }
    >
      <form id="add-member-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-left font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputStyle}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-left font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputStyle}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-left font-medium mb-1">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputStyle}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-left font-medium mb-1">Join Date</label>
          <input
            type="date"
            value={joinDate}
            onChange={(e) => setJoinDate(e.target.value)}
            className={inputStyle}
            required
          />
        </div>
      </form>
    </Modal>
  );
}
