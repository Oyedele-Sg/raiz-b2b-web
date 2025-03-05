"use client";
import React, { useState } from "react";
import { PartChildProps } from "../../help&support/_components/HelpSupportNav";
import Image from "next/image";
import { useFormik } from "formik";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const validationSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, "Current password must be at least 8 characters"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, "Password must be at least 8 characters")
      .refine(
        (password) =>
          [/[A-Z]/, /[a-z]/, /\d/, /[!@#$%^&*(),.?":{}|<>]/].filter((regex) =>
            regex.test(password)
          ).length >= 2,
        {
          message:
            "Password must contain at least 2 of these rules: one uppercase letter, one lowercase letter, one numeric character, one special character",
        }
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPassword = ({ setPart }: PartChildProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: toFormikValidationSchema(validationSchema),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <button onClick={() => setPart(0)}>
          <Image
            src="/icons/arrow-left.svg"
            alt="arrow-left"
            width={18}
            height={18}
          />
        </button>
        <span className="text-raiz-gray-950 font-bold leading-tight">
          Reset Password
        </span>
        <div />
      </div>
      <form
        className="flex flex-col justify-between mt-5 lg:h-[65%] xl:h-[80%]"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col gap-5">
          <InputField
            label="Current Password"
            type={showPassword ? "text" : "password"}
            icon={!showPassword ? "/icons/eye-hide.svg" : "/icons/eye.svg"}
            onClick={() => setShowPassword(!showPassword)}
            iconPosition="right"
            status={formik.errors.oldPassword ? "error" : null}
            {...formik.getFieldProps("oldPassword")}
            placeholder="Enter your password"
            errorMessage={
              formik.touched.oldPassword && formik.errors.oldPassword
            }
          />
          <InputField
            label="New Password"
            type={showPassword1 ? "text" : "password"}
            icon={!showPassword1 ? "/icons/eye-hide.svg" : "/icons/eye.svg"}
            onClick={() => setShowPassword1(!showPassword1)}
            iconPosition="right"
            status={formik.errors.password ? "error" : null}
            {...formik.getFieldProps("password")}
            placeholder="Enter your new password"
            errorMessage={formik.touched.password && formik.errors.password}
          />
          <InputField
            label="Confirm New Password"
            type={showPassword2 ? "text" : "password"}
            icon={!showPassword2 ? "/icons/eye-hide.svg" : "/icons/eye.svg"}
            onClick={() => setShowPassword2(!showPassword2)}
            iconPosition="right"
            {...formik.getFieldProps("confirmPassword")}
            status={formik.errors.confirmPassword ? "error" : null}
            errorMessage={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            placeholder="Confirm your new password"
          />
        </div>
        <Button disabled={!formik.isValid || !formik.dirty}>
          Submit Changes
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
