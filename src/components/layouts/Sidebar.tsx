"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ISidebarMenuItem } from "@/types/misc";
import { SidebarMenus } from "@/constants/SidebarMenuData";

const Sidebar = () => {
  const pathName = usePathname();

  const renderMenuItem = (item: ISidebarMenuItem, index: number) => {
    const isActive = pathName === item.link;
    return (
      <Link
        key={index}
        href={item.link}
        className={`flex items-center gap-3 py-2 px-2 xl:px-3 font-bold text-[15px] xl:text-base font-monzo leading-tight hover:bg-[#eaecff]/40 hover:rounded-md outline-none ${
          isActive
            ? "bg-[#eaecff]/40 rounded-[6px] text-primary2"
            : "text-raiz-gray-600 "
        }`}
      >
        {item.icon(isActive)}
        {item.name}
      </Link>
    );
  };

  return (
    <aside className="w-[19.444%] pt-8  fixed top-0 bottom-0 left-0 z-20 bg-raiz-gray-50 border-r border-raiz-gray-200 h-[100vh] overflow-x-hidden overflow-y-scroll">
      <div className="px-6">
        <Image
          className="w-12 h-12"
          src={"/icons/Logo-2.svg"}
          width={48}
          height={48}
          alt="Raiz logo"
        />
      </div>
      <section className="flex flex-col justify-between h-[85%] mt-8 px-4 gap-8">
        <nav className="flex flex-col gap-1">
          {SidebarMenus.map((item, index) => renderMenuItem(item, index))}
        </nav>
        <div>
          <div className="px-3 xl:px-4 py-5 bg-[#eaecff]/40 rounded-lg flex-col justify-start items-start gap-3 inline-flex">
            <div className="w-12 h-12 relative bg-[#fcfcfd] rounded-[66.67px] flex items-center justify-center ">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M15.9997 2.66699C12.333 2.66699 9.33301 5.66699 9.33301 9.33366V12.0003H11.9997V9.33366C11.9997 7.13366 13.7997 5.33366 15.9997 5.33366C18.1997 5.33366 19.9997 7.13366 19.9997 9.33366V12.0003H22.6663V9.33366C22.6663 5.66699 19.6663 2.66699 15.9997 2.66699Z"
                  fill="#424242"
                />
                <path
                  d="M23.9997 29.3333H7.99967C6.53301 29.3333 5.33301 28.1333 5.33301 26.6667V14.6667C5.33301 13.2 6.53301 12 7.99967 12H23.9997C25.4663 12 26.6663 13.2 26.6663 14.6667V26.6667C26.6663 28.1333 25.4663 29.3333 23.9997 29.3333Z"
                  fill="#FB8C00"
                />
                <path
                  d="M16 18.6665C15.4696 18.6665 14.9609 18.8772 14.5858 19.2523C14.2107 19.6274 14 20.1361 14 20.6665C14 21.1969 14.2107 21.7056 14.5858 22.0807C14.9609 22.4558 15.4696 22.6665 16 22.6665C16.5304 22.6665 17.0391 22.4558 17.4142 22.0807C17.7893 21.7056 18 21.1969 18 20.6665C18 20.1361 17.7893 19.6274 17.4142 19.2523C17.0391 18.8772 16.5304 18.6665 16 18.6665Z"
                  fill="#C76E00"
                />
              </svg>
            </div>
            <p className="text-raiz-gray-900 text-sm font-bold font-monzo leading-[16.80px]">
              Complete account set up{" "}
            </p>
            <p className="text-gray-600 text-sm font-normal font-monzo leading-tight">
              Complete Account Set Up and Get unlimited access{" "}
            </p>
            <div className="flex items-center gap-3">
              <Link
                href={"#"}
                className="text-raiz-gray-500 text-xs xl:text-sm font-bold font-monzo leading-[16.80px]"
              >
                Learn more
              </Link>
              <Link
                href={"#"}
                className="text-primary2 text-xs xl:text-sm font-bold font-monzo leading-[16.80px]"
              >
                Upgrade
              </Link>
            </div>
          </div>
          <div className="flex gap-1.5 xl:gap-3  justify-between mt-6 w-full pb-5">
            <Image
              src={"/images/pfp.png"}
              width={40}
              height={40}
              alt="profile image"
            />
            <div className="flex flex-col gap-1  font-inter leading-tight">
              <p className="text-raiz-gray-700 font-semibold text-xs xl:text-sm">
                Kaywear Store
              </p>
              <p className="text-raiz-gray-600 text-[10px] xl:text-sm ">
                Kaywear@gmail.com
              </p>
            </div>
            <button>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect width="36" height="36" rx="18" fill="#F3F1F6" />
                <path
                  opacity="0.35"
                  d="M25.1998 11.7V24.3C25.1998 25.7913 23.9911 27 22.4998 27H13.4998C12.0085 27 10.7998 25.7913 10.7998 24.3V11.7C10.7998 10.2087 12.0085 9 13.4998 9H22.4998C23.9911 9 25.1998 10.2087 25.1998 11.7Z"
                  fill="#B3261E"
                />
                <path
                  d="M23.3998 16.2002H17.0998C16.1053 16.2002 15.2998 17.0057 15.2998 18.0002C15.2998 18.9947 16.1053 19.8002 17.0998 19.8002H23.3998V16.2002Z"
                  fill="#951F38"
                />
                <path
                  d="M22.1211 21.718C22.1211 22.4119 22.9581 22.7611 23.4513 22.2724L26.955 18.802C27.4005 18.3601 27.4005 17.6401 26.955 17.1982L23.4513 13.7278C22.9581 13.24 22.1211 13.5892 22.1211 14.2822V21.718Z"
                  fill="#951F38"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
