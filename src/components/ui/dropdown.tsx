"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface DropdownItem {
  label: string;
  value: string;
}

export default function Dropdown({
  placeholder = "Select an option",
  items = [],
  onChange,
  defaultValue,
}: {
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  items: DropdownItem[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(
    defaultValue
      ? items.find((item) => item.value === defaultValue) || null
      : null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const closeDropdown = useCallback(() => setIsOpen(false), []);

  const handleSelect = (item: DropdownItem) => {
    setSelectedItem(item);
    if (onChange) {
      onChange(item.value);
    }
    closeDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeDropdown]);

  return (
    <div
      className={`relative inline-block text-left w-full max-w-xs p-4`}
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="truncate">
          {selectedItem ? selectedItem.label : placeholder}
        </span>
        <span className="ml-2">▼</span>
      </button>

      {isOpen && (
        <div
          className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 max-h-60 overflow-auto"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1">
            {items.map((item) => (
              <button
                key={item.value}
                className={`block w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                  selectedItem?.value === item.value
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-700"
                }`}
                role="menuitem"
                onClick={() => handleSelect(item)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
