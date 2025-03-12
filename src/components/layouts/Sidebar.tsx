"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ISidebarMenuItem } from "@/types/misc";
import { SidebarMenus } from "@/constants/SidebarMenuData";
import SideModalWrapper from "@/app/(dashboard)/_components/SideModalWrapper";
// import AccountSetup from "@/app/(dashboard)/_components/account-setup/AccountSetup";
import { AnimatePresence } from "motion/react";
import CreateNgnAcct from "@/app/(dashboard)/_components/createNgnAcct/CreateNgnAcct";
import AddBvnModal from "@/app/(dashboard)/_components/createNgnAcct/AddBvnModal";
import NgnSuccessModal from "@/app/(dashboard)/_components/createNgnAcct/NgnSuccessModal";
import LogoutModal from "../modals/LogoutModal";
import { useUser } from "@/lib/hooks/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PersonaVerificationApi } from "@/services/user";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import SetTransactionPin from "@/app/(dashboard)/_components/transaction-pin/SetTransactionPin";
import { findWalletByCurrency } from "@/utils/helpers";
// Dynamically import PersonaReact with SSR disabled
const PersonaReact = dynamic(() => import("persona-react"), { ssr: false });

const Sidebar = () => {
  const { user } = useUser();
  const pathName = usePathname();
  const [showModal, setShowModal] = useState<
    "acctSetup" | "getNgn" | "set-pin" | null
  >(null);
  const [showBvnModal, setShowBvnModal] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  const handleCloseModal = () => {
    setShowModal(null);
    setIsIframeLoading(true);
  };

  const qc = useQueryClient();
  const PersonaMutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (inquiry_id: string) => PersonaVerificationApi(inquiry_id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["user"] });
      handleCloseModal();
    },
  });

  const InlineInquiry = () => {
    return (
      <div className="h-full relative">
        {isIframeLoading && (
          <div className="absolute inset-0 flex items-center justify-center ">
            <div
              aria-label="Loading verification"
              className="loader animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary2"
            />
          </div>
        )}
        <PersonaReact
          templateId={process.env.NEXT_PUBLIC_PERSONA_TEMPLATE_ID}
          environmentId={process.env.NEXT_PUBLIC_PERSONA_ENVIRONMENT_ID}
          referenceId={user?.business_account?.entity_id}
          onLoad={() => {
            setIsIframeLoading(false);
          }}
          onComplete={({ inquiryId }) => {
            // const payload = {
            //   ...fields,
            //   inquiry_id: {
            //     type: "string",
            //     value: inquiryId,
            //   },
            // };
            PersonaMutation.mutate(inquiryId);
            // console.log(`Payload`, payload);
          }}
          onCancel={() => {
            toast.warning("Your verification was cancelled");
            handleCloseModal();
          }}
          onError={() => {
            toast.error("Failed to load verification. Please try again.");
            setIsIframeLoading(false);
          }}
        />
      </div>
    );
  };

  const displayModal = () => {
    switch (showModal) {
      case "acctSetup":
        // return <AccountSetup close={handleCloseModal} />;
        return (
          <div className="h-full">
            <InlineInquiry />
          </div>
        );
      case "getNgn":
        return (
          <CreateNgnAcct
            close={handleCloseModal}
            openBvnModal={() => setShowBvnModal(true)}
          />
        );
      case "set-pin":
        return <SetTransactionPin close={handleCloseModal} />;
      default:
        break;
    }
  };

  const renderMenuItem = (item: ISidebarMenuItem, index: number) => {
    const isActive =
      item.link === "/" ? pathName === item.link : pathName.includes(item.link);

    return (
      <Link
        key={index}
        href={item.link}
        className={`flex items-center gap-3 py-2 px-2 xl:px-3 font-bold text-[15px] xl:text-base  leading-tight hover:bg-[#eaecff]/40 hover:rounded-md outline-none ${
          isActive
            ? "bg-[#eaecff]/40 rounded-[6px] text-primary2"
            : "text-raiz-gray-600 "
        }`}
      >
        {item.icon(isActive)}
        {item.name}
      </Link>
    );
  };

  const NGNAcct = findWalletByCurrency(user, "NGN");

  return (
    <aside className="w-[19.444%] pt-8 hidden lg:block  fixed top-0 bottom-0 left-0 z-20 bg-raiz-gray-50 border-r border-raiz-gray-200 h-[100vh] overflow-x-hidden overflow-y-scroll">
      <div className="px-6">
        <Image
          className="w-12 h-12"
          src={"/icons/Logo-2.svg"}
          width={48}
          height={48}
          alt="Raiz logo"
        />
      </div>
      <section className="flex flex-col justify-between h-[85%] mt-8 px-4 gap-8">
        <nav className="flex flex-col gap-1">
          {SidebarMenus.map((item, index) => renderMenuItem(item, index))}
        </nav>

        {/* User status Info */}
        <div>
          {/* Acct setup */}
          {user?.business_account?.business_verifications[0]
            .verification_status === "not_started" && (
            <div className="px-3 xl:px-4 py-5 bg-[#eaecff]/40 rounded-lg flex-col justify-start items-start gap-3 inline-flex">
              <div className="w-12 h-12 relative bg-[#fcfcfd] rounded-[66.67px] flex items-center justify-center ">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M15.9997 2.66699C12.333 2.66699 9.33301 5.66699 9.33301 9.33366V12.0003H11.9997V9.33366C11.9997 7.13366 13.7997 5.33366 15.9997 5.33366C18.1997 5.33366 19.9997 7.13366 19.9997 9.33366V12.0003H22.6663V9.33366C22.6663 5.66699 19.6663 2.66699 15.9997 2.66699Z"
                    fill="#424242"
                  />
                  <path
                    d="M23.9997 29.3333H7.99967C6.53301 29.3333 5.33301 28.1333 5.33301 26.6667V14.6667C5.33301 13.2 6.53301 12 7.99967 12H23.9997C25.4663 12 26.6663 13.2 26.6663 14.6667V26.6667C26.6663 28.1333 25.4663 29.3333 23.9997 29.3333Z"
                    fill="#FB8C00"
                  />
                  <path
                    d="M16 18.6665C15.4696 18.6665 14.9609 18.8772 14.5858 19.2523C14.2107 19.6274 14 20.1361 14 20.6665C14 21.1969 14.2107 21.7056 14.5858 22.0807C14.9609 22.4558 15.4696 22.6665 16 22.6665C16.5304 22.6665 17.0391 22.4558 17.4142 22.0807C17.7893 21.7056 18 21.1969 18 20.6665C18 20.1361 17.7893 19.6274 17.4142 19.2523C17.0391 18.8772 16.5304 18.6665 16 18.6665Z"
                    fill="#C76E00"
                  />
                </svg>
              </div>
              <p className="text-raiz-gray-900 text-sm font-bold  leading-[16.80px]">
                Complete account set up{" "}
              </p>
              <p className="text-gray-600 text-sm font-normal  leading-tight">
                Complete Account Set Up and Get unlimited access{" "}
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href={"#"}
                  className="text-raiz-gray-500 text-xs xl:text-sm font-bold  leading-[16.80px]"
                >
                  Learn more
                </Link>
                <button
                  onClick={() => setShowModal("acctSetup")}
                  className="text-primary2 text-xs xl:text-sm font-bold  leading-[16.80px]"
                >
                  Upgrade
                </button>
              </div>
            </div>
          )}

          {/* Verification pending */}
          {user?.business_account?.business_verifications[0]
            .verification_status === "pending" && (
            <div className="px-3 xl:px-4 py-5 bg-[#f2f4e9]/60 rounded-lg flex-col justify-start items-start gap-3 inline-flex">
              <div className="w-12 h-12 relative bg-[#fcfcfd] rounded-[66.67px] flex items-center justify-center ">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.5"
                    d="M16 29.3335C22.6274 29.3335 28 23.9609 28 17.3335C28 10.7061 22.6274 5.3335 16 5.3335C9.37258 5.3335 4 10.7061 4 17.3335C4 23.9609 9.37258 29.3335 16 29.3335Z"
                    fill="#CEBF36"
                  />
                  <path
                    d="M14.1147 19.2186C13.5253 18.6292 11.1907 15.0879 9.27335 12.1226C8.63068 11.1292 9.79601 9.96389 10.7893 10.6052C13.7547 12.5226 17.296 14.8586 17.8853 15.4466C18.9267 16.4879 18.9267 18.1759 17.8853 19.2172C16.844 20.2599 15.156 20.2599 14.1147 19.2186Z"
                    fill="#568C21"
                  />
                  <path
                    d="M18 1.3335C17.4853 1.3335 14.5147 1.3335 14 1.3335C12.896 1.3335 12 2.2295 12 3.3335C12 4.4375 12.896 5.3335 14 5.3335C14.5147 5.3335 17.4853 5.3335 18 5.3335C19.104 5.3335 20 4.4375 20 3.3335C20 2.2295 19.104 1.3335 18 1.3335Z"
                    fill="#568C21"
                  />
                  <path
                    d="M27.4148 6.86119C27.0508 6.49719 26.8361 6.28252 26.4721 5.91852C25.6908 5.13719 24.4241 5.13719 23.6441 5.91852C22.8641 6.69985 22.8628 7.96652 23.6441 8.74652C24.0081 9.11052 24.2228 9.32519 24.5868 9.68919C25.3681 10.4705 26.6348 10.4705 27.4148 9.68919C28.1948 8.90919 28.1948 7.64252 27.4148 6.86119Z"
                    fill="#568C21"
                  />
                </svg>
              </div>
              <p className="text-raiz-gray-900 text-sm font-bold  leading-[16.80px]">
                Setup In Progress
              </p>
              <p className="text-gray-600 text-sm font-normal  leading-tight">
                KYC pending, We&#39;re verifying your information.
              </p>
            </div>
          )}

          {/* set up PIN */}
          {user?.business_account?.business_verifications[0]
            .verification_status !== "not_started" &&
            !user?.has_transaction_pin && (
              <div className="px-3 xl:px-4 py-5 bg-[#eaecff]/40 rounded-lg flex-col justify-start items-start gap-3 inline-flex">
                <div className="w-12 h-12 relative bg-[#fcfcfd] rounded-[66.67px] flex items-center justify-center ">
                  <svg
                    width="30"
                    height="31"
                    viewBox="0 0 30 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.55"
                      d="M22.5 26.7305H7.5C5.42875 26.7305 3.75 25.0517 3.75 22.9805V12.9805C3.75 10.9092 5.42875 9.23047 7.5 9.23047H22.5C24.5712 9.23047 26.25 10.9092 26.25 12.9805V22.9805C26.25 25.0517 24.5712 26.7305 22.5 26.7305Z"
                      fill="#F7A900"
                    />
                    <path
                      d="M10 9.23047C10 6.46922 12.2387 4.23047 15 4.23047C17.7613 4.23047 20 6.46922 20 9.23047H22.5C22.5 5.08797 19.1425 1.73047 15 1.73047C10.8575 1.73047 7.5 5.08797 7.5 9.23047H10Z"
                      fill="#292D32"
                    />
                    <path
                      d="M15 19.8555C16.0355 19.8555 16.875 19.016 16.875 17.9805C16.875 16.9449 16.0355 16.1055 15 16.1055C13.9645 16.1055 13.125 16.9449 13.125 17.9805C13.125 19.016 13.9645 19.8555 15 19.8555Z"
                      fill="#6C265B"
                    />
                    <path
                      d="M21.25 19.8555C22.2855 19.8555 23.125 19.016 23.125 17.9805C23.125 16.9449 22.2855 16.1055 21.25 16.1055C20.2145 16.1055 19.375 16.9449 19.375 17.9805C19.375 19.016 20.2145 19.8555 21.25 19.8555Z"
                      fill="#6C265B"
                    />
                    <path
                      d="M8.75 19.8555C9.78553 19.8555 10.625 19.016 10.625 17.9805C10.625 16.9449 9.78553 16.1055 8.75 16.1055C7.71447 16.1055 6.875 16.9449 6.875 17.9805C6.875 19.016 7.71447 19.8555 8.75 19.8555Z"
                      fill="#6C265B"
                    />
                  </svg>
                </div>
                <p className="text-raiz-gray-900 text-sm font-bold  leading-[16.80px]">
                  Secure your Account
                </p>
                <p className="text-gray-600 text-sm font-normal  leading-tight">
                  Set a 4-digit PIN to your transaction
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowModal("set-pin")}
                    className="text-primary2 text-xs xl:text-sm font-bold  leading-[16.80px]"
                  >
                    Set Up
                  </button>
                </div>
              </div>
            )}

          {/* Get NGN aza */}
          {user?.business_account?.business_verifications[0]
            .verification_status === "completed" &&
            !NGNAcct &&
            user?.has_transaction_pin && (
              <div className="px-3 xl:px-4 py-5 bg-[#eaecff]/40 rounded-lg flex-col justify-start items-start gap-3 inline-flex">
                <div className="w-12 h-12 relative bg-[#fcfcfd] rounded-[66.67px] flex items-center justify-center ">
                  <Image
                    src={"/icons/ngn.svg"}
                    width={32}
                    height={32}
                    alt="NGN"
                  />
                </div>
                <h5 className="text-raiz-gray-900 text-sm font-bold  leading-[16.80px]">
                  Get a Naira (NGN) Account
                </h5>
                <p className="text-gray-600 text-sm font-normal  leading-tight">
                  Manage funds and make transactions in Naira, simplifying local
                  payments and daily finances.
                </p>

                <button
                  onClick={() => setShowModal("getNgn")}
                  className="text-primary2 text-sm font-bold  leading-[16.80px]"
                >
                  Get Naira Wallet
                </button>
              </div>
            )}

          {/* Logout */}
          {/* <div className="flex gap-[15px] justify-between mt-6 w-full pb-5"> */}

          <button
            className="flex gap-[15px] items-center mt-6 w-full pb-5 pt-4 border-t border-[#eaecf0]"
            onClick={() => setShowLogoutModal(true)}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="18" fill="#F3F1F6" />
              <path
                opacity="0.35"
                d="M25.1998 11.7V24.3C25.1998 25.7913 23.9911 27 22.4998 27H13.4998C12.0085 27 10.7998 25.7913 10.7998 24.3V11.7C10.7998 10.2087 12.0085 9 13.4998 9H22.4998C23.9911 9 25.1998 10.2087 25.1998 11.7Z"
                fill="#B3261E"
              />
              <path
                d="M23.3998 16.2002H17.0998C16.1053 16.2002 15.2998 17.0057 15.2998 18.0002C15.2998 18.9947 16.1053 19.8002 17.0998 19.8002H23.3998V16.2002Z"
                fill="#951F38"
              />
              <path
                d="M22.1211 21.718C22.1211 22.4119 22.9581 22.7611 23.4513 22.2724L26.955 18.802C27.4005 18.3601 27.4005 17.6401 26.955 17.1982L23.4513 13.7278C22.9581 13.24 22.1211 13.5892 22.1211 14.2822V21.718Z"
                fill="#951F38"
              />
            </svg>
            <span className="text-[#db180d] text-[15px] font-semibold leading-snug">
              Logout
            </span>
          </button>
          {/* </div> */}
        </div>
      </section>
      <AnimatePresence>
        {showModal ? (
          <SideModalWrapper
            close={handleCloseModal}
            wrapperStyle={showModal === "getNgn" ? "!bg-primary2" : ""}
          >
            {displayModal()}
          </SideModalWrapper>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {showBvnModal && (
          <AddBvnModal
            close={() => setShowBvnModal(false)}
            openSuccessModal={() => setSuccessful(true)}
          />
        )}
      </AnimatePresence>
      {successful && <NgnSuccessModal close={() => setSuccessful(false)} />}
      {showLogoutModal && (
        <LogoutModal close={() => setShowLogoutModal(false)} />
      )}
    </aside>
  );
};

export default Sidebar;
