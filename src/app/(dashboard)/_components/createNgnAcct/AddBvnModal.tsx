"use client";
import React, { useState } from "react";
import SideModalWrapper from "../SideModalWrapper";
import Image from "next/image";
import InputField from "@/components/ui/InputField";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import Button from "@/components/ui/Button";

interface Props {
  close: () => void;
  openSuccessModal: () => void;
}

const AddBvnModal = ({ close, openSuccessModal }: Props) => {
  const [showBvn, setShowBvn] = useState(false);

  const formik = useFormik({
    initialValues: {
      bvn: "",
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        bvn: z
          .string()
          .length(11, "BVN must be exactly 11 digits")
          .regex(/^\d+$/, "BVN must contain only numbers"),
      })
    ),
    onSubmit: (val) => {
      console.log("Submit", val);
      close();
      openSuccessModal();
    },
  });
  return (
    <SideModalWrapper close={close}>
      <form
        onSubmit={formik.handleSubmit}
        className=" h-full justify-between flex-col flex  no-scrollbar text-raiz-gray-950 "
      >
        <div>
          <button onClick={close}>
            <Image
              src={"/icons/arrow-left.svg"}
              alt="back"
              width={18.48}
              height={18.48}
            />
          </button>
          <div className="flex justify-between mt-4 mb-11">
            <div className="">
              <h5 className="text-raiz-gray-950 text-[23px] font-semibold leading-10">
                Add your BVN
              </h5>
              <p className="text-raiz-gray-700 text-[15px] font-normal leading-snug">
                Enter BVN to verify your account.
              </p>
            </div>
            <div className="w-10  h-10">
              <svg width="40" height="41" viewBox="0 0 40 41" fill="none">
                <path
                  opacity="0.85"
                  d="M31.6664 24.9634V33.8134H14.9998C14.7664 33.8134 14.5498 33.8634 14.3498 33.9467H14.3331L9.29977 31.5301C8.46644 31.1301 8.09977 30.0967 8.48311 29.1967C9.04977 27.9134 10.2498 27.1467 11.5164 27.1467C11.9831 27.1467 12.4498 27.2467 12.8998 27.4634L14.9998 28.4634V14.6467C14.9998 13.2634 16.1164 12.1467 17.4998 12.1467C18.8831 12.1467 19.9998 13.2634 19.9998 14.6467V19.1801L27.2164 19.9801C29.7498 20.2634 31.6664 22.4134 31.6664 24.9634Z"
                  fill="#A27369"
                />
                <path
                  d="M20 12.1466V14.3633C20 14.4133 20 14.48 19.9833 14.53C19.9333 13.1966 18.85 12.1466 17.5 12.1466C16.15 12.1466 15.0667 13.1966 15.0167 14.53C15 14.48 15 14.4133 15 14.3633V12.1466C15 11.2266 15.7467 10.48 16.6667 10.48H18.3333C19.2533 10.48 20 11.2266 20 12.1466Z"
                  fill="#A66597"
                />
                <path
                  d="M18.3333 8.81323H16.6667C15.7467 8.81323 15 8.06657 15 7.14657V5.4799C15 4.5599 15.7467 3.81323 16.6667 3.81323H18.3333C19.2533 3.81323 20 4.5599 20 5.4799V7.14657C20 8.06657 19.2533 8.81323 18.3333 8.81323Z"
                  fill="#A66597"
                />
                <path
                  d="M24.9998 15.48H23.3332C22.4132 15.48 21.6665 14.7333 21.6665 13.8133V12.1466C21.6665 11.2266 22.4132 10.48 23.3332 10.48H24.9998C25.9198 10.48 26.6665 11.2266 26.6665 12.1466V13.8133C26.6665 14.7333 25.9198 15.48 24.9998 15.48Z"
                  fill="#A66597"
                />
                <path
                  d="M26.6665 18.8134V19.9134L24.7332 19.6967L21.7665 19.3801L21.6665 19.3634V18.8134C21.6665 17.8967 22.4165 17.1467 23.3332 17.1467H24.9998C25.9165 17.1467 26.6665 17.8967 26.6665 18.8134Z"
                  fill="#A66597"
                />
                <path
                  d="M24.9998 8.81323H23.3332C22.4132 8.81323 21.6665 8.06657 21.6665 7.14657V5.4799C21.6665 4.5599 22.4132 3.81323 23.3332 3.81323H24.9998C25.9198 3.81323 26.6665 4.5599 26.6665 5.4799V7.14657C26.6665 8.06657 25.9198 8.81323 24.9998 8.81323Z"
                  fill="#A66597"
                />
                <path
                  d="M11.6668 15.48H10.0002C9.08016 15.48 8.3335 14.7333 8.3335 13.8133V12.1466C8.3335 11.2266 9.08016 10.48 10.0002 10.48H11.6668C12.5868 10.48 13.3335 11.2266 13.3335 12.1466V13.8133C13.3335 14.7333 12.5868 15.48 11.6668 15.48Z"
                  fill="#A66597"
                />
                <path
                  d="M11.6668 22.1467H10.0002C9.08016 22.1467 8.3335 21.4001 8.3335 20.4801V18.8134C8.3335 17.8934 9.08016 17.1467 10.0002 17.1467H11.6668C12.5868 17.1467 13.3335 17.8934 13.3335 18.8134V20.4801C13.3335 21.4001 12.5868 22.1467 11.6668 22.1467Z"
                  fill="#A66597"
                />
                <path
                  d="M11.6668 8.81323H10.0002C9.08016 8.81323 8.3335 8.06657 8.3335 7.14657V5.4799C8.3335 4.5599 9.08016 3.81323 10.0002 3.81323H11.6668C12.5868 3.81323 13.3335 4.5599 13.3335 5.4799V7.14657C13.3335 8.06657 12.5868 8.81323 11.6668 8.81323Z"
                  fill="#A66597"
                />
                <path
                  d="M31.6668 37.1466H15.0002C14.0802 37.1466 13.3335 36.3999 13.3335 35.4799C13.3335 34.5599 14.0802 33.8132 15.0002 33.8132H31.6668C32.5868 33.8132 33.3335 34.5599 33.3335 35.4799C33.3335 36.3999 32.5868 37.1466 31.6668 37.1466Z"
                  fill="#493260"
                />
              </svg>
            </div>
          </div>

          <InputField
            type={showBvn ? "text" : "password"}
            icon={!showBvn ? "/icons/eye-hide.svg" : "/icons/eye.svg"}
            onClick={() => setShowBvn(!showBvn)}
            iconPosition="right"
            status={formik.errors.bvn ? "error" : null}
            {...formik.getFieldProps("bvn")}
            errorMessage={formik.touched.bvn && formik.errors.bvn}
          />
        </div>
        {/* <div
            className={`flex gap-3 items-center mt-5 ${
              !formik.touched.bvn ? "opacity-40" : "opacity-100"
            }`}
          >
            <div className="w-6 h-6">
              {formik.touched.bvn && formik.values.bvn.length !== 11 ? (
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
                  <path
                    d="M12 2.48047C6.48603 2.48047 2 6.96651 2 12.4805C2 17.9944 6.48603 22.4805 12 22.4805C17.514 22.4805 22 17.9944 22 12.4805C22 6.96651 17.514 2.48047 12 2.48047ZM12 3.98047C16.7033 3.98047 20.5 7.77716 20.5 12.4805C20.5 17.1838 16.7033 20.9805 12 20.9805C7.29669 20.9805 3.5 17.1838 3.5 12.4805C3.5 7.77716 7.29669 3.98047 12 3.98047ZM15.2432 8.46973C15.0451 8.4744 14.8569 8.55726 14.7197 8.7002L12 11.4199L9.28027 8.7002C9.21036 8.6282 9.12672 8.57097 9.03429 8.53189C8.94187 8.4928 8.84254 8.47266 8.74219 8.47266C8.59293 8.47269 8.44707 8.51726 8.32328 8.60066C8.19949 8.68405 8.1034 8.80249 8.0473 8.9408C7.99119 9.07912 7.97763 9.23103 8.00835 9.37709C8.03907 9.52316 8.11267 9.65674 8.21973 9.76074L10.9395 12.4805L8.21973 15.2002C8.14775 15.2693 8.09028 15.3521 8.0507 15.4437C8.01111 15.5353 7.9902 15.6338 7.98918 15.7336C7.98817 15.8334 8.00707 15.9324 8.04479 16.0248C8.08251 16.1171 8.13828 16.2011 8.20883 16.2716C8.27939 16.3422 8.36332 16.398 8.4557 16.4357C8.54808 16.4734 8.64706 16.4923 8.74684 16.4913C8.84662 16.4903 8.9452 16.4694 9.03679 16.4298C9.12839 16.3902 9.21116 16.3327 9.28027 16.2607L12 13.541L14.7197 16.2607C14.7888 16.3327 14.8716 16.3902 14.9632 16.4298C15.0548 16.4694 15.1534 16.4903 15.2532 16.4913C15.3529 16.4923 15.4519 16.4734 15.5443 16.4357C15.6367 16.398 15.7206 16.3422 15.7912 16.2716C15.8617 16.2011 15.9175 16.1171 15.9552 16.0248C15.9929 15.9324 16.0118 15.8334 16.0108 15.7336C16.0098 15.6338 15.9889 15.5353 15.9493 15.4437C15.9097 15.3521 15.8523 15.2693 15.7803 15.2002L13.0605 12.4805L15.7803 9.76074C15.8893 9.65606 15.9642 9.52087 15.9951 9.37289C16.026 9.22491 16.0115 9.07105 15.9534 8.93147C15.8953 8.7919 15.7965 8.67313 15.6697 8.59073C15.543 8.50833 15.3943 8.46616 15.2432 8.46973Z"
                    fill="#DC180D"
                  />
                </svg>
              ) : (
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
                  <path
                    d="M12 22.4805C17.5 22.4805 22 17.9805 22 12.4805C22 6.98047 17.5 2.48047 12 2.48047C6.5 2.48047 2 6.98047 2 12.4805C2 17.9805 6.5 22.4805 12 22.4805Z"
                    stroke="#14AA5B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.75 12.4804L10.58 15.3104L16.25 9.65039"
                    stroke="#14AA5B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span
              className={` text-[13px] font-normal  leading-[18px] ${
                formik.touched.bvn && formik.values.bvn.length !== 11
                  ? "text-raiz-error"
                  : "text-raiz-gray-700"
              }`}
            >
              Must be 11 digits
            </span>
          </div> */}
        <Button type="submit" disabled={!formik.dirty || !formik.isValid}>
          Confirm & continue
        </Button>
      </form>
    </SideModalWrapper>
  );
};

export default AddBvnModal;
