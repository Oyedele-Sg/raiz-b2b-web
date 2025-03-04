"use client";
import React, { useState } from "react";
import RouteSectionInfo from "../_components/RouteSectionInfo";
import HelpSupportNav from "./_components/HelpSupportNav";
import SocialMedia from "./_components/SocialMedia";

const HelpSupport = () => {
  const [part, setPart] = useState(0);
  const displayComponent = () => {
    switch (part) {
      case 0:
        return <HelpSupportNav setPart={setPart} />;
      case 1:
        return <SocialMedia setPart={setPart} />;
      default:
        return <HelpSupportNav setPart={setPart} />;
    }
  };
  return (
    <section className="gap-10 flex w-full">
      <RouteSectionInfo
        title="Help and Support"
        subtitle="Talk to a support person"
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
              opacity="0.45"
              d="M14 25V13C14 11.343 15.343 10 17 10H25C26.657 10 28 11.343 28 13V25C28 26.657 26.657 28 25 28H17C15.343 28 14 26.657 14 25Z"
              fill="#0151F2"
            />
            <path
              d="M17 28C15.343 28 14 26.657 14 25V13C12.895 13 12 13.895 12 15V27C12 28.657 13.343 30 15 30H23C24.105 30 25 29.105 25 28H17Z"
              fill="#385DA5"
            />
            <path
              d="M20.8831 20.973H20.8771C20.2071 20.973 19.6901 20.368 19.8051 19.708C20.1551 17.695 21.7221 17.625 21.7221 16.375C21.7221 16.028 21.6621 15.251 20.8261 15.251C20.3741 15.251 20.1081 15.54 19.9531 15.848C19.7441 16.265 19.2621 16.47 18.8031 16.389C18.1071 16.265 17.6801 15.519 17.9751 14.877C18.3971 13.96 19.2611 13 20.9721 13C23.7481 13 24.1201 15.174 24.1201 16.196C24.1201 18.612 22.3211 18.702 21.9481 20.094C21.8131 20.596 21.4031 20.973 20.8831 20.973ZM22.3251 23.533C22.3251 23.945 22.1981 24.293 21.9431 24.576C21.6871 24.858 21.3521 25 20.9401 25C20.5261 25 20.1921 24.858 19.9371 24.576C19.6821 24.293 19.5531 23.945 19.5531 23.533C19.5531 23.13 19.6821 22.783 19.9371 22.488C20.1921 22.195 20.5261 22.049 20.9401 22.049C21.3521 22.049 21.6871 22.195 21.9431 22.488C22.1981 22.783 22.3251 23.131 22.3251 23.533Z"
              fill="#385DA5"
            />
          </svg>
        }
      />
      <div className="w-[70%] xl:w-[73.5%] ">{displayComponent()}</div>
    </section>
  );
};

export default HelpSupport;
