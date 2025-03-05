"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import NoRecents from "../../NoRecents";
import { debounce } from "lodash";
import { truncateString } from "@/utils";

interface Props {
  goBack: () => void;
  setStep: Dispatch<SetStateAction<number>>;
}

interface IUser {
  id: number;
  name: string;
  image: string;
  username: string;
}

const mockUsers: IUser[] = [
  {
    id: 1,
    name: "Alice Johnson",
    image: "/images/pfp.png",
    username: "alicetyw9w0",
  },
  { id: 2, name: "Bob Smith", image: "/images/pfp.png", username: "bobs" },
  {
    id: 3,
    name: "Charlie Brown",
    image: "/images/pfp.png",
    username: "charlx",
  },
  {
    id: 4,
    name: "David Miller",
    image: "/images/pfp.png",
    username: "miller007",
  },
  { id: 5, name: "Eve Adams", image: "/images/pfp.png", username: "eveoo0909" },
];

const recentUsers: IUser[] = [
  {
    id: 1,
    name: "Alice Johnson",
    image: "/images/pfp.png",
    username: "alicetyw9w0",
  },
  { id: 2, name: "Bob Smith", image: "/images/pfp.png", username: "bobs" },
  {
    id: 3,
    name: "Charlie Brown",
    image: "/images/pfp.png",
    username: "charlx",
  },
  {
    id: 4,
    name: "David Miller",
    image: "/images/pfp.png",
    username: "miller007",
  },
  { id: 5, name: "Eve Adams", image: "/images/pfp.png", username: "eveoo0909" },
];

const FindRecipients = ({ setStep, goBack }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<IUser>();
  const [suggestions, setSuggestions] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const recentsArr = recentUsers;

  console.log(setStep, selectedUser);
  // Simulated search function (instead of API call)
  const fetchSuggestions = (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const filteredUsers = mockUsers.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredUsers);
      setLoading(false);
    }, 500); // Simulate network delay
  };
  const debouncedFetch = debounce(fetchSuggestions, 500);

  useEffect(() => {
    debouncedFetch(searchTerm);
    return () => debouncedFetch.cancel();
  }, [searchTerm]);

  return (
    <div className="">
      <button onClick={goBack}>
        <Image
          src={"/icons/arrow-left.svg"}
          alt="back"
          width={18.48}
          height={18.48}
        />
      </button>
      {/* header */}
      <div className="flex justify-between items-center my-4">
        <h5 className="text-raiz-gray-950 text-base font-bold  leading-tight">
          Find Recipient
        </h5>
        <button>
          <Image src={"/icons/qr.svg"} width={18} height={19.2} alt="qr code" />
        </button>
      </div>
      {/* search & suggestions */}
      <div className="">
        <div className="relative h-12 w-full ">
          <Image
            className="absolute top-3.5 left-3"
            src={"/icons/search.svg"}
            alt="search"
            width={22}
            height={22}
          />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter a username or email address"
            className="pl-10 h-full bg-raiz-gray-50 text-sm rounded-[20px] border border-raiz-gray-200 justify-start items-center gap-2 inline-flex w-full outline-none"
          />
        </div>
        {/* Suggestions */}
        {loading && (
          <ul className="mt-2 w-full">
            {Array(3)
              .fill("")
              .map((_, index) => (
                <li key={index} className="flex gap-3 mt-1">
                  <div className="bg-gray-200 animate-pulse w-12 h-12 rounded-[64px]" />
                  <div className="p-2 bg-gray-200 animate-pulse rounded-md my-1 h-12 w-full" />
                </li>
              ))}
          </ul>
        )}
        {suggestions.length > 0 && (
          <ul className=" mt-5 w-full ">
            {suggestions.map((user) => (
              <li
                key={user.id}
                className="p-2 hover:bg-gray-100 cursor-pointer rounded-2xl flex gap-2 items-center"
                onClick={() => setSelectedUser(user)}
              >
                <Image
                  className="w-12 h-12 rounded-[64px]"
                  src={user.image}
                  alt={user.name}
                  width={48}
                  height={48}
                />
                <span>{user.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Recents */}
      {!searchTerm && recentsArr.length > 0 && (
        <div className="w-full  mt-[28px]">
          <h5 className="text-raiz-gray-950 text-sm font-bold  leading-[16.80px] mb-[15px]">
            Recents
          </h5>
          <div className="flex gap-2 overflow-x-scroll no-scrollbar ">
            {recentsArr.map((user) => (
              <button
                key={user.id}
                className="flex flex-col justify-center items-center gap-0.5 px-2  flex-shrink-0"
                onClick={() => setSelectedUser(user)}
              >
                <Image
                  className="w-12 h-12 rounded-[64px] mb-1.5"
                  src={user.image}
                  alt={user.name}
                  width={48}
                  height={48}
                />
                <p className="text-center text-raiz-gray-950 text-[13px] font-semibold  leading-none">
                  {user.name}
                </p>
                <p className="text-center text-raiz-gray-700 text-xs leading-[18px]">
                  @{truncateString(user.username, 10)}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Beneficiaries */}
      {!searchTerm && recentsArr.length > 0 && (
        <div className="w-full  mt-11">
          <h5 className="text-raiz-gray-950 text-[13px] font-bold  leading-[18.20px] mb-[15px]">
            Beneficiary
          </h5>

          <div className="flex flex-col gap-4">
            {mockUsers.map((user) => {
              return (
                <div
                  key={user.id}
                  className="flex w-full justify-between items-center"
                >
                  <div className="flex gap-3 items-center">
                    <Image
                      className="w-12 h-12 rounded-[64px] mb-1.5"
                      src={user.image}
                      alt={user.name}
                      width={48}
                      height={48}
                    />
                    <div className="">
                      <p className=" text-raiz-gray-950 text-[13px] font-semibold  leading-none">
                        {user.name}
                      </p>
                      <p className=" text-raiz-gray-700 text-xs leading-[18px]">
                        @{truncateString(user.username, 40)}
                      </p>
                    </div>
                  </div>
                  <button>
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
                      <path
                        d="M12.0049 2.69997C11.8647 2.69909 11.7271 2.73751 11.6077 2.81087C11.4882 2.88423 11.3917 2.98959 11.3291 3.115L8.75296 8.26735L2.63578 9.20876C2.49885 9.22991 2.37046 9.28858 2.26485 9.37826C2.15923 9.46793 2.08052 9.5851 2.03743 9.71678C1.99435 9.84846 1.98858 9.98951 2.02076 10.1243C2.05294 10.259 2.12182 10.3822 2.21976 10.4802L6.45121 14.7117L5.50882 20.8357C5.48774 20.9727 5.50504 21.1129 5.5588 21.2407C5.61256 21.3684 5.70068 21.4788 5.81337 21.5596C5.92607 21.6403 6.05893 21.6882 6.19721 21.698C6.33548 21.7078 6.47377 21.6791 6.59671 21.615L12 18.7957L17.4034 21.615C17.5263 21.6791 17.6646 21.7078 17.8029 21.698C17.9411 21.6882 18.074 21.6403 18.1867 21.5596C18.2994 21.4788 18.3875 21.3684 18.4413 21.2407C18.495 21.1129 18.5123 20.9727 18.4912 20.8357L17.5489 14.7117L21.7803 10.4802C21.8782 10.3822 21.9471 10.259 21.9793 10.1243C22.0115 9.98951 22.0057 9.84846 21.9626 9.71678C21.9195 9.5851 21.8408 9.46793 21.7352 9.37826C21.6296 9.28858 21.5012 9.22991 21.3643 9.20876L15.2471 8.26735L12.6709 3.115C12.6091 2.99107 12.5141 2.8867 12.3965 2.81344C12.279 2.74018 12.1434 2.7009 12.0049 2.69997Z"
                        fill="#FFC107"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="">
        {!searchTerm && recentsArr.length === 0 && <NoRecents />}
      </div>
    </div>
  );
};

export default FindRecipients;
