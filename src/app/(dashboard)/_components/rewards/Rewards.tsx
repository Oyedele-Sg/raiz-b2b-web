"use client";
import Image from "next/image";
import React, { useState } from "react";
import LevelsModal from "./LevelsModal";
import InviteModal from "./InviteModal";
import { copyToClipboard } from "@/utils/helpers";
import useShare from "@/lib/hooks/useShare";
import RaizScoreProgress from "@/components/ui/RaizScoreProgress";

const Rewards = ({ close }: { close: () => void }) => {
  const [showLevelsModal, setShowLevelsModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const referralCode = "KHADARO12";
  const { shareOnWhatsApp, shareOnIMessage, shareOnAll } =
    useShare(referralCode);
  return (
    <div className=" h-full overflow-y-scroll  no-scrollbar text-raiz-gray-950 ">
      <div className="flex items-center justify-between pb-2.5 mb-[19px]">
        <button onClick={close}>
          <Image
            src={"/icons/arrow-left.svg"}
            alt="back"
            width={18.48}
            height={18.48}
          />
        </button>
        <h5 className="text-center text-raiz-gray-950  font-bold  leading-tight">
          Raiz Points
        </h5>
        <button onClick={() => setShowInviteModal(true)}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M9.99984 0.833008C9.53984 0.833008 9.1665 1.20634 9.1665 1.66634C9.1665 1.83051 9.1665 4.83551 9.1665 4.99967C9.1665 5.45967 9.53984 5.83301 9.99984 5.83301C10.4598 5.83301 10.8332 5.45967 10.8332 4.99967C10.8332 4.83551 10.8332 1.83051 10.8332 1.66634C10.8332 1.20634 10.4598 0.833008 9.99984 0.833008Z"
              fill="black"
            />
            <path
              d="M13.0893 1.91105C12.7635 1.58522 12.236 1.58605 11.911 1.91105C11.7951 2.02772 9.67013 4.15189 9.5543 4.26772C9.2293 4.59272 9.2293 5.12105 9.5543 5.44605C9.88013 5.77189 10.4076 5.77189 10.7326 5.44605C10.8485 5.33022 12.9735 3.20522 13.0893 3.08939C13.4151 2.76439 13.4151 2.23605 13.0893 1.91105Z"
              fill="black"
            />
            <path
              d="M10.4467 5.44637C10.1209 5.7722 9.59339 5.77137 9.26839 5.44637C9.15255 5.3297 7.02755 3.20553 6.91172 3.0897C6.58672 2.7647 6.58672 2.23637 6.91172 1.91137C7.23755 1.58553 7.76505 1.58553 8.09005 1.91137C8.20589 2.0272 10.3309 4.1522 10.4467 4.26803C10.7717 4.59303 10.7717 5.12053 10.4467 5.44637Z"
              fill="black"
            />
            <path
              d="M5 4.16699H15C16.3808 4.16699 17.5 5.28616 17.5 6.66699V7.50033H2.5V6.66699C2.5 5.28616 3.61917 4.16699 5 4.16699Z"
              fill="black"
            />
            <path
              opacity="0.35"
              d="M5 17.5H15C16.3808 17.5 17.5 16.3808 17.5 15V7.5H2.5V15C2.5 16.3808 3.61917 17.5 5 17.5Z"
              fill="black"
            />
            <path d="M10.8332 7.5H9.1665V17.5H10.8332V7.5Z" fill="black" />
            <path
              d="M15 17.9316V13.765C15 13.305 15.3733 12.9316 15.8333 12.9316C16.2933 12.9316 16.6667 13.305 16.6667 13.765V17.9316C16.6667 18.3916 16.2933 18.765 15.8333 18.765C15.3733 18.765 15 18.3916 15 17.9316Z"
              fill="black"
              fillOpacity="0.85"
            />
            <path
              d="M13.7498 15.0156H17.9165C18.3765 15.0156 18.7498 15.389 18.7498 15.849C18.7498 16.309 18.3765 16.6823 17.9165 16.6823H13.7498C13.2898 16.6823 12.9165 16.309 12.9165 15.849C12.9165 15.389 13.2898 15.0156 13.7498 15.0156Z"
              fill="black"
              fillOpacity="0.85"
            />
            <path
              opacity="0.35"
              d="M15.8332 20.0003C18.1344 20.0003 19.9998 18.1348 19.9998 15.8337C19.9998 13.5325 18.1344 11.667 15.8332 11.667C13.532 11.667 11.6665 13.5325 11.6665 15.8337C11.6665 18.1348 13.532 20.0003 15.8332 20.0003Z"
              fill="black"
              fillOpacity="0.45"
            />
          </svg>
        </button>
      </div>

      {/* Points card */}
      <div
        style={{
          background: `linear-gradient(to right, #283E75, #714BDB), url('/images/point-pattern.png')`,
          backgroundSize: "cover",
          //   backgroundBlendMode: "multiply",
          backgroundBlendMode: "overlay",
        }}
        className="px-5 py-8 rounded-[20px] flex-col justify-start items-center gap-2.5 inline-flex w-full"
      >
        <div className="flex flex-col justify-center items-center">
          <Image
            src={"/icons/star-coin.svg"}
            alt="coin"
            width={48}
            height={48}
          />
          <p className="text-raiz-gray-100 text-xl font-bold leading-normal mt-2.5">
            24,000pt
          </p>
          <p className="text-raiz-gray-100 text-[15px] font-normal leading-[21px] mt-1">
            Reward points
          </p>
        </div>
      </div>

      {/* Code Sharing */}
      <div className=" px-3 py-5 opacity-80 bg-[#f1f3fe] rounded-[20px] justify-center  inline-flex flex-col w-full mt-6">
        <h4 className="text-sm font-medium font-brSonoma leading-normal mb-3">
          Share your Code
        </h4>
        <div className="p-[15px] bg-raiz-gray-50 rounded-lg justify-between items-center inline-flex">
          <span className="text-sm font-normal leading-tight">
            {referralCode}
          </span>
          <button onClick={() => copyToClipboard(referralCode)}>
            <Image src={"/icons/copy.svg"} alt="copy" width={16} height={16} />
          </button>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <button onClick={shareOnWhatsApp}>
            <Image
              src={"/icons/whatsapp.svg"}
              alt="whatsapp share"
              width={28}
              height={28}
            />
          </button>
          <button onClick={shareOnIMessage}>
            <Image
              src={"/icons/imessage.svg"}
              alt="imessage share"
              width={28}
              height={28}
            />
          </button>
          <button onClick={shareOnAll}>
            <Image
              src={"/icons/all-share.svg"}
              alt="all share"
              width={28}
              height={28}
            />
          </button>
        </div>
      </div>

      {/* Level Progress */}
      <div className=" px-3 py-5 opacity-80 bg-[#f1f3fe] rounded-[20px] justify-center  inline-flex flex-col w-full mt-6">
        <RaizScoreProgress />
        <div className="flex gap-2 items-center mt-6">
          <p className="text-sm font-semibold font-brSonoma leading-[21px]">
            Labels
          </p>
          <button onClick={() => setShowLevelsModal(true)}>
            <Image
              src={"/icons/tooltip-info.svg"}
              alt="info"
              width={20}
              height={20}
            />
          </button>
        </div>
        <p className="text-raiz-gray-950 text-[13px]  leading-tight">
          Rack up more points to enjoy exclusive discounts{" "}
        </p>
      </div>

      {/* Activity */}

      <div className="mt-5">
        <div className="flex justify-between  items-center mb-4">
          <h5 className="text-raiz-gray-900 text-[15px] font-semibold  leading-[21px]">
            Activity
          </h5>
          <button className="">
            <Image
              src={"/icons/arrow-right.svg"}
              alt=""
              width={18}
              height={18}
            />
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {/* map */}
          <div className="flex justify-between ">
            <div className="flex gap-2.5 items-center">
              <Image
                className="h-12 w-12 rounded-[48px]"
                src={"/images/pfp.png"}
                alt="pfp"
                width={48}
                height={48}
              />
              <div className="">
                <p className="text-raiz-gray-950 text-sm font-semibold">
                  Desirae Bergson
                </p>
                <p className="text-raiz-gray-950 text-xs opacity-50 leading-[15px]">
                  18 Jun 2023 @ 2:31 PM
                </p>
              </div>
            </div>
            <div>
              <p className="text-[#e5890c] text-sm font-semibold  leading-tight">
                23,000pt
              </p>
              <p className="text-[#19151e] text-xs font-normal  leading-[18px]">
                1000pt
              </p>
            </div>
          </div>
          <div className="flex justify-between ">
            <div className="flex gap-2.5 items-center">
              <Image
                className="h-12 w-12 rounded-[48px]"
                src={"/images/pfp.png"}
                alt="pfp"
                width={48}
                height={48}
              />
              <div className="">
                <p className="text-raiz-gray-950 text-sm font-semibold">
                  Desirae Bergson
                </p>
                <p className="text-raiz-gray-950 text-xs opacity-50 leading-[15px]">
                  18 Jun 2023 @ 2:31 PM
                </p>
              </div>
            </div>
            <div>
              <p className="text-[#e5890c] text-sm font-semibold  leading-tight">
                23,000pt
              </p>
              <p className="text-[#19151e] text-xs font-normal  leading-[18px]">
                1000pt
              </p>
            </div>
          </div>
          <div className="flex justify-between ">
            <div className="flex gap-2.5 items-center">
              <Image
                className="h-12 w-12 rounded-[48px]"
                src={"/images/pfp.png"}
                alt="pfp"
                width={48}
                height={48}
              />
              <div className="">
                <p className="text-raiz-gray-950 text-sm font-semibold">
                  Desirae Bergson
                </p>
                <p className="text-raiz-gray-950 text-xs opacity-50 leading-[15px]">
                  18 Jun 2023 @ 2:31 PM
                </p>
              </div>
            </div>
            <div>
              <p className="text-[#e5890c] text-sm font-semibold  leading-tight">
                23,000pt
              </p>
              <p className="text-[#19151e] text-xs font-normal  leading-[18px]">
                1000pt
              </p>
            </div>
          </div>
        </div>
      </div>
      {showLevelsModal && (
        <LevelsModal close={() => setShowLevelsModal(false)} />
      )}
      {showInviteModal && (
        <InviteModal close={() => setShowInviteModal(false)} />
      )}
    </div>
  );
};

export default Rewards;
