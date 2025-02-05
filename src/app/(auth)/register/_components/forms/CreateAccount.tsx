"use client";

import InputLabel from "@/components/ui/InputLabel";
import Image from "next/image";
import React, { useState } from "react";
import CountryOriginInfoModal from "../CountryOriginInfoModal";
import CountryCodeModal from "../CountryCodeModal";
import { FormikProps } from "formik";
import { IRegisterFormValues } from "@/types/misc";
import InputField from "@/components/ui/InputField";

export interface RegisterFormProps {
  formik: FormikProps<IRegisterFormValues>;
  goBack?: () => void;
  goForward?: () => void;
}

const CreateAccount = ({ formik }: RegisterFormProps) => {
  const [showCountryInfo, setShowCountryInfo] = useState(false);
  const [showCountryCode, setShowCountryCode] = useState(false);
  return (
    <section className="h-full flex flex-col">
      <header className="flex items-center justify-between">
        <h2 className="text-raiz-gray-950 text-[23px] font-semibold font-monzo leading-10">
          Create your account
        </h2>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path
            d="M30 35H10C7.23833 35 5 32.7617 5 30V10C5 7.23833 7.23833 5 10 5H30C32.7617 5 35 7.23833 35 10V30C35 32.7617 32.7617 35 30 35Z"
            fill="#E9E0EF"
          />
          <path
            d="M20 20C22.7614 20 25 17.7614 25 15C25 12.2386 22.7614 10 20 10C17.2386 10 15 12.2386 15 15C15 17.7614 17.2386 20 20 20Z"
            fill="#733B9C"
          />
          <path
            d="M24.9998 23.334H14.9998C13.1582 23.334 11.6665 24.8257 11.6665 26.6673C11.6665 28.509 13.1582 30.0007 14.9998 30.0007H24.9998C26.8415 30.0007 28.3332 28.509 28.3332 26.6673C28.3332 24.8257 26.8415 23.334 24.9998 23.334Z"
            fill="#493260"
          />
        </svg>
      </header>
      <p className="text-raiz-gray-700 text-[15px] font-normal font-monzo leading-snug">
        Let&#39;s start by getting to know you
      </p>
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="mt-[44px] flex flex-col gap-5 ">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <InputLabel content="Country of Origin" />
                <button onClick={() => setShowCountryInfo(true)}>
                  <Image
                    src={"/icons/tooltip-info.svg"}
                    alt="country"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
              <button className="flex justify-between w-full h-[50px] p-[15px] bg-raiz-gray-100 rounded-lg  items-center">
                <span className="text-raiz-gray-400 text-sm font-normal font-monzo leading-tight">
                  Enter country
                </span>
                <Image
                  src={"/icons/arrow-down.svg"}
                  alt="dropdown"
                  width={16}
                  height={16}
                />
              </button>
            </div>
            <InputField
              placeholder="Enter your email address"
              label="Email"
              type="email"
              {...formik.getFieldProps("email")}
              status={formik.errors.email ? "error" : null}
              errorMessage={formik.touched.email && formik.errors.email}
            />
            <div className="">
              <InputLabel content="Phone Number" />
              <div className="flex gap-3 w-full mt-2">
                <button
                  onClick={() => setShowCountryCode(true)}
                  className="w-[25%] flex p-[15px] gap-2 rounded-lg bg-raiz-gray-100 items-center"
                >
                  <Image
                    src={"/images/9ja.png"}
                    alt="country"
                    width={34}
                    height={17}
                  />
                  <span className="text-raiz-gray-900 text-[13px] font-medium font-brSonoma leading-tight">
                    (+234)
                  </span>
                  <Image
                    className="w-[34px] h-[17px]"
                    src={"/icons/arrow-down.svg"}
                    alt="country"
                    width={34}
                    height={17}
                  />
                </button>
                <div className="w-[75%]">
                  <InputField
                    placeholder="Enter phone number"
                    {...formik.getFieldProps("phone_number")}
                    status={formik.errors.phone_number ? "error" : null}
                    errorMessage={
                      formik.touched.phone_number && formik.errors.phone_number
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-3 items-start">
            <button className="w-5 h-5">
              <Image
                src={"/icons/tooltip-info.svg"}
                alt="country"
                width={20}
                height={20}
              />
            </button>

            <p className="text-raiz-gray-600 text-xs font-medium font-brSonoma leading-[18px]">
              By signing up, you agree to receive OTPs and security alerts from
              Raiz. Reply STOP to opt out.
            </p>
          </div>
        </div>
      </div>
      {showCountryInfo && (
        <CountryOriginInfoModal close={() => setShowCountryInfo(false)} />
      )}
      {showCountryCode && (
        <CountryCodeModal close={() => setShowCountryCode(false)} />
      )}
    </section>
  );
};

export default CreateAccount;
