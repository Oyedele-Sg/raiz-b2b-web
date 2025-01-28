import React, { ReactNode } from "react";

const Overlay = ({
  children,
  width,
  height,
  close,
}: {
  children: ReactNode;
  width?: string;
  height?: string;
  close: () => void;
}) => {
  return (
    <section
      onClick={close}
      className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)]  z-50"
    >
      <section
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{
          width: width || "auto",
          height: height || "auto",
        }}
        className="bg-white rounded-[36px]  overflow-y-auto no-scrollbar"
      >
        {children}
      </section>
    </section>
  );
};

export default Overlay;
