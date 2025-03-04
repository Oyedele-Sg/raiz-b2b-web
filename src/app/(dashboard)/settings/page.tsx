"use client";
import React, { useState } from "react";
import RouteSectionInfo from "./_components/RouteSectionInfo";
import InputField from "@/components/ui/InputField";
import InputLabel from "@/components/ui/InputLabel";
import { useFormik } from "formik";
import Image from "next/image";
import CountryCodeModal from "@/app/(auth)/register/_components/CountryCodeModal";
import Button from "@/components/ui/Button";
import { useSearchParams } from "next/navigation";

const Settingspage = () => {
  const [showCountry, setShowCountry] = useState(false);
  const searchParams = useSearchParams();
  const focus = searchParams.get("focus");
  console.log("sssss", focus);

  const initialValues = {
    business_name: "Khadijah Arowosegbe",
    raiz_tag: "@dija001",
    email: "Khadijaharowosegbe16@gmail.com",
    phone_number: "+2348130000000",
    address: "3,balogun street, Ikeja, Lagos State",
    country_id: 1,
    country_name: "Nigeria",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <section className="gap-10 flex w-full  ">
      <RouteSectionInfo
        title="Your Profile"
        subtitle="Update account information"
        icon={
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect
              width="40"
              height="40"
              rx="20"
              fill="#EAECFF"
              fillOpacity="0.6"
            />
            <path
              opacity="0.65"
              d="M19.9999 20C22.3011 20 24.1666 18.1345 24.1666 15.8333C24.1666 13.5321 22.3011 11.6667 19.9999 11.6667C17.6987 11.6667 15.8333 13.5321 15.8333 15.8333C15.8333 18.1345 17.6987 20 19.9999 20Z"
              fill="#8A5E35"
            />
            <path
              d="M25 22.5H15C13.6192 22.5 12.5 23.6192 12.5 25C12.5 26.3808 13.6192 27.5 15 27.5H25C26.3808 27.5 27.5 26.3808 27.5 25C27.5 23.6192 26.3808 22.5 25 22.5Z"
              fill="#A03976"
            />
          </svg>
        }
      />
      <form
        onSubmit={formik.handleSubmit}
        className="w-[70%] xl:w-[73.5%] flex flex-col gap-5"
      >
        <InputField
          label="Business Name"
          name="business_name"
          placeholder="Khadijah Arowosegbe"
          icon="/icons/lock.svg"
          disabled
        />
        <InputField
          label="Raiz Tag"
          name="raiz_tag"
          placeholder="@dija001"
          icon="/icons/pen.svg"
          autoFocus={focus === "raiz-tag" ? true : false}
        />
        <InputField
          type="email"
          label="Work Email"
          name="email"
          placeholder="Khadijaharowosegbe16@gmail.com"
          icon="/icons/lock.svg"
          disabled
        />
        <InputField
          label="Phone Number"
          name="phone_number"
          placeholder="+2348130000000"
          icon="/icons/lock.svg"
          disabled
        />
        <InputField
          label="Address"
          name="address"
          placeholder="3,balogun street, Ikeja, Lagos State"
          icon="/icons/lock.svg"
          disabled
        />
        <div className="">
          <InputLabel content="Country" />
          <button
            type="button"
            onClick={() => setShowCountry(true)}
            className="flex justify-between w-full h-[50px] p-[15px] bg-raiz-gray-100 rounded-lg  items-center"
          >
            <span
              className={`
                    ${
                      formik.values.country_name
                        ? "text-raiz-gray-950"
                        : "text-raiz-gray-400"
                    }
                       text-sm font-normal  leading-tight`}
            >
              {formik.values.country_id && formik.values.country_name
                ? formik.values?.country_name
                : "Nigeria"}
            </span>
            <Image
              src={"/icons/arrow-down.svg"}
              alt="dropdown"
              width={16}
              height={16}
            />
          </button>
        </div>
        <div className="px-[18px] py-5 bg-[#fff1ce]/60 rounded-[20px] justify-start items-start gap-2 inline-flex">
          <p className="text-raiz-gray-950 text-[13px] font-normal  leading-tight">
            You are unable to edit some of your profile info because your
            account has already been verified. If you you need to edit your
            info, please reach out to customer support.
          </p>
        </div>
        <Button className="mt-5">Save</Button>
      </form>
      {showCountry && (
        <CountryCodeModal close={() => setShowCountry(false)} formik={formik} />
      )}
    </section>
  );
};

export default Settingspage;
