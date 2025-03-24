"use client";
import { ISearchedUser } from "@/types/user";
import { debounce } from "lodash";
import Image from "next/image";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import RecentUsers from "./RecentUsers";
import Beneficiaries from "./Beneficiaries";
import { useQuery } from "@tanstack/react-query";
import { SearchAllUsersApi } from "@/services/user";
import { IUserSearchParams } from "@/types/services";
import { useUser } from "@/lib/hooks/useUser";
import { useCurrentWallet } from "@/lib/hooks/useCurrentWallet";

interface Props {
  recentUsers: ISearchedUser[];
  beneficiaries: ISearchedUser[];
  //   selectedUser: ISearchedUser | undefined;
  setSelectedUser: Dispatch<SetStateAction<ISearchedUser | undefined>>;
}

const RecipientRow = ({
  setSelectedUser,
  user,
}: {
  user: ISearchedUser;
  setSelectedUser: (arg: ISearchedUser) => void;
}) => {
  const [imgSrc, setImgSrc] = useState(
    user?.selfie_image || "/images/default-pfp.svg"
  );
  return (
    <li
      className="p-2 hover:bg-gray-100 cursor-pointer rounded-2xl flex gap-2 items-center"
      onClick={() => setSelectedUser(user)}
    >
      <Image
        className="w-12 h-12 rounded-full"
        src={imgSrc}
        alt={user.account_name || "User"}
        width={48}
        height={48}
        onError={() => setImgSrc("/images/default-pfp.svg")}
      />
      <span className="text-sm">{user.account_name || "Unknown User"}</span>
    </li>
  );
};

const FindRecipients = ({
  recentUsers,
  setSelectedUser,
  beneficiaries,
}: Props) => {
  const { user } = useUser();
  const currentWallet = useCurrentWallet(user);
  const [searchTerm, setSearchTerm] = useState("");
  const [queryTerm, setQueryTerm] = useState("");

  const [suggestions, setSuggestions] = useState<ISearchedUser[]>([]);
  const debouncedSetQueryTerm = useMemo(
    () =>
      debounce((value: string) => {
        setQueryTerm(value);
      }, 500),
    []
  );

  const { data, isLoading } = useQuery({
    queryKey: [
      "searched-users",
      { wallet_id: currentWallet?.wallet_id, search: queryTerm },
    ],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey as [string, IUserSearchParams];
      return SearchAllUsersApi(params);
    },
    enabled: !!queryTerm && !!currentWallet?.wallet_id,
  });

  useEffect(() => {
    setSuggestions(data?.results || []);
  }, [data]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => debouncedSetQueryTerm.cancel();
  }, [debouncedSetQueryTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSetQueryTerm(value);
  };

  //   console.log("userssss", suggestions);

  return (
    <div className="">
      {/* search & suggestions */}
      <div className="">
        <div className="relative h-12 w-full">
          <Image
            className="absolute top-3.5 left-3"
            src={"/icons/search.svg"}
            alt="search"
            width={22}
            height={22}
          />
          <input
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Enter a username or email address"
            className="pl-10 h-full w-full bg-raiz-gray-50 text-sm rounded-[20px] border-raiz-gray-200 focus:outline-none outline-none border focus:border-2"
          />
        </div>
        {/*loading */}
        {isLoading && searchTerm && (
          <ul className="mt-2 w-full">
            {Array(3)
              .fill("")
              .map((_, index) => (
                <li key={index} className="flex gap-3 mt-1">
                  <div className="bg-gray-200 animate-pulse w-12 h-12 rounded-full" />
                  <div className="p-2 bg-gray-200 animate-pulse rounded-md my-1 h-12 w-full" />
                </li>
              ))}
          </ul>
        )}
        {/* Suggestions */}
        {!isLoading &&
          searchTerm &&
          (suggestions.length > 0 ? (
            <ul className="mt-5 w-full overflow-y-scroll h-[80vh]">
              {suggestions.map((user, index) => (
                <RecipientRow
                  key={index}
                  user={user}
                  setSelectedUser={setSelectedUser}
                />
              ))}
            </ul>
          ) : (
            <div className="my-3">
              <p className="text-center text-sm">No users found</p>
            </div>
          ))}
      </div>
      {/* Recent Users and Beneficiaries */}
      {!searchTerm && recentUsers.length > 0 && (
        <RecentUsers users={recentUsers} setSelectedUser={setSelectedUser} />
      )}
      {!searchTerm && beneficiaries.length > 0 && <Beneficiaries users={[]} />}
    </div>
  );
};

export default FindRecipients;
