import "./_modal.scss";
import { Portal } from "../portal";
import { ReactNode, useEffect } from "react";
import FocusTrap from "focus-trap-react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  handleClose: () => void;
  onUnmount?: () => void
}

export const Modal = ({ children, isOpen, handleClose, onUnmount }: ModalProps) => {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  const closeOnClickOutside = (e: any) => {
    e.stopPropagation()
    if(e.target.classList.contains('modal')) {
        handleClose()
    }
  };

  return (
    <Portal>
      <FocusTrap>
        <dialog className="modal" onClick={closeOnClickOutside}>
          <div className="modal-content">{children}</div>
        </dialog>
      </FocusTrap>
    </Portal>
  );
};
