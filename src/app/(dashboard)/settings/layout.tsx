import React, { ReactNode } from "react";
import SideLayout from "./_components/SideLayout";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="border-t border-[#dedce2] w-full flex gap-[25px] px-8 -ml-8 h-full relative ">
      <SideLayout />
      <section className="w-[77%] ml-6 xl:ml-8 pt-8 ">{children}</section>
    </section>
  );
};

export default layout;
