import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import CardAmount from "./CardAmount";
import { useSendStore } from "@/store/Send";
import { IBusinessPaymentData } from "@/types/services";
import PaySuccess from "./PaySuccess";

interface Props {
  setScreen: Dispatch<SetStateAction<"details" | "card">>;
  data: IBusinessPaymentData;
}

export type CardSteps = "amount" | "success";

const PayWithCard = ({ setScreen, data }: Props) => {
  const [step, setStep] = useState<CardSteps>("amount");
  const { actions } = useSendStore();
  const goBack = () => {
    actions.reset("USD");
    setScreen("details");
  };

  const displayScreen = () => {
    switch (step) {
      case "amount":
        return <CardAmount goNext={() => setStep("success")} data={data} />;
      case "success":
        return <PaySuccess data={data} />;
      default:
        break;
    }
  };
  return (
    <>
      {step === "amount" && (
        <div className="mt-10">
          {" "}
          <button onClick={goBack}>
            <Image
              src={"/icons/arrow-left.svg"}
              width={18.48}
              height={18.48}
              alt="back"
            />
          </button>
          <header className="flex items-center justify-between mt-2">
            <h2 className="text-raiz-gray-950 text-[23px] font-semibold  leading-10">
              Pay with card
            </h2>
            <svg width="40" height="41" viewBox="0 0 40 41" fill="none">
              <path
                opacity="0.35"
                d="M30 10.48H20V3.81329H13.3333V10.48H10C7.23833 10.48 5 12.7183 5 15.48V30.48C5 33.2416 7.23833 35.48 10 35.48H30C32.7617 35.48 35 33.2416 35 30.48V15.48C35 12.7183 32.7617 10.48 30 10.48Z"
                fill="#C6ADD5"
              />
              <path
                d="M29.1667 25.48C30.5474 25.48 31.6667 24.3607 31.6667 22.98C31.6667 21.5993 30.5474 20.48 29.1667 20.48C27.786 20.48 26.6667 21.5993 26.6667 22.98C26.6667 24.3607 27.786 25.48 29.1667 25.48Z"
                fill="#493260"
              />
              <path
                d="M10 7.14663V10.48H15V3.81329H13.3333C11.4917 3.81329 10 5.30496 10 7.14663Z"
                fill="#733B9C"
              />
              <path
                d="M18.3333 10.48H26.6666V7.14663C26.6666 5.30496 25.175 3.81329 23.3333 3.81329H18.3333V10.48Z"
                fill="#733B9C"
              />
            </svg>
          </header>
          <p className="text-raiz-gray-700 text-[15px] font-normal  leading-snug">
            Send money through a debit card
          </p>{" "}
        </div>
      )}

      {displayScreen()}
    </>
  );
};

export default PayWithCard;
