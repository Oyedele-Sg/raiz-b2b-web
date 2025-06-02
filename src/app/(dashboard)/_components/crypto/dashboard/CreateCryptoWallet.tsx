"use client";
import SideWrapperHeader from "@/components/SideWrapperHeader";
import Button from "@/components/ui/Button";
import Image from "next/image";
import React, { useState } from "react";
import SelectChain from "./SelectChain";

const list = [
  {
    icon: "/icons/send-blue.svg",
    title: "Effortless Crypto Transfers",
    text: "Send USDC or USDT anytime on BNB Smart Chain (BEP20), Tron (TRC20), Ethereum (ERC20), and Solana.",
  },
  {
    icon: "/icons/deposit-c.svg",
    title: "Flexible Deposit Options",
    text: "Fund your wallet via USD deposits, local wallet top-ups, or direct bank transfers.",
  },
  {
    icon: "/icons/swap-c.svg",
    title: "Instant Stablecoin Swaps",
    text: "Quickly swap USDC or USDT to USD directly within your wallet.",
  },
];

const CreateCryptoWallet = ({ close }: { close: () => void }) => {
  const [showModal, setShowModal] = useState(false);

  const openChainModal = () => {
    setShowModal(true);
  };
  return (
    <>
      <div className=" h-full pb-[30px] ">
        <SideWrapperHeader title="Crypto Account" close={close} />
        <div className="flex flex-col justify-between gap-8 h-full pb-[30px]">
          <div className="">
            <div className="flex flex-col justify-center items-center mt-16 xl:mt-[104px] gap-3">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <rect width="80" height="80" rx="40" fill="#FDFFF8" />
                <path
                  d="M37.1667 59.1667C47.476 59.1667 55.8333 50.8094 55.8333 40.5C55.8333 30.1907 47.476 21.8334 37.1667 21.8334C26.8574 21.8334 18.5 30.1907 18.5 40.5C18.5 50.8094 26.8574 59.1667 37.1667 59.1667Z"
                  fill="#C2C1FF"
                />
                <path
                  d="M42.7154 44.4317C42.7154 38.3883 36.0444 39.2143 36.0444 36.0643C36.0444 34.2093 37.5027 34.0133 38.0067 34.0133C38.5037 34.0133 38.9447 34.1323 39.318 34.3003C40.1954 34.697 41.236 34.3283 41.7914 33.542C42.503 32.534 42.1344 31.1177 41.0097 30.6113C40.3937 30.3337 39.6237 30.1097 38.6904 30.021V29.1437C38.6904 28.3363 38.0347 27.6807 37.2274 27.6807C36.42 27.6807 35.7644 28.3363 35.7644 29.1437V30.329C33.3167 31.1457 31.7254 33.3857 31.7254 36.2533C31.7254 42.5953 38.3147 41.4497 38.3147 44.7467C38.3147 45.3813 38.0137 46.765 36.3804 46.765C35.6547 46.765 35.027 46.5597 34.516 46.2937C33.6504 45.841 32.5747 46.1747 32.0217 46.982L31.9634 47.0683C31.324 48.0017 31.583 49.3083 32.5653 49.866C33.3913 50.335 34.4017 50.699 35.622 50.8273V51.854C35.622 52.6613 36.2777 53.317 37.085 53.317C37.8924 53.317 38.548 52.6613 38.548 51.854V50.5637C41.257 49.7353 42.7154 47.2667 42.7154 44.4317Z"
                  fill="#0055CC"
                />
                <path
                  d="M44.1667 21.8334C42.9697 21.8334 41.8007 21.957 40.6667 22.1717C49.3024 23.812 55.8334 31.3884 55.8334 40.5C55.8334 49.6117 49.3024 57.188 40.6667 58.8284C41.8007 59.043 42.9697 59.1667 44.1667 59.1667C54.4754 59.1667 62.8334 50.8087 62.8334 40.5C62.8334 30.1914 54.4754 21.8334 44.1667 21.8334Z"
                  fill="#0055CC"
                />
              </svg>
              <h3 className="text-center text-raiz-gray-50 text-xl font-bold leading-normal mt-2">
                What you get with your Crypto wallet/account
              </h3>
              <p className="text-center text-raiz-gray-100 text-sm font-normal  leading-tight">
                Fast, secure, and flexible crypto transactions for easy sending,
                receiving, depositing, and swapping.
              </p>
            </div>
            <div className="flex flex-col gap-[22px] mt-[30px]">
              {list.map((each, index) => (
                <div key={index} className="flex gap-4 items-start ">
                  <Image
                    src={each.icon}
                    alt={each.title}
                    width={30}
                    height={30}
                  />
                  <div className="text-raiz-gray-50 flex flex-col gap-1">
                    <h6 className=" text-sm font-bold  leading-[16.80px]">
                      {each.title}
                    </h6>
                    <p className=" text-[13px] font-normal leading-tight">
                      {each.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button
            onClick={openChainModal}
            className="!bg-raiz-gray-50  text-primary2 hover:bg-raiz-gray-50 disabled:!bg-slate-500  "
          >
            Create Crypto Wallet
          </Button>
        </div>
      </div>
      {showModal && (
        <SelectChain close={() => setShowModal(false)} done={close} />
      )}
    </>
  );
};

export default CreateCryptoWallet;
