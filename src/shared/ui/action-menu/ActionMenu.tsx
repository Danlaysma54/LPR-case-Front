import "./ActionMenu.css";

import React from "react";

import DeleteIcon from "@/assets/svgs/DeleteIcon";
import EditIcon from "@/assets/svgs/EditIcon";

type ActionMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
};

const ActionMenu: React.FC<ActionMenuProps> = ({
  onEdit,
  onDelete,
  onClose,
}) => {
  return (
    <button className="action-menu" onClick={(e) => e.stopPropagation()}>
      <button
        className="action-menu__button"
        onClick={() => {
          onEdit();
          onClose();
        }}
      >
        <button className="action-menu__element-block">
          <EditIcon color={"#000"} />
          Редактировать
        </button>
      </button>
      <button
        className="action-menu__button"
        onClick={() => {
          onDelete();
          onClose();
        }}
      >
        <div className="action-menu__element-block">
          <DeleteIcon color={"#C03744"} />
          Удалить
        </div>
      </button>
    </button>
  );
};

export default ActionMenu;
