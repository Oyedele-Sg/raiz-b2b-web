import { AccountSetupStep } from "@/types/misc";
import Image from "next/image";
import React from "react";
import VerifyPhone from "./VerifyPhone";
import { useAccountSetupStore } from "@/store/useAccountSetupStore";
import SetupPin from "./SetupPin";
import SetupAddress from "./SetupAddress";
import { ProgressBar } from "@/components/ui/Progressbar";

const steps: AccountSetupStep[] = [
  {
    title: "Account created",
    subtitle: "",
    status: "completed",
    icon: (
      <svg width="30" height="31" viewBox="0 0 30 31" fill="none">
        <path
          opacity="0.35"
          d="M7.5 5.47998C7.5 3.40873 9.17875 1.72998 11.25 1.72998H21.25C23.3212 1.72998 25 3.40873 25 5.47998V25.48C25 27.5512 23.3212 29.23 21.25 29.23H11.25C9.17875 29.23 7.5 27.5512 7.5 25.48V18.3675L3.75 17.98V9.22998L7.5 6.72998V5.47998Z"
          fill="#44B02E"
        />
        <path
          d="M13.75 24.23C13.9825 24.23 18.5175 24.23 18.75 24.23C19.44 24.23 20 24.79 20 25.48C20 26.17 19.44 26.73 18.75 26.73C18.5175 26.73 13.9825 26.73 13.75 26.73C13.06 26.73 12.5 26.17 12.5 25.48C12.5 24.79 13.06 24.23 13.75 24.23Z"
          fill="#292D32"
        />
        <path
          d="M0 12.355V18.605C0 19.6362 0.84375 20.48 1.875 20.48H13.125C14.1562 20.48 15 19.6362 15 18.605V12.355C15 11.3237 14.1562 10.48 13.125 10.48H1.875C0.84375 10.48 0 11.3237 0 12.355ZM5.9375 15.48C5.9375 14.6175 6.6375 13.9175 7.5 13.9175C8.3625 13.9175 9.0625 14.6175 9.0625 15.48C9.0625 16.3425 8.3625 17.0425 7.5 17.0425C6.6375 17.0425 5.9375 16.3425 5.9375 15.48Z"
          fill="#792D3D"
        />
        <path
          d="M2.5 10.48L3.75 11.73L5 10.48C5 9.10498 6.125 7.97998 7.5 7.97998C8.875 7.97998 10 9.10498 10 10.48L11.25 11.73L12.5 10.48C12.5 7.71748 10.2625 5.47998 7.5 5.47998C4.7375 5.47998 2.5 7.71748 2.5 10.48Z"
          fill="#292D32"
        />
      </svg>
    ),
  },
  {
    title: "Verify your phone",
    subtitle: "Verify your phone number for security purposes",
    status: "in-complete",
    icon: (
      <svg width="30" height="31" viewBox="0 0 30 31" fill="none">
        <path
          opacity="0.35"
          d="M7.5 5.47998C7.5 3.40873 9.17875 1.72998 11.25 1.72998H21.25C23.3212 1.72998 25 3.40873 25 5.47998V25.48C25 27.5512 23.3212 29.23 21.25 29.23H11.25C9.17875 29.23 7.5 27.5512 7.5 25.48V18.3675L3.75 17.98V9.22998L7.5 6.72998V5.47998Z"
          fill="#44B02E"
        />
        <path
          d="M13.75 24.23C13.9825 24.23 18.5175 24.23 18.75 24.23C19.44 24.23 20 24.79 20 25.48C20 26.17 19.44 26.73 18.75 26.73C18.5175 26.73 13.9825 26.73 13.75 26.73C13.06 26.73 12.5 26.17 12.5 25.48C12.5 24.79 13.06 24.23 13.75 24.23Z"
          fill="#292D32"
        />
        <path
          d="M0 12.355V18.605C0 19.6362 0.84375 20.48 1.875 20.48H13.125C14.1562 20.48 15 19.6362 15 18.605V12.355C15 11.3237 14.1562 10.48 13.125 10.48H1.875C0.84375 10.48 0 11.3237 0 12.355ZM5.9375 15.48C5.9375 14.6175 6.6375 13.9175 7.5 13.9175C8.3625 13.9175 9.0625 14.6175 9.0625 15.48C9.0625 16.3425 8.3625 17.0425 7.5 17.0425C6.6375 17.0425 5.9375 16.3425 5.9375 15.48Z"
          fill="#792D3D"
        />
        <path
          d="M2.5 10.48L3.75 11.73L5 10.48C5 9.10498 6.125 7.97998 7.5 7.97998C8.875 7.97998 10 9.10498 10 10.48L11.25 11.73L12.5 10.48C12.5 7.71748 10.2625 5.47998 7.5 5.47998C4.7375 5.47998 2.5 7.71748 2.5 10.48Z"
          fill="#292D32"
        />
      </svg>
    ),
  },
  {
    title: "Add a residential Address",
    subtitle: "Set up a residential address to your raiz account",
    status: "in-complete",
    icon: (
      <svg
        width="30"
        height="31"
        viewBox="0 0 30 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 16.73C17.7614 16.73 20 14.4914 20 11.73C20 8.96856 17.7614 6.72998 15 6.72998C12.2386 6.72998 10 8.96856 10 11.73C10 14.4914 12.2386 16.73 15 16.73Z"
          fill="#FF9898"
        />
        <path
          d="M26.1238 24.3312L25.5263 22.8362C24.9563 21.4137 23.5775 20.48 22.0438 20.48H7.95626C6.42251 20.48 5.04376 21.4137 4.47501 22.8375L3.87751 24.3325C3.41751 25.48 4.26376 26.73 5.50001 26.73H24.5C25.7363 26.73 26.5825 25.48 26.1238 24.3312Z"
          fill="#86D971"
        />
        <path
          d="M15 2.97998C10.1675 2.97998 6.25 6.89748 6.25 11.73C6.25 15.1887 9.75125 19.9612 12.3238 23.0012C13.7225 24.6537 16.2763 24.6537 17.675 23.0012C20.2488 19.9612 23.75 15.1887 23.75 11.73C23.75 6.89748 19.8325 2.97998 15 2.97998ZM15 14.855C13.2737 14.855 11.875 13.4562 11.875 11.73C11.875 10.0037 13.2737 8.60498 15 8.60498C16.7262 8.60498 18.125 10.0037 18.125 11.73C18.125 13.4562 16.7262 14.855 15 14.855Z"
          fill="#C23434"
        />
      </svg>
    ),
  },
  {
    title: "Secure your account",
    subtitle: "Set a 4-digit PIN to your transaction",
    status: "in-complete",
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
          d="M22.5 26.73H7.5C5.42875 26.73 3.75 25.0512 3.75 22.98V12.98C3.75 10.9087 5.42875 9.22998 7.5 9.22998H22.5C24.5712 9.22998 26.25 10.9087 26.25 12.98V22.98C26.25 25.0512 24.5712 26.73 22.5 26.73Z"
          fill="#F7A900"
        />
        <path
          d="M10 9.22998C10 6.46873 12.2387 4.22998 15 4.22998C17.7613 4.22998 20 6.46873 20 9.22998H22.5C22.5 5.08748 19.1425 1.72998 15 1.72998C10.8575 1.72998 7.5 5.08748 7.5 9.22998H10Z"
          fill="#292D32"
        />
        <path
          d="M15 19.855C16.0355 19.855 16.875 19.0155 16.875 17.98C16.875 16.9444 16.0355 16.105 15 16.105C13.9645 16.105 13.125 16.9444 13.125 17.98C13.125 19.0155 13.9645 19.855 15 19.855Z"
          fill="#6C265B"
        />
        <path
          d="M21.25 19.855C22.2855 19.855 23.125 19.0155 23.125 17.98C23.125 16.9444 22.2855 16.105 21.25 16.105C20.2145 16.105 19.375 16.9444 19.375 17.98C19.375 19.0155 20.2145 19.855 21.25 19.855Z"
          fill="#6C265B"
        />
        <path
          d="M8.75 19.855C9.78553 19.855 10.625 19.0155 10.625 17.98C10.625 16.9444 9.78553 16.105 8.75 16.105C7.71447 16.105 6.875 16.9444 6.875 17.98C6.875 19.0155 7.71447 19.855 8.75 19.855Z"
          fill="#6C265B"
        />
      </svg>
    ),
  },
];

const AccountSetup = ({ close }: { close: () => void }) => {
  const { selectedStep, setSelectedStep } = useAccountSetupStore();
  const completedSteps = steps.filter((step) => step.status === "completed");
  const incompleteSteps = steps.filter((step) => step.status === "in-complete");

  const displayStep = () => {
    switch (selectedStep?.title) {
      case "Verify your phone":
        return (
          <VerifyPhone
            selectedStep={selectedStep}
            setSelectedStep={setSelectedStep}
          />
        );

      case "Secure your account":
        return (
          <SetupPin
            selectedStep={selectedStep}
            setSelectedStep={setSelectedStep}
          />
        );

      case "Add a residential Address":
        return (
          <SetupAddress
            selectedStep={selectedStep}
            setSelectedStep={setSelectedStep}
          />
        );

      default:
        break;
    }
  };
  return (
    <>
      {!selectedStep ? (
        <div className="">
          <button onClick={close}>
            <Image
              src={"/icons/arrow-left.svg"}
              alt="go back"
              width={18.48}
              height={18.48}
            />
          </button>
          <h2 className="text-raiz-gray-950 text-[23px] font-semibold  leading-10 mt-4">
            Complete Account Setup
          </h2>
          <p className="text-raiz-gray-700 text-[15px] font-normal leading-snug">
            Complete your checklist to start enjoying the full USD Account
            experience
          </p>

          {/* Progresss */}
          <div className="w-full mt-5">
            <ProgressBar
              value={(completedSteps.length / steps.length) * 100}
              type="linear"
              color="#493260"
              thickness={10}
            />
            <div className="flex justify-between mt-3">
              <span className="text-raiz-gray-700 text-[13px] leading-tight">
                {completedSteps.length}/{steps.length}
              </span>
              <span className="text-raiz-gray-700 text-[13px] leading-tight">
                {Math.round((completedSteps.length / steps.length) * 100)}%
              </span>
            </div>
          </div>
          {/* Incomplete  steps*/}
          <div className="w-full mt-6 flex flex-col gap-3">
            <h3 className="text-raiz-gray-900 text-[15px] font-semibold  leading-[21px] mb-3">
              Incomplete
            </h3>
            {incompleteSteps?.map((each, index) => {
              return (
                <button
                  onClick={() => setSelectedStep(each)}
                  className="pl-4 py-5 bg-[#eaecff]/50 rounded-[20px] justify-start items-center gap-4 inline-flex w-full "
                  key={index}
                >
                  {each.icon}
                  <div className="flex flex-col gap-1 items-start pr-0.5">
                    <h6 className="text-raiz-gray-950 text-[13px] font-bold  leading-[18.20px]">
                      {each.title}
                    </h6>
                    <p className="text-raiz-gray-950 text-[13px] font-normal leading-tight text-left">
                      {each.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Completed  steps*/}
          <div className="w-full mt-5 flex flex-col gap-3">
            <h3 className="text-raiz-gray-900 text-[15px] font-semibold  leading-[21px]">
              Completed
            </h3>
            {completedSteps?.map((each, index) => {
              return (
                <div
                  className="pl-4 py-5 bg-[#eaecff]/50 rounded-[20px] justify-start items-center gap-4 inline-flex w-full "
                  key={index}
                >
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <g id="vuesax/bold/tick-circle">
                      <g id="tick-circle">
                        <path
                          id="Vector"
                          d="M12 2.47998C6.49 2.47998 2 6.96998 2 12.48C2 17.99 6.49 22.48 12 22.48C17.51 22.48 22 17.99 22 12.48C22 6.96998 17.51 2.47998 12 2.47998ZM16.78 10.18L11.11 15.85C10.97 15.99 10.78 16.07 10.58 16.07C10.38 16.07 10.19 15.99 10.05 15.85L7.22 13.02C6.93 12.73 6.93 12.25 7.22 11.96C7.51 11.67 7.99 11.67 8.28 11.96L10.58 14.26L15.72 9.11998C16.01 8.82998 16.49 8.82998 16.78 9.11998C17.07 9.40998 17.07 9.87998 16.78 10.18Z"
                          fill="#63B313"
                        />
                      </g>
                    </g>
                  </svg>

                  <div className="flex flex-col gap-1 items-start">
                    <h6 className="text-raiz-gray-950 text-[13px] font-bold  leading-[18.20px]">
                      {each.title}
                    </h6>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        displayStep()
      )}
    </>
  );
};

export default AccountSetup;
