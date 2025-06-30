"use client";
import SideWrapperHeader from "@/components/SideWrapperHeader";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { FetchTransactionCategoriesApi } from "@/services/transactions";
import { ITransactionCategory } from "@/types/transactions";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  goBack: () => void;
  goNext: () => void;
  category: ITransactionCategory | null;
  setCategory: Dispatch<SetStateAction<ITransactionCategory | null>>;
  loading: boolean;
}

const ChooseCategory = ({
  goBack,
  goNext,
  category,
  setCategory,
  loading,
}: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["transactions-category"],
    queryFn: () => FetchTransactionCategoriesApi(),
  });

  const handleSelect = (newCategory: ITransactionCategory) => {
    if (
      category?.transaction_category_id === newCategory?.transaction_category_id
    ) {
      setCategory(null);
    } else {
      setCategory(newCategory);
    }
  };

  // const SkipButton = () => {
  //   return (
  //     <button
  //       onClick={() => {
  //         setCategory(null);
  //         goNext();
  //       }}
  //       className="text-right justify-center text-zinc-700 text-sm leading-tight"
  //     >
  //       Skip
  //     </button>
  //   );
  // };

  return (
    <div className="flex flex-col h-full">
      <SideWrapperHeader
        close={goBack}
        title="Select category"
        titleColor="text-zinc-900"
        // rightComponent={<SkipButton />}
      />
      <div className="flex flex-col h-full justify-between items-center">
        <div className="grid grid-cols-4 gap-y-5 gap-x-3">
          {isLoading ? (
            <Spinner />
          ) : (
            data?.map((each, index) => {
              return (
                <div key={index} className="relative">
                  {each.transaction_category_id ===
                    category?.transaction_category_id && (
                    <Image
                      className="w-5 h-5 absolute right-0 top-0"
                      src={"/icons/category-check.svg"}
                      alt={each?.transaction_category}
                      width={20}
                      height={20}
                    />
                  )}
                  <button
                    onClick={() => handleSelect(each)}
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
                </div>
              );
            })
          )}
        </div>
        <Button loading={loading} disabled={!category} onClick={goNext}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ChooseCategory;
