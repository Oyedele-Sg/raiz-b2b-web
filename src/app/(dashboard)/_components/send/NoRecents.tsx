import React from "react";

const NoRecents = () => {
  return (
    <div className="text-center text-raiz-gray-950 flex flex-col justify-center items-center mt-[160px] ">
      <svg width="48" height="49" viewBox="0 0 48 49" fill="none">
        <rect
          y="0.200012"
          width="48"
          height="48"
          rx="24"
          fill="#EAECFF"
          fillOpacity="0.6"
        />
        <path
          d="M28.1401 15.16L19.1101 18.16C13.0401 20.19 13.0401 23.5 19.1101 25.52L21.7901 26.41L22.6801 29.09C24.7001 35.16 28.0201 35.16 30.0401 29.09L33.0501 20.07C34.3901 16.02 32.1901 13.81 28.1401 15.16ZM28.4601 20.54L24.6601 24.36C24.5101 24.51 24.3201 24.58 24.1301 24.58C23.9401 24.58 23.7501 24.51 23.6001 24.36C23.3101 24.07 23.3101 23.59 23.6001 23.3L27.4001 19.48C27.6901 19.19 28.1701 19.19 28.4601 19.48C28.7501 19.77 28.7501 20.25 28.4601 20.54Z"
          fill="#3C2875"
        />
      </svg>

      <p className="  font-bold  leading-tight mt-5 mb-[13px]">
        You haven&#39;t Sent Money to any Raizers
      </p>
      <p className="text-sm">
        Tap the <span className="font-bold">search</span> icon or Tap the{" "}
        <span className="font-bold">QR Code</span> icon to send today!
      </p>
    </div>
  );
};

export default NoRecents;
