import React from "react";
import Image from "next/image";
import { truncateString } from "@/utils/helpers";
import { ISearchedUser } from "@/types/user";

interface Props {
  users: ISearchedUser[];
  setSelectedUser: (arg: ISearchedUser) => void;
}

const RecentUsers = ({ users, setSelectedUser }: Props) => {
  return (
    <div className="w-full  mt-[28px]">
      <h5 className="text-raiz-gray-950 text-sm font-bold  leading-[16.80px] mb-[15px]">
        Recents
      </h5>
      <div className="flex gap-2 overflow-x-scroll no-scrollbar ">
        {users.map((user, index) => (
          <button
            key={index}
            className="flex flex-col justify-center items-center gap-0.5 px-2  flex-shrink-0"
            onClick={() => setSelectedUser(user)}
          >
            <Image
              className="w-12 h-12 rounded-[64px] mb-1.5"
              src={user?.selfie_image || "/images/default-pfp.svg"}
              alt={user?.account_name}
              width={48}
              height={48}
            />
            <p className="text-center text-raiz-gray-950 text-[13px] font-semibold  leading-none">
              {user?.account_name}
            </p>
            <p className="text-center text-raiz-gray-700 text-xs leading-[18px]">
              @{truncateString(user?.username, 10)}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentUsers;
