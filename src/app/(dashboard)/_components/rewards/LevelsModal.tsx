import React from "react";
import Overlay from "@/components/ui/Overlay";

const levelsArr = [
  {
    name: "Amateur",
    point: 25,
  },
  {
    name: "Senior",
    point: 50,
  },
  {
    name: "Professional",
    point: 100,
  },
  {
    name: "Leader",
    point: 200,
  },
  {
    name: "Expert",
    point: 400,
  },
  {
    name: "Master",
    point: 750,
  },
  {
    name: "Veteran",
    point: 1000,
  },
];

const LevelsModal = ({ close }: { close: () => void }) => {
  return (
    <Overlay width="375px" close={close}>
      <div className="flex flex-col  h-full py-8 px-5 font-monzo text-raiz-gray-950">
        <div className="flex flex-col justify-center items-center">
          <svg width="49" height="48" viewBox="0 0 49 48" fill="none">
            <rect
              x="0.5"
              width="48"
              height="48"
              rx="24"
              fill="#EAECFF"
              fillOpacity="0.6"
            />
            <path
              d="M25 14C19.477 14 15 18.477 15 24C15 29.523 19.477 34 25 34C30.523 34 35 29.523 35 24C35 18.477 30.523 14 25 14ZM30.162 23.287L28.597 24.808C28.361 25.037 28.253 25.368 28.308 25.693L28.673 27.845C28.812 28.662 27.953 29.284 27.22 28.897L25.29 27.878C24.999 27.724 24.651 27.724 24.359 27.876L22.426 28.888C21.692 29.272 20.835 28.648 20.977 27.831L21.35 25.681C21.406 25.357 21.299 25.025 21.064 24.795L19.504 23.269C18.91 22.689 19.24 21.681 20.06 21.564L22.22 21.254C22.546 21.207 22.828 21.003 22.974 20.708L23.943 18.753C24.311 18.01 25.371 18.012 25.737 18.756L26.699 20.715C26.844 21.01 27.125 21.215 27.451 21.263L29.61 21.58C30.43 21.701 30.756 22.709 30.162 23.287Z"
              fill="#FBB756"
            />
            <path
              d="M27.4512 21.2634L29.6102 21.5804C30.4302 21.7014 30.7562 22.7094 30.1612 23.2874L28.5962 24.8084C28.3602 25.0374 28.2522 25.3684 28.3072 25.6934L28.6722 27.8454C28.8112 28.6624 27.9522 29.2844 27.2192 28.8974L25.2892 27.8784C24.9982 27.7244 24.6502 27.7244 24.3582 27.8764L22.4252 28.8884C21.6912 29.2724 20.8342 28.6484 20.9762 27.8314L21.3492 25.6814C21.4052 25.3574 21.2982 25.0264 21.0632 24.7954L19.5032 23.2694C18.9102 22.6894 19.2402 21.6814 20.0602 21.5644L22.2202 21.2544C22.5462 21.2074 22.8282 21.0034 22.9742 20.7084L23.9432 18.7534C24.3112 18.0104 25.3712 18.0124 25.7362 18.7564L26.6982 20.7154C26.8442 21.0104 27.1262 21.2154 27.4512 21.2634Z"
              fill="#FFF8EE"
            />
          </svg>
          <h4 className=" text-xl font-bold  leading-normal">Tier Levels</h4>
          <p className="text-center  text-[13px] font-normal  leading-tight">
            Score
          </p>
        </div>
        <div className="flex flex-col gap-[15px] m-4">
          {levelsArr.map((level, index) => (
            <div
              className={`flex w-full justify-between items-center  ${
                index + 1 !== levelsArr.length
                  ? "pb-3 border-b border-gray-200 "
                  : ""
              } `}
              key={index}
            >
              <p className="text-[13px] leading-tight">{level.name}</p>
              <p className="text-sm font-semibold font-brSonoma leading-[21px]">
                {level.point} pts
              </p>
            </div>
          ))}
        </div>
      </div>
    </Overlay>
  );
};

export default LevelsModal;
