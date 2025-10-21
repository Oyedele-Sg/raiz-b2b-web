"use client";
import Avatar from "@/components/ui/Avatar";
import SearchBox from "@/components/ui/SearchBox";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";
import { RefObject, useState } from "react";

export const CustomerSearchBox = ({
  setShowSearchBox,
  btnRef,
}: {
  setShowSearchBox: (show: boolean) => void;
  btnRef: RefObject<HTMLElement | null>;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useOutsideClick(() => setShowSearchBox(false), btnRef);
  return (
    <div
      ref={searchRef}
      className="w-96 left-0 top-8 z-20 absolute bg-white p-2 rounded-lg  shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08)] outline outline-1 outline-offset-[-1px] outline-gray-100 inline-flex flex-col justify-start items-start gap-2 overflow-hidden"
    >
      <SearchBox
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="mt-1 w-full">
        <ul className="flex flex-col  gap-3">
          <li>
            <button className="flex justify-between w-full items-center px-2.5 py-2 text-left text-sm rounded-md text-zinc-700 ">
              <div className="flex gap-3 items-center">
                <Avatar src={""} name="" />
                <span>Figma Limited liability</span>
              </div>
            </button>
          </li>
        </ul>
      </div>
      <div className="w-full">
        <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100"></div>
        <button className="flex gap-4 items-center  hover:bg-[#EAECFF99] pl-3.5 pr-2.5 py-2  mt-2 w-full">
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
            <path
              d="M8.00031 2.33334C11.3973 2.33352 14.1663 5.10325 14.1663 8.50034C14.1661 11.8973 11.3972 14.6662 8.00031 14.6664C4.60322 14.6664 1.83349 11.8974 1.83331 8.50034C1.83331 5.10314 4.60311 2.33334 8.00031 2.33334ZM8.00031 4.83334C7.45083 4.83334 7.00031 5.28387 7.00031 5.83334V7.50034H5.33331C4.78384 7.50034 4.33331 7.95086 4.33331 8.50034C4.33349 9.04966 4.78395 9.50034 5.33331 9.50034H7.00031V11.1664C7.00031 11.7158 7.45083 12.1664 8.00031 12.1664C8.54963 12.1662 9.00031 11.7157 9.00031 11.1664V9.50034H10.6663C11.2157 9.50034 11.6661 9.04966 11.6663 8.50034C11.6663 7.95086 11.2158 7.50034 10.6663 7.50034H9.00031V5.83334C9.00031 5.28398 8.54963 4.83352 8.00031 4.83334Z"
              fill="#0D6494"
              stroke="#0D6494"
            />
          </svg>
          <span className="text-cyan-700 text-sm font-semibold">
            Add New Customer
          </span>
        </button>
      </div>
    </div>
  );
};
