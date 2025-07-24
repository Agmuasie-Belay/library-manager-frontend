import { useEffect, useState } from "react";
import Modal from "../core/Modal";
import Button from "../core/Button";
import { useStaffStore } from "@/store/useStaffStore";

export default function EditStaffDetailsModal({ show, onClose, editingStaff }) {
  const { updateStaffById } = useStaffStore();

  const [staff, setStaff] = useState(editingStaff || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const roles = ["admin", "librarian"];
  useEffect(() => {
    if (editingStaff && show) {
      setStaff(editingStaff);
    }
  }, [editingStaff, show]);

  useEffect(() => {
    if (!show) setStaff(null);
  }, [show]);

  const handleUpdate = async () => {
    if (!staff) return;
    setIsSubmitting(true);
    try {
      await updateStaffById(staff.id, {
        username: staff.username,
        email: staff.email,
        password: staff.password,
        role: staff.role,
      });
      onClose();
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show || !staff) return null;

  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Edit Staff"
      description="Update the staff's information"
      footer={
        <div className="flex justify-end gap-2">
          <Button action="cancel" text="Cancel" onClick={onClose} />
          <Button
            action="submit"
            text="Update Staff"
            onClick={handleUpdate}
            disabled={isSubmitting}
            form="edit-staff-form"
          />
        </div>
      }
    >
      <form id="edit-staff-form" onSubmit={handleUpdate}>
        <div className="space-y-3">
          <div>
            <label className="block mb-1 text-left font-medium">Name</label>
            <input
              type="text"
              value={staff.username}
              onChange={(e) => setStaff({ ...staff, username: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-left font-medium">Email</label>
            <input
              type="email"
              value={staff.email}
              onChange={(e) => setStaff({ ...staff, email: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-left font-medium">Password</label>
            <input
              type="password"
              value={staff.password || ""}
              onChange={(e) => setStaff({ ...staff, password: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <select
              value={staff.role || ""}
              onChange={(e) => {
                setStaff({ ...staff, role: e.target.value });
              }}
              className="w-full text-left border border-gray-300 p-2 rounded"
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </Modal>
  );
}
