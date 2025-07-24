import { useEffect, useState } from "react";
import Modal from "../core/Modal";
import Button from "../core/Button";
import { useMemberStore } from "@/store/useMemberStore";

export default function EditMemberModal({ show, onClose, editingMember }) {
  const { updateMemberById } = useMemberStore();

  const [member, setMember] = useState(editingMember || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingMember && show) {
      setMember(editingMember);
    }
  }, [editingMember, show]);

  useEffect(() => {
    if (!show) setMember(null);
  }, [show]);

  const handleUpdate = async () => {
    if (!member) return;
    setIsSubmitting(true);
    try {
      await updateMemberById(member.id, {
        name: member.name,
        email: member.email,
        phone: member.phone,
      });
      onClose();
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show || !member) return null;

  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Edit Member"
      description="Update the member's information"
      footer={
        <div className="flex justify-end gap-2">
          <Button action="cancel" text="Cancel" onClick={onClose} />
          <Button action="submit" text="Update Member" onClick={handleUpdate} disabled={isSubmitting} />
        </div>
      }
    >
      <div className="space-y-3">
        <div>
          <label className="block mb-1 text-left font-medium">Name</label>
          <input
            type="text"
            value={member.name}
            onChange={(e) => setMember({ ...member, name: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-left font-medium">Email</label>
          <input
            type="email"
            value={member.email}
            onChange={(e) => setMember({ ...member, email: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-left font-medium">Phone</label>
          <input
            type="text"
            value={member.phone}
            onChange={(e) => setMember({ ...member, phone: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
      </div>
    </Modal>
  );
}
