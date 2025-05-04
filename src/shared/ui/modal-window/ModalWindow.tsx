import "./ModalWindow.css";

import React from "react";

import CloseIcon from "src/assets/svgs/CloseIcon";

export type ModalWindowProps = {
  children: React.ReactNode;
  isOpened?: boolean;
  onClose?: () => void;
  className?: string;
};

const ModalWindow: React.FC<ModalWindowProps> = ({
  children,
  isOpened = false,
  onClose,
  className,
}) => {
  if (!isOpened) return null;
  return (
    <div className="modal-overlay">
      <div className={className ? `${className}` : "modal-container"}>
        <CloseIcon onClose={onClose} className="modal-close-button" />
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
