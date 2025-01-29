"use client";
import Overlay from "@/components/ui/Overlay";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  close: () => void;
}

const SideModalWrapper = ({ children, close }: Props) => {
  return (
    <Overlay close={close}>
      <div className="h-screen p-[30px] bg-raiz-gray-50 rounded-tl-[36px] rounded-bl-[36px] justify-start items-center gap-2 inline-flex fixed right-0 top-0 bottom-0 w-[28.57%]">
        {children}
      </div>
    </Overlay>
  );
};

export default SideModalWrapper;
