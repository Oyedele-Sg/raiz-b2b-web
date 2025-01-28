import Image from "next/image";
import React from "react";

interface Props {
  title: string;
  description: string;
  bgImage: string;
}

const Slide = ({ title, description, bgImage }: Props) => {
  return (
    <div className="relative h-full w-full">
      <div
        className={`h-full w-full  rounded-lg`}
        style={{
          backgroundImage: `url('${bgImage}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Image
          className="absolute inset-0  rounded-lg h-full w-full"
          src={"/images/slidelayer.png"}
          alt=""
          width={1000}
          height={1000}
        />
        <div className="h-full w-full flex justify-end flex-col items-center relative z-10">
          <div className="p-4  flex flex-col justify-center items-center w-[65%] xl:w-[50%] mb-[105px]">
            <h3 className="text-white text-2xl font-medium font-brSonoma leading-[30px] mb-2.5">
              {title}
            </h3>
            <p className="text-white/90 text-base font-normal font-brSonoma leading-normal">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;
