import React from "react";

interface CheckboxProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  bgColor?: string;
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
  className = "",
  bgColor = "bg-black border-black",
  label,
}) => {
  const checkboxId = id || Math.random().toString(36).substr(2, 9);

  return (
    <div className={`relative flex items-center ${className}`}>
      <input
        type="checkbox"
        id={checkboxId}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <label
        htmlFor={checkboxId}
        className={`flex items-center justify-center w-5 h-5 border-2 rounded-md cursor-pointer transition-colors duration-200 ease-in-out ${
          checked ? bgColor : "bg-white border-gray-300"
        }`}
        style={{
          minWidth: "20px",
          minHeight: "20px",
        }}
      >
        {checked && (
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ffffff"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        )}
      </label>
      {label && (
        <span className="ml-2 text-bg-text text-sm max-sm:text-xs">
          {label}
        </span>
      )}
    </div>
  );
};

export default Checkbox;
