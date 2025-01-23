"use client";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();

  const shouldShowSideNav =
    !pathName.includes("/register") && !pathName.includes("/login");

  return (
    <section className="w-full flex h-full">
      {shouldShowSideNav && <Sidebar />}
      <main
        className={`${
          shouldShowSideNav
            ? "w-[80.555%] left-[19.444%] relative min-h-[100vh] px-8 pt-[30px] "
            : "w-full p-0"
        } `}
      >
        {children}
      </main>
    </section>
  );
};

export default MainLayout;
