import Overlay from "@/components/ui/Overlay";
import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

interface Props {
  close: () => void;
}

const RequestSucess = ({ close }: Props) => {
  return (
    <Overlay close={close} width="400px">
      <div className="flex flex-col h-[400px] justify-between  w-full  p-[30px]">
        <div className="flex flex-col justify-center items-center ">
          <Image
            src={"/icons/success.svg"}
            width={50}
            height={50}
            alt="Success"
          />
          <h4 className="mt-[15px] text-center text-zinc-900 text-xl font-bold leading-relaxed">
            Request Successful
          </h4>
          <p className="mt-3 text-center text-zinc-900 text-xs leading-tight">
            Your request has been successfully completed.
          </p>
        </div>
        <Button onClick={close} className="!bg-pink-600">
          Done
        </Button>
      </div>
    </Overlay>
  );
};

export default RequestSucess;
