"use client";
// import { useUserStore } from "@/store/useUserStore";
// import Image from "next/image";
import React from "react";

const CryptoDashboardSummary = () => {
  // const { setShowBalance, showBalance } = useUserStore();
  //   const getCurrentWallet = () => {
  //     if (selectedCurrency.name === "NGN") {
  //       return NGNAcct;
  //     } else if (selectedCurrency.name === "USD") {
  //       return USDAcct;
  //     }
  //   };

  //   const currentWallet = getCurrentWallet();
  return (
    <div className="pt-5">
      <div className="flex justify-between items-center gap-4 ">
        <div className="">
          <p className="text-text-terttiary-600   font-normal font-inter leading-normal">
            Total Assets
          </p>
          {/* <div className="flex gap-2 items-center">
            <p className="text-raiz-gray-950 text-[2rem] font-semibold  leading-[38.40px]">
              {showBalance
                ? `${currentWallet ? selectedCurrency.sign : ""} ${
                    currentWallet?.account_balance.toLocaleString() || "0.00"
                  }`
                : `${currentWallet ? selectedCurrency.sign : ""}X.XX`}
            </p>
            <button onClick={() => setShowBalance(!showBalance)}>
              <Image
                src={`${
                  !showBalance
                    ? "/icons/show-balance.svg"
                    : "/icons/hide-balance.svg"
                }`}
                alt={`${!showBalance ? "show balance" : "hide balance"} `}
                width={32}
                height={32}
              />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CryptoDashboardSummary;
