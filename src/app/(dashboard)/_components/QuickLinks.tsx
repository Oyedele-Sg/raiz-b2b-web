import Image from "next/image";
import React from "react";

const Links = [
  {
    title: "Top Up",
    icon: "/icons/topup.svg",
  },
  {
    title: "Analytics",
    icon: "/icons/analytics.svg",
  },
  ,
  {
    title: "Split bills",
    icon: "/icons/split.svg",
  },
  {
    title: "Acct info",
    icon: "/icons/info.svg",
  },
  {
    title: "Card",
    icon: "/icons/card.svg",
  },
];

const QuickLinks = () => {
  return (
    <div className="p-3 xl:p-6 rounded-[20px] border border-raiz-gray-200 flex-col justify-start items-start gap-5 inline-flex">
      <div className="flex justify-between items-center w-full">
        <h6 className="text-raiz-gray-900 font-semibold font-monzo leading-snug">
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
    </div>
  );
};

export default QuickLinks;
