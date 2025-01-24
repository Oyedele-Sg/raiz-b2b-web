import React from "react";

const WalletSlide = () => {
  return (
    <div className="relative h-full w-full">
      <div className="h-full w-full bg-[url('/images/slide1.png')] bg-cover rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black/20 rounded-lg">
          <div className="h-full w-full flex justify-end flex-col items-center">
            <div className="p-4  flex flex-col justify-center items-center w-[65%] xl:w-[50%] mb-24">
              <h3 className="text-white text-2xl font-medium font-brSonoma leading-[30px] mb-2.5">
                Smart Wallets for Your Everyday Needs
              </h3>
              <p className="text-white/90 text-base font-normal font-brSonoma leading-normal">
                Manage your funds effortlessly with dedicated USD and other
                currency wallets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletSlide;
