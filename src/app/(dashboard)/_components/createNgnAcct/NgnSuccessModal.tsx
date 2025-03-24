import Overlay from "@/components/ui/Overlay";
import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

const NgnSuccessModal = ({ close }: { close: () => void }) => {
  return (
    <Overlay width="375px" close={close}>
      <div className="flex flex-col justify-center items-center  h-full py-8 px-5  text-center ">
        <Image src={"/icons/tick-circle.svg"} alt="" width={64} height={64} />
        <h4 className="text-raiz-gray-950   text-xl font-bold  leading-relaxed">
          NGN Wallet Created
        </h4>
        <p className="text-raiz-gray-700 text-[13px] font-normal leading-tight mb-5">
          NGN account is now available for all your transactions
        </p>
        <Button onClick={close}>Done</Button>
      </div>
    </Overlay>
  );
};

export default NgnSuccessModal;
