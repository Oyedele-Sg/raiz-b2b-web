import Image from "next/image";
import React from "react";

const FindRecipient = () => {
  return (
    <div className="font-monzo">
      <div className="flex justify-between items-center">
        <h5 className="text-raiz-gray-950 text-base font-bold  leading-tight">
          Find Recipient
        </h5>
        <button>
          <Image
            src={"/icons/qr.ssvg"}
            width={18}
            height={19.2}
            alt="qr code"
          />
        </button>
      </div>
    </div>
  );
};

export default FindRecipient;
