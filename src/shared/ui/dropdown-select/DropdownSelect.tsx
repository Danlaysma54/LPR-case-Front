import react, { useState } from "react";

// import DownArrow from "@/assets/svgs/DownArrow";
// import UpArrow from "@/assets/svgs/UpArrow";

type DropdownSelectProps<t> = {
  items: t[];
  selectedItem: t | null;
  onSelect: (item: t) => void;
  placeholder?: string;
  renderItem?: (item: t) => react.ReactNode;
};

const DropdownSelect = <T extends { name: string }>({
  items,
  selectedItem,
  onSelect,
  placeholder = "Select an item",
  renderItem,
}: DropdownSelectProps<T>) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleSelect = (item: T) => {
    onSelect(item);
    setDropdownOpen(false);
  };
  console.log(items);
  return (
    <div
      className="custom-select"
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
        {selectedItem ? selectedItem.name : placeholder}
      </div>
      {isDropdownOpen ? (
        <ul className="custom-select__dropdown">
          {items.map((item) => (
            <li key={item.name} className="custom-select__item">
              <button
                type="button"
                className="custom-select__option"
                onClick={() => handleSelect(item)}
              >
                {renderItem ? renderItem(item) : item.name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default DropdownSelect;
