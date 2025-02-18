import Overlay from "@/components/ui/Overlay";
import React from "react";
import Image from "next/image";

interface Props {
  close: () => void;
}

const CountryCodeModal = ({ close }: Props) => {
  const countryCodes = [
    { name: "Nigeria", code: "+234", flag: "/flags/ng.png" },
    { name: "United States of America", code: "+1", flag: "/flags/us.png" },
    { name: "United Kingdom", code: "+44", flag: "/flags/gb.png" },
    { name: "Ghana", code: "+233", flag: "/flags/gh.png" },
    { name: "Canada", code: "+1", flag: "/flags/ca.png" },
    { name: "Kenya", code: "+254", flag: "/flags/ke.png" },
    { name: "Tanzania", code: "+255", flag: "/flags/tz.png" },
  ];

  // const handleSelect = () => {

  // }
  return (
    <Overlay close={close}>
      <div className="flex flex-col  h-full py-8 px-5 font-monzo">
        <h5 className="text-raiz-gray-950 text-xl font-bold  leading-normal">
          Select a Country Code
        </h5>
        <div className="relative h-12 w-[300px] xl:w-[335px] mt-[15px] mb-[30px]">
          <Image
            className="absolute top-3.5 left-3"
            src={"/icons/search.svg"}
            alt="search"
            width={22}
            height={22}
          />
          <input
            placeholder="Search"
            className="pl-10 h-full bg-[#fcfcfc] rounded-[20px] border border-raiz-gray-200 justify-start items-center gap-2 inline-flex w-full outline-none text-sm"
          />
        </div>

        {/* Countries */}

        <div className="flex flex-col gap-[30px] font-brSonoma">
          {countryCodes.map((country, index) => (
            <button key={index} className="flex justify-between">
              <div className="flex items-center gap-2">
                <Image
                  className="w-[22px] h-[15px] rounded-full"
                  src={country.flag}
                  alt={country.name}
                  width={22}
                  height={15}
                />
                <span className="text-raiz-gray-950 text-sm font-semibold leading-[21px]">
                  {country.name}
                </span>
              </div>
              <span className="text-raiz-gray-600 text-[13px] font-semibold leading-tight">
                {country.code}
              </span>
            </button>
          ))}
        </div>
      </div>
    </Overlay>
  );
};

export default CountryCodeModal;
