import Modal from "../core/Modal";
export default function ViewMemberDetailsModal({ show, onClose, member }) {
  const style1 = "bg-green-600 text-white";
  const style2 = "bg-gray-700 text-white";

  if (!show || !member) return null;

  return (
    <Modal
      show={show}
      onClose={onClose}
      title={member.name}
      description="Member Details"
    >
      <div className="space-y-4 text-sm">
        <div className="text-left">
          <span className="font-semibold">Email:</span> {member.email}
        </div>
        <div className="text-left">
          <span className="font-semibold">Phone:</span> {member.phone}
        </div>
        <div className="text-left">
          <span className="font-semibold">Join Date:</span> {member.join_date}
        </div>
        <div className="text-left">
          <span className={`font-semibold `}>Active Borrows:</span>{" "}
          <span
            className={`px-2 rounded-xl ${
              member.activeBorrowCount !== 0 ? style1 : style2
            }`}
          >
            {member.activeBorrowCount} books
          </span>
        </div>
      </div>
    </Modal>
  );
}
