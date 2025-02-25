"use client";
import React, { useState } from "react";
import Image from "next/image";
import CreateAccount from "./forms/CreateAccount";
import SetPassword from "./forms/SetPassword";
import Button from "@/components/ui/Button";
import Link from "next/link";
// import CreateUsername from "./forms/CreateUsername";
import RegisterOtp from "./forms/RegisterOtp";
// import UseCases from "./forms/UseCases";
import Congrats from "./forms/Congrats";
import { useFormik } from "formik";
import { registerFormSchema } from "./validation";
import { IRegisterFormValues } from "@/types/misc";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    "createAccount",
    "setPassword",
    "otp",
    // "createUsername",
    // "useCases",
    "congrats",
  ];

  const initialValues: IRegisterFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // username: "",
    // phone_number: "",
    // country_id: "uokpk",
    referral_code: "",
    otp: "",
    // useCases: [],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(registerFormSchema),
    onSubmit: (values) => console.log("form values", values),
  });

  const disableProgress = () => {
    switch (currentStep) {
      case 1:
        return (
          !formik.values.email ||
          !formik.values.firstName ||
          !formik.values.lastName ||
          formik.errors.email ||
          formik.errors.firstName ||
          formik.errors.lastName
        );
      case 2:
        return !formik.values.password || formik.errors.password;

      case 3:
        return !formik.values.otp || formik.errors.otp;
      // case 4:
      //   return !formik.values.username || formik.errors.username;

      default:
        break;
    }
  };

  console.log("errror reg", formik.errors);

  const handleNavigate = (direction: "next" | "back") => {
    if (
      direction === "next" &&
      !disableProgress() &&
      currentStep < steps.length
    ) {
      setCurrentStep((prev) => prev + 1);
    } else if (direction === "back") {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const btnAction = () => {
    if (currentStep === 1 && !disableProgress()) {
      handleNavigate("next");
    } else if (currentStep === 2 && !disableProgress()) {
      console.log("btn actn submit vals", formik.values);
      handleNavigate("next");
    } else if (currentStep === 3 && !disableProgress()) {
      console.log("submit otp", formik.values.otp);
      handleNavigate("next");
    } else if (currentStep === steps.length && !disableProgress()) {
      router.push("/login");
    }
  };

  const displayStep = (step: number) => {
    switch (step) {
      case 1:
        return <CreateAccount formik={formik} />;
      case 2:
        return (
          <SetPassword goBack={() => handleNavigate("back")} formik={formik} />
        );
      case 3:
        return (
          // <CreateUsername
          //   goBack={() => handleNavigate("back")}
          //   formik={formik}
          // />
          <RegisterOtp goBack={() => handleNavigate("back")} formik={formik} />
        );
      // case 4:
      //   return (
      //     <RegisterOtp goBack={() => handleNavigate("back")} formik={formik} />
      //   );
      // case 5:
      // return (
      //   <UseCases
      //     goBack={() => handleNavigate("back")}
      //     formik={formik}
      //     goForward={() => handleNavigate("next")}
      //   />
      // );
      case 4:
        return <Congrats />;
      default:
    }
  };
  // console.log("val", formik.values);

  return (
    <div className="py-4 px-3 xl:px-8 w-[50%] xl:w-[46%] h-full flex flex-col justify-between gap-[60px]">
      <Image src={"/icons/Logo.svg"} width={91.78} height={32} alt="Logo" />
      <div className="flex flex-col h-full  justify-between">
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
          <Button
            // type={currentStep < steps.length - 1 ? "button" : "submit"}
            disabled={!!disableProgress()}
            onClick={btnAction}
          >
            Continue
          </Button>
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
    </div>
  );
};

export default RegisterForm;
