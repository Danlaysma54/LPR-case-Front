import "./ModalWindow.css";

import React from "react";

import CloseIcon from "src/assets/svgs/CloseIcon";

export type ModalWindowProps = {
  children: React.ReactNode;
  isOpened?: boolean;
  onClose?: () => void;
};

const ModalWindow: React.FC<ModalWindowProps> = ({
  children,
  isOpened = false,
  onClose,
}) => {
  if (!isOpened) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <CloseIcon onClose={onClose} className="modal-close-button" />
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
