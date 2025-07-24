import Modal from "./Modal";
import Button from "./Button";

export default function ConfirmModal({ show, title, message, onConfirm, onCancel }) {
  return (
    <Modal
      show={show}
      onClose={onCancel}
      title={title}
      description={message}
      footer={
        <div className="flex justify-end gap-2">
          <Button text="Cancel" action="cancel" onClick={onCancel} />
          <Button text="Delete" action="delete" onClick={onConfirm} />
        </div>
      }
    >
    </Modal>
  );
}
