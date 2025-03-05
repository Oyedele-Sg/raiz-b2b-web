"use client";
import Overlay from "@/components/ui/Overlay";
import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const RaizTagModal = ({ close }: { close: () => void }) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push("/settings?focus=raiz-tag");
    close();
  };

  return (
    <Overlay width="385px" close={close}>
      <div
        className={`flex flex-col h-full text-raiz-gray-950 overflow-y-scroll`}
      >
        <Image
          className="w-full"
          src="/images/Raiztag.svg"
          alt="freeze"
          width={375}
          height={191}
        />
        <div className="p-5 flex flex-col gap-4">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="32"
              height="32"
              rx="16"
              fill="#EAECFF"
              fillOpacity="0.8"
            />
            <path
              opacity="0.35"
              d="M22.4 12H9.6C8.716 12 8 12.6712 8 13.5V19.5C8 20.3287 8.716 21 9.6 21H22.4C23.284 21 24 20.3287 24 19.5V13.5C24 12.6712 23.284 12 22.4 12Z"
              fill="#00BD09"
            />
            <path
              d="M16 19.5C17.5463 19.5 18.8 18.1569 18.8 16.5C18.8 14.8431 17.5463 13.5 16 13.5C14.4536 13.5 13.2 14.8431 13.2 16.5C13.2 18.1569 14.4536 19.5 16 19.5Z"
              fill="#215533"
            />
            <path
              d="M21.6 17.25C22.0419 17.25 22.4 16.9142 22.4 16.5C22.4 16.0858 22.0419 15.75 21.6 15.75C21.1582 15.75 20.8 16.0858 20.8 16.5C20.8 16.9142 21.1582 17.25 21.6 17.25Z"
              fill="#215533"
            />
            <path
              d="M10.4001 17.25C10.8419 17.25 11.2001 16.9142 11.2001 16.5C11.2001 16.0858 10.8419 15.75 10.4001 15.75C9.95827 15.75 9.6001 16.0858 9.6001 16.5C9.6001 16.9142 9.95827 17.25 10.4001 17.25Z"
              fill="#215533"
            />
          </svg>
          <h2 className="text-xl font-semibold leading-normal">
            Say hello to the Raiz tag for transfers
          </h2>
          <p className=" text-[13px] text-raiz-gray-800 font-normal leading-tight">
            Create your Raiz Tag to receive transfers from other Raiz users
            seamlessly. You can also send funds to others with their Raiz Tag.
          </p>
          <Button onClick={handleEdit}>Edit</Button>
        </div>
      </div>
    </Overlay>
  );
};

export default RaizTagModal;
