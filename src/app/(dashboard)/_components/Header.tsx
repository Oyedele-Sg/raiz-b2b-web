"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import SideModalWrapper from "./SideModalWrapper";
import Notifications from "./notification/Notifications";
import { AnimatePresence } from "motion/react";
import Rewards from "./rewards/Rewards";
import SelectAccount from "./SelectAccount";
import CreateNgnAcct from "./createNgnAcct/CreateNgnAcct";
import AddBvnModal from "./createNgnAcct/AddBvnModal";
import NgnSuccessModal from "./createNgnAcct/NgnSuccessModal";

const Header = () => {
  const [showModal, setShowModal] = useState<
    "notifications" | "rewards" | "selectAcct" | "createNGN" | null
  >(null);
  const [showBvnModal, setShowBvnModal] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const handleCloseModal = () => {
    setShowModal(null);
  };

  const openNGNModal = () => {
    setShowModal("createNGN");
  };

  const displayModal = () => {
    switch (showModal) {
      case "notifications":
        return <Notifications close={handleCloseModal} />;
      case "rewards":
        return <Rewards close={handleCloseModal} />;
      case "createNGN":
        return (
          <CreateNgnAcct
            close={handleCloseModal}
            openBvnModal={() => setShowBvnModal(true)}
          />
        );
      default:
        break;
    }
  };
  return (
    <div className="flex  justify-between pb-5 gap-2">
      <div className="flex items-center gap-1 xl:gap-2.5 ">
        <Link
          className="px-2 py-1 text-raiz-gray-900 text-sm font-semibold font-brSonoma leading-tight "
          href={"#"}
        >
          Overview
        </Link>
        <Image
          src={"/icons/forward.svg"}
          alt="forward"
          width={16}
          height={16}
        />
        <Link
          className="px-2 py-1 text-raiz-gray-700 text-sm font-medium font-brSonoma leading-tight "
          href={"#"}
        >
          Top up
        </Link>
        <Image
          src={"/icons/forward.svg"}
          alt="forward"
          width={16}
          height={16}
        />
        <Link
          className="px-2 py-1 text-raiz-gray-700 text-sm font-medium font-brSonoma leading-tight "
          href={"#"}
        >
          Send
        </Link>
      </div>
      <div className="relative h-12 w-[285px] xl:w-[312px] ">
        <Image
          className="absolute top-3.5 left-3"
          src={"/icons/search.svg"}
          alt="search"
          width={22}
          height={22}
        />
        <input
          placeholder="Search..."
          className="pl-10 h-full bg-raiz-gray-50 rounded-[20px] border border-raiz-gray-200 justify-start items-center gap-2 inline-flex w-full outline-none"
        />
      </div>
      <div className="flex gap-4 items-center">
        <button
          onClick={() => setShowModal("selectAcct")}
          className="flex gap-2 items-center "
        >
          <Image
            className="w-10 h-10 rounded-full"
            src={"/images/pfp.png"}
            alt="profile"
            width={40}
            height={40}
          />
          <div className="flex items-start flex-col gap-1 text-sm font-semibold">
            <p className="text-gray-700 text-sm  font-semibold ">
              Kaywear Store
            </p>
            <p className="text-gray-600 text-xs xl:text-sm  font-normal">
              Kaywear@gmail.com
            </p>
          </div>
          <Image src={"/icons/arrow-down.svg"} alt="" width={20} height={20} />
        </button>
        <button
          onClick={() => setShowModal("rewards")}
          className="pl-2 pr-2.5 py-1.5 bg-[#f8eebb] rounded-3xl justify-center items-center gap-0.5 inline-flex"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8.00016 1.33325C4.31816 1.33325 1.3335 4.31792 1.3335 7.99992C1.3335 11.6819 4.31816 14.6666 8.00016 14.6666C11.6822 14.6666 14.6668 11.6819 14.6668 7.99992C14.6668 4.31792 11.6822 1.33325 8.00016 1.33325ZM11.4415 7.52458L10.3982 8.53858C10.2408 8.69125 10.1688 8.91192 10.2055 9.12858L10.4488 10.5633C10.5415 11.1079 9.96883 11.5226 9.48016 11.2646L8.1935 10.5853C7.9995 10.4826 7.7675 10.4826 7.57283 10.5839L6.28416 11.2586C5.79483 11.5146 5.2235 11.0986 5.31816 10.5539L5.56683 9.12058C5.60416 8.90458 5.53283 8.68325 5.37616 8.52992L4.33616 7.51259C3.94016 7.12592 4.16016 6.45392 4.70683 6.37592L6.14683 6.16925C6.36416 6.13792 6.55216 6.00192 6.6495 5.80525L7.2955 4.50192C7.54083 4.00658 8.2475 4.00792 8.4915 4.50392L9.13283 5.80992C9.2295 6.00659 9.41683 6.14325 9.63416 6.17525L11.0735 6.38658C11.6202 6.46725 11.8375 7.13925 11.4415 7.52458Z"
              fill="#FBB756"
            />
            <path
              d="M9.6338 6.17543L11.0731 6.38677C11.6198 6.46743 11.8371 7.13943 11.4405 7.52477L10.3971 8.53876C10.2398 8.69143 10.1678 8.9121 10.2045 9.12877L10.4478 10.5634C10.5405 11.1081 9.9678 11.5228 9.47913 11.2648L8.19246 10.5854C7.99846 10.4828 7.76646 10.4828 7.5718 10.5841L6.28313 11.2588C5.7938 11.5148 5.22246 11.0988 5.31713 10.5541L5.5658 9.12077C5.60313 8.90477 5.5318 8.6841 5.37513 8.5301L4.33513 7.51277C3.9398 7.1261 4.1598 6.4541 4.70646 6.3761L6.14646 6.16943C6.3638 6.1381 6.5518 6.0021 6.64913 5.80543L7.29513 4.5021C7.54046 4.00677 8.24713 4.0081 8.49046 4.5041L9.1318 5.8101C9.22913 6.00677 9.41713 6.14343 9.6338 6.17543Z"
              fill="#FCF2E3"
            />
          </svg>
          <span className="text-raiz-gray-950 text-[13px] font-normal font-monzo leading-[18.20px]">
            55
          </span>
        </button>
        <button onClick={() => setShowModal("notifications")}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path
              d="M25.157 23.5791H6.84372C6.08266 23.5791 5.38477 23.1958 4.9774 22.5528C4.57003 21.9099 4.51951 21.116 4.84351 20.4275L6.52667 17.041V13.0829C6.52667 7.87933 10.4873 3.61744 15.5437 3.37934C18.1654 3.2606 20.6469 4.18207 22.5385 5.98649C24.4319 7.79218 25.474 10.2269 25.474 12.8423V17.041L27.1477 20.4092C27.4806 21.116 27.4307 21.9105 27.0233 22.5534C26.6159 23.1964 25.918 23.5791 25.157 23.5791ZM12.2677 24.8423C12.5696 26.6315 14.1258 28.0002 16.0003 28.0002C17.8749 28.0002 19.4305 26.6315 19.733 24.8423H12.2677Z"
              fill="#2C2435"
            />
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {showModal !== null && showModal !== "selectAcct" && (
          <SideModalWrapper
            close={handleCloseModal}
            wrapperStyle={showModal === "createNGN" ? "!bg-primary2" : ""}
          >
            {displayModal()}
          </SideModalWrapper>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showBvnModal && (
          <AddBvnModal
            close={() => setShowBvnModal(false)}
            openSuccessModal={() => setSuccessful(true)}
          />
        )}
      </AnimatePresence>
      {showModal === "selectAcct" && (
        <SelectAccount close={handleCloseModal} openNgnModal={openNGNModal} />
      )}
      {successful && <NgnSuccessModal close={() => setSuccessful(false)} />}
    </div>
  );
};

export default Header;
