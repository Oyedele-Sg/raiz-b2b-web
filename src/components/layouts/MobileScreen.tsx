import Image from "next/image";
import React from "react";

const MobileScreen = () => {
  return (
    <section className="flex h-screen flex-col p-10">
      <Image src={"/icons/Logo.svg"} alt="logo" width={83} height={24} />
      <div className="flex flex-col h-full justify-center items-center text-center">
        <Image
          className="mb-8 "
          src={"/icons/mobile.svg"}
          alt=""
          width={64}
          height={64}
        />
        <h3 className="text-gray-950 font-bold text-lg mb-[13px] ">
          Heads up! Our full experience lives on your desktop
        </h3>
        <p className="text-sm ">
          We know you&#39;re eager to explore, but for now, our B2B app is built
          for a full-screen experience.
        </p>
        <p className="text-sm mt-2 ">
          Thanks for understanding, and we&#39;ll see you on web.
        </p>
      </div>
    </section>
  );
};

export default MobileScreen;
