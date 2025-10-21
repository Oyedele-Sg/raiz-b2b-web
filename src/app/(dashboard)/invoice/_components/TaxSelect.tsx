"use client";
import React, { useState } from "react";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";
import { Option } from "@/components/ui/SelectField";
import SearchBox from "@/components/ui/SearchBox";
import Image from "next/image";

interface TaxSelectProps {
  value?: string;
  onChange: (value: string) => void;
  options: Option[];
}

const TaxSelect: React.FC<TaxSelectProps> = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [taxOptions, setTaxOptions] = useState(options);
  const dropdownRef = useOutsideClick(() => setOpen(false));

  const filtered = taxOptions.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddNewTax = () => {
    const newTaxLabel = prompt("Enter new tax percentage (e.g., 15%)");
    if (newTaxLabel) {
      const newValue = newTaxLabel.replace("%", "").trim();
      const newOption = { value: newValue, label: `${newValue}%` };
      setTaxOptions((prev) => [...prev, newOption]);
      onChange(newValue);
      setOpen(false);
    }
  };

  const selectedOption = taxOptions.find((opt) => opt.value === value);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full border border-gray-200 rounded-md bg-white h-[44px] text-left px-3 text-sm flex items-center justify-between"
      >
        <span className={selectedOption ? "text-zinc-900" : "text-gray-400"}>
          {selectedOption ? selectedOption.label : "Select a Tax"}
        </span>
        <Image
          className={`w-3 h-3 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
          src={"/icons/s-arrow-down.svg"}
          alt=""
          width={12}
          height={12}
        />
      </button>

      {open && (
        <div className="absolute w-[236px] z-20 p-2  mt-1 bg-white border border-gray-100 rounded-lg shadow-md">
          <SearchBox
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="max-h-48 overflow-auto">
            {[].length === 0 ? (
              <p className="py-2 text-zinc-700 text-sm">No Results Found</p>
            ) : (
              filtered.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(String(opt.value));
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-violet-50"
                >
                  {opt.label}
                </button>
              ))
            )}
          </div>

          <div className="w-full">
            <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100"></div>
            <button
              type="button"
              onClick={handleAddNewTax}
              className="flex gap-4 items-center  hover:bg-[#EAECFF99] pl-3.5 pr-2.5 py-2  mt-2 w-full"
            >
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path
                  d="M8.00031 2.33334C11.3973 2.33352 14.1663 5.10325 14.1663 8.50034C14.1661 11.8973 11.3972 14.6662 8.00031 14.6664C4.60322 14.6664 1.83349 11.8974 1.83331 8.50034C1.83331 5.10314 4.60311 2.33334 8.00031 2.33334ZM8.00031 4.83334C7.45083 4.83334 7.00031 5.28387 7.00031 5.83334V7.50034H5.33331C4.78384 7.50034 4.33331 7.95086 4.33331 8.50034C4.33349 9.04966 4.78395 9.50034 5.33331 9.50034H7.00031V11.1664C7.00031 11.7158 7.45083 12.1664 8.00031 12.1664C8.54963 12.1662 9.00031 11.7157 9.00031 11.1664V9.50034H10.6663C11.2157 9.50034 11.6661 9.04966 11.6663 8.50034C11.6663 7.95086 11.2158 7.50034 10.6663 7.50034H9.00031V5.83334C9.00031 5.28398 8.54963 4.83352 8.00031 4.83334Z"
                  fill="#0D6494"
                  stroke="#0D6494"
                />
              </svg>
              <span className="text-cyan-700 text-sm font-semibold">
                Add New Tax
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxSelect;
