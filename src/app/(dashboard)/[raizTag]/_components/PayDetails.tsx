"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
// import { useUser } from "@/lib/hooks/useUser";
import Tabs from "@/components/ui/Tabs";
import { copyToClipboard } from "@/utils/helpers";
import Button from "@/components/ui/Button";
import Link from "next/link";
// import { useCurrencyStore } from "@/store/useCurrencyStore";
import { IBusinessPaymentData } from "@/types/services";

interface Props {
  setScreen: Dispatch<SetStateAction<"details" | "card">>;
  data: IBusinessPaymentData;
}

const PayDetails = ({ setScreen, data }: Props) => {
  const [type, setType] = useState<"usd" | "ngn">("usd");

  const handleType = (value: "usd" | "ngn") => {
    // actions.selectCurrency(value === "ngn" ? "NGN" : "USD");
    setType(value);
  };

  const NGNAcct = data?.wallets?.find(
    (acct: { wallet_type: { currency: string } }) =>
      acct.wallet_type.currency === "NGN"
  );

  const USDAcct = data?.wallets?.find(
    (acct: { wallet_type: { currency: string } }) =>
      acct.wallet_type.currency === "USD"
  );
  return (
    <>
      <Image
        className="mt-10"
        src={"/icons/paylink.svg"}
        width={38}
        height={38}
        alt="Logo"
      />
      <div className="mt-2">
        <h2 className="text-raiz-gray-950 font-semibold text-[23px] leading-[40px]">
          Pay {NGNAcct?.wallet_name}
        </h2>
        <p className="text-raiz-gray-700 font-[15px] ">
          Transfer the amount you want to fund.
        </p>
      </div>
      <Tabs
        options={[
          { label: "USD Transfer", value: "usd" },
          { label: "NGN Transfer", value: "ngn" },
        ]}
        selected={type}
        onChange={handleType}
      />
      <div className="flex flex-col h-full justify-between">
        {type === "usd" && (
          <div className="p-7 bg-violet-100/60 rounded-[20px]  inline-flex flex-col justify-center items-center gap-5 w-full my-3">
            {/* Bank details */}
            <div className="w-full flex flex-col justify-center items-center">
              <span className="text-center justify-start text-gray-500 text-base font-normal leading-normal">
                Bank Name
              </span>
              <p className="text-center justify-start text-zinc-900 text-lg font-semibold  leading-normal">
                {USDAcct?.bank_name || ""}
              </p>
            </div>
            {/* Acct number */}
            <div className="w-full flex flex-col justify-center items-center">
              <span className="text-center justify-start text-gray-500 text-base font-normal leading-normal">
                Account Number
              </span>
              <div className="flex items-center gap-2">
                <p className="text-center justify-start text-zinc-900 text-lg font-semibold  leading-normal">
                  {USDAcct?.account_number || ""}
                </p>
                <button
                  onClick={() => copyToClipboard(USDAcct?.account_number || "")}
                >
                  <Image
                    src={"/icons/copy.svg"}
                    alt={"copy"}
                    width={16}
                    height={16}
                  />
                </button>
              </div>
            </div>
            {/* Routing Number (ACH) */}

            <div className="w-full flex flex-col justify-center items-center">
              <span className="text-center justify-start text-gray-500 text-base font-normal leading-normal">
                Routing Number (ACH)
              </span>
              <p className="text-center justify-start text-zinc-900 text-lg font-semibold  leading-normal">
                {
                  USDAcct?.routing?.find(
                    (route) => route.routing_type_name === "ACH"
                  )?.routing
                }
              </p>
            </div>
            {/* Routing Number (WIRE) */}
            <div className="w-full flex flex-col justify-center items-center">
              <span className="text-center justify-start text-gray-500 text-base font-normal leading-normal">
                Routing Number (WIRE)
              </span>
              <p className="text-center justify-start text-zinc-900 text-lg font-semibold  leading-normal">
                {
                  USDAcct?.routing?.find(
                    (route) => route.routing_type_name === "WIRE"
                  )?.routing
                }
              </p>
            </div>
            {/* Currency */}
            <div className="w-full flex flex-col justify-center items-center">
              <span className="text-center justify-start text-gray-500 text-base font-normal leading-normal">
                Currency
              </span>
              <p className="text-center justify-start text-zinc-900 text-lg font-semibold  leading-normal">
                {USDAcct?.wallet_type.currency || ""}
              </p>
            </div>
            {/*  Address */}
            <div className="w-full flex flex-col justify-center items-center">
              <span className="text-center justify-start text-gray-500 text-base font-normal leading-normal">
                Address
              </span>
              <p className="text-center justify-start text-zinc-900 text-lg font-semibold  leading-normal">
                270 Park Avenue, NY 10017
                {/* {USDAcct?.} */}
              </p>
            </div>
          </div>
        )}
        {type === "ngn" && (
          <div className="p-7 bg-violet-100/60 rounded-[20px] inline-flex flex-col justify-center items-center gap-5 w-full my-[30px]">
            {/* Bank details */}
            <div className="w-full flex flex-col justify-center items-center">
              <span className="text-center justify-start text-gray-500 text-base font-normal leading-normal">
                Bank Name
              </span>
              <p className="text-center justify-start text-zinc-900 text-lg font-semibold  leading-normal">
                {NGNAcct?.bank_name || ""}
              </p>
            </div>
            {/* Acct number */}
            <div className="w-full flex flex-col justify-center items-center">
              <span className="text-center justify-start text-gray-500 text-base font-normal leading-normal">
                Account Number
              </span>
              <div className="flex items-center gap-2">
                <p className="text-center justify-start text-zinc-900 text-lg font-semibold  leading-normal">
                  {NGNAcct?.account_number || ""}
                </p>
                <button
                  onClick={() => copyToClipboard(NGNAcct?.account_number || "")}
                >
                  <Image
                    src={"/icons/copy.svg"}
                    alt={"copy"}
                    width={16}
                    height={16}
                  />
                </button>
              </div>
            </div>

            {/* Currency */}
            <div className="w-full flex flex-col justify-center items-center">
              <span className="text-center justify-start text-gray-500 text-base font-normal leading-normal">
                Currency
              </span>
              <p className="text-center justify-start text-zinc-900 text-lg font-semibold  leading-normal">
                {NGNAcct?.wallet_type.currency || ""}
              </p>
            </div>
          </div>
        )}
        <div>
          <Button onClick={() => setScreen("card")} className="mt-5 mb-4">
            Pay with Card
          </Button>
          <p className="text-[13px] text-raiz-gray-900  text-center mt-2">
            Don&#39;t have Raiz App?{" "}
            <Link
              target="_blank"
              className="font-bold"
              href={"https://raizapp.onelink.me/RiOx/webdirect"}
            >
              Download
            </Link>{" "}
            | {"  "}
            <Link
              target="_blank"
              className="font-bold"
              href={"https://business.raiz.app/register"}
            >
              Sign up{" "}
            </Link>{" "}
            for Raiz Business
          </p>
        </div>
      </div>
    </>
  );
};

export default PayDetails;
