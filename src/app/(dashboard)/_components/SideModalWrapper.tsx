"use client";
import Overlay from "@/components/ui/Overlay";
import React, { ReactNode } from "react";
import * as motion from "motion/react-client";

interface Props {
  children: ReactNode;
  close: () => void;
  wrapperStyle?: string;
}

const SideModalWrapper = ({ children, close, wrapperStyle }: Props) => {
  return (
    <Overlay close={close}>
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 25,
          ease: "easeInOut",
        }}
        key="modal"
        className={`h-screen p-[25px] xl:p-[30px] bg-raiz-gray-50 overflow-y-scroll no-scrollbar rounded-tl-[36px] rounded-bl-[36px] justify-start  gap-2 inline-flex fixed right-0 top-0 bottom-0 w-[75%] sm:w-[50%] lg:w-[31%] xl:w-[28.57%] ${wrapperStyle}`}
      >
        <div className="w-full flex flex-col">{children}</div>
      </motion.div>
    </Overlay>
  );
};

export default SideModalWrapper;
