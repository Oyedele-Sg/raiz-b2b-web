"use client";
import SideWrapperHeader from "@/components/SideWrapperHeader";
import Button from "@/components/ui/Button";
import { FetchTransactionCategoriesApi } from "@/services/transactions";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

interface Props {
  goBack: () => void;
  goNext: () => void;
}

const ChooseCategory = ({ goBack, goNext }: Props) => {
  const { data } = useQuery({
    queryKey: ["transactions-category"],
    queryFn: () => FetchTransactionCategoriesApi(),
  });
  const SkipButton = () => {
    return (
      <button
        onClick={goNext}
        className="text-right justify-center text-zinc-700 text-sm leading-tight"
      >
        Skip
      </button>
    );
  };
  return (
    <div>
      <SideWrapperHeader
        close={goBack}
        title="Select category"
        titleColor="text-zinc-900"
        rightComponent={<SkipButton />}
      />
      <div className="flex flex-col h-[80vh] justify-between items-center">
        <div className="flex flex-col justify-center items-center">
          {data?.map((each, index) => {
            return (
              <button
                key={index}
                className="flex flex-wrap gap-2 items-center justify-center"
              >
                <Image
                  className="w-12 h-12"
                  src={each?.category_emoji}
                  alt={each?.transaction_category}
                  width={64}
                  height={64}
                />
                <p className="text-center text-zinc-900 text-xs font-normal leading-none">
                  {each?.transaction_category}
                </p>
              </button>
            );
          })}
        </div>
        <Button onClick={goNext}>Continue</Button>
      </div>
    </div>
  );
};

export default ChooseCategory;
