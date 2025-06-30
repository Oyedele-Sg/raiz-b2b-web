"use client";

import React from "react";

interface LabelValueDisplayProps {
  label: string;
  value?: string;
  children?: React.ReactNode;
}

const LabelValueDisplay: React.FC<LabelValueDisplayProps> = ({
  label,
  value,
  children,
}) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <span className="text-center text-gray-500 text-base font-normal leading-normal">
        {label}
      </span>
      {children ? (
        <div className="flex items-center gap-2">{children}</div>
      ) : (
        <p className="text-center text-zinc-900 text-lg font-semibold leading-normal">
          {value}
        </p>
      )}
    </div>
  );
};

export default LabelValueDisplay;
