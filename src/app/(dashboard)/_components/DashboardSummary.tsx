"use client";
import React, { useState } from "react";
import CustomersInfo from "./CustomersInfo";
import SalesReport from "./SalesReport";
import SideModalWrapper from "./SideModalWrapper";
import Send from "./send/Send";
import Image from "next/image";
import { AnimatePresence } from "motion/react";

const DashboardSummary = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [openModal, setOpenModal] = useState<
    "send" | "request" | "swap" | null
  >(null);

  const closeModal = () => {
    setOpenModal(null);
  };

  const displayScreen = () => {
    switch (openModal) {
      case "send":
        return <Send />;
      case "request":
        return <h1>Request</h1>;
      case "swap":
        return <h1>Swap</h1>;
      default:
        break;
    }
  };

  return (
    <div className="pt-5">
      <div className="flex justify-between items-center gap-4 ">
        <div className="">
          <p className="text-text-terttiary-600   font-normal font-inter leading-normal">
            Total balance
          </p>
          <div className="flex gap-2 items-center">
            <p className="text-raiz-gray-950 text-[2rem] font-semibold font-monzo leading-[38.40px]">
              {showBalance ? `₦10,000,000.00` : `₦••••••••`}
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
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setOpenModal("send")}
            className="h-10 w-[138px] px-[18px] py-2 bg-raiz-usd-primary rounded-3xl justify-center items-center gap-1.5 inline-flex"
          >
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path
                d="M13.7836 2.4667L6.25859 4.9667C1.20026 6.65837 1.20026 9.4167 6.25859 11.1L8.49193 11.8417L9.23359 14.075C10.9169 19.1334 13.6836 19.1334 15.3669 14.075L17.8753 6.55837C18.9919 3.18337 17.1586 1.3417 13.7836 2.4667ZM14.0503 6.95004L10.8836 10.1334C10.7586 10.2584 10.6003 10.3167 10.4419 10.3167C10.2836 10.3167 10.1253 10.2584 10.0003 10.1334C9.75859 9.8917 9.75859 9.4917 10.0003 9.25004L13.1669 6.0667C13.4086 5.82504 13.8086 5.82504 14.0503 6.0667C14.2919 6.30837 14.2919 6.70837 14.0503 6.95004Z"
                fill="#FDFDFD"
              />
            </svg>
            <span className="text-[#fcfcfc] text-base font-medium font-brSonoma leading-tight tracking-tight">
              Send
            </span>
          </button>
          <button
            onClick={() => setOpenModal("request")}
            className="h-10 w-[138px] px-[18px] py-2 bg-raiz-usd-primary rounded-3xl justify-center items-center gap-1.5 inline-flex"
          >
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path
                d="M4.66683 11.6665C2.82516 11.6665 1.3335 13.1582 1.3335 14.9998C1.3335 16.8415 2.82516 18.3332 4.66683 18.3332C6.5085 18.3332 8.00016 16.8415 8.00016 14.9998C8.00016 13.1582 6.5085 11.6665 4.66683 11.6665ZM5.50016 14.7332C5.50016 15.2415 5.22516 15.7248 4.79183 15.9832L4.1585 16.3665C4.0585 16.4332 3.94183 16.4582 3.8335 16.4582C3.62516 16.4582 3.41683 16.3498 3.30016 16.1582C3.12516 15.8665 3.21683 15.4748 3.51683 15.2998L4.15016 14.9165C4.2085 14.8832 4.25016 14.8082 4.25016 14.7415V13.9665C4.25016 13.6165 4.5335 13.3332 4.87516 13.3332C5.21683 13.3332 5.50016 13.6165 5.50016 13.9582V14.7332Z"
                fill="#FDFDFD"
              />
              <path
                d="M14.6665 3.3335H6.33317C3.83317 3.3335 2.1665 4.5835 2.1665 7.50016V10.4668C2.1665 10.7752 2.48317 10.9668 2.75817 10.8418C3.57484 10.4668 4.5165 10.3252 5.50817 10.5002C7.69984 10.8918 9.30817 12.9252 9.24984 15.1502C9.2415 15.5002 9.1915 15.8418 9.09984 16.1752C9.03317 16.4335 9.2415 16.6752 9.50817 16.6752H14.6665C17.1665 16.6752 18.8332 15.4252 18.8332 12.5085V7.50016C18.8332 4.5835 17.1665 3.3335 14.6665 3.3335ZM10.4998 12.0835C9.34984 12.0835 8.4165 11.1502 8.4165 10.0002C8.4165 8.85016 9.34984 7.91683 10.4998 7.91683C11.6498 7.91683 12.5832 8.85016 12.5832 10.0002C12.5832 11.1502 11.6498 12.0835 10.4998 12.0835ZM16.5415 11.6668C16.5415 12.0085 16.2582 12.2918 15.9165 12.2918C15.5748 12.2918 15.2915 12.0085 15.2915 11.6668V8.3335C15.2915 7.99183 15.5748 7.7085 15.9165 7.7085C16.2582 7.7085 16.5415 7.99183 16.5415 8.3335V11.6668Z"
                fill="#FDFDFD"
              />
            </svg>
            <span className="text-[#fcfcfc] text-base font-medium font-brSonoma leading-tight tracking-tight">
              Request
            </span>
          </button>
          <button
            onClick={() => setOpenModal("swap")}
            className="h-10 w-[138px] px-[18px] py-2 bg-raiz-usd-primary rounded-3xl justify-center items-center gap-1.5 inline-flex"
          >
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path
                d="M10.1668 1.6665C5.56683 1.6665 1.8335 5.39984 1.8335 9.99984C1.8335 14.5998 5.56683 18.3332 10.1668 18.3332C14.7668 18.3332 18.5002 14.5998 18.5002 9.99984C18.5002 5.39984 14.7668 1.6665 10.1668 1.6665ZM14.4918 13.2832C14.4585 13.3582 14.4168 13.4248 14.3585 13.4832L12.9502 14.8915C12.8252 15.0165 12.6668 15.0748 12.5085 15.0748C12.3502 15.0748 12.1918 15.0165 12.0668 14.8915C11.8252 14.6498 11.8252 14.2498 12.0668 14.0082L12.4085 13.6665H7.75016C6.66683 13.6665 5.79183 12.7832 5.79183 11.7082V10.2332C5.79183 9.8915 6.07516 9.60817 6.41683 9.60817C6.7585 9.60817 7.04183 9.8915 7.04183 10.2332V11.7082C7.04183 12.0998 7.3585 12.4165 7.75016 12.4165H12.4085L12.0668 12.0748C11.8252 11.8332 11.8252 11.4332 12.0668 11.1915C12.3085 10.9498 12.7085 10.9498 12.9502 11.1915L14.3585 12.5998C14.4168 12.6582 14.4585 12.7248 14.4918 12.7998C14.5585 12.9582 14.5585 13.1332 14.4918 13.2832ZM14.5418 9.7665C14.5418 10.1082 14.2585 10.3915 13.9168 10.3915C13.5752 10.3915 13.2918 10.1082 13.2918 9.7665V8.2915C13.2918 7.89984 12.9752 7.58317 12.5835 7.58317H7.92516L8.26683 7.9165C8.5085 8.15817 8.5085 8.55817 8.26683 8.79984C8.14183 8.92484 7.9835 8.98317 7.82516 8.98317C7.66683 8.98317 7.5085 8.92484 7.3835 8.79984L5.97516 7.3915C5.91683 7.33317 5.87516 7.2665 5.84183 7.1915C5.77516 7.0415 5.77516 6.8665 5.84183 6.7165C5.87516 6.6415 5.91683 6.5665 5.97516 6.50817L7.3835 5.09984C7.62516 4.85817 8.02516 4.85817 8.26683 5.09984C8.5085 5.3415 8.5085 5.7415 8.26683 5.98317L7.92516 6.32484H12.5835C13.6668 6.32484 14.5418 7.20817 14.5418 8.28317V9.7665Z"
                fill="#FCFCFD"
              />
            </svg>

            <span className="text-[#fcfcfc] text-base font-medium font-brSonoma leading-tight tracking-tight">
              Swap
            </span>
          </button>
        </div>
      </div>

      <CustomersInfo />
      <SalesReport />
      <AnimatePresence>
        {openModal ? (
          <SideModalWrapper close={closeModal}>
            {displayScreen()}
          </SideModalWrapper>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default DashboardSummary;
