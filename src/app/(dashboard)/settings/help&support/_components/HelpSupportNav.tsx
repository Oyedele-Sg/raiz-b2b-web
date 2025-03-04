import { helpSupportData } from "@/constants/SettingsMenuData";
import React, { Dispatch } from "react";
import Image from "next/image";

export interface PartChildProps {
  setPart: Dispatch<React.SetStateAction<number>>;
}

const HelpSupportNav = ({ setPart }: PartChildProps) => {
  return (
    <div className=" flex flex-col gap-5 w-full">
      {helpSupportData.map((data, index) => {
        return (
          <button
            onClick={() => setPart(data.part)}
            key={index}
            className="flex justify-between items-center"
          >
            <div className="flex gap-[15px] items-center">
              {data.icon}
              <span className="text-raiz-gray-950 text-[15px] font-semibold leading-snug">
                {data.name}
              </span>
            </div>
            <Image
              src="/icons/arrow-right.svg"
              alt="arrow-right"
              width={18}
              height={18}
            />
          </button>
        );
      })}
    </div>
  );
};

export default HelpSupportNav;
