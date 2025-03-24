"use client";
import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import SideWrapperHeader from "@/components/SideWrapperHeader";
import Button from "@/components/ui/Button";
import { RequestStep } from "./Request";

export interface RequestStepsProps {
  close: () => void;
  setStep: Dispatch<SetStateAction<RequestStep>>;
}

const RequestHome = ({ close, setStep }: RequestStepsProps) => {
  return (
    <div className="h-full p-[25px] xl:p-[30px] bg-pink-600 flex flex-col">
      <SideWrapperHeader title="Request" close={close} />
      <div className="flex flex-col justify-between h-full pb-[30px]">
        <div className="flex flex-col justify-center items-center mt-[104px] gap-3">
          <div className="mb-[30px] flex flex-col justify-center items-center">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="80" height="80" rx="40" fill="#F3F1F6" />
              <path
                d="M25.5 43.5C21.08 43.5 17.5 47.08 17.5 51.5C17.5 55.92 21.08 59.5 25.5 59.5C29.92 59.5 33.5 55.92 33.5 51.5C33.5 47.08 29.92 43.5 25.5 43.5ZM27.5 50.86C27.5 52.08 26.84 53.24 25.8 53.86L24.28 54.78C24.04 54.92 23.78 55 23.52 55C23.02 55 22.52 54.74 22.24 54.28C21.82 53.58 22.04 52.64 22.76 52.22L24.28 51.3C24.42 51.22 24.52 51.04 24.52 50.88V49.02C24.52 48.2 25.2 47.52 26.02 47.52C26.84 47.52 27.52 48.2 27.52 49.02V50.86H27.5Z"
                fill="#608200"
              />
              <path
                opacity="0.4"
                d="M59.5 33.5V45.5C59.5 52.5 55.5 55.5 49.5 55.5H32.4C33.1 54.32 33.5 52.96 33.5 51.5C33.5 47.08 29.92 43.5 25.5 43.5C23.1 43.5 20.96 44.56 19.5 46.22V33.5C19.5 26.5 23.5 23.5 29.5 23.5H49.5C55.5 23.5 59.5 26.5 59.5 33.5Z"
                fill="#3AAA82"
              />
              <path
                d="M39.5 44.5C42.2614 44.5 44.5 42.2614 44.5 39.5C44.5 36.7386 42.2614 34.5 39.5 34.5C36.7386 34.5 34.5 36.7386 34.5 39.5C34.5 42.2614 36.7386 44.5 39.5 44.5Z"
                fill="#608200"
              />
              <path
                d="M52.5 45C51.68 45 51 44.32 51 43.5V35.5C51 34.68 51.68 34 52.5 34C53.32 34 54 34.68 54 35.5V43.5C54 44.32 53.32 45 52.5 45Z"
                fill="#608200"
              />
            </svg>
            <h3 className="text-center text-raiz-gray-50 text-xl font-bold leading-normal mt-5 mb-3">
              How Request Works
            </h3>
            <p className="text-center text-raiz-gray-100 text-sm font-normal  leading-tight">
              Request allows you to ask for money from a single user or a group
              of users
            </p>

            {/* Single request */}
            <button className="flex gap-4 mt-[30px]">
              <Image
                src={"/icons/single-req.svg"}
                width={30}
                height={30}
                alt=""
              />
              <div className="flex flex-col justify-start items-start gap-1">
                <h6 className="text-neutral-50 text-sm font-bold  leading-none">
                  Single Request
                </h6>
                <p className=" text-neutral-50 text-xs font-normal leading-tight text-left">
                  Single request money allows you to ask a single user for a
                  payment
                </p>
              </div>
            </button>

            {/* Multile request */}
            <button className="flex gap-4 mt-[22px]">
              <Image
                src={"/icons/multiple-req.svg"}
                width={30}
                height={30}
                alt=""
              />
              <div className="flex flex-col justify-start items-start gap-1">
                <h6 className="text-neutral-50 text-sm font-bold  leading-none">
                  Multiple Request (Split Bills)
                </h6>
                <p className=" text-neutral-50 text-xs font-normal leading-tight text-left">
                  Multiple request also known as split bills allows you to ask a
                  group of users for a payment
                </p>
              </div>
            </button>
          </div>
        </div>
        <Button
          onClick={() => setStep("all")}
          className="!bg-raiz-gray-50 text-primary2 hover:bg-raiz-gray-50  "
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default RequestHome;
