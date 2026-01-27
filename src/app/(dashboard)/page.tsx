"use client";
import React from "react";
// import Header from "./_components/Header";
import DashboardSummary from "./_components/DashboardSummary";
// import QuickLinks from "./_components/QuickLinks";
// import Transactions from "./_components/Transactions";
// import BillRequests from "./_components/BillRequests";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import CryptoDashboard from "./_components/crypto/dashboard/CryptoDashboard";
import { useUser } from "@/lib/hooks/useUser";
// import { useCurrentWallet } from "@/lib/hooks/useCurrentWallet";
import TransactionTable from "./_components/TransactionTable";
import BillRequests from "./_components/BillRequests";

export default function Home() {
  const { selectedCurrency } = useCurrencyStore();
  const { user } = useUser();
  // const currentWallet = useCurrentWallet(user);
  if (selectedCurrency.name === "SBC") {
    return <CryptoDashboard />;
  }
  const verificationStatus =
    user?.business_account?.business_verifications?.[0]?.verification_status;

  return (
    <section>
      <DashboardSummary />
      {verificationStatus === "completed" && (
        <>
          <BillRequests />
          <TransactionTable topRightOpts="link" />
        </>
      )}

      {/* <section className="grid grid-cols-12 mt-8 gap-6 xl:gap-12">
        <div className="col-span-8 flex flex-col gap-[2rem]">
          <QuickLinks />
          {currentWallet && <Transactions currentWallet={currentWallet} />}
        </div>
        <div className="col-span-4">
          <BillRequests />
        </div>
      </section> */}
    </section>
  );
}
