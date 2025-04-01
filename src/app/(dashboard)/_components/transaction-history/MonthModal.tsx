import Overlay from "@/components/ui/Overlay";
import { monthsData } from "@/constants/misc";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  setMonth: Dispatch<
    SetStateAction<{
      day: string;
      month: string;
      year: string;
    }>
  >;
  close: () => void;
}

const MonthModal = ({ setMonth, close }: Props) => {
  const handleSelect = (month: { id: string; value: string }) => {
    setMonth((prev) => ({ ...prev, month: month.id }));
    close();
  };
  return (
    <Overlay close={close} width="375px">
      <div className="flex flex-col  h-full py-8 px-5 ">
        <h5 className="text-raiz-gray-950 text-xl font-bold  leading-normal">
          Select month
        </h5>
        <div className="flex flex-col gap-[20px] font-brSonoma h-[350px] overflow-y-scroll ">
          {monthsData.map((month) => (
            <button
              key={month.id}
              onClick={() => handleSelect(month)}
              className="flex gap-2 hover:bg-slate-100 p-3 rounded-xl text-raiz-gray-950 text-sm font-semibold"
            >
              {month.value}
            </button>
          ))}
        </div>
      </div>
    </Overlay>
  );
};

export default MonthModal;
