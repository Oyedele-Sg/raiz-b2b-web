"use client";
import React, { useState } from "react";
import SideWrapperHeader from "@/components/SideWrapperHeader";
import Radio from "@/components/ui/Radio";
import Button from "@/components/ui/Button";

interface Props {
  close: () => void;
}

const InvoiceSettings = ({ close }: Props) => {
  const [discountOption, setDiscountOption] = useState("lineItem");
  const [taxOption, setTaxOption] = useState("inclusive");

  const handleSave = () => {
    const preferences = {
      discountOption,
      taxOption,
    };
    console.log("Saved preferences:", preferences);
    close();
  };

  return (
    <div className="h-full flex flex-col">
      <SideWrapperHeader
        title="Invoice Settings Preference"
        close={close}
        titleColor="text-zinc-900"
      />

      <div className="flex-1 overflow-y-auto flex flex-col justify-between">
        <div className="space-y-8">
          {/* Discounts */}
          <div>
            <h2 className=" text-zinc-900 text-sm font-medium leading-normal mb-3 font-brSonoma">
              Do you give Discounts?
            </h2>
            <div className="space-y-3 text-sm">
              <label className="flex items-center gap-3 cursor-pointer">
                <Radio
                  checked={discountOption === "none"}
                  onChange={() => setDiscountOption("none")}
                />
                <span>I don&apos;t give discounts</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <Radio
                  checked={discountOption === "lineItem"}
                  onChange={() => setDiscountOption("lineItem")}
                />
                <span>At Line Item level</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <Radio
                  checked={discountOption === "transaction"}
                  onChange={() => setDiscountOption("transaction")}
                />
                <span>At Transactional Level</span>
              </label>
            </div>
          </div>

          {/* Tax Preference */}
          <div>
            <h2 className=" text-zinc-900 text-sm font-medium leading-normal mb-3 font-brSonoma">
              Do you sell your Items at rates inclusive of Tax?
            </h2>
            <div className="space-y-3 text-sm">
              <label className="flex items-center gap-3 cursor-pointer">
                <Radio
                  checked={taxOption === "inclusive"}
                  onChange={() => setTaxOption("inclusive")}
                />
                <span>Tax Inclusive</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <Radio
                  checked={taxOption === "exclusive"}
                  onChange={() => setTaxOption("exclusive")}
                />
                <span>Tax Exclusive</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <Radio
                  checked={taxOption === "either"}
                  onChange={() => setTaxOption("either")}
                />
                <span>Tax Inclusive or Exclusive</span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 space-y-4">
          <div className=" px-5 h-11 text-center py-2  bg-indigo-100/60 rounded-[20px] text-xs text-zinc-900  flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.35"
                d="M10.0001 18.3333C14.6025 18.3333 18.3334 14.6023 18.3334 9.99996C18.3334 5.39759 14.6025 1.66663 10.0001 1.66663C5.39771 1.66663 1.66675 5.39759 1.66675 9.99996C1.66675 14.6023 5.39771 18.3333 10.0001 18.3333Z"
                fill="#39A062"
              />
              <path
                d="M9.16675 14.1666V9.99996C9.16675 9.53996 9.54008 9.16663 10.0001 9.16663C10.4601 9.16663 10.8334 9.53996 10.8334 9.99996V14.1666C10.8334 14.6266 10.4601 15 10.0001 15C9.54008 15 9.16675 14.6266 9.16675 14.1666Z"
                fill="#39A062"
              />
              <path
                d="M10 7.5C10.6904 7.5 11.25 6.94036 11.25 6.25C11.25 5.55964 10.6904 5 10 5C9.30964 5 8.75 5.55964 8.75 6.25C8.75 6.94036 9.30964 7.5 10 7.5Z"
                fill="#39A062"
              />
            </svg>
            Change preference at any time from invoice settings
          </div>
          <Button onClick={handleSave}>Confirm & continue</Button>
          <Button onClick={close} variant="secondary">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSettings;
