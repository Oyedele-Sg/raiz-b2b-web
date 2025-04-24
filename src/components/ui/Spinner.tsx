import React from "react";

const Spinner = ({ className }: { className?: string }) => {
  return (
    // <div className="absolute inset-0 flex items-center justify-center ">
    <div
      aria-label="Loading"
      className={`loader animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary2 ${className}`}
    />
    // </div>
  );
};

export default Spinner;
