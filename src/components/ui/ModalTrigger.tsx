"use client";
import React from "react";
import Image from "next/image";

type Props = {
  onClick: () => void;
  placeholder: string;
  value: string;
};

const ModalTrigger = ({ onClick, placeholder, value }: Props) => {
  return (
    <button
      onClick={onClick}
      className="flex justify-between w-full h-[50px] p-[15px] bg-raiz-gray-100 rounded-lg items-center"
    >
      <span
        className={`${
          value ? "text-raiz-gray-950" : "text-raiz-gray-400"
        } text-sm font-normal leading-tight`}
      >
        {value ? value : placeholder}
      </span>
      <Image
        src="/icons/arrow-down.svg"
        alt="dropdown"
        width={16}
        height={16}
      />
    </button>
  );
};

export default ModalTrigger;
