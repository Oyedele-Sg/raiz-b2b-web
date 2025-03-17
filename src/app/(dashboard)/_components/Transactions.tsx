import React from "react";
import Image from "next/image";
import EmptyList from "@/components/ui/EmptyList";

type Transaction = {
  id: number;
  requester: string;
  time: string;
  amount: number;
  imageUrl: string;
  type: string;
};

const sampleTrx: Transaction[] = [
  // {
  //   id: 1,
  //   requester: "Desirae Bergson",
  //   time: "18 Mar 2023 @ 4:42 PM",
  //   amount: 4000000,
  //   imageUrl: "/images/pfp.png",
  //   type: "credit",
  // },
  // {
  //   id: 2,
  //   requester: "Sarah K",
  //   time: "8 Apr 2023 @ 2:20 PM",
  //   amount: 2500000,
  //   imageUrl: "/images/pfp.png",
  //   type: "credit",
  // },
  // {
  //   id: 3,
  //   requester: "Michael D",
  //   time: "8 Apr 2023 @ 2:20 PM",
  //   amount: 1500000,
  //   imageUrl: "/images/pfp.png",
  //   type: "debit",
  // },
  // {
  //   id: 4,
  //   requester: "Linda W",
  //   time: "8 Apr 2023 @ 2:20 PM",
  //   amount: 3200000,
  //   imageUrl: "/images/pfp.png",
  //   type: "credit",
  // },
  // {
  //   id: 5,
  //   requester: "David T",
  //   time: "18 Mar 2023 @ 4:42 PM",
  //   amount: 500000,
  //   imageUrl: "/images/pfp.png",
  //   type: "debit",
  // },
  // {
  //   id: 6,
  //   requester: "Jessica L",
  //   time: "18 Mar 2023 @ 4:42 PM",
  //   amount: 4500000,
  //   imageUrl: "/images/pfp.png",
  //   type: "credit",
  // },
  // {
  //   id: 7,
  //   requester: "Kevin M",
  //   time: "18 Mar 2023 @ 4:42 PM",
  //   amount: 1200000,
  //   imageUrl: "/images/pfp.png",
  //   type: "credit",
  // },
];

const Transactions = () => {
  return (
    <div className=" p-6 rounded-[20px] border border-raiz-gray-200 flex-col justify-start items-start gap-5 inline-flex">
      <div className="w-full mb-5 flex justify-between items-center">
        <h6 className="text-gray-900 text-base font-semibold  leading-snug">
          Transactions
        </h6>
        <button className="flex items-center gap-2 ">
          <span className="text-primary2 text-sm font-bold  leading-[16.80px]">
            Go to Transactions
          </span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M6.7396 2.24122C6.55306 2.24126 6.37077 2.29695 6.21605 2.40117C6.06133 2.50538 5.94121 2.65338 5.87106 2.82624C5.80091 2.99909 5.78392 3.18894 5.82226 3.37151C5.8606 3.55407 5.95253 3.72105 6.08628 3.85108L11.2352 9L6.08628 14.1489C5.99913 14.2361 5.92999 14.3395 5.88282 14.4534C5.83565 14.5672 5.81136 14.6893 5.81136 14.8125C5.81135 14.9358 5.83562 15.0578 5.88278 15.1717C5.92994 15.2855 5.99907 15.389 6.08622 15.4761C6.17337 15.5633 6.27683 15.6324 6.39069 15.6796C6.50455 15.7267 6.62659 15.751 6.74984 15.751C6.87308 15.751 6.99512 15.7267 7.10898 15.6795C7.22284 15.6324 7.32629 15.5632 7.41343 15.4761L13.2259 9.66358C13.3132 9.57649 13.3824 9.47306 13.4296 9.35919C13.4768 9.24533 13.5011 9.12327 13.5011 9C13.5011 8.87674 13.4768 8.75468 13.4296 8.64081C13.3824 8.52695 13.3132 8.42352 13.2259 8.33643L7.41343 2.52393C7.32576 2.4341 7.22094 2.36279 7.10519 2.31423C6.98945 2.26566 6.86513 2.24083 6.7396 2.24122Z"
              fill="#443852"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col gap-3 w-full max-h-72 overflow-y-scroll">
        {sampleTrx?.length > 0 ? (
          sampleTrx?.map((each, index) => (
            <div
              key={index}
              className=" flex items-center justify-between w-full"
            >
              <div className="flex gap-[14px]">
                <Image
                  src={each.imageUrl}
                  width={48}
                  height={48}
                  alt="requester"
                />
                <div className="flex flex-col gap-1">
                  <p className=" text-raiz-gray-950 text-sm font-semibold ">
                    {each.requester}
                  </p>
                  <p className="opacity-50 text-raiz-gray-950 text-xs font-normal  leading-[15px]">
                    {each.time}
                  </p>
                </div>
              </div>
              <span className="text-raiz-gray-900 text-sm font-semibold  leading-tight ">
                ₦{each.amount.toLocaleString()}
              </span>
            </div>
          ))
        ) : (
          <EmptyList text="No transactions yet" />
        )}
      </div>
    </div>
  );
};

export default Transactions;
