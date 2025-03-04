"use client";
import Button from "@/components/ui/Button";
import NumberKeypad from "@/components/ui/NumberKeyPad";
import Overlay from "@/components/ui/Overlay";
import Image from "next/image";
import React, { useState } from "react";

const FreezeAcctModal = ({ close }: { close: () => void }) => {
  const [freezeStatus, setFreezeStatus] = useState(1);
  const [otpValue, setOtpValue] = useState<string>("");

  const handleFreeze = () => {
    if (freezeStatus === 1) {
      setFreezeStatus(2);
    } else {
      console.log("Freezed!");
      close();
    }
  };
  return (
    <Overlay width="385px" close={close}>
      <div
        className={`flex flex-col ${
          freezeStatus === 1 ? "h-full" : "lg:h-[90%] xl:h-full"
        }  py-8 px-5  text-raiz-gray-950 overflow-y-scroll`}
      >
        <Image
          className="mx-auto mb-4"
          src="/icons/freeze.svg"
          alt="freeze"
          width={48}
          height={48}
        />
        <h2 className=" text-xl font-bold  text-center leading-normal">
          Confirm Freeze
        </h2>
        <p className="text-center  text-[13px] font-normal leading-tight mb-5">
          {freezeStatus === 1
            ? "Are you certain you wish to disable your account?"
            : "Enter your transactional PIN to disable account"}
        </p>

        {freezeStatus === 2 && (
          <div className="mb-[30px]">
            <NumberKeypad otpValue={otpValue} setOtpValue={setOtpValue} />
          </div>
        )}
        <Button
          disabled={freezeStatus === 2 && (!otpValue || otpValue.length !== 4)}
          onClick={handleFreeze}
          className="!bg-[#229BF3] mb-[15px] hover:opacity-80"
        >
          Freeze
        </Button>
        <Button
          className="!bg-[#E0F1FD] text-raiz-gray-950 hover:opacity-90"
          onClick={close}
        >
          Cancel
        </Button>
      </div>
    </Overlay>
  );
};

export default FreezeAcctModal;
