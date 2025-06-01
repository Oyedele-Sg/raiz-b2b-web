import React from "react";
import CryptoDashboardSummary from "./CryptoDashboardSummary";
import CryptoTransactions from "./CryptoTransactions";
import CryptoDeposit from "./CryptoDeposit";

const CryptoDashboard = () => {
  return (
    <section>
      <CryptoDashboardSummary />
      <CryptoDeposit />
      <CryptoTransactions />
    </section>
  );
};

export default CryptoDashboard;
