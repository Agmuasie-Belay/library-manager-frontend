import Modal from "../core/Modal";
import { useState } from "react";
import Button from "../core/Button";

export default function AddStaffModal({ showForm, handleClose, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const roles = [
    { id: 1, name: "admin" },
    { id: 2, name: "librarian" },
  ];
  const inputStyle =
    "w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500";

  const handleSubmit = (e) => {
    e.preventDefault();
    const staffData = {
      name,
      email,
      role,
      join_date: joinDate,
    };
    onSubmit(staffData);
    resetForm();
    handleClose();
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setRole("");
    setJoinDate("");
  };

  return (
    <Modal
      show={showForm}
      onClose={handleClose}
      title="Add New Staff"
      description="Enter the details for the new staff"
      footer={
        <div className="flex gap-2 justify-end">
          <Button action="cancel" text="Cancel" onClick={handleClose} />
          <Button
            action="submit"
            text="Create Staff"
            type="submit"
            form="add-staff-form"
          />
        </div>
      }
    >
      <form id="add-staff-form" onSubmit={handleSubmit}>
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
          <label className="block text-left font-medium mb-1 max-w-5xl">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={inputStyle}
            required
          >
            <option value="" className="max-w-48">
              Select a role
            </option>
            {roles.map((role) => (
              <option key={role.id} value={role.id} className="max-w-48">
                {role.name}
              </option>
            ))}
          </select>
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
