"use client";
import Avatar from "@/components/ui/Avatar";
import Overlay from "@/components/ui/Overlay";
import { useSendStore } from "@/store/Send";
import { EntityForeignPayoutBeneficiary } from "@/types/services";
import React, { useMemo, useState } from "react";
import Image from "next/image";

interface Props {
  close: () => void;
  users: EntityForeignPayoutBeneficiary[];
}

const IntBeneficiaryModal = ({ close, users }: Props) => {
  const [search, setSearch] = useState("");
  const { actions } = useSendStore();
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user?.foreign_payout_beneficiary?.beneficiary_name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, users]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleSelect = (user: EntityForeignPayoutBeneficiary) => {
    actions.selectIntBeneficiary(user);
    close();
  };

  return (
    <Overlay close={close} width="375px">
      <div className="flex flex-col  h-full py-8 px-5 ">
        <h5 className="text-raiz-gray-950 text-xl font-bold  leading-normal">
          Choose Beneficiary
        </h5>
        <div className="relative h-12 min-w-[300px]  mt-[15px] mb-[30px]">
          <Image
            className="absolute top-3.5 left-3"
            src={"/icons/search.svg"}
            alt="search"
            width={22}
            height={22}
          />
          <input
            value={search}
            onChange={handleSearch}
            placeholder="Search"
            className="pl-10 h-full bg-[#fcfcfc] rounded-[20px] border border-raiz-gray-200 justify-start items-center gap-2 inline-flex w-full outline-none text-sm"
          />
        </div>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <button
              onClick={() => handleSelect(user)}
              key={index}
              className="flex justify-between hover:bg-slate-100 p-3 rounded-xl"
            >
              <div className="flex items-center gap-2">
                <Avatar
                  src={""}
                  name={user?.foreign_payout_beneficiary?.beneficiary_name}
                />
                <div className="flex flex-col ">
                  <span className="text-raiz-gray-950 text-sm font-semibold text-left">
                    {user?.foreign_payout_beneficiary?.beneficiary_name}
                  </span>
                  <span className="text-raiz-gray-400 text-sm font-semibold text-left">
                    {
                      user?.foreign_payout_beneficiary
                        ?.beneficiary_account_number
                    }
                  </span>
                </div>
              </div>
            </button>
          ))
        ) : (
          <p className="text-center text-sm text-raiz-gray-600">
            No beneficiary found
          </p>
        )}
      </div>
    </Overlay>
  );
};

export default IntBeneficiaryModal;
