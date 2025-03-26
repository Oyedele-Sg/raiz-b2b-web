"use client";
import SideWrapperHeader from "@/components/SideWrapperHeader";
import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { ISearchedUser } from "@/types/user";
import FindRecipients from "@/components/transactions/FindRecipients";
import { useP2PBeneficiaries } from "@/lib/hooks/useP2pBeneficiaries";

interface Props {
  goBack: () => void;
  setSelectedUser: Dispatch<SetStateAction<ISearchedUser | undefined>>;
}

const Selectuser = ({ goBack, setSelectedUser }: Props) => {
  const { recents, favourites } = useP2PBeneficiaries();
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
        recentUsers={recents}
        setSelectedUser={setSelectedUser}
        beneficiaries={favourites}
        emptyStateTitle="You haven't made any request"
      />
    </div>
  );
};

export default Selectuser;
