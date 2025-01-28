"use client";
import React, { useState } from "react";
import CreateAccount from "./forms/CreateAccount";
import SetPassword from "./forms/SetPassword";
import Button from "@/components/ui/Button";
import Link from "next/link";
import CreateUsername from "./forms/CreateUsername";
import RegisterOtp from "./forms/RegisterOtp";

const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(4);

  const displayStep = (step: number) => {
    switch (step) {
      case 1:
        return <CreateAccount />;
      case 2:
        return <SetPassword />;
      case 3:
        return <CreateUsername />;
      case 4:
        return <RegisterOtp />;
      default:
    }
  };
  return (
    <div className="py-4 px-3 xl:px-8 w-[50%] xl:w-[46%] h-full flex flex-col">
      {displayStep(currentStep)}
      <div className="flex flex-col gap-3 mt-3">
        {currentStep === 1 && (
          <p className="text-raiz-gray-600 text-[13px] font-normal font-monzo leading-tight">
            By continuing, you agree to Raiz&#39;s{" "}
            <Link
              className="text-raiz-gray-800 font-bold leading-[18.20px]"
              href={"#"}
            >
              Term of Service
            </Link>{" "}
            and acknowledge our{" "}
            <Link
              className="text-raiz-gray-800 font-bold leading-[18.20px]"
              href={"#"}
            >
              Privacy Policy
            </Link>{" "}
            .
          </p>
        )}
        <Button>Continue</Button>
        {currentStep === 1 && (
          <p className="text-raiz-gray-800 text-[13px] font-normal font-monzo leading-tight mt-3 text-center">
            Already have an account?{" "}
            <Link className=" font-bold leading-[18.20px]" href={"/login"}>
              Login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
