"use client";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import React, { useState } from "react";

interface DiscountInputProps {
  value: number;
  mode?: "percent" | "value";
  onChange: (val: number) => void;
  onModeChange?: (mode: "percent" | "value") => void;
  className?: string;
}

const DiscountInput: React.FC<DiscountInputProps> = ({
  value,
  mode: initialMode = "percent",
  onChange,
  onModeChange,
  className = "",
}) => {
  const [mode, setMode] = useState<"percent" | "value">(initialMode);
  const [open, setOpen] = useState(false);
  const { selectedCurrency } = useCurrencyStore();
  const handleModeChange = (newMode: "percent" | "value") => {
    setMode(newMode);
    setOpen(false);
    if (onModeChange) onModeChange(newMode);
  };

  return (
    <div className={`relative flex ${className}`}>
      {/* Input */}
      <input
        type="number"
        min={0}
        className="w-full border text-right rounded-l-lg p-2 h-[50px] text-sm text-gray-900 bg-white focus:outline-none"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />

      {/* Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-12 border-l-0 border rounded-r-lg h-[50px] font-brSonoma text-xs flex items-center justify-center text-zinc-700 bg-gray-100"
        >
          {mode === "percent" ? "%" : selectedCurrency?.name}
          <svg
            className="ml-1"
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 5L9 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {open && (
          <div className="absolute right-0 mt-1 w-16 bg-white border rounded-lg shadow-md z-10">
            <button
              type="button"
              onClick={() => handleModeChange("percent")}
              className={`block w-full text-center py-2 text-sm hover:bg-gray-100 ${
                mode === "percent" ? "bg-gray-50 font-medium" : ""
              }`}
            >
              %
            </button>
            <button
              type="button"
              onClick={() => handleModeChange("value")}
              className={`block w-full text-center py-2 text-sm hover:bg-gray-100 ${
                mode === "value" ? "bg-gray-50 font-medium" : ""
              }`}
            >
              {selectedCurrency?.name}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscountInput;
