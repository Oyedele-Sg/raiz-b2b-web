"use client";
import React, { useState } from "react";
import Slider from "../_components/authSlide/Slider";
import LoginForm from "./_components/LoginForm";
import LoginOtp from "./_components/LoginOtp";
import { AnimatePresence } from "motion/react";

const LoginPage = () => {
  const [step, setStep] = useState(1);

  return (
    <section className="p-6 md:p-12 h-[calc(100vh-2rem)] md:h-[100vh]">
      <div className="flex flex-col  md:flex-row  h-full gap-4">
        <Slider />
        <AnimatePresence>
          {step === 1 ? (
            <LoginForm setStep={setStep} />
          ) : (
            <LoginOtp setStep={setStep} from="login" />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LoginPage;
