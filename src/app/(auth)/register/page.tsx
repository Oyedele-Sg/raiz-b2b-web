import Image from "next/image";
import React from "react";
import Slider from "./_components/authSlide/Slider";
import RegisterForm from "./_components/RegisterForm";

const RegisterPage = () => {
  return (
    <main className="p-6 md:p-12 h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)]">
      <Image src={"/icons/Logo.svg"} width={91.78} height={32} alt="Logo" />
      <div className="flex flex-col  md:flex-row mt-10 h-full gap-4">
        <Slider />
        <RegisterForm />
      </div>
    </main>
  );
};

export default RegisterPage;
