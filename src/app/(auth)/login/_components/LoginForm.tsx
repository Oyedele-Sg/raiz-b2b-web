"use client";
import Button from "@/components/ui/Button";
import InputLabel from "@/components/ui/InputLabel";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import InputField from "@/components/ui/InputField";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (val) => console.log("Submit", val),
  });
  return (
    <section className="py-4 px-3 xl:px-8 w-[50%] xl:w-[46%] h-full flex flex-col font-monzo justify-between">
      <div>
        <h1 className="text-raiz-gray-950 text-[23px] font-semibold  leading-10">
          Welcome Back
        </h1>
        <h6 className="text-raiz-gray-600 text-sm  leading-snug">Log in</h6>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-5 mt-[44px]"
        >
          <InputField
            placeholder="Enter your email address"
            label="Email"
            type="email"
            {...formik.getFieldProps("email")}
            status={formik.errors.email ? "error" : null}
            errorMessage={formik.touched.email && formik.errors.email}
          />
          <div className="flex justify-between items-center">
            <InputLabel content="Password" />
            <Link
              className="text-right text-raiz-purple-90 text-sm font-semibold  leading-[16.80px] hover:underline"
              href={"/forgot-password"}
            >
              Forgot your password?
            </Link>
          </div>

          <InputField
            type={showPassword ? "text" : "password"}
            icon={!showPassword ? "/icons/eye-hide.svg" : "/icons/eye.svg"}
            onClick={() => setShowPassword(!showPassword)}
            iconPosition="right"
            status={formik.errors.password ? "error" : null}
            {...formik.getFieldProps("password")}
          />
        </form>
      </div>
      <div>
        <Button>Login</Button>
        <p className="text-raiz-gray-800 text-[13px] leading-tight text-center mt-6">
          Don&#39;t have an account?{" "}
          <Link href={"/register"} className="leading-[18.20px] font-bold ">
            {" "}
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginForm;
