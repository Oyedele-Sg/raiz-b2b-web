"use client";
import React from "react";
// import Header from "./_components/Header";
import DashboardSummary from "./_components/DashboardSummary";
import QuickLinks from "./_components/QuickLinks";
import Transactions from "./_components/Transactions";
import BillRequests from "./_components/BillRequests";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import CryptoDashboard from "./_components/crypto/dashboard/CryptoDashboard";

export default function Home() {
  const { selectedCurrency } = useCurrencyStore();

  if (selectedCurrency.name === "SBC") {
    return <CryptoDashboard />;
  }
  return (
    <section>
      <DashboardSummary />
      <section className="grid grid-cols-12 mt-8 gap-6 xl:gap-12">
        <div className="col-span-8 flex flex-col gap-[2rem]">
          <QuickLinks />
          <Transactions />
        </div>
        <div className="col-span-4">
          <BillRequests />
        </div>
      </section>
    </section>
  );
}
