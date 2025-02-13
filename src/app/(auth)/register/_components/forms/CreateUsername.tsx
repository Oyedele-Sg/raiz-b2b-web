import React from "react";
import Image from "next/image";
import { RegisterFormProps } from "./CreateAccount";
import InputField from "@/components/ui/InputField";

const CreateUsername = ({ goBack, formik }: RegisterFormProps) => {
  return (
    <section className="h-full flex flex-col -mt-2">
      <button onClick={goBack}>
        <Image
          src={"/icons/arrow-left.svg"}
          alt="back"
          width={18.48}
          height={18.48}
        />
      </button>
      <header className="flex items-center justify-between mt-2">
        <h2 className="text-raiz-gray-950 text-[23px] font-semibold font-monzo leading-10">
          Choose a username
        </h2>
        <svg width="40" height="41" viewBox="0 0 40 41" fill="none">
          <path
            d="M30 35.4805H10C7.23833 35.4805 5 33.2421 5 30.4805V10.4805C5 7.7188 7.23833 5.48047 10 5.48047H30C32.7617 5.48047 35 7.7188 35 10.4805V30.4805C35 33.2421 32.7617 35.4805 30 35.4805Z"
            fill="#E9E0EF"
          />
          <path
            d="M20 20.4805C22.7614 20.4805 25 18.2419 25 15.4805C25 12.719 22.7614 10.4805 20 10.4805C17.2386 10.4805 15 12.719 15 15.4805C15 18.2419 17.2386 20.4805 20 20.4805Z"
            fill="#733B9C"
          />
          <path
            d="M25.0001 23.8135H15.0001C13.1584 23.8135 11.6667 25.3051 11.6667 27.1468C11.6667 28.9885 13.1584 30.4801 15.0001 30.4801H25.0001C26.8417 30.4801 28.3334 28.9885 28.3334 27.1468C28.3334 25.3051 26.8417 23.8135 25.0001 23.8135Z"
            fill="#493260"
          />
        </svg>
      </header>
      <p className="text-raiz-gray-700 text-[15px] font-normal font-monzo leading-snug mb-[44px]">
        Choose a @username, for a more personalised experience
      </p>

      <div className="">
        <InputField
          label="@username"
          placeholder=""
          {...formik.getFieldProps("username")}
          status={formik.errors.username ? "error" : null}
          errorMessage={formik.touched.username && formik.errors.username}
        />
        <span className="text-raiz-gray-600 text-[13px] font-normal font-monzo leading-normal">
          Usernames can only contain letters, numbers, underscores, and periods.
        </span>
      </div>
    </section>
  );
};

export default CreateUsername;
