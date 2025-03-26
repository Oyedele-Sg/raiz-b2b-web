import React from "react";

interface Props {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: string | number;
  border?: boolean;
}

const ListDetailItem = ({ title, value, border }: Props) => {
  return (
    <div
      className={`flex text-zinc-900 justify-between gap-4 items-center pb-3  ${
        border ? "border-b-[0.5px] border-zinc-200" : ""
      } `}
    >
      <span className="text-xs font-normal leading-tight">{title}</span>
      <span className=" text-sm font-semibold font-brSonoma leading-tight">
        {value}
      </span>
    </div>
  );
};

export default ListDetailItem;
