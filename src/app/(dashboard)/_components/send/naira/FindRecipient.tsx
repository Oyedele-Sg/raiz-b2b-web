"use client";
import Image from "next/image";
import React, { useState } from "react";
import RaizerRecipient from "./toRaizer/RaizerRecipient";

const FindRecipient = () => {
  const [type, setType] = useState<"raizer" | "others">("raizer");

  const displayType = () => {
    switch (type) {
      case "raizer":
        return <RaizerRecipient />;
      default:
        break;
    }
  };
  return (
    <div className="font-monzo">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-raiz-gray-950 text-base font-bold  leading-tight">
          Find Recipient
        </h5>
        <button>
          <Image src={"/icons/qr.svg"} width={18} height={19.2} alt="qr code" />
        </button>
      </div>
      {/* Type toggle */}
      <div className="flex  h-11 p-1 bg-raiz-gray-100 rounded-2xl justify-center items-center gap-1 mt-5 transition-all duration-200 ease-in-out mb-5">
        <button
          onClick={() => setType("raizer")}
          className={`p-2 rounded-xl  w-1/2 transition-all duration-300 ease-in-out text-sm ${
            type === "raizer"
              ? "bg-raiz-gray-50 text-raiz-gray-950 font-bold leading-[16.80px]"
              : "  text-raiz-gray-500 leading-tight "
          }`}
        >
          Send to Raizer
        </button>
        <button
          onClick={() => setType("others")}
          className={`p-2 rounded-xl w-1/2 transition-all duration-200 ease-in-out text-sm ${
            type === "others"
              ? "bg-raiz-gray-50 text-raiz-gray-950 font-bold leading-[16.80px]"
              : "  text-raiz-gray-500 leading-tight "
          }`}
        >
          <span>Send to other bank</span>
        </button>
      </div>

      <div>{displayType()}</div>
    </div>
  );
};

export default FindRecipient;
