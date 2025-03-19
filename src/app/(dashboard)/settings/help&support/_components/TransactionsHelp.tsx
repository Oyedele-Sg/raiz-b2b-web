import React from "react";
import Image from "next/image";
import { PartChildProps } from "./HelpSupportNav";

const TransactionsHelp = ({ setPart }: PartChildProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <button onClick={() => setPart(5)}>
          <Image
            src="/icons/arrow-left.svg"
            alt="arrow-left"
            width={18}
            height={18}
          />
        </button>
        <span className="text-raiz-gray-950 font-bold leading-tight">
          How can we Help you?
        </span>
        <div />
      </div>
      <div className="mt-5 flex flex-col gap-5">
        <h4 className="text-zinc-900 text-base mb-3 font-bold leading-tight">
          How to send money
        </h4>
        <div className="text-zinc-700 text-sm font-normal leading-snug">
          <p className="mb-3">Here are a few quick tips to get started: </p>
          <ol>
            <li className="list-decimal mb-2 list-inside">
              Ensure your account is set up and ready to go. If we need any
              information from you, you&#39;ll see a notice on your dashboard
              letting you know.
            </li>
            <li className="list-decimal list-inside">
              You can either transfer to another Raiz user or an external
              account from any of your wallets. For external or international
              transfers, be sure to use the recipient&#39;s full legal name and
              double-check their account information.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TransactionsHelp;
