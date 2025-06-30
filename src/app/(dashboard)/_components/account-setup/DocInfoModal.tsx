import Overlay from "@/components/ui/Overlay";
import Image from "next/image";
import React from "react";

const DocInfoModal = ({ close }: { close: () => void }) => {
  return (
    <Overlay width="375px" close={close}>
      <div className="flex flex-col  h-full py-8 px-5 ">
        <div className="flex justify-between items-center">
          <h5 className="text-raiz-gray-950 text-xl font-bold  leading-normal">
            Residential Address
          </h5>
          <button onClick={close}>
            <Image
              src={"/icons/close.svg"}
              alt="close"
              width={16}
              height={16}
            />
          </button>
        </div>
        <p className="text-raiz-gray-950 text-[13px] font-normal  leading-tight">
          What is Proof of Address?
        </p>
        <div className="mt-[44px] flex flex-col justify-center items-center gap-4">
          <svg
            width="49"
            height="48"
            viewBox="0 0 49 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              width="48"
              height="48"
              rx="24"
              fill="#EAECFF"
              fillOpacity="0.6"
            />
            <path
              d="M17 31V17C17 15.343 18.343 14 20 14H27L33 20V31C33 32.657 31.657 34 30 34H20C18.343 34 17 32.657 17 31Z"
              fill="#95C0FF"
            />
            <path
              d="M27 18V14L33 20H29C27.895 20 27 19.105 27 18Z"
              fill="#3266EA"
            />
            <path
              d="M25 26H21C20.447 26 20 25.552 20 25C20 24.448 20.447 24 21 24H25C25.553 24 26 24.448 26 25C26 25.552 25.553 26 25 26Z"
              fill="#3266EA"
            />
            <path
              d="M25 30H21C20.447 30 20 29.552 20 29C20 28.448 20.447 28 21 28H25C25.553 28 26 28.448 26 29C26 29.552 25.553 30 25 30Z"
              fill="#3266EA"
            />
            <path
              d="M29 26C29.5523 26 30 25.5523 30 25C30 24.4477 29.5523 24 29 24C28.4477 24 28 24.4477 28 25C28 25.5523 28.4477 26 29 26Z"
              fill="#3266EA"
            />
            <path
              d="M29 30C29.5523 30 30 29.5523 30 29C30 28.4477 29.5523 28 29 28C28.4477 28 28 28.4477 28 29C28 29.5523 28.4477 30 29 30Z"
              fill="#3266EA"
            />
          </svg>

          <p className="text-center text-raiz-gray-950 text-[13px] leading-tight">
            Proof of address for residential verification includes any official
            document, such as a utility bill, that clearly shows your name and
            current address.
          </p>
        </div>
      </div>
    </Overlay>
  );
};

export default DocInfoModal;
