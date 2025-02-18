import Overlay from "@/components/ui/Overlay";
import React from "react";
import Image from "next/image";
import { copyToClipboard } from "@/utils";
import useShare from "@/hooks/useShare";

const InviteModal = ({ close }: { close: () => void }) => {
  const referralCode = "KHADARO12";
  const { shareOnWhatsApp, shareOnIMessage, shareOnAll } =
    useShare(referralCode);
  return (
    <Overlay width="375px" close={close}>
      <div className="flex flex-col  h-full py-8 px-5 justify-between gap-5 font-monzo text-raiz-gray-950">
        <div className="flex flex-col justify-center items-center ">
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
            <g clipPath="url(#clip0_23777_10461)">
              <path
                d="M24.5 13C23.948 13 23.5 13.448 23.5 14C23.5 14.197 23.5 17.803 23.5 18C23.5 18.552 23.948 19 24.5 19C25.052 19 25.5 18.552 25.5 18C25.5 17.803 25.5 14.197 25.5 14C25.5 13.448 25.052 13 24.5 13Z"
                fill="#BD8039"
              />
              <path
                d="M28.2069 14.2929C27.8159 13.9019 27.1829 13.9029 26.7929 14.2929C26.6539 14.4329 24.1039 16.9819 23.9649 17.1209C23.5749 17.5109 23.5749 18.1449 23.9649 18.5349C24.3559 18.9259 24.9889 18.9259 25.3789 18.5349C25.5179 18.3959 28.0679 15.8459 28.2069 15.7069C28.5979 15.3169 28.5979 14.6829 28.2069 14.2929Z"
                fill="#BD8039"
              />
              <path
                d="M25.036 18.5362C24.645 18.9272 24.012 18.9262 23.622 18.5362C23.483 18.3962 20.933 15.8472 20.794 15.7082C20.404 15.3182 20.404 14.6842 20.794 14.2942C21.185 13.9032 21.818 13.9032 22.208 14.2942C22.347 14.4332 24.897 16.9832 25.036 17.1222C25.426 17.5122 25.426 18.1452 25.036 18.5362Z"
                fill="#BD8039"
              />
              <path
                d="M18.5 17H30.5C32.157 17 33.5 18.343 33.5 20V21H15.5V20C15.5 18.343 16.843 17 18.5 17Z"
                fill="#BD8039"
              />
              <path
                opacity="0.35"
                d="M18.5 33H30.5C32.157 33 33.5 31.657 33.5 30V21H15.5V30C15.5 31.657 16.843 33 18.5 33Z"
                fill="#CCE093"
              />
              <path d="M25.5 21H23.5V33H25.5V21Z" fill="#BD8039" />
              <path
                d="M30.5 33.5176V28.5176C30.5 27.9656 30.948 27.5176 31.5 27.5176C32.052 27.5176 32.5 27.9656 32.5 28.5176V33.5176C32.5 34.0696 32.052 34.5176 31.5 34.5176C30.948 34.5176 30.5 34.0696 30.5 33.5176Z"
                fill="#70A784"
              />
              <path
                d="M29 30.0176H34C34.552 30.0176 35 30.4656 35 31.0176C35 31.5696 34.552 32.0176 34 32.0176H29C28.448 32.0176 28 31.5696 28 31.0176C28 30.4656 28.448 30.0176 29 30.0176Z"
                fill="#70A784"
              />
              <path
                opacity="0.35"
                d="M31.5 36C34.2614 36 36.5 33.7614 36.5 31C36.5 28.2386 34.2614 26 31.5 26C28.7386 26 26.5 28.2386 26.5 31C26.5 33.7614 28.7386 36 31.5 36Z"
                fill="#34AA44"
              />
            </g>
            <defs>
              <clipPath id="clip0_23777_10461">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(12.5 12)"
                />
              </clipPath>
            </defs>
          </svg>
          <h4 className="text-xl font-bold mt-4">Invite and Earn Cashbacks</h4>
          <p className="text-center text-sm">
            Invite your friends to join raiz and get 1,000pt cash back for every
            friend that joins using your referral code.
          </p>
        </div>
        <div className="p-5">
          <p className="text-center text-raiz-gray-600 text-[15px] ">
            Referral Code
          </p>
          <div className="flex justify-center items-center gap-2 ">
            <span className="text-center  text-lg font-semibold">
              {referralCode}
            </span>
            <button onClick={() => copyToClipboard(referralCode)}>
              <Image
                src={"/icons/copy.svg"}
                alt="copy"
                width={16}
                height={16}
              />
            </button>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-3 justify-center">
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
    </Overlay>
  );
};

export default InviteModal;
