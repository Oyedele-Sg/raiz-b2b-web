"use client";
import Slider from "@/app/(auth)/_components/authSlide/Slider";
import React, { useState } from "react";
import Image from "next/image";
import PayDetails from "./_components/PayDetails";
import PayWithCard from "./_components/PayWithCard";
import { useQuery } from "@tanstack/react-query";
import { FetchPaymentInfoApi } from "@/services/business";
import { useParams } from "next/navigation";
import Spinner from "@/components/ui/Spinner";

const PayBusinessPage = () => {
  const params = useParams();
  const [screen, setScreen] = useState<"details" | "card">("details");
  const { data, isLoading, error } = useQuery({
    queryKey: ["business-payment-info"],
    queryFn: () => FetchPaymentInfoApi(params?.raizTag as string),
  });

  if ((error || !data) && !isLoading) {
    return (
      <section className="p-6 md:p-12 h-[calc(100vh-2rem)] md:h-[100vh] flex justify-center items-center">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6 w-full max-w-md text-center shadow-md">
          <div className="flex flex-col items-center gap-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="#D03660"
              />
              <path
                d="M12 13.75C12.41 13.75 12.75 13.41 12.75 13V8C12.75 7.59 12.41 7.25 12 7.25C11.59 7.25 11.25 7.59 11.25 8V13C11.25 13.41 11.59 13.75 12 13.75Z"
                fill="#0C160E"
              />
              <path
                d="M12.92 15.6199C12.87 15.4999 12.8 15.3899 12.71 15.2899C12.61 15.1999 12.5 15.1299 12.38 15.0799C12.14 14.9799 11.86 14.9799 11.62 15.0799C11.5 15.1299 11.39 15.1999 11.29 15.2899C11.2 15.3899 11.13 15.4999 11.08 15.6199C11.03 15.7399 11 15.8699 11 15.9999C11 16.1299 11.03 16.2599 11.08 16.3799C11.13 16.5099 11.2 16.6099 11.29 16.7099C11.39 16.7999 11.5 16.8699 11.62 16.9199C11.74 16.9699 11.87 16.9999 12 16.9999C12.13 16.9999 12.26 16.9699 12.38 16.9199C12.5 16.8699 12.61 16.7999 12.71 16.7099C12.8 16.6099 12.87 16.5099 12.92 16.3799C12.97 16.2599 13 16.1299 13 15.9999C13 15.8699 12.97 15.7399 12.92 15.6199Z"
                fill="#0C160E"
              />
            </svg>
            <h2 className="text-lg font-semibold">Something went wrong</h2>
            <p className="text-sm text-red-700">
              We couldn&#39;t fetch the payment information. Please try again
              later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="p-6 md:p-12 h-[calc(100vh-2rem)] md:h-[100vh]">
      <div className="flex flex-col  md:flex-row  h-full gap-4">
        <Slider />

        <div className="py-4 px-3 xl:px-8 lg:w-[50%] xl:w-[46%] h-full flex flex-col  ">
          <Image src={"/icons/Logo.svg"} width={91.78} height={32} alt="Logo" />
          {isLoading ? (
            <div className="flex justify-center items-center w-full">
              <Spinner />
            </div>
          ) : (
            <div className="flex flex-col h-full">
              {data && screen === "details" && (
                <PayDetails setScreen={setScreen} data={data} />
              )}
              {data && screen === "card" && (
                <PayWithCard setScreen={setScreen} data={data} />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PayBusinessPage;
