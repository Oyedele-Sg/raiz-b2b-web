import EmptyList from "@/components/ui/EmptyList";
import Image from "next/image";
import React from "react";

interface BillRequest {
  id: number;
  requester: string;
  time: string;
  amount: number;
  imageUrl: string;
}

const billRequests: BillRequest[] = [
  // {
  //   id: 1,
  //   requester: "James B",
  //   time: "Today, 15:05",
  //   amount: 4000000,
  //   imageUrl: "/images/pfp.png",
  // },
  // {
  //   id: 2,
  //   requester: "Sarah K",
  //   time: "Yesterday, 14:20",
  //   amount: 2500000,
  //   imageUrl: "/images/pfp.png",
  // },
  // {
  //   id: 3,
  //   requester: "Michael D",
  //   time: "2 hours ago",
  //   amount: 1500000,
  //   imageUrl: "/images/pfp.png",
  // },
  // {
  //   id: 4,
  //   requester: "Linda W",
  //   time: "Today, 12:40",
  //   amount: 3200000,
  //   imageUrl: "/images/pfp.png",
  // },
  // {
  //   id: 5,
  //   requester: "David T",
  //   time: "3 hours ago",
  //   amount: 500000,
  //   imageUrl: "/images/pfp.png",
  // },
  // {
  //   id: 6,
  //   requester: "Jessica L",
  //   time: "Yesterday, 10:15",
  //   amount: 4500000,
  //   imageUrl: "/images/pfp.png",
  // },
  // {
  //   id: 7,
  //   requester: "Kevin M",
  //   time: "Today, 16:00",
  //   amount: 1200000,
  //   imageUrl: "/images/pfp.png",
  // },
];

const BillRequests = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full mb-5">
        <h6 className="text-raiz-gray-900 text-base font-semibold  leading-snug">
          Bill Request
        </h6>
        <button>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M6.7396 2.24122C6.55306 2.24126 6.37077 2.29695 6.21605 2.40117C6.06133 2.50538 5.94121 2.65338 5.87106 2.82624C5.80091 2.99909 5.78392 3.18894 5.82226 3.37151C5.8606 3.55407 5.95253 3.72105 6.08628 3.85108L11.2352 9L6.08628 14.1489C5.99913 14.2361 5.92999 14.3395 5.88282 14.4534C5.83565 14.5672 5.81136 14.6893 5.81136 14.8125C5.81135 14.9358 5.83562 15.0578 5.88278 15.1717C5.92994 15.2855 5.99907 15.389 6.08622 15.4761C6.17337 15.5633 6.27683 15.6324 6.39069 15.6796C6.50455 15.7267 6.62659 15.751 6.74984 15.751C6.87308 15.751 6.99512 15.7267 7.10898 15.6795C7.22284 15.6324 7.32629 15.5632 7.41343 15.4761L13.2259 9.66358C13.3132 9.57649 13.3824 9.47306 13.4296 9.35919C13.4768 9.24533 13.5011 9.12327 13.5011 9C13.5011 8.87674 13.4768 8.75468 13.4296 8.64081C13.3824 8.52695 13.3132 8.42352 13.2259 8.33643L7.41343 2.52393C7.32576 2.4341 7.22094 2.36279 7.10519 2.31423C6.98945 2.26566 6.86513 2.24083 6.7396 2.24122Z"
              fill="#443852"
            />
          </svg>
        </button>
      </div>
      <section className="flex flex-col gap-4 w-full max-h-[568px] overflow-y-scroll">
        {billRequests?.length > 0 ? (
          billRequests.map((request) => (
            <div
              key={request.id}
              className="w-full px-[15px] py-[18px] bg-[#f3eee9] rounded-[20px] flex-col justify-center items-start gap-4 inline-flex"
            >
              <div className=" flex items-center justify-between w-full">
                <div className="flex gap-2 ">
                  <Image
                    src={request.imageUrl}
                    width={38}
                    height={38}
                    alt="requester"
                  />
                  <div className="flex flex-col gap-0.5">
                    <p className="text-raiz-gray-900 text-[13px] xl:text-sm font-semibold leading-tight">
                      {request.requester}
                    </p>
                    <p className="text-raiz-gray-800 text-[11px] xl:text-[13px] font-normal  leading-none">
                      {request.time}
                    </p>
                  </div>
                </div>
                <span className="text-raiz-gray-900 text-sm xl:text-base font-semibold ">
                  ₦{request.amount.toLocaleString()}
                </span>
              </div>
              <div className="flex w-full justify-between items-center gap-2">
                <button className="w-1/2 h-10 px-5 py-2 bg-[#f1e0cb] rounded-3xl justify-center items-center gap-1.5 inline-flex">
                  <span className="text-raiz-gray-800 text-sm font-medium font-brSonoma leading-[16.80px]">
                    Reject
                  </span>
                </button>
                <button className="w-1/2 h-10 px-5 py-2 bg-[#3c2875] rounded-3xl justify-center items-center gap-1.5 inline-flex">
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none">
                    <path
                      d="M11.2601 1.97336L5.24008 3.97336C1.19341 5.3267 1.19341 7.53336 5.24008 8.88003L7.02674 9.47336L7.62008 11.26C8.96674 15.3067 11.1801 15.3067 12.5267 11.26L14.5334 5.2467C15.4267 2.5467 13.9601 1.07336 11.2601 1.97336ZM11.4734 5.56003L8.94008 8.1067C8.84008 8.2067 8.71341 8.25336 8.58674 8.25336C8.46008 8.25336 8.33341 8.2067 8.23341 8.1067C8.04008 7.91336 8.04008 7.59336 8.23341 7.40003L10.7667 4.85336C10.9601 4.66003 11.2801 4.66003 11.4734 4.85336C11.6667 5.0467 11.6667 5.3667 11.4734 5.56003Z"
                      fill="#F4F4F4"
                    />
                  </svg>

                  <span className="text-secondary-white text-sm font-medium font-brSonoma leading-[16.80px]">
                    Accept
                  </span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <EmptyList text="No bill request yet" />
        )}
      </section>
    </div>
  );
};

export default BillRequests;
