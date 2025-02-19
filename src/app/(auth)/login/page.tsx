import React from "react";
import Slider from "../_components/authSlide/Slider";
import LoginForm from "./_components/LoginForm";

const LoginPage = () => {
  return (
    <section className="p-6 md:p-12 h-[calc(100vh-2rem)] md:h-[100vh]">
      <div className="flex flex-col  md:flex-row  h-full gap-4">
        <Slider />
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;
