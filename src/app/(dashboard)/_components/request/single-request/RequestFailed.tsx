import Overlay from "@/components/ui/Overlay";
import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

interface Props {
  close: () => void;
}

const RequestFailed = ({ close }: Props) => {
  return (
    <Overlay close={close} width="400px">
      <div className="flex flex-col h-[400px] justify-between  w-full  p-[30px]">
        <div className="flex flex-col justify-center items-center ">
          <Image
            src={"/icons/failed.svg"}
            width={50}
            height={50}
            alt="Failed"
          />
          <h4 className="mt-[15px] text-center text-zinc-900 text-xl font-bold leading-relaxed">
            Request Failed
          </h4>
          <p className="mt-3 text-center text-zinc-900 text-xs leading-tight">
            Your request bill request has failed.
          </p>
        </div>
        <div className="flex justify-between w-full gap-3">
          <Button onClick={close} className="bg-zinc-200 text-zinc-950">
            Try again
          </Button>
          <Button onClick={close} className="!bg-pink-600">
            Done
          </Button>
        </div>
      </div>
    </Overlay>
  );
};

export default RequestFailed;
