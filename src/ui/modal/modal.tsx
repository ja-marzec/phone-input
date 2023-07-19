import { ReactNode, useEffect } from "react";
import { Portal } from "../portal";
import FocusTrap from "focus-trap-react";
import css from "./modal.module.scss";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

export const Modal = ({ children, isOpen, handleClose }: ModalProps) => {
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
    if (e.target.id === "modal") {
      handleClose();
    }
  };

  return (
    <Portal>
      <FocusTrap>
        <dialog className={css.modal} onClick={closeOnClickOutside} id="modal">
          <div className={css.modalContent}>{children}</div>
        </dialog>
      </FocusTrap>
    </Portal>
  );
};
