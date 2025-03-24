import Avatar from "@/components/ui/Avatar";
import { ISearchedUser } from "@/types/user";
import React from "react";

interface Props {
  user: ISearchedUser;
  loadingText: string;
}

const LoadingStatus = ({ user, loadingText }: Props) => {
  return (
    <div className="w-full h-full bg-gradient-to-l from-indigo-900 to-violet-600 rounded-[36px]  shadow-[0px_1px_2px_0px_rgba(0,0,0,0.30)] inline-flex flex-col justify-center items-center">
      <div className="relative flex size-40">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6167a5] opacity-75"></span>
        <div className="relative inline-flex justify-center items-center size-40 rounded-full bg-[#8987c3]">
          <div className="">
            <Avatar name={user?.account_name} src={user?.selfie_image} />
          </div>
        </div>
      </div>
      <div className="mt-20 flex flex-col gap-2 justify-center items-center text-center">
        <p className="justify-start text-gray-100 text-base font-normal leading-normal">
          {loadingText}
        </p>
        <p className=" text-neutral-50 text-lg font-bold  leading-snug">
          {user?.account_name}
        </p>
      </div>
    </div>
  );
};

export default LoadingStatus;
