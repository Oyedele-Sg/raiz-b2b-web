"use client";
import React from "react";
import { ProgressBar } from "./Progressbar";
import { getTierInfo } from "@/utils/helpers";

interface Props {
  value: number;
}

const RaizScoreProgress = ({ value }: Props) => {
  const { currentTier, nextTier } = getTierInfo(value);

  const progressValue = (value / nextTier.min) * 100;
  return (
    <div className="w-full">
      <ProgressBar
        value={progressValue}
        type="linear"
        color="#493260"
        thickness={10}
      />
      <div className="flex justify-between mt-3">
        <div>
          <span className="text-raiz-gray-700 text-xs leading-[18px]">
            {value}
          </span>
          <p className="text-[#dd9d43] text-[13px] font-bold  leading-tight uppercase mt-1">
            {currentTier.level}
          </p>
        </div>
        <div className="text-right">
          <span className="text-raiz-gray-700 text-xs leading-[18px]">
            {nextTier.min}
          </span>
          <p className="text-gray-700 text-[13px] font-bold  leading-tight uppercase mt-1">
            {nextTier.level}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RaizScoreProgress;
