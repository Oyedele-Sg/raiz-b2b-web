"use client";
import { SettingsMenus } from "@/constants/SettingsMenuData";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import LevelsModal from "../../_components/rewards/LevelsModal";
import RaizScoreModal from "./RaizScoreModal";
import FreezeAcctModal from "./FreezeAcctModal";
import RaizTagModal from "./RaizTagModal";

const SideLayout = () => {
  const [showLevels, setShowLevels] = useState(false);
  const [showRaizScore, setShowRaizScore] = useState(false);
  const [showRaizTag, setShowRaizTag] = useState(false);
  const [navModal, setNavModal] = useState<string | null>(null);
  const pathName = usePathname();

  const closeLevelsModal = () => {
    setShowLevels(false);
    setShowRaizScore(true);
  };

  return (
    <section className="w-[23%] border-r border-[#dddbe1] h-full py-5 pr-2 no-scrollbar">
      {/* Profile Info */}
      <div className="mb-10">
        {/* Picture */}
        <div className="flex relative w-16 h-16">
          <Image
            src={"/images/pfp.png"}
            width={64}
            height={64}
            alt="Profile Picture"
          />
          <button className="w-6 h-6 bg-raiz-gray-700 rounded-full border border-[#fefefe] absolute bottom-0 right-0 flex items-center justify-center">
            <Image
              src={"/icons/camera.svg"}
              width={14}
              height={14}
              alt="upload picture"
            />
          </button>
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <p className="text-raiz-gray-950 text-lg font-semibold leading-snug">
            Khadijah Arowosegbe
          </p>
          <p className="text-raiz-gray-950 text-sm font-normal leading-tight">
            Joined April 2024
          </p>
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setShowRaizScore(true)}
              className="h-[22px] px-[11px] py-0.5 bg-[#fcf6d5] rounded-3xl justify-center items-center gap-0.5 inline-flex"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M7.99992 1.33334C4.31792 1.33334 1.33325 4.31801 1.33325 8.00001C1.33325 11.682 4.31792 14.6667 7.99992 14.6667C11.6819 14.6667 14.6666 11.682 14.6666 8.00001C14.6666 4.31801 11.6819 1.33334 7.99992 1.33334ZM11.4413 7.52468L10.3979 8.53868C10.2406 8.69134 10.1686 8.91201 10.2053 9.12868L10.4486 10.5633C10.5413 11.108 9.96859 11.5227 9.47992 11.2647L8.19325 10.5853C7.99925 10.4827 7.76725 10.4827 7.57259 10.584L6.28392 11.2587C5.79458 11.5147 5.22325 11.0987 5.31792 10.554L5.56659 9.12068C5.60392 8.90468 5.53259 8.68334 5.37592 8.53001L4.33592 7.51268C3.93992 7.12601 4.15992 6.45401 4.70658 6.37601L6.14658 6.16934C6.36392 6.13801 6.55192 6.00201 6.64925 5.80534L7.29525 4.50201C7.54059 4.00668 8.24725 4.00801 8.49125 4.50401L9.13259 5.81001C9.22925 6.00668 9.41658 6.14334 9.63392 6.17534L11.0733 6.38668C11.6199 6.46734 11.8373 7.13934 11.4413 7.52468Z"
                  fill="#FBB756"
                />
                <path
                  d="M9.63404 6.17534L11.0734 6.38667C11.62 6.46734 11.8374 7.13934 11.4407 7.52467L10.3974 8.53867C10.24 8.69134 10.168 8.91201 10.2047 9.12867L10.448 10.5633C10.5407 11.108 9.96804 11.5227 9.47937 11.2647L8.19271 10.5853C7.99871 10.4827 7.76671 10.4827 7.57204 10.584L6.28338 11.2587C5.79404 11.5147 5.22271 11.0987 5.31737 10.554L5.56604 9.12067C5.60337 8.90467 5.53204 8.68401 5.37537 8.53001L4.33537 7.51267C3.94004 7.12601 4.16004 6.45401 4.70671 6.37601L6.14671 6.16934C6.36404 6.13801 6.55204 6.00201 6.64937 5.80534L7.29537 4.50201C7.54071 4.00667 8.24738 4.00801 8.49071 4.50401L9.13204 5.81001C9.22937 6.00667 9.41738 6.14334 9.63404 6.17534Z"
                  fill="#FCF2E3"
                />
              </svg>

              <span className="text-[13px] font-normal leading-[18.20px]">
                55
              </span>
            </button>
            <button
              onClick={() => setShowRaizTag(true)}
              className="px-2 h-[22px] bg-opacity-30 bg-neutral-300 flex gap-0.5 justify-center items-center rounded-3xl"
            >
              <span className="text-raiz-gray-950 text-[13px] font-normal leading-[18.20px]">
                @dija001
              </span>
            </button>
          </div>
        </div>
      </div>
      <nav className="flex flex-col gap-5 mb-10">
        {SettingsMenus.map((menu, index) => {
          const isLink = menu.type !== "button";

          if (isLink) {
            return (
              <Link
                href={menu.link}
                key={index}
                className="flex gap-[15px] items-center group"
                target={menu.newTab ? "_blank" : ""}
              >
                {menu.icon()}
                <span
                  className={`${
                    pathName === menu.link
                      ? "text-raiz-gray-950"
                      : "text-raiz-gray-600"
                  } text-[15px] font-semibold leading-snug group-hover:underline`}
                >
                  {" "}
                  {menu.name}
                </span>
              </Link>
            );
          } else {
            return (
              <button key={index} onClick={() => setNavModal(menu.action)}>
                <div className="flex gap-[15px] items-center group">
                  {menu.icon()}
                  <span className="text-raiz-gray-600 text-[15px] font-semibold text-left leading-snug group-hover:underline ">
                    {menu.name}
                  </span>
                </div>
              </button>
            );
          }
        })}
      </nav>
      <div className="pb-3">
        <Image
          width={40}
          height={40}
          src={"/icons/cbn.svg"}
          alt="CBN license"
        />
        <p className="text-raiz-gray-800 text-[13px] leading-tight mt-2">
          Funds are managed by Palmpay Inc, a CBN licensed institution
        </p>
        <p className="opacity-50 text-raiz-gray-800 text-[13px] leading-tight mt-6">
          Raiz v2.0.0
        </p>
      </div>
      {showLevels && <LevelsModal close={closeLevelsModal} />}
      {showRaizScore && (
        <RaizScoreModal
          close={() => setShowRaizScore(false)}
          setShowLevels={setShowLevels}
        />
      )}
      {navModal === "freeze" && (
        <FreezeAcctModal close={() => setNavModal(null)} />
      )}
      {showRaizTag && <RaizTagModal close={() => setShowRaizTag(false)} />}
    </section>
  );
};

export default SideLayout;
