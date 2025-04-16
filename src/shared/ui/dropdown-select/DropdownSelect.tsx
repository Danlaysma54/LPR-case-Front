import React, { useState } from "react";

import DownArrow from "@/assets/svgs/DownArrow";
import UpArrow from "@/assets/svgs/UpArrow";

type DropdownSelectProps<T extends Record<string, unknown>> = {
  items: T[];
  selectedItem: T | null;
  onSelect: (item: T) => void;
  placeholder?: string;
  renderItem?: (item: T) => React.ReactNode;
  childrenKey?: keyof T;
  displayKey?: keyof T;
  className?: string;
};

const DropdownSelect = <T extends Record<string, unknown>>({
  items,
  selectedItem,
  onSelect,
  placeholder = "Select an item",
  renderItem,
  childrenKey = "children",
  displayKey = "name",
  className = "",
}: DropdownSelectProps<T>) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  );

  const toggleExpand = (itemId: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleSelect = (item: T) => {
    onSelect(item);
    setDropdownOpen(false);
  };

  const renderNestedItems = (items: T[], level = 0) => {
    return items.map((item) => (
      <li key={item[displayKey] as string} className="custom-select__item">
        <div
          className="custom-select__item"
          style={{ paddingLeft: `${level * 20}px` }}
        >
          {item[childrenKey] && Array.isArray(item[childrenKey]) ? (
            <button
              type="button"
              className="custom-select__button"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(item[displayKey] as string);
              }}
              aria-label={
                expandedItems[item[displayKey] as string]
                  ? "Collapse"
                  : "Expand"
              }
            >
              {expandedItems[item[displayKey] as string] ? (
                <UpArrow />
              ) : (
                <DownArrow />
              )}
            </button>
          ) : null}
          <button
            type="button"
            className={`custom-select__option ${
              selectedItem?.[displayKey] === item[displayKey] ? "selected" : ""
            }`}
            onClick={() => handleSelect(item)}
          >
            {renderItem
              ? renderItem(item)
              : (item[displayKey] as React.ReactNode)}
          </button>
        </div>
        {expandedItems[item[displayKey] as string] &&
        item[childrenKey] &&
        Array.isArray(item[childrenKey]) ? (
          <ul className="custom-select__nested">
            {renderNestedItems(item[childrenKey] as T[], level + 1)}
          </ul>
        ) : null}
      </li>
    ));
  };

  return (
    <div
      className={`custom-select ${className}`}
      onClick={() => setDropdownOpen(!isDropdownOpen)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setDropdownOpen(!isDropdownOpen);
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isDropdownOpen}
      aria-haspopup="listbox"
    >
      <div className="custom-select__selected">
        {selectedItem
          ? (selectedItem[displayKey] as React.ReactNode)
          : placeholder}
      </div>
      {isDropdownOpen ? (
        <ul className="custom-select__dropdown">{renderNestedItems(items)}</ul>
      ) : null}
    </div>
  );
};

export default DropdownSelect;
