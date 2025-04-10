import * as motion from "motion/react-client";
import React, { ReactNode } from "react";

const Overlay = ({
  children,
  width,
  height,
  close,
  className,
}: {
  children: ReactNode;
  width?: string;
  height?: string;
  close: () => void;
  className?: string;
}) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.25,
        ease: "easeInOut",
      }}
      key="overlay"
      onClick={close}
      className={`fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)]  z-50 ${className}`}
    >
      <section
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{
          width: width || "auto",
          height: height || "auto",
        }}
        className={`bg-white rounded-[36px]  overflow-y-auto no-scrollbar w-[90%] md:w-[${
          width || "auto"
        }]`}
      >
        {children}
      </section>
    </motion.section>
  );
};

export default Overlay;
