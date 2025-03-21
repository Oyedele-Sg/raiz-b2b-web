"use client";
import React, { useEffect, useState } from "react";
import { RequestStepsProps } from "./RequestHome";
import { ISearchedUser } from "@/types/user";
import Selectuser from "./single-request/Selectuser";
import RequestDetails from "./single-request/RequestDetails";
import ChooseCategory from "./single-request/ChooseCategory";

export type RequestMoneyStepType =
  | "select-user"
  | "details"
  | "category"
  | "success";

// const recentUsers: ISearchedUser[] = [
//   {
//     entity_id: "1a2b3c4d",
//     account_name: "John Doe",
//     username: "johndoe",
//     selfie_image: null,
//   },
//   {
//     entity_id: "5e6f7g8h",
//     account_name: "Jane Smith",
//     username: "janesmith",
//     selfie_image: null,
//   },
//   {
//     entity_id: "9i0j1k2l",
//     account_name: "Alice Johnson",
//     username: "alicej",
//     selfie_image: null,
//   },
//   {
//     entity_id: "3m4n5o6p",
//     account_name: "Bob Williams",
//     username: "bobw",
//     selfie_image: null,
//   },
//   {
//     entity_id: "7q8r9s0t",
//     account_name: "Charlie Brown",
//     username: "charlieb",
//     selfie_image: null,
//   },
// ];

export const RequestMoney = ({ setStep }: RequestStepsProps) => {
  const [requestMoneyStep, setRequestMoneyStep] =
    useState<RequestMoneyStepType>("select-user");
  const [selectedUser, setSelectedUser] = useState<ISearchedUser | undefined>();
  const [amount, setAmount] = useState("");
  const [narration, setNarration] = useState("");

  useEffect(() => {
    if (requestMoneyStep === "select-user" && selectedUser) {
      setRequestMoneyStep("details");
    }
  }, [requestMoneyStep, selectedUser]);

  const goBackToStep1 = () => {
    setSelectedUser(undefined);
    setRequestMoneyStep("select-user");
  };

  const displayStep = () => {
    switch (requestMoneyStep) {
      case "select-user":
        return (
          <Selectuser
            goBack={() => setStep("all")}
            setSelectedUser={setSelectedUser}
          />
        );
      case "details":
        return (
          <RequestDetails
            goBack={goBackToStep1}
            selectedUser={selectedUser}
            amount={amount}
            setAmount={setAmount}
            narration={narration}
            setNarration={setNarration}
            goNext={() => setRequestMoneyStep("category")}
          />
        );
      case "category":
        return (
          <ChooseCategory
            goBack={() => setRequestMoneyStep("details")}
            goNext={() => setRequestMoneyStep("success")}
          />
        );
      default:
        break;
    }
  };
  return <div className="h-full p-[25px] xl:p-[30px]">{displayStep()}</div>;
};

export default RequestMoney;
