"use client";
import React from "react";
import Tabs from "@/components/ui/Tabs";
import SideWrapperHeader from "@/components/SideWrapperHeader";
import Image from "next/image";
import { useSendStore } from "@/store/Send";
import NgnToRaizers from "./toRaizers/NgnToRaizers";
import { INGNSendOptions } from "@/types/misc";

const NgnSend = () => {
  const { actions, user, ngnSendType } = useSendStore();

  const handleTypeChange = (value: INGNSendOptions) => {
    actions.selectNGNSendOption(value);
  };

  const ScanButton = () => {
    return (
      <button
        // onClick={() => {

        // }}
        className="text-right justify-center text-zinc-700 text-sm leading-tight"
      >
        <Image src={"/icons/qr.svg"} alt="scan qr" width={18} height={19.2} />
      </button>
    );
  };

  return (
    <div>
      {!user && (
        <SideWrapperHeader
          title="Find Recipient"
          close={() => actions.selectUser(null)}
          titleColor="text-zinc-900 "
          backArrow={user ? false : true}
          rightComponent={<ScanButton />}
        />
      )}
      {!user && (
        <Tabs
          options={[
            { label: "Send to Riazer", value: "to Raizer" },
            { label: "Send to other bank", value: "to other bank" },
          ]}
          selected={ngnSendType}
          onChange={handleTypeChange}
        />
      )}
      {ngnSendType === "to Raizer" ? <NgnToRaizers /> : "Other banks"}
    </div>
  );
};

export default NgnSend;
