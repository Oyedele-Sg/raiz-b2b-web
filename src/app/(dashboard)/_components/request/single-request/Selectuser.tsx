"use client";
import SideWrapperHeader from "@/components/SideWrapperHeader";
import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { ISearchedUser } from "@/types/user";
import FindRecipients from "@/components/transactions/FindRecipients";

interface Props {
  goBack: () => void;
  setSelectedUser: Dispatch<SetStateAction<ISearchedUser | undefined>>;
}

const Selectuser = ({ goBack, setSelectedUser }: Props) => {
  const Scan = () => {
    return (
      <button>
        <Image src={"/icons/qr.svg"} alt="scan qr" width={18} height={19.2} />
      </button>
    );
  };
  return (
    <div>
      <SideWrapperHeader
        close={goBack}
        title="Request Money"
        rightComponent={<Scan />}
        titleColor="text-zinc-900"
      />
      <FindRecipients
        recentUsers={[]}
        setSelectedUser={setSelectedUser}
        beneficiaries={[]}
      />
    </div>
  );
};

export default Selectuser;
