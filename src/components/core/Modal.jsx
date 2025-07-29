import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import ActionButton from "./ActionButton";
export default function Modal({
  show = false,
  onClose,
  title,
  description,
  children,
  footer,
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onClose]);
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-400/75 z-50">
      <div
        ref={modalRef}
        className="bg-white  p-4 rounded-md shadow-lg w-full max-w-md z-50"
      >
        <div className="grid md:grid-cols-[7fr_1fr] grid-cols-[1fr_7fr_1fr] justify-center mb-4">
          <div className="md:col-start-1 col-start-2">
            <h2 className="text-xl md:text-left font-semibold">{title}</h2>
            {description && (
              <p className="text-gray-600 md:text-left text-md">
                {description}
              </p>
            )}
          </div>
          <div className="ml-10 mb-2">
            {(!title || !title.includes("Delete"))&&<ActionButton
              onClick={onClose}
              action="close"
              icon={<X size={18} />}
            />}
          </div>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer mt-4">{footer}</div>}
      </div>
    </div>
  );
}