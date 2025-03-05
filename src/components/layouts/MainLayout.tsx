"use client";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();

  const shouldShowSideNav =
    !pathName.includes("/register") &&
    pathName !== "/login" &&
    !pathName.includes("/forgot-password");

  return (
    <section className="w-full flex h-full">
      {shouldShowSideNav && <Sidebar />}
      <main
        className={`${
          shouldShowSideNav
            ? "w-[80.555%] left-[19.444%] relative min-h-[100vh] px-4 xl:px-8 pt-[30px] "
            : "w-full p-0"
        } `}
      >
        {shouldShowSideNav && <Header />}
        {children}
      </main>
    </section>
  );
};

export default MainLayout;
