"use client";
import Spinner from "@/components/ui/Spinner";
import { useUser } from "@/lib/hooks/useUser";
import { CreateUSDWalletApi } from "@/services/business";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { findWalletByCurrency } from "@/utils/helpers";
import { useMutation } from "@tanstack/react-query";
import React, { ReactNode, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import CreateNgnAcct from "./createNgnAcct/CreateNgnAcct";
import SetTransactionPin from "./transaction-pin/SetTransactionPin";
import { AnimatePresence } from "motion/react";
import SideModalWrapper from "./SideModalWrapper";
import BusinessVerificationModal from "@/app/(dashboard)/_components/BusinessVerificationModal";

const Infos = () => {
  const [showModal, setShowModal] = useState<
    "acctSetup" | "getNgn" | "set-pin" | null
  >(null);
  const { user, refetch } = useUser();
  const { setSelectedCurrency } = useCurrencyStore();

  const handleCloseModal = () => {
    setShowModal(null);
    setIsIframeLoading(true);
  };
  const USDWalletMutation = useMutation({
    mutationFn: CreateUSDWalletApi,
    onSuccess: (response) => {
      toast.success(response?.message);
      qc.invalidateQueries({ queryKey: ["user"] });
      refetch();
      setSelectedCurrency("USD", user);
      handleCloseModal();
    },
  });

  const verificationStatus =
    user?.business_account?.business_verifications?.[0]?.verification_status;
  const hasTransactionPin = user?.has_transaction_pin;

  const NGNAcct = findWalletByCurrency(user, "NGN");
  const USDAcct = findWalletByCurrency(user, "USD");
  const isNigerian =
    user?.business_account?.entity?.country?.country_name?.toLowerCase() ===
    "nigeria";

  const statuses = [
    {
      condition: verificationStatus === "not_started",
      icon: (
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
      ),
      title: "Complete account set up",
      description:
        "Complete your account setup and verification to unlock full, unlimited access to all available features and services.",
      action: (
        <div className="flex items-center gap-3">
          {/* <a
            href="#"
            className="text-raiz-gray-500 text-xs xl:text-sm font-bold"
          >
            Learn more
          </a> */}
          <button
            onClick={() => setShowModal("acctSetup")}
            className="text-primary2 text-xs xl:text-sm font-bold"
          >
            Verify Now
          </button>
        </div>
      ),
      bg: "bg-[#eaecff]/40",
    },
    {
      condition: verificationStatus === "pending",
      icon: (
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
      ),
      title: "Setup In Progress",
      description: "KYC pending, We're verifying your information.",
      bg: "bg-[#f2f4e9]/60",
    },
    {
      condition: verificationStatus !== "not_started" && !hasTransactionPin,
      icon: (
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
      ),
      title: "Secure your Account",
      description: "Set a 4-digit PIN to your transaction",
      action: (
        <button
          onClick={() => setShowModal("set-pin")}
          className="text-primary2 text-xs xl:text-sm font-bold"
        >
          Set Up
        </button>
      ),
      bg: "bg-[#eaecff]/40",
    },
    {
      condition:
        verificationStatus === "completed" && !USDAcct && hasTransactionPin,
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <g clipPath="url(#clip0_23665_5245)">
            <rect width="48" height="48" rx="24" fill="#FCFCFD" />
            <path
              d="M4 0.333008H44C46.025 0.333008 47.667 1.97496 47.667 4V44C47.667 46.025 46.025 47.667 44 47.667H4C1.97496 47.667 0.333008 46.025 0.333008 44V4C0.333008 1.97496 1.97496 0.333008 4 0.333008Z"
              stroke="black"
              strokeOpacity="0.08"
              strokeWidth="0.666667"
            />
            <path
              opacity="0.35"
              d="M32 36H16C13.7907 36 12 34.2093 12 32V19.6867C12 18.2333 12.788 16.896 14.0573 16.1907L22.0573 11.7467C23.2653 11.076 24.7347 11.076 25.9427 11.7467L33.9427 16.1907C35.212 16.896 36 18.2347 36 19.6867V32C36 34.2093 34.2093 36 32 36Z"
              fill="#53940D"
            />
            <path
              d="M27.7867 27.3319C27.7867 23.2079 23.2347 23.7719 23.2347 21.6226C23.2347 20.3573 24.2307 20.2239 24.5733 20.2239C24.9133 20.2239 25.2133 20.3039 25.468 20.4199C26.0667 20.6906 26.776 20.4399 27.1547 19.9026C27.64 19.2159 27.3893 18.2493 26.6227 17.9026C26.2013 17.7133 25.6773 17.5599 25.0413 17.4999V16.9026C25.0413 16.3519 24.5947 15.9053 24.044 15.9053C23.4933 15.9053 23.0467 16.3519 23.0467 16.9026V17.7119C21.376 18.2693 20.2907 19.7973 20.2907 21.7533C20.2907 26.0813 24.7867 25.2986 24.7867 27.5479C24.7867 27.9813 24.5813 28.9239 23.4667 28.9239C22.9707 28.9239 22.5427 28.7839 22.1947 28.6026C21.604 28.2933 20.8693 28.5213 20.4933 29.0719L20.4533 29.1306C20.0173 29.7679 20.1933 30.6586 20.8653 31.0399C21.4293 31.3599 22.1187 31.6079 22.9507 31.6959V32.3973C22.9507 32.9479 23.3973 33.3946 23.948 33.3946C24.4987 33.3946 24.9453 32.9479 24.9453 32.3973V31.5173C26.7907 30.9519 27.7867 29.2666 27.7867 27.3319Z"
              fill="#1D546F"
            />
          </g>
          <defs>
            <clipPath id="clip0_23665_5245">
              <rect width="48" height="48" rx="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      title: "Get Your USD Account Now",
      description: "Enjoy Seamless Transactions and Exclusive Features Today!",
      action: (
        <button
          onClick={() => USDWalletMutation.mutate()}
          className="text-primary2 text-sm font-bold flex items-center gap-2"
          disabled={USDWalletMutation.isPending}
        >
          {USDWalletMutation.isPending ? (
            <Spinner className="!w-4 !h-4 !border-t-2 !border-b-2" />
          ) : null}
          {USDWalletMutation.isPending ? "Processing..." : "Get USD Account"}
        </button>
      ),
      bg: "bg-[#EAECFF66]",
    },
    {
      condition:
        verificationStatus === "completed" &&
        USDAcct &&
        isNigerian &&
        (isNigerian ? !NGNAcct : true) &&
        hasTransactionPin,
      icon: <Image src={"/icons/ngn.svg"} width={32} height={32} alt="NGN" />,
      title: "Get a Naira (NGN) Account",
      description:
        "Manage funds and make transactions in Naira, simplifying local payments and daily finances.",
      action: (
        <button
          onClick={() => setShowModal("getNgn")}
          className="text-primary2 text-sm font-bold"
        >
          Get Naira Account
        </button>
      ),
      bg: "bg-[#eaecff]/40",
    },
    //    {
    //      condition:
    //        verificationStatus === "completed" &&
    //        NGNAcct &&
    //        hasTransactionPin &&
    //        USDAcct,
    //      icon: <Image src={"/icons/paylink.svg"} width={32} height={32} alt="" />,
    //      title: "Payment Link",
    //      description: "Allows Guest Users to Securely Send you Money Seamlessly.",
    //      action: (
    //        <button
    //          onClick={() => setShowPaymentLinkModal(true)}
    //          className="text-primary2 text-sm font-bold"
    //        >
    //          Share Link
    //        </button>
    //      ),
    //      bg: "bg-[#eaecff]/40",
    //    },
  ];

  const displayModal = () => {
    switch (showModal) {
      case "acctSetup":
        return <BusinessVerificationModal close={handleCloseModal} />;

      case "getNgn":
        return (
          <CreateNgnAcct
            close={handleCloseModal}
            // openBvnModal={() => setShowBvnModal(true)}
          />
        );
      case "set-pin":
        return <SetTransactionPin close={handleCloseModal} />;
      default:
        break;
    }
  };

  return (
    <div>
      {!verificationStatus
        ? null
        : statuses.map((status, index) =>
            status.condition ? <StatusCard key={index} {...status} /> : null
          )}
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
    </div>
  );
};

export default Infos;

const StatusCard = ({
  icon,
  title,
  description,
  action,
  bg,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  bg: string;
}) => (
  <div
    className={`w-full my-6 px-3 xl:px-4 py-5 ${bg}  rounded-lg flex-col justify-start items-start gap-3 inline-flex`}
  >
    <div className="w-12 h-12 relative bg-[#fcfcfd] rounded-[66.67px] flex items-center justify-center">
      {icon}
    </div>
    <h5 className="text-raiz-gray-900 text-sm font-bold leading-[16.80px]">
      {title}
    </h5>
    <p className="text-gray-600 lg:text-xs xl:text-sm font-normal leading-tight">
      {description}
    </p>
    {action}
  </div>
);
