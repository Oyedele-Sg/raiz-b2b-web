"use client";
import Button from "@/components/ui/Button";
import Image from "next/image";
import React from "react";

const list = [
  {
    icon: "/icons/send.svg",
    title: "Send Money",
    text: "Quickly send Naira to other NGN accounts within Nigeria for seamless transactions.",
  },
  {
    icon: "/icons/receive.svg",
    title: "Recieve Funds",
    text: "Accept payments directly in Naira, making it easy to manage local income.",
  },
  {
    icon: "/icons/bank-cards.svg",
    title: "NGN Virtual Account",
    text: "Access a secure virtual Naira account for online and in-app transactions.",
  },
];

const CreateNgnAcct = ({
  close,
  openBvnModal,
}: {
  close: () => void;
  openBvnModal: () => void;
}) => {
  const handleCreate = () => {
    openBvnModal(); // Open BVN modal
    close(); // Close current modal
  };
  return (
    <>
      <div className=" h-full pb-[30px]">
        <div className=" flex justify-between items-center">
          <button onClick={close}>
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
              <path
                d="M18.48 8.33334V10.6667H4.48L10.8967 17.0833L9.24 18.74L0 9.50001L9.24 0.26001L10.8967 1.91668L4.48 8.33334H18.48Z"
                fill="#FCFCFD"
              />
            </svg>
          </button>
          <h5 className="text-center text-raiz-gray-50  font-bold  leading-tight">
            NGN Account
          </h5>
          <span />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className="">
            <div className="flex flex-col justify-center items-center mt-[104px] gap-3">
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="80" height="80" rx="40" fill="#FDFFF8" />
                <path
                  opacity="0.35"
                  d="M39.5001 63.8334C52.3867 63.8334 62.8334 53.3867 62.8334 40.5001C62.8334 27.6134 52.3867 17.1667 39.5001 17.1667C26.6134 17.1667 16.1667 27.6134 16.1667 40.5001C16.1667 53.3867 26.6134 63.8334 39.5001 63.8334Z"
                  fill="#7EB7B7"
                />
                <path
                  d="M44.0243 52.1666C42.6406 52.1666 41.3992 51.3126 40.9069 50.0176L36.3172 37.9636H36.2216L36.3313 49.8799C36.3453 51.1399 35.3256 52.1666 34.0656 52.1666H33.9046C32.6539 52.1666 31.6389 51.1516 31.6389 49.9009V32.1699C31.6389 30.3266 33.1322 28.8333 34.9756 28.8333H35.1273C36.5203 28.8333 37.7662 29.6989 38.2539 31.0033L42.8156 43.2346H42.9113L42.8296 31.1129C42.8203 29.8576 43.8376 28.8333 45.0952 28.8333C46.3459 28.8333 47.3609 29.8483 47.3609 31.0989V48.8299C47.3609 50.6733 45.8676 52.1666 44.0243 52.1666Z"
                  fill="#5E6CE9"
                />
              </svg>
              <h3 className="text-center text-raiz-gray-50 text-xl font-bold leading-normal mt-2">
                What you get with your Naira wallet/account
              </h3>
              <p className="text-center text-raiz-gray-100 text-sm font-normal  leading-tight">
                An NGN account lets you hold, send, and receive Naira, making
                local payments and transfers simple for daily finances in
                Nigeria.
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
            onClick={handleCreate}
            className="!bg-raiz-gray-50 text-primary2 hover:bg-raiz-gray-50  "
          >
            Create NGN Wallet
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateNgnAcct;
