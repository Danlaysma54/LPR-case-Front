import React, { useEffect, useRef } from "react";

import "./DropdownMenu.css";
import HorizontalMoreIcon from "@/assets/svgs/HorizontalMoreIcon";

export type MenuItem = {
  label: React.ReactNode;
  onClick: () => void;
};

type DropdownMenuProps = {
  items: MenuItem[];
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Реф для отслеживания кликов вне меню

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="dropdown-menu" ref={dropdownRef}>
      <button
        className="dropdown-menu__toggle"
        type="button"
        onClick={toggleMenu}
      >
        <HorizontalMoreIcon />
      </button>
      {isOpen ? (
        <div className="dropdown-menu__items">
          {items.map((item, index) => (
            <button
              key={index}
              className="dropdown-menu__item"
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default DropdownMenu;
