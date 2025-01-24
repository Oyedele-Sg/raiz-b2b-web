import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex  justify-between pb-5 gap-2">
      <div className="flex items-center gap-1 xl:gap-2.5 ">
        <Link
          className="px-2 py-1 text-raiz-gray-900 text-sm font-semibold font-brSonoma leading-tight "
          href={"#"}
        >
          Overview
        </Link>
        <Image
          src={"/icons/forward.svg"}
          alt="forward"
          width={16}
          height={16}
        />
        <Link
          className="px-2 py-1 text-raiz-gray-700 text-sm font-medium font-brSonoma leading-tight "
          href={"#"}
        >
          Top up
        </Link>
        <Image
          src={"/icons/forward.svg"}
          alt="forward"
          width={16}
          height={16}
        />
        <Link
          className="px-2 py-1 text-raiz-gray-700 text-sm font-medium font-brSonoma leading-tight "
          href={"#"}
        >
          Send
        </Link>
      </div>
      <div className="relative h-12 w-[285px] xl:w-[312px] ">
        <Image
          className="absolute top-3.5 left-3"
          src={"/icons/search.svg"}
          alt="search"
          width={22}
          height={22}
        />
        <input
          placeholder="Search..."
          className="pl-10 h-full bg-raiz-gray-50 rounded-[20px] border border-raiz-gray-200 justify-start items-center gap-2 inline-flex w-full outline-none"
        />
      </div>
      <div className="flex gap-3 items-center">
        <Image
          className="w-10 h-10 rounded-full"
          src={"/images/pfp.png"}
          alt="search"
          width={40}
          height={40}
        />
        <div className="flex flex-col gap-1 text-sm font-semibold">
          <p className="text-gray-700  font-semibold ">Kaywear Store</p>
          <p className="text-gray-600  font-normal">Kaywear@gmail.com</p>
        </div>
        <button>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M25.157 23.5791H6.84372C6.08266 23.5791 5.38477 23.1958 4.9774 22.5528C4.57003 21.9099 4.51951 21.116 4.84351 20.4275L6.52667 17.041V13.0829C6.52667 7.87933 10.4873 3.61744 15.5437 3.37934C18.1654 3.2606 20.6469 4.18207 22.5385 5.98649C24.4319 7.79218 25.474 10.2269 25.474 12.8423V17.041L27.1477 20.4092C27.4806 21.116 27.4307 21.9105 27.0233 22.5534C26.6159 23.1964 25.918 23.5791 25.157 23.5791ZM12.2677 24.8423C12.5696 26.6315 14.1258 28.0002 16.0003 28.0002C17.8749 28.0002 19.4305 26.6315 19.733 24.8423H12.2677Z"
              fill="#2C2435"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header;
