import React from "react";

interface RadioProps {
  checked: boolean;
  onChange: () => void;
  className?: string;
  readOnly?: boolean;
}

const Radio: React.FC<RadioProps> = ({
  checked,
  onChange,
  className,
  readOnly,
}) => {
  return (
    <button
      type="button"
      className={`w-5 h-5 border-2 rounded-full flex items-center justify-center cursor-pointer ${
        checked ? "border-indigo-900 border-[5px]" : "border-gray-300"
      } ${className}`}
      onClick={onChange}
      disabled={readOnly}
    />
  );
};

export default Radio;
