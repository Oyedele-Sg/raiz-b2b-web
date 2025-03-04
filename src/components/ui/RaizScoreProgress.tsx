"use client";
import React from "react";
import { ProgressBar } from "./Progressbar";

const RaizScoreProgress = () => {
  return (
    <div className="w-full">
      <ProgressBar value={20} type="linear" color="#493260" thickness={10} />
      <div className="flex justify-between mt-3">
        <div>
          <span className="text-raiz-gray-700 text-xs leading-[18px]">50</span>
          <p className="text-[#dd9d43] text-[13px] font-bold  leading-tight uppercase mt-1">
            Senior
          </p>
        </div>
        <div>
          <span className="text-raiz-gray-700 text-xs leading-[18px]">100</span>
          <p className="text-gray-700 text-[13px] font-bold  leading-tight uppercase mt-1">
            Professional
          </p>
        </div>
      </div>
    </div>
  );
};

export default RaizScoreProgress;
