import Button from "@/components/ui/Button";
import Image from "next/image";
import React from "react";

interface Props {
  close: () => void;
}

const PendingStatus = ({ close }: Props) => {
  return (
    <div className="w-full h-full bg-gradient-to-l from-indigo-900 to-violet-600 rounded-[36px]  shadow-[0px_1px_2px_0px_rgba(0,0,0,0.30)] inline-flex flex-col justify-center items-center">
      <div className="flex flex-col justify-between gap-6 h-full pt-[88px] p-[30px] items-center">
        <div className="text-center flex flex-col justify-center items-center">
          <Image
            src={"/icons/pending.svg"}
            width={50}
            height={50}
            alt="pending"
          />
          <h4 className="mt-[15px] text-gray-100 text-xl font-bold leading-relaxed">
            Transfer Pending
          </h4>
          <p className="text-gray-100 mt-3 text-xs font-normal leading-tight">
            Your transaction is currently pending. Please wait while we process
            it. This may take a few moments.
          </p>
        </div>
        <div className="flex justify-between w-full gap-[15px]">
          <Button className="bg-zinc-200 text-zinc-900">Contact Support</Button>
          <Button onClick={close} className="bg-indigo-900">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PendingStatus;
