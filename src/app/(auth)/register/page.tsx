import React from "react";
import RegisterForm from "./_components/RegisterForm";
import Slider from "../_components/authSlide/Slider";

const RegisterPage = () => {
  return (
    <section className="p-6 md:p-12 h-[calc(100vh-2rem)] md:h-[100vh]">
      <div className="flex flex-col  md:flex-row  h-full gap-4">
        <Slider />
        <RegisterForm />
      </div>
    </section>
  );
};

export default RegisterPage;
