"use client";
import React, { useState } from "react";
import RouteSectionInfo from "../_components/RouteSectionInfo";
import LsNav from "./_components/LsNav";
import ResetPassword from "./_components/ResetPassword";
import ChangeTransactionPin from "./_components/ChangeTransactionPin";

const LoginSecurityPage = () => {
  const [part, setPart] = useState(0);
  const displayComponent = () => {
    switch (part) {
      case 0:
        return <LsNav setPart={setPart} />;
      case 1:
        return <ResetPassword setPart={setPart} />;
      case 2:
        return <ChangeTransactionPin setPart={setPart} />;
      default:
        return <LsNav setPart={setPart} />;
    }
  };
  return (
    <section className="gap-10 flex h-full w-full">
      <RouteSectionInfo
        title="Login & Security"
        subtitle="Change PIN, update password, 2FA"
        icon={
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="40" height="40" rx="20" fill="#F3F1F6" />
            <path
              opacity="0.65"
              d="M22.0833 11.6665C18.6316 11.6665 15.8333 14.4648 15.8333 17.9165C15.8333 21.3682 18.6316 24.1665 22.0833 24.1665C25.5349 24.1665 28.3333 21.3682 28.3333 17.9165C28.3333 14.4648 25.5349 11.6665 22.0833 11.6665ZM24.1666 17.4998C23.2458 17.4998 22.4999 16.754 22.4999 15.8332C22.4999 14.9123 23.2458 14.1665 24.1666 14.1665C25.0874 14.1665 25.8333 14.9123 25.8333 15.8332C25.8333 16.754 25.0874 17.4998 24.1666 17.4998Z"
              fill="#FF9900"
            />
            <path
              d="M16.3226 20.3442L11.9109 24.7559C11.7542 24.9126 11.6667 25.1242 11.6667 25.3451V27.5001C11.6667 27.9601 12.0401 28.3334 12.5001 28.3334H14.6551C14.8759 28.3334 15.0884 28.2459 15.2442 28.0892L16.3217 27.0117C16.5426 26.7909 16.6667 26.4909 16.6667 26.1784C16.6667 25.5276 17.1942 25.0001 17.8451 25.0001C18.1576 25.0001 18.4576 24.8759 18.6784 24.6551L19.6559 23.6776C18.1559 23.0451 16.9551 21.8434 16.3226 20.3442Z"
              fill="#E8A005"
            />
          </svg>
        }
      />
      <div className="w-[70%] xl:w-[73.5%] ">{displayComponent()}</div>
    </section>
  );
};

export default LoginSecurityPage;
