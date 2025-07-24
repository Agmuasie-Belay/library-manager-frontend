import Modal from "../core/Modal";
export default function ViewStaffDetailsModal({ show, onClose, staff }) {
  const style1 = "bg-red-600 text-white";
  const style2 = "bg-gray-700 text-white";

  if (!show || !staff) return null;

  return (
    <Modal
      show={show}
      onClose={onClose}
      title={staff.username}
      description="Staff Details"
    >
      <div className="space-y-4 text-sm">
        <div className="text-left">
          <span className="font-semibold">Email:</span> {staff.email}
        </div>
        <div className="text-left">
          <span className="font-semibold">Phone:</span> {staff?.phone}
        </div>
        <div className="text-left">
          <span className="font-semibold">Join Date:</span> {staff?.join_date}
        </div>
        <div className="text-left">
          <span className="font-semibold">Role:</span>  <span className={`bg-black text-white rounded-2xl px-2 ${staff.role==="admin"?style1:style2}`}>{staff?.role}</span>
        </div>
        <div className="text-left">
          <span className="font-semibold">Status:</span> <spam className=" bg-black text-white rounded-2xl px-2">Active</spam>
        </div>
      </div>
    </Modal>
  );
}
