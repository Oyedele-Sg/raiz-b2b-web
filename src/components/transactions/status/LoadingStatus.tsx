import Avatar from "@/components/ui/Avatar";
import { IExternalAccount } from "@/types/services";
import { ISearchedUser } from "@/types/user";
import React from "react";

interface P2PProps {
  type: "p2p";
  user: ISearchedUser;
  loadingText: string;
}

interface ExternalProps {
  type: "external";
  user: IExternalAccount;
  loadingText: string;
}

type Props = P2PProps | ExternalProps;

const LoadingStatus = ({ user, loadingText, type = "p2p" }: Props) => {
  const accountName =
    type === "p2p"
      ? (user as ISearchedUser).account_name
      : (user as IExternalAccount).bank_account_name;
  const avatarSrc = type === "p2p" ? (user as ISearchedUser).selfie_image : "";
  return (
    <div className="w-full h-full bg-gradient-to-l from-indigo-900 to-violet-600 rounded-[36px]  shadow-[0px_1px_2px_0px_rgba(0,0,0,0.30)] inline-flex flex-col justify-center items-center">
      <div className="relative flex size-40">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6167a5] opacity-75"></span>
        <div className="relative inline-flex justify-center items-center size-40 rounded-full bg-[#8987c3]">
          <div>
            {type === "p2p" ? (
              <Avatar name={accountName || ""} src={avatarSrc} />
            ) : (
              <Avatar name={accountName || ""} src={null} />
            )}
          </div>
        </div>
      </div>
      <div className="mt-20 flex flex-col gap-2 justify-center items-center text-center">
        <p className="justify-start text-gray-100 text-base font-normal leading-normal">
          {loadingText}
        </p>
        <p className=" text-neutral-50 text-lg font-bold  leading-snug">
          {accountName}
        </p>
      </div>
    </div>
  );
};

export default LoadingStatus;
