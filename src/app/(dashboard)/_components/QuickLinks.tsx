"use client";
import Image from "next/image";
import React, { useState } from "react";
import NGNAcctInfo from "./quick-links/acctInfo/NGNAcctInfo";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import USDAcctInfo from "./quick-links/acctInfo/USDAcctInfo";
import SelectCardModal from "./quick-links/cards/SelectCardModal";
import TopUp from "./quick-links/topUp/TopUp";

type key = "acct-info" | "card" | "split-bills" | "analytics" | "top-up";

const Links: { title: string; icon: string; key: key }[] = [
  {
    title: "Top Up",
    icon: "/icons/topup.svg",
    key: "top-up",
  },
  {
    title: "Analytics",
    icon: "/icons/analytics.svg",
    key: "analytics",
  },
  {
    title: "Split bills",
    icon: "/icons/split.svg",
    key: "split-bills",
  },
  {
    title: "Acct info",
    icon: "/icons/info.svg",
    key: "acct-info",
  },
  {
    title: "Card",
    icon: "/icons/card.svg",
    key: "card",
  },
];

const QuickLinks = () => {
  const { selectedCurrency } = useCurrencyStore();
  const [openModal, setOpenModal] = useState<key | null>(null);

  const closeModal = () => {
    setOpenModal(null);
  };
  const displayModal = () => {
    switch (openModal) {
      case "acct-info":
        return selectedCurrency.name === "NGN" ? (
          <NGNAcctInfo close={closeModal} />
        ) : (
          <USDAcctInfo close={closeModal} />
        );
      case "card":
        return <SelectCardModal close={closeModal} />;
      // case "swap":
      //   return <h1>Swap</h1>;
      case "top-up":
        return <TopUp close={closeModal} />;
      default:
        break;
    }
  };
  return (
    <div className="p-3 xl:p-6 rounded-[20px] border border-raiz-gray-200 flex-col justify-start items-start gap-5 inline-flex">
      <div className="flex justify-between items-center w-full">
        <h6 className="text-raiz-gray-900 font-semibold  leading-snug">
          Quick Links
        </h6>
        <button>
          <Image
            src={"/icons/Dropdown.svg"}
            alt="option"
            width={20}
            height={20}
          />
        </button>
      </div>
      <div className="flex justify-between gap-3 w-full overflow-x-scroll">
        {Links.map((each, i) => (
          <button
            key={i}
            onClick={() => setOpenModal(each.key)}
            className="px-6 xl:px-8 py-2 xl:py-4 bg-raiz-gray-50 rounded-[20px] border min-w-[100px] border-raiz-gray-200 flex-col justify-center items-center gap-2 inline-flex"
          >
            <Image
              src={each?.icon || ""}
              alt={each?.title || ""}
              width={48}
              height={48}
            />
            <p className="text-raiz-gray-800 text-[13px] font-medium font-brSonoma leading-none">
              {each?.title}
            </p>
          </button>
        ))}
      </div>
      {displayModal()}
    </div>
  );
};

export default QuickLinks;
