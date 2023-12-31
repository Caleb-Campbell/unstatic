import React, { ReactNode, FC } from "react";

type ModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: ReactNode;
};

const Modal: FC<ModalProps> = ({ open, setOpen, children }) => {
  if (!open) return null;

  const handleBackgroundClick = () => {
    setOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div
        className="z-50 rounded bg-white p-4"
        onClick={(e) => e.stopPropagation()} // Prevents click inside the modal from closing it
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
