import React from "react";
import Image from "next/image";

// const recents = [
//   {
//     name: "Desirae B",
//     username: "@desirae123",
//     image: "/images/pfp.png",
//   },
//   {
//     name: "Desirae cc",
//     username: "@desirae23",
//     image: "/images/pfp.png",
//   },
//   {
//     name: "Desirae c",
//     username: "@desirae13",
//     image: "/images/pfp.png",
//   },
//   {
//     name: "Desirae D",
//     username: "@desirae12",
//     image: "/images/pfp.png",
//   },
// ];

const RaizerRecipient = () => {
  return (
    <div>
      <div className="relative h-[52px] w-full ">
        <Image
          className="absolute top-3.5 left-3"
          src={"/icons/search.svg"}
          alt="search"
          width={22}
          height={22}
        />
        <input
          placeholder="Enter a username or email address"
          className="pl-10 h-full bg-[#fcfcfc] rounded-[20px] border border-raiz-gray-200 justify-start items-center gap-2 inline-flex w-full text-sm outline-none placeholder:text-raiz-gray-500"
        />
      </div>
    </div>
  );
};

export default RaizerRecipient;
