import React from "react";

interface Props {
  text: string;
}

const EmptyList = ({ text }: Props) => {
  return (
    <div className="flex items-center gap-[14px]">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="24" fill="#EBEDF4" />
        <path
          d="M34 24C34 29.52 29.52 34 24 34C18.48 34 14 29.52 14 24C14 18.48 18.48 14 24 14C29.52 14 34 18.48 34 24Z"
          stroke="#443852"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M27.7099 27.1798L24.6099 25.3298C24.0699 25.0098 23.6299 24.2398 23.6299 23.6098V19.5098"
          stroke="#443852"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className=" text-raiz-gray-600 text-sm font-semibold o">{text}</p>
    </div>
  );
};

export default EmptyList;
