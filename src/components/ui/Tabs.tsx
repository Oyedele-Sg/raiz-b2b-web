import React from "react";

interface TabsProps<T extends string> {
  options: { label: string; value: T }[];
  selected: T;
  onChange: (value: T) => void;
  className?: string;
}

const Tabs = <T extends string>({
  options,
  selected,
  onChange,
  className,
}: TabsProps<T>) => {
  return (
    <div
      className={`flex h-11 p-1 bg-raiz-gray-100 rounded-2xl justify-center items-center gap-1 mt-5 transition-all duration-200 ease-in-out mb-5 ${className}`}
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`p-2 rounded-xl w-1/2 transition-all duration-300 ease-in-out text-sm ${
            selected === option.value
              ? "bg-raiz-gray-50 text-raiz-gray-950 font-bold leading-[16.80px]"
              : "text-raiz-gray-500 leading-tight"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
