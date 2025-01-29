"use client";
import React, { useState } from "react";
import Image from "next/image";
import Slider from "../_components/authSlide/Slider";
import InputEmailForm from "./forms/InputEmailForm";
import ResetOtp from "./forms/ResetOtp";
import CreateNewPassword from "./forms/CreateNewPassword";
import WelcomeBack from "./forms/WelcomeBack";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [page, setPage] = useState(1);

  const displayPage = () => {
    switch (page) {
      case 1:
        return <InputEmailForm setEmail={setEmail} setPage={setPage} />;
      case 2:
        return <ResetOtp email={email} setPage={setPage} />;
      case 3:
        return <CreateNewPassword setPage={setPage} />;
      case 4:
        return <WelcomeBack setPage={setPage} />;
      default:
        break;
    }
  };
  return (
    <section className="p-6 md:p-12 h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)]">
      <Image src={"/icons/Logo.svg"} width={91.78} height={32} alt="Logo" />
      <div className="flex flex-col  md:flex-row mt-10 h-full gap-4">
        <Slider />
        <section className="py-4 px-3 xl:px-8 w-[50%] xl:w-[46%] h-full flex flex-col font-monzo justify-between">
          {displayPage()}
        </section>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
