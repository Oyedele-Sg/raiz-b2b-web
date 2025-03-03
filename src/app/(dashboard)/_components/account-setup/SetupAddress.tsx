"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { AccountSetupProps } from "@/types/misc";
import { useFormik } from "formik";
import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import { nigeriaStates } from "@/constants/misc";
import InputLabel from "@/components/ui/InputLabel";
// import CountryCodeModal from "@/app/(auth)/register/_components/CountryCodeModal";
import Button from "@/components/ui/Button";
import DocInfoModal from "./DocInfoModal";

interface formValues {
  address: string;
  city: string;
  state: string;
  country: string;
  phoneNumber: string;
  document: File | null;
}

const SetupAddress = ({ selectedStep, setSelectedStep }: AccountSetupProps) => {
  // const [showCountryCode, setShowCountryCode] = useState(false);
  const [showAddressInfo, setShowAddressInfo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const initialValues: formValues = {
    address: "",
    city: "",
    state: "",
    country: "",
    phoneNumber: "",
    document: null,
  };
  const formik = useFormik({
    initialValues,
    // validationSchema: toFormikValidationSchema(pinSchema),
    onSubmit: (values) => {
      console.log("values:", values);
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      formik.setFieldValue("document", file);
    }
  };

  return (
    <>
      <div className="font-monzo h-full flex flex-col overflow-y-scroll no-scrollbar">
        <button onClick={() => setSelectedStep(null)}>
          <Image
            src={"/icons/arrow-left.svg"}
            alt="go back"
            width={18.48}
            height={18.48}
          />
        </button>
        <div className="flex justify-between mt-4 mb-11">
          <div className="">
            <h5 className="text-raiz-gray-950 text-[23px] font-semibold leading-10">
              Residential Address
            </h5>
            <p className="text-raiz-gray-700 text-[15px] font-normal leading-snug">
              {selectedStep?.subtitle}
            </p>
          </div>
          <div className="w-10  h-10">{selectedStep.icon}</div>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col h-full justify-between"
        >
          <div className="flex flex-col gap-5">
            <InputField
              placeholder="Enter address"
              label="Address"
              {...formik.getFieldProps("address")}
              status={formik.errors.address ? "error" : null}
              errorMessage={formik.touched.address && formik.errors.address}
            />
            <InputField
              placeholder="Enter city"
              label="City"
              {...formik.getFieldProps("city")}
              status={formik.errors.city ? "error" : null}
              errorMessage={formik.touched.city && formik.errors.city}
            />
            <SelectField
              label="State"
              placeholder="Enter state"
              name="type"
              value={nigeriaStates.find(
                (option) => option.value === formik.values.state
              )}
              onChange={(selectedOption) =>
                formik.setFieldValue("state", selectedOption?.value || "")
              }
              options={nigeriaStates}
            />
            <div className="">
              <InputLabel content="Additional Phone Number" />
              <div className="flex gap-3 w-full mt-2">
                <button
                  // onClick={() => setShowCountryCode(true)}
                  className="w-[28%] flex p-[15px] gap-2 rounded-lg bg-raiz-gray-100 items-center"
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
                <div className="w-[72%]">
                  <InputField
                    placeholder="Enter phone number"
                    {...formik.getFieldProps("phoneNumber")}
                    status={formik.errors.phoneNumber ? "error" : null}
                    errorMessage={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                  />
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex gap-2 items-center mb-3">
                <InputLabel content="Document" />
                <button onClick={() => setShowAddressInfo(true)}>
                  <Image
                    src={"/icons/tooltip-info.svg"}
                    alt="country"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
              <div className="h-[139px] w-full p-5 bg-[#e5ebff]/30 border-dashed rounded-lg border border-[#0e8b8b] flex-col justify-start items-center gap-[15px] inline-flex">
                <Image
                  src={"/icons/file-blue.svg"}
                  alt="file"
                  width={20}
                  height={20}
                />
                <p className="text-center text-raiz-gray-700text-sm font-normal leading-tight">
                  {formik.values.document
                    ? ` Selected file: ${formik.values.document?.name}`
                    : "Upload your “Proof of Address” here"}
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="sr-only"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
                <button
                  onClick={() => fileInputRef?.current?.click()}
                  className="text-[#0e8b8b] text-[13px] font-normal underline leading-tight"
                >
                  Browse
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-raiz-gray-600 text-[13px] font-normal  leading-tight">
              By continuing, you agree that all the information provided above
              is correct.
            </p>
            <Button className="bg-raiz-usd-primary hover:bg-raiz-usd-primary disabled:bg-raiz-gray-200">
              Confirm & Continue
            </Button>
          </div>
        </form>
      </div>

      {/* {showCountryCode && (
        <CountryCodeModal close={() => setShowCountryCode(false)} />
      )} */}
      {showAddressInfo && (
        <DocInfoModal close={() => setShowAddressInfo(false)} />
      )}
    </>
  );
};

export default SetupAddress;
