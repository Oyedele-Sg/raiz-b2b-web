import Overlay from "@/components/ui/Overlay";
import RaizScoreProgress from "@/components/ui/RaizScoreProgress";
import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { getTierInfo } from "@/utils/helpers";

interface Props {
  setShowLevels: Dispatch<SetStateAction<boolean>>;
  close: () => void;
  score: number;
}

const RaizScoreModal = ({ close, setShowLevels, score }: Props) => {
  const { currentTier } = getTierInfo(score);
  const handleOpenLevels = () => {
    setShowLevels(true);
    close();
  };
  return (
    <Overlay width="385px" close={close}>
      <div className="flex flex-col  lg:h-[90%] xl:h-full overflow-y-scroll py-8 px-5  text-raiz-gray-950 no-scrollbar">
        <div className="flex flex-col justify-center items-center gap-1 mb-8">
          <svg
            width="41"
            height="40"
            viewBox="0 0 41 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.5 0C9.454 0 0.5 8.954 0.5 20C0.5 31.046 9.454 40 20.5 40C31.546 40 40.5 31.046 40.5 20C40.5 8.954 31.546 0 20.5 0ZM30.824 18.574L27.694 21.616C27.222 22.074 27.006 22.736 27.116 23.386L27.846 27.69C28.124 29.324 26.406 30.568 24.94 29.794L21.08 27.756C20.498 27.448 19.802 27.448 19.218 27.752L15.352 29.776C13.884 30.544 12.17 29.296 12.454 27.662L13.2 23.362C13.312 22.714 13.098 22.05 12.628 21.59L9.508 18.538C8.32 17.378 8.98 15.362 10.62 15.128L14.94 14.508C15.592 14.414 16.156 14.006 16.448 13.416L18.386 9.506C19.122 8.02 21.242 8.024 21.974 9.512L23.898 13.43C24.188 14.02 24.75 14.43 25.402 14.526L29.72 15.16C31.36 15.402 32.012 17.418 30.824 18.574Z"
              fill="#FBB756"
            />
          </svg>
          <p className="uppercase text-center text-[#dd9d43] text-xs font-semibold leading-none mt-[11px]">
            {currentTier.level}
          </p>
          <p className="text-center text-raiz-gray-950 text-[23px] font-bold leading-7">
            {score}
          </p>
          <p className="opacity-50 text-center text-raiz-gray-950 text-xs font-semibold leading-none">
            RAIZ SCORE
          </p>
        </div>

        <RaizScoreProgress value={score} />
        <div className="flex flex-col mt-8">
          <div className="flex gap-2 items-center mb-2">
            <p className="text-sm font-semibold font-brSonoma leading-[21px]">
              Labels
            </p>
            <button onClick={handleOpenLevels}>
              <Image
                src={"/icons/tooltip-info.svg"}
                alt="info"
                width={20}
                height={20}
              />
            </button>
          </div>
          <p className="text-raiz-gray-950 text-[13px] font-normal leading-tight">
            Rack up more points to enjoy exclusive discounts by doing the
            following:
          </p>
          <div className="flex flex-col gap-5 mt-[28px]">
            <div className="flex gap-3">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.5"
                  d="M25.9737 17.4712L8.075 26.4212C6.0875 27.4149 3.75 25.9699 3.75 23.7487V6.25369C3.75 4.03244 6.0875 2.58744 8.07375 3.58119L25.9725 12.5312C28.0087 13.5487 28.0087 16.4537 25.9737 17.4712Z"
                  fill="#89B1ED"
                />
                <path
                  d="M19.2812 15.8375L3.74996 18.75L2.18496 17.185C0.978711 15.9788 0.978711 14.0212 2.18496 12.815L3.74996 11.25L19.2812 14.1625C20.2087 14.3362 20.2087 15.6638 19.2812 15.8375Z"
                  fill="#5B3CB1"
                />
              </svg>
              <div className="flex flex-col gap-1.5">
                <h3 className=" text-raiz-gray-950 text-base font-semibold leading-[18px]">
                  Debit Transactions
                </h3>
                <p className="text-raiz-gray-950 text-[13px] font-normal leading-[18px]">
                  Gain the ability to carry out debit transactions seamlessly.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.5"
                  d="M18.7501 10.0006C18.5276 10.0006 18.3089 10.0181 18.0901 10.0344C17.5139 6.77562 14.6739 4.29688 11.2501 4.29688C7.41014 4.29688 4.29639 7.40937 4.29639 11.2506C4.29639 14.6744 6.77389 17.5144 10.0326 18.0906C10.0176 18.3094 10.0001 18.5281 10.0001 18.7506C10.0001 23.5831 13.9176 27.5006 18.7501 27.5006C23.5826 27.5006 27.5001 23.5831 27.5001 18.7506C27.5001 13.9181 23.5826 10.0006 18.7501 10.0006Z"
                  fill="#DDCE44"
                />
                <path
                  d="M11.25 2.5C6.4175 2.5 2.5 6.4175 2.5 11.25C2.5 15.6862 5.805 19.3438 10.0863 19.9137C10.035 19.5325 10 19.145 10 18.75C10 17.925 10.1225 17.1287 10.3363 16.3725C9.80375 16.3 9.3475 16.1425 8.97625 15.9325C8.49875 15.6613 8.37375 15.0275 8.68375 14.575L8.7125 14.5337C8.98 14.1425 9.5025 13.98 9.9225 14.2C10.17 14.33 10.4738 14.4288 10.8263 14.4288C10.98 14.4288 11.0913 14.3863 11.2 14.3438C11.37 14.0538 11.5563 13.775 11.7575 13.5063C11.7587 13.4888 11.765 13.465 11.765 13.45C11.765 11.85 8.56875 12.4062 8.56875 9.32875C8.56875 7.9375 9.34125 6.85 10.5288 6.455V5.88C10.5288 5.48875 10.8463 5.17 11.2388 5.17C11.63 5.17 11.9487 5.4875 11.9487 5.88V6.30625C12.4012 6.34875 12.7737 6.4575 13.0737 6.5925C13.6187 6.83875 13.7975 7.525 13.4525 8.01375C13.1825 8.395 12.6788 8.57375 12.2525 8.38125C12.07 8.2975 11.8562 8.24 11.615 8.24C11.3713 8.24 10.6625 8.335 10.6625 9.235C10.6625 10.4212 12.6087 10.4512 13.4812 11.7762C14.9487 10.6662 16.7688 10 18.75 10C19.145 10 19.5325 10.035 19.9137 10.0863C19.3438 5.805 15.6862 2.5 11.25 2.5Z"
                  fill="#B99C33"
                />
                <path
                  d="M25.3264 3.28283L22.8927 5.69283C22.5827 5.99908 22.5827 6.50033 22.8927 6.80658L25.3264 9.21658C25.6689 9.55658 26.2502 9.31408 26.2502 8.83158V3.66908C26.2502 3.18658 25.6689 2.94408 25.3264 3.28283Z"
                  fill="#B99C33"
                />
                <path
                  d="M4.67375 26.7174L7.1075 24.3074C7.4175 24.0012 7.4175 23.4999 7.1075 23.1937L4.67375 20.7837C4.33125 20.4437 3.75 20.6862 3.75 21.1687V26.3324C3.75 26.8137 4.33125 27.0562 4.67375 26.7174Z"
                  fill="#B99C33"
                />
                <path
                  d="M19.8775 15.5187C18.6938 15.5187 18.33 16.48 18.215 16.9537H19.955C20.39 16.9537 20.7075 17.365 20.5975 17.7863C20.5213 18.0775 20.2575 18.2812 19.955 18.2812H17.9213C17.9025 18.3612 17.8938 18.665 17.8938 18.7363C17.8938 18.8075 17.8975 19.1063 17.9063 19.1788H19.4975C19.925 19.1788 20.24 19.5763 20.1438 19.9925C20.0738 20.2925 19.8063 20.505 19.4975 20.505H18.12C18.2188 20.9525 18.5925 21.8987 19.7825 21.8987C19.915 21.8987 20.045 21.8875 20.1688 21.8688C20.64 21.7975 21.0738 22.1425 21.1375 22.615L21.1475 22.6887C21.2088 23.14 20.915 23.5663 20.4688 23.6575C20.2138 23.7113 19.8975 23.75 19.5288 23.75C16.66 23.75 16.0788 21.0062 15.99 20.505H15.6075C15.1775 20.505 14.8613 20.1025 14.9638 19.685C15.0363 19.3875 15.3025 19.1788 15.6075 19.1788H15.87C15.8613 19.1063 15.8575 18.8088 15.8575 18.7363C15.8575 18.6738 15.8613 18.36 15.87 18.2812H15.6075C15.1775 18.2812 14.8625 17.8788 14.9638 17.4625V17.4612C15.0363 17.1637 15.3025 16.955 15.6075 16.955H16.0163C16.2675 15.8813 17.0088 13.75 19.7963 13.75C20.0338 13.75 20.29 13.7775 20.5288 13.8175C21.0325 13.9012 21.35 14.405 21.22 14.8975C21.1113 15.31 20.7225 15.5875 20.2988 15.5412C20.1763 15.5275 20.0363 15.5187 19.8775 15.5187Z"
                  fill="#B99C33"
                />
              </svg>

              <div className="flex flex-col gap-1.5">
                <h3 className=" text-raiz-gray-950 text-base font-semibold leading-[18px]">
                  Multi-Currency Support
                </h3>
                <p className="text-raiz-gray-950 text-[13px] font-normal leading-[18px]">
                  Easily manage and transact in multiple currencies.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.75 3.23145C23.75 2.6977 23.125 2.41019 22.7188 2.75644L19.1813 5.77644C18.8888 6.02644 18.8888 6.47769 19.1813 6.72769L22.7188 9.74769C23.125 10.0927 23.75 9.80394 23.75 9.27144V3.23145Z"
                  fill="#632D77"
                />
                <path
                  d="M5 26.7689C5 27.3027 5.625 27.5902 6.03125 27.2439L9.56875 24.2239C9.86125 23.9739 9.86125 23.5227 9.56875 23.2727L6.03125 20.2527C5.625 19.9077 5 20.1952 5 20.7289V26.7689Z"
                  fill="#632D77"
                />
                <path
                  d="M10.0711 15.2551V9.49633L9.5236 9.90883C9.0836 10.2413 8.45235 10.1113 8.1786 9.63383C7.94735 9.22883 8.0561 8.71633 8.43235 8.44133L9.92985 7.34508C10.1648 7.17258 10.4486 7.08008 10.7398 7.08008C11.4973 7.08008 12.1098 7.69383 12.1098 8.45008V15.2538C12.1098 15.8176 11.6536 16.2738 11.0898 16.2738C10.5273 16.2738 10.0711 15.8176 10.0711 15.2551Z"
                  fill="#632D77"
                />
                <path
                  opacity="0.5"
                  d="M10.625 18.75C14.422 18.75 17.5 15.672 17.5 11.875C17.5 8.07804 14.422 5 10.625 5C6.82804 5 3.75 8.07804 3.75 11.875C3.75 15.672 6.82804 18.75 10.625 18.75Z"
                  fill="#6370E2"
                />
                <path
                  d="M23.5 12.5H17.4688C17.21 15.3675 15.1913 17.7225 12.5 18.485V23.5C12.5 25.0187 13.7312 26.25 15.25 26.25H23.5C25.0187 26.25 26.25 25.0187 26.25 23.5V15.25C26.25 13.7312 25.0187 12.5 23.5 12.5ZM21.25 20H17.5C16.81 20 16.25 19.44 16.25 18.75C16.25 18.06 16.81 17.5 17.5 17.5H21.25C21.94 17.5 22.5 18.06 22.5 18.75C22.5 19.44 21.94 20 21.25 20Z"
                  fill="#632D77"
                />
                <path
                  opacity="0.35"
                  d="M21.25 20H17.5C16.81 20 16.25 19.44 16.25 18.75C16.25 18.06 16.81 17.5 17.5 17.5H21.25C21.94 17.5 22.5 18.06 22.5 18.75C22.5 19.44 21.94 20 21.25 20Z"
                  fill="#632D77"
                />
              </svg>

              <div className="flex flex-col gap-1.5">
                <h3 className=" text-raiz-gray-950 text-base font-semibold leading-[18px]">
                  Higher Transaction Limits
                </h3>
                <p className="text-raiz-gray-950 text-[13px] font-normal leading-[18px]">
                  Increase your daily and monthly transaction limits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default RaizScoreModal;
