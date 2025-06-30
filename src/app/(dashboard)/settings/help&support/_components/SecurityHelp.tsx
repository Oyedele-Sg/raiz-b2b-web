import React from "react";
import Image from "next/image";
import { PartChildProps } from "./HelpSupportNav";

const SecurityHelp = ({ setPart }: PartChildProps) => {
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
          How do I change my password?
        </h4>
        <div className="text-zinc-700 text-sm font-normal leading-snug">
          <p className="mb-3">
            If you need to change your password, you can do so directly on the
            website:{" "}
          </p>
          <ol>
            <li className="list-decimal mb-2 list-inside">
              Go to settings page
            </li>
            <li className="list-decimal mb-2 list-inside">
              Click on the Login and Security
            </li>
            <li className="list-decimal mb-2 list-inside">
              Click on Reset Password
            </li>
            <li className="list-decimal mb-2 list-inside">Fill out the form</li>
            <li className="list-decimal mb-2 list-inside">
              You&#39;ll receive a One-Time Password (OTP). Enter the OTP.
            </li>
            <li className="list-decimal mb-2 list-inside">
              Save and you&#39;re done!
            </li>
          </ol>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-5">
        <h4 className="text-zinc-900 text-base mb-3 font-bold leading-tight">
          How do I change my transaction PIN?
        </h4>
        <div className="text-zinc-700 text-sm font-normal leading-snug">
          <p className="mb-3">
            If you need to change your transaction PIN, you can do so directly
            on the website:{" "}
          </p>
          <ol>
            <li className="list-decimal mb-2 list-inside">
              Go to settings page
            </li>
            <li className="list-decimal mb-2 list-inside">
              Click on the Login and Security
            </li>
            <li className="list-decimal mb-2 list-inside">
              Click on Change/Reset Transaction PIN
            </li>
            <li className="list-decimal mb-2 list-inside">
              You&#39;ll receive a One-Time Password (OTP). Enter the OTP
            </li>

            <li className="list-decimal mb-2 list-inside">
              Set a new transaction PIN
            </li>
          </ol>
          <p>With that, your transaction PIN is updated!👍🏽</p>
        </div>
      </div>
    </div>
  );
};

export default SecurityHelp;
