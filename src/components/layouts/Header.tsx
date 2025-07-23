"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SideModalWrapper from "../../app/(dashboard)/_components/SideModalWrapper";
import Notifications from "../../app/(dashboard)/_components/notification/Notifications";
import { AnimatePresence } from "motion/react";
import Rewards from "../../app/(dashboard)/_components/rewards/Rewards";
import SelectAccount from "../../app/(dashboard)/_components/SelectAccount";
import CreateNgnAcct from "../../app/(dashboard)/_components/createNgnAcct/CreateNgnAcct";
import AddBvnModal from "../../app/(dashboard)/_components/createNgnAcct/AddBvnModal";
import NgnSuccessModal from "../../app/(dashboard)/_components/createNgnAcct/NgnSuccessModal";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { FetchUserRewardsApi } from "@/services/user";
import { useNotifications } from "@/lib/hooks/useNotifications";
import * as motion from "motion/react-client";
import CreateCryptoWallet from "@/app/(dashboard)/_components/crypto/dashboard/CreateCryptoWallet";

const searchItems = [
  { name: "Dashboard", type: "route", path: "/" },
  // { name: "Top Up", type: "modal" },
  // { name: "Send", type: "modal" },
  { name: "Create NGN Account", type: "modal" },
  { name: "Rewards", type: "modal" },
  { name: "Notifications", type: "modal" },
  { name: "Profile settings", type: "route", path: "/settings" },
  {
    name: "Password & Security",
    type: "route",
    path: "/settings/login-security",
  },
  { name: "Dollar Account (USD)", type: "modal" },
  { name: "Naira Account  (NGN)", type: "modal" },
  { name: "Account", type: "modal" },
];

const Header = () => {
  const pathName = usePathname();
  const { data: pointsData } = useQuery({
    queryKey: ["reward-points"],
    queryFn: FetchUserRewardsApi,
  });
  // const [userPfp, setUserPfp] = useState(
  //   user?.business_account?.business_image || "/images/default-pfp.svg"
  // );

  // useEffect(() => {
  //   if (user?.business_account?.business_image) {
  //     setUserPfp(user.business_account.business_image);
  //   }
  // }, [user]);

  const [showModal, setShowModal] = useState<
    | "notifications"
    | "rewards"
    | "selectAcct"
    | "createNGN"
    | "createCrypto"
    | null
  >(null);
  const [showBvnModal, setShowBvnModal] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<typeof searchItems>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const router = useRouter();
  // const { selectedCurrency } = useCurrencyStore();
  // const currentWallet = useMemo(() => {
  //   if (!user || !user?.business_account?.wallets || !selectedCurrency?.name)
  //     return null;
  //   return user?.business_account?.wallets.find(
  //     (wallet) => wallet.wallet_type.currency === selectedCurrency.name
  //   );
  // }, [user, selectedCurrency]);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    const results = searchItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  const handleSearchAction = (item: (typeof searchItems)[number]) => {
    if (item.type === "route" && item.path) {
      router.push(item.path);
    } else if (item.type === "modal") {
      switch (item.name) {
        case "Create NGN Account":
          setShowModal("createNGN");
          break;
        case "Rewards":
          setShowModal("rewards");
          break;
        case "Notifications":
          setShowModal("notifications");
          break;
        case "Dollar Account (USD)":
        case "Naira Account  (NGN)":
        case "Account":
          setShowModal("selectAcct");
        default:
          break;
      }
    }
    setSearchTerm("");
    setSearchResults([]);
    setFocusedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev + 1) % searchResults.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) =>
        prev <= 0 ? searchResults.length - 1 : prev - 1
      );
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault();
      handleSearchAction(searchResults[focusedIndex]);
    } else if (e.key === "Escape") {
      setFocusedIndex(-1);
      setIsFocused(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(null);
  };
  const openNGNModal = () => {
    setShowModal("createNGN");
  };

  const openCryptoModal = () => {
    setShowModal("createCrypto");
  };
  const { data, refetch } = useNotifications(15);
  const notifications = data?.pages[0]?.notifications || [];
  const hasUnreadNotif = notifications.some(
    (notification) => !notification.read
  );

  useEffect(() => {
    refetch();
  }, [pathName, refetch]);
  const displayModal = () => {
    switch (showModal) {
      case "notifications":
        return <Notifications close={handleCloseModal} />;
      case "rewards":
        return <Rewards close={handleCloseModal} data={pointsData} />;
      case "createNGN":
        return (
          <CreateNgnAcct
            close={handleCloseModal}
            // openBvnModal={() => setShowBvnModal(true)}
          />
        );
      case "createCrypto":
        return <CreateCryptoWallet close={handleCloseModal} />;
      default:
        break;
    }
  };
  return (
    <div className="flex  justify-between pb-5 gap-2">
      {pathName === "/" && (
        <div className="flex items-center gap-1 xl:gap-2.5 ">
          <Link
            className="px-2 py-1 text-raiz-gray-900 text-sm font-semibold font-brSonoma leading-tight "
            href={"#"}
          >
            Overview
          </Link>
          {/* <Image
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
          </Link> */}
        </div>
      )}
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={handleKeyDown}
        />
        <AnimatePresence>
          {isFocused && searchResults.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full mt-2 w-full bg-white border border-gray-200 shadow-xl rounded-2xl z-50 max-h-72 overflow-y-auto"
            >
              {searchResults.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15 }}
                  onMouseDown={() => handleSearchAction(item)}
                  className={`flex items-center justify-between gap-3 px-4 py-3 cursor-pointer transition-all duration-200 ${
                    index === focusedIndex
                      ? "bg-blue-100 text-blue-800"
                      : "hover:bg-blue-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-800 text-sm font-medium">
                      {item.name}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      item.type === "modal"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.type}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      <div className="flex gap-4 items-center">
        {/* <button
          onClick={() => setShowModal("selectAcct")}
          className="flex gap-2 items-center "
        >
          <Image
            className="w-10 h-10 rounded-full object-cover"
            src={userPfp}
            alt="profile"
            width={40}
            height={40}
            onError={() => setUserPfp("/images/default-pfp.svg")}
          />
          <div className="flex items-start flex-col gap-1 text-sm font-semibold">
            <p className="text-gray-700 text-sm  font-semibold ">
              {currentWallet
                ? `${currentWallet?.wallet_type.currency} Account`
                : "Get Accounts"}
            </p>
            <p className="text-gray-600 text-xs xl:text-sm  font-normal">
              {currentWallet?.account_number ?? ""}
            </p>
          </div>
          <Image src={"/icons/arrow-down.svg"} alt="" width={20} height={20} />
        </button> */}
        {/* <button
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
          <span className="text-raiz-gray-950 text-[13px] font-normal  leading-[18.20px]">
            {pointsData?.point || 0}
          </span>
        </button> */}
        <div className="relative">
          <button onClick={() => setShowModal("notifications")}>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path
                d="M25.157 23.5791H6.84372C6.08266 23.5791 5.38477 23.1958 4.9774 22.5528C4.57003 21.9099 4.51951 21.116 4.84351 20.4275L6.52667 17.041V13.0829C6.52667 7.87933 10.4873 3.61744 15.5437 3.37934C18.1654 3.2606 20.6469 4.18207 22.5385 5.98649C24.4319 7.79218 25.474 10.2269 25.474 12.8423V17.041L27.1477 20.4092C27.4806 21.116 27.4307 21.9105 27.0233 22.5534C26.6159 23.1964 25.918 23.5791 25.157 23.5791ZM12.2677 24.8423C12.5696 26.6315 14.1258 28.0002 16.0003 28.0002C17.8749 28.0002 19.4305 26.6315 19.733 24.8423H12.2677Z"
                fill="#2C2435"
              />
            </svg>
          </button>
          {hasUnreadNotif && (
            <span className="w-2.5 h-2.5 bg-red-600 rounded-full absolute top-0 -right-0" />
          )}
        </div>
      </div>
      <AnimatePresence>
        {showModal !== null && showModal !== "selectAcct" && (
          <SideModalWrapper
            close={handleCloseModal}
            wrapperStyle={
              showModal === "createNGN"
                ? "!bg-primary2"
                : showModal === "createCrypto"
                ? "!bg-raiz-crypto-primary"
                : ""
            }
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
        <SelectAccount
          close={handleCloseModal}
          openNgnModal={openNGNModal}
          openCryptoModal={openCryptoModal}
        />
      )}
      {successful && <NgnSuccessModal close={() => setSuccessful(false)} />}
    </div>
  );
};

export default Header;
